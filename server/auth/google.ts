// Google OAuth Provider
import type { Express, Request, Response, NextFunction } from "express";
import passport from "passport";
import { Strategy as GoogleStrategy, Profile } from "passport-google-oauth20";
import { storage } from "../storage";
import type { AuthUser } from "./index";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const GOOGLE_CALLBACK_URL = process.env.GOOGLE_CALLBACK_URL || "/api/auth/google/callback";

export function setupGoogleAuth(app: Express): boolean {
  if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
    console.log("Google OAuth: Disabled (missing GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET)");

    // Provide stub endpoints
    app.get("/api/auth/google", (_req: Request, res: Response) => {
      res.status(503).json({ error: "Google authentication not configured" });
    });
    app.get("/api/auth/google/callback", (_req: Request, res: Response) => {
      res.redirect("/app?error=google_not_configured");
    });

    return false;
  }

  passport.use(
    new GoogleStrategy(
      {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: GOOGLE_CALLBACK_URL,
        scope: ["profile", "email"],
      },
      async (
        _accessToken: string,
        _refreshToken: string,
        profile: Profile,
        done: (error: any, user?: AuthUser | false) => void
      ) => {
        try {
          // Extract user info from Google profile
          const email = profile.emails?.[0]?.value;
          const firstName = profile.name?.givenName;
          const lastName = profile.name?.familyName;
          const profileImageUrl = profile.photos?.[0]?.value;

          // Upsert user in database
          const user = await storage.upsertUser({
            id: `google_${profile.id}`,
            email,
            firstName,
            lastName,
            profileImageUrl,
          });

          const authUser: AuthUser = {
            id: user.id,
            email: user.email || undefined,
            firstName: user.firstName || undefined,
            lastName: user.lastName || undefined,
            profileImageUrl: user.profileImageUrl || undefined,
            provider: "google",
          };

          done(null, authUser);
        } catch (error) {
          console.error("Google auth error:", error);
          done(error);
        }
      }
    )
  );

  // Google OAuth initiation
  app.get(
    "/api/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"],
      prompt: "select_account",
    })
  );

  // Google OAuth callback
  app.get(
    "/api/auth/google/callback",
    passport.authenticate("google", {
      failureRedirect: "/app?error=google_auth_failed",
      session: true,
    }),
    (_req: Request, res: Response) => {
      res.redirect("/app");
    }
  );

  console.log("Google OAuth: Enabled");
  return true;
}
