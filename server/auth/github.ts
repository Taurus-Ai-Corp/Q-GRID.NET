// GitHub OAuth Provider
import type { Express, Request, Response } from "express";
import passport from "passport";
import { Strategy as GitHubStrategy, Profile } from "passport-github2";
import { storage } from "../storage";
import type { AuthUser } from "./index";

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
const GITHUB_CALLBACK_URL = process.env.GITHUB_CALLBACK_URL || "/api/auth/github/callback";

export function setupGitHubAuth(app: Express): boolean {
  if (!GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET) {
    console.log("GitHub OAuth: Disabled (missing GITHUB_CLIENT_ID or GITHUB_CLIENT_SECRET)");

    // Provide stub endpoints
    app.get("/api/auth/github", (_req: Request, res: Response) => {
      res.status(503).json({ error: "GitHub authentication not configured" });
    });
    app.get("/api/auth/github/callback", (_req: Request, res: Response) => {
      res.redirect("/app?error=github_not_configured");
    });

    return false;
  }

  passport.use(
    new GitHubStrategy(
      {
        clientID: GITHUB_CLIENT_ID,
        clientSecret: GITHUB_CLIENT_SECRET,
        callbackURL: GITHUB_CALLBACK_URL,
        scope: ["user:email"],
      },
      async (
        _accessToken: string,
        _refreshToken: string,
        profile: Profile,
        done: (error: any, user?: AuthUser | false) => void
      ) => {
        try {
          // Extract user info from GitHub profile
          const email = profile.emails?.[0]?.value;
          const displayName = profile.displayName || profile.username || "";
          const nameParts = displayName.split(" ");
          const firstName = nameParts[0];
          const lastName = nameParts.slice(1).join(" ");
          const profileImageUrl = profile.photos?.[0]?.value;

          // Upsert user in database
          const user = await storage.upsertUser({
            id: `github_${profile.id}`,
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
            provider: "github",
          };

          done(null, authUser);
        } catch (error) {
          console.error("GitHub auth error:", error);
          done(error);
        }
      }
    )
  );

  // GitHub OAuth initiation
  app.get(
    "/api/auth/github",
    passport.authenticate("github", {
      scope: ["user:email"],
    })
  );

  // GitHub OAuth callback
  app.get(
    "/api/auth/github/callback",
    passport.authenticate("github", {
      failureRedirect: "/app?error=github_auth_failed",
      session: true,
    }),
    (_req: Request, res: Response) => {
      res.redirect("/app");
    }
  );

  console.log("GitHub OAuth: Enabled");
  return true;
}
