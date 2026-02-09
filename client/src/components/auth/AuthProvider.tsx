import { createContext, useContext, useEffect, useState, ReactNode } from "react";

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

interface AuthProviders {
  google: boolean;
  github: boolean;
  web3: boolean;
  replit: boolean;
}

interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  providers: AuthProviders;
  login: (provider: string) => void;
  loginWithWeb3: (address: string, signature: string, message: string, chainId?: number) => Promise<boolean>;
  logout: () => Promise<void>;
  refreshAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [providers, setProviders] = useState<AuthProviders>({
    google: false,
    github: false,
    web3: false,
    replit: true,
  });

  const refreshAuth = async () => {
    try {
      const response = await fetch("/api/auth/status");
      const data = await response.json();

      if (data.authenticated && data.user) {
        setUser(data.user);
      } else {
        setUser(null);
      }

      if (data.providers) {
        setProviders(data.providers);
      }
    } catch (error) {
      console.error("Failed to refresh auth:", error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshAuth();
  }, []);

  const login = (provider: string) => {
    if (provider === "replit") {
      window.location.href = "/api/login";
    } else if (provider === "google") {
      window.location.href = "/api/auth/google";
    } else if (provider === "github") {
      window.location.href = "/api/auth/github";
    }
    // Web3 login is handled separately via loginWithWeb3
  };

  const loginWithWeb3 = async (
    address: string,
    signature: string,
    message: string,
    chainId?: number
  ): Promise<boolean> => {
    try {
      const response = await fetch("/api/auth/web3/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address, signature, message, chainId }),
      });

      if (!response.ok) {
        const error = await response.json();
        console.error("Web3 login failed:", error);
        return false;
      }

      const data = await response.json();
      if (data.success && data.user) {
        setUser(data.user);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Web3 login error:", error);
      return false;
    }
  };

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      setUser(null);
      window.location.href = "/";
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        providers,
        login,
        loginWithWeb3,
        logout,
        refreshAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
