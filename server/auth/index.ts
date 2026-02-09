// Multi-Provider Authentication System
// Supports: Replit, Google, GitHub, Web3/SIWE, WalletConnect

import type { Express, Request, Response, NextFunction, RequestHandler } from "express";
import passport from "passport";
import { storage } from "../storage";
import { setupGoogleAuth } from "./google";
import { setupGitHubAuth } from "./github";
import { setupWeb3Auth } from "./web3";

export interface AuthUser {
  id: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  profileImageUrl?: string;
  provider: "replit" | "google" | "github" | "metamask" | "walletconnect";
  walletAddress?: string;
  chainId?: number;
}

declare global {
  namespace Express {
    interface User extends AuthUser {}
  }
}

export async function setupMultiAuth(app: Express) {
  // Setup passport serialization
  passport.serializeUser((user: Express.User, cb) => {
    cb(null, user);
  });

  passport.deserializeUser((user: Express.User, cb) => {
    cb(null, user);
  });

  // Setup OAuth providers
  const googleEnabled = setupGoogleAuth(app);
  const githubEnabled = setupGitHubAuth(app);
  const web3Enabled = setupWeb3Auth(app);

  // Auth status endpoint
  app.get("/api/auth/status", (req: Request, res: Response) => {
    res.json({
      authenticated: req.isAuthenticated(),
      user: req.user || null,
      providers: {
        google: googleEnabled,
        github: githubEnabled,
        web3: web3Enabled,
        replit: true,
      },
    });
  });

  // Multi-provider login endpoint
  app.get("/api/auth/providers", (_req: Request, res: Response) => {
    res.json({
      providers: [
        { id: "replit", name: "Replit", enabled: true, type: "oauth" },
        { id: "google", name: "Google", enabled: googleEnabled, type: "oauth" },
        { id: "github", name: "GitHub", enabled: githubEnabled, type: "oauth" },
        { id: "metamask", name: "MetaMask", enabled: web3Enabled, type: "web3" },
        { id: "walletconnect", name: "WalletConnect", enabled: web3Enabled, type: "web3" },
      ],
    });
  });

  // Universal logout endpoint
  app.post("/api/auth/logout", (req: Request, res: Response) => {
    req.logout((err) => {
      if (err) {
        return res.status(500).json({ error: "Logout failed" });
      }
      req.session?.destroy(() => {
        res.clearCookie("connect.sid");
        res.json({ success: true });
      });
    });
  });

  console.log(`Auth providers enabled: Google=${googleEnabled}, GitHub=${githubEnabled}, Web3=${web3Enabled}`);
}

// Middleware to require authentication
export const requireAuth: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ error: "Authentication required" });
  }
  next();
};

// Middleware to require specific provider
export const requireProvider = (providers: string[]): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: "Authentication required" });
    }
    const user = req.user as AuthUser;
    if (!providers.includes(user.provider)) {
      return res.status(403).json({ error: `Access requires: ${providers.join(" or ")}` });
    }
    next();
  };
};

// Middleware to require Web3 wallet connection
export const requireWallet: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ error: "Authentication required" });
  }
  const user = req.user as AuthUser;
  if (!user.walletAddress) {
    return res.status(403).json({ error: "Web3 wallet connection required" });
  }
  next();
};

// Helper to get current user
export function getCurrentUser(req: Request): AuthUser | null {
  if (!req.isAuthenticated()) return null;
  return req.user as AuthUser;
}

// Helper to link OAuth connection to user
export async function linkOAuthConnection(
  userId: string,
  provider: string,
  providerUserId: string,
  tokens?: { accessToken?: string; refreshToken?: string; expiresAt?: Date }
) {
  try {
    // The schema already has oauthConnections table
    // We'd need to add the insert method to storage - for now, log it
    console.log(`Linking ${provider} account ${providerUserId} to user ${userId}`);
    // TODO: Implement storage.createOAuthConnection when ready
    return true;
  } catch (error) {
    console.error("Failed to link OAuth connection:", error);
    return false;
  }
}
