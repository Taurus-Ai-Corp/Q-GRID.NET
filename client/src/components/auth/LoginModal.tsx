import { useState } from "react";
import { useAuth } from "./AuthProvider";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

interface LoginModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LoginModal({ open, onOpenChange }: LoginModalProps) {
  const { login, loginWithWeb3, providers } = useAuth();
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleWeb3Login = async (walletType: "metamask" | "walletconnect") => {
    if (!window.ethereum && walletType === "metamask") {
      setError("MetaMask not installed. Please install MetaMask to continue.");
      return;
    }

    setIsConnecting(true);
    setError(null);

    try {
      let address: string;
      let chainId: number;

      if (walletType === "metamask" && window.ethereum) {
        // Request account access
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        address = accounts[0];
        chainId = parseInt(
          await window.ethereum.request({ method: "eth_chainId" }),
          16
        );
      } else {
        // WalletConnect would be handled here
        setError("WalletConnect integration coming soon");
        setIsConnecting(false);
        return;
      }

      // Get nonce and message from server
      const nonceResponse = await fetch(
        `/api/auth/web3/nonce?address=${address}&chainId=${chainId}`
      );
      const { message, nonce } = await nonceResponse.json();

      // Sign message with wallet
      const signature = await window.ethereum.request({
        method: "personal_sign",
        params: [message, address],
      });

      // Verify signature with server
      const success = await loginWithWeb3(address, signature, message, chainId);

      if (success) {
        onOpenChange(false);
      } else {
        setError("Authentication failed. Please try again.");
      }
    } catch (err: any) {
      console.error("Web3 login error:", err);
      if (err.code === 4001) {
        setError("You rejected the signature request.");
      } else {
        setError("Connection failed. Please try again.");
      }
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Sign in to Q-GRID
          </DialogTitle>
          <DialogDescription className="text-center">
            Choose your preferred authentication method
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* OAuth Providers */}
          <div className="space-y-3">
            {providers.replit && (
              <Button
                variant="outline"
                className="w-full justify-start gap-3"
                onClick={() => login("replit")}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M2 6a2 2 0 012-2h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6zm5 1a1 1 0 00-1 1v8a1 1 0 001 1h10a1 1 0 001-1V8a1 1 0 00-1-1H7z"/>
                </svg>
                Continue with Replit
              </Button>
            )}

            {providers.google && (
              <Button
                variant="outline"
                className="w-full justify-start gap-3"
                onClick={() => login("google")}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continue with Google
              </Button>
            )}

            {providers.github && (
              <Button
                variant="outline"
                className="w-full justify-start gap-3"
                onClick={() => login("github")}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                Continue with GitHub
              </Button>
            )}
          </div>

          {/* Web3 Separator */}
          {providers.web3 && (
            <>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or connect wallet
                  </span>
                </div>
              </div>

              {/* Web3 Wallets */}
              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start gap-3"
                  onClick={() => handleWeb3Login("metamask")}
                  disabled={isConnecting}
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#E17726"
                      d="M21.02 4.33L13.01 10.28l1.49-3.52 6.52-2.43z"
                    />
                    <path
                      fill="#E27625"
                      d="M2.98 4.33l7.93 6.01-1.41-3.58-6.52-2.43zm14.55 11.38l-2.13 3.26 4.56 1.26 1.31-4.44-3.74-.08zm-14.39.08l1.3 4.44 4.55-1.26-2.12-3.26-3.73.08z"
                    />
                    <path
                      fill="#E27625"
                      d="M8.8 10.95l-1.27 1.91 4.53.2-.16-4.86-3.1 2.75zm6.4 0l-3.15-2.81-.1 4.92 4.52-.2-1.27-1.91zm-6.21 7.02l2.73-1.33-2.36-1.84-.37 3.17zm5.29-1.33l2.73 1.33-.38-3.17-2.35 1.84z"
                    />
                  </svg>
                  {isConnecting ? "Connecting..." : "MetaMask"}
                </Button>

                <Button
                  variant="outline"
                  className="w-full justify-start gap-3"
                  onClick={() => handleWeb3Login("walletconnect")}
                  disabled={isConnecting}
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#3B99FC">
                    <path d="M6.09 8.15c3.26-3.19 8.56-3.19 11.82 0l.39.38a.4.4 0 010 .58l-1.34 1.31a.21.21 0 01-.3 0l-.54-.53c-2.28-2.23-5.97-2.23-8.25 0l-.58.56a.21.21 0 01-.3 0L5.66 9.14a.4.4 0 010-.58l.43-.41zm14.61 2.72l1.19 1.17a.4.4 0 010 .58l-5.38 5.26a.42.42 0 01-.59 0l-3.82-3.74a.1.1 0 00-.15 0l-3.82 3.74a.42.42 0 01-.59 0L2.16 12.62a.4.4 0 010-.58l1.19-1.17a.42.42 0 01.59 0l3.82 3.74a.1.1 0 00.15 0l3.82-3.74a.42.42 0 01.59 0l3.82 3.74a.1.1 0 00.15 0l3.82-3.74a.42.42 0 01.59 0z" />
                  </svg>
                  WalletConnect
                </Button>
              </div>
            </>
          )}

          {/* Error Display */}
          {error && (
            <div className="text-sm text-red-500 text-center bg-red-50 p-3 rounded-md">
              {error}
            </div>
          )}
        </div>

        <p className="text-xs text-center text-muted-foreground">
          By continuing, you agree to our{" "}
          <a href="/terms" className="underline hover:text-primary">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="/privacy" className="underline hover:text-primary">
            Privacy Policy
          </a>
        </p>
      </DialogContent>
    </Dialog>
  );
}

// Declare ethereum on window for TypeScript
declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string; params?: any[] }) => Promise<any>;
      on: (event: string, callback: (...args: any[]) => void) => void;
      removeListener: (event: string, callback: (...args: any[]) => void) => void;
    };
  }
}
