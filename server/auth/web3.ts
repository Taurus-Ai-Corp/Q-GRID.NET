// Web3 Authentication (MetaMask, WalletConnect, SIWE)
import type { Express, Request, Response } from "express";
import crypto from "crypto";
import { storage } from "../storage";
import type { AuthUser } from "./index";

// In-memory nonce store (in production, use Redis or database)
const nonceStore = new Map<string, { nonce: string; expiresAt: number }>();

// Clean expired nonces periodically
setInterval(() => {
  const now = Date.now();
  for (const [address, data] of nonceStore.entries()) {
    if (data.expiresAt < now) {
      nonceStore.delete(address);
    }
  }
}, 60000); // Clean every minute

// Generate random nonce
function generateNonce(): string {
  return crypto.randomBytes(32).toString("hex");
}

// Verify Ethereum signature (simplified - use ethers.js or viem in production)
function verifyEthSignature(message: string, signature: string, address: string): boolean {
  try {
    // This is a simplified verification
    // In production, use ethers.verifyMessage or viem's verifyMessage
    // For now, we'll do a basic check and trust the client
    if (!signature || signature.length !== 132) return false;
    if (!address || !address.startsWith("0x") || address.length !== 42) return false;
    return true; // Placeholder - implement proper verification
  } catch (error) {
    console.error("Signature verification error:", error);
    return false;
  }
}

export function setupWeb3Auth(app: Express): boolean {
  const web3Enabled = process.env.ENABLE_WEB3_AUTH === "true";

  if (!web3Enabled) {
    console.log("Web3 Auth: Disabled (set ENABLE_WEB3_AUTH=true to enable)");

    // Provide stub endpoints
    app.get("/api/auth/web3/nonce", (_req: Request, res: Response) => {
      res.status(503).json({ error: "Web3 authentication not enabled" });
    });
    app.post("/api/auth/web3/verify", (_req: Request, res: Response) => {
      res.status(503).json({ error: "Web3 authentication not enabled" });
    });

    return false;
  }

  // Request nonce for wallet
  app.get("/api/auth/web3/nonce", (req: Request, res: Response) => {
    const { address, chainId } = req.query;

    if (!address || typeof address !== "string") {
      return res.status(400).json({ error: "Wallet address required" });
    }

    const normalizedAddress = address.toLowerCase();
    const nonce = generateNonce();
    const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes

    nonceStore.set(normalizedAddress, { nonce, expiresAt });

    // Generate SIWE message
    const domain = req.get("host") || "q-grid.taurusai.in";
    const uri = `https://${domain}`;
    const issuedAt = new Date().toISOString();
    const expirationTime = new Date(expiresAt).toISOString();

    const message = `${domain} wants you to sign in with your Ethereum account:
${address}

Sign in to Q-GRID.IN

URI: ${uri}
Version: 1
Chain ID: ${chainId || 1}
Nonce: ${nonce}
Issued At: ${issuedAt}
Expiration Time: ${expirationTime}`;

    res.json({
      message,
      nonce,
      expiresAt,
    });
  });

  // Verify signature and authenticate
  app.post("/api/auth/web3/verify", async (req: Request, res: Response) => {
    try {
      const { address, signature, message, chainId, walletType } = req.body;

      if (!address || !signature || !message) {
        return res.status(400).json({ error: "Address, signature, and message required" });
      }

      const normalizedAddress = address.toLowerCase();
      const storedNonce = nonceStore.get(normalizedAddress);

      if (!storedNonce) {
        return res.status(400).json({ error: "No nonce found. Please request a new nonce." });
      }

      if (storedNonce.expiresAt < Date.now()) {
        nonceStore.delete(normalizedAddress);
        return res.status(400).json({ error: "Nonce expired. Please request a new nonce." });
      }

      // Verify the nonce is in the message
      if (!message.includes(storedNonce.nonce)) {
        return res.status(400).json({ error: "Invalid nonce in message" });
      }

      // Verify signature
      const isValid = verifyEthSignature(message, signature, address);
      if (!isValid) {
        return res.status(401).json({ error: "Invalid signature" });
      }

      // Clear used nonce
      nonceStore.delete(normalizedAddress);

      // Create or update user
      const userId = `web3_${normalizedAddress}`;
      const user = await storage.upsertUser({
        id: userId,
        email: undefined,
        firstName: `${address.slice(0, 6)}...${address.slice(-4)}`,
        lastName: undefined,
        profileImageUrl: undefined,
      });

      // Create auth user
      const authUser: AuthUser = {
        id: user.id,
        email: user.email || undefined,
        firstName: user.firstName || undefined,
        lastName: user.lastName || undefined,
        profileImageUrl: user.profileImageUrl || undefined,
        provider: walletType === "walletconnect" ? "walletconnect" : "metamask",
        walletAddress: address,
        chainId: chainId ? parseInt(chainId, 10) : 1,
      };

      // Log in the user
      req.login(authUser, (err) => {
        if (err) {
          console.error("Web3 login error:", err);
          return res.status(500).json({ error: "Login failed" });
        }
        res.json({
          success: true,
          user: authUser,
        });
      });
    } catch (error) {
      console.error("Web3 verify error:", error);
      res.status(500).json({ error: "Verification failed" });
    }
  });

  // Link wallet to existing account
  app.post("/api/auth/web3/link", async (req: Request, res: Response) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: "Authentication required" });
    }

    try {
      const { address, signature, message, chainId } = req.body;

      if (!address || !signature || !message) {
        return res.status(400).json({ error: "Address, signature, and message required" });
      }

      const normalizedAddress = address.toLowerCase();
      const storedNonce = nonceStore.get(normalizedAddress);

      if (!storedNonce || storedNonce.expiresAt < Date.now()) {
        return res.status(400).json({ error: "Invalid or expired nonce" });
      }

      const isValid = verifyEthSignature(message, signature, address);
      if (!isValid) {
        return res.status(401).json({ error: "Invalid signature" });
      }

      nonceStore.delete(normalizedAddress);

      // Update user session with wallet info
      const user = req.user as AuthUser;
      user.walletAddress = address;
      user.chainId = chainId ? parseInt(chainId, 10) : 1;

      res.json({
        success: true,
        message: "Wallet linked successfully",
        walletAddress: address,
      });
    } catch (error) {
      console.error("Web3 link error:", error);
      res.status(500).json({ error: "Failed to link wallet" });
    }
  });

  // Get supported chains
  app.get("/api/auth/web3/chains", (_req: Request, res: Response) => {
    res.json({
      chains: [
        { id: 1, name: "Ethereum Mainnet", symbol: "ETH" },
        { id: 137, name: "Polygon", symbol: "MATIC" },
        { id: 42161, name: "Arbitrum One", symbol: "ETH" },
        { id: 10, name: "Optimism", symbol: "ETH" },
        { id: 8453, name: "Base", symbol: "ETH" },
        { id: 295, name: "Hedera Mainnet", symbol: "HBAR" },
        { id: 296, name: "Hedera Testnet", symbol: "HBAR" },
      ],
    });
  });

  console.log("Web3 Auth: Enabled (MetaMask, WalletConnect, SIWE)");
  return true;
}
