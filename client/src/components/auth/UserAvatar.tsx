import { useState } from "react";
import { useAuth, type AuthUser } from "./AuthProvider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LoginModal } from "./LoginModal";
import { User, LogOut, Settings, Wallet, Shield } from "lucide-react";

function getInitials(user: AuthUser): string {
  if (user.firstName && user.lastName) {
    return `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
  }
  if (user.firstName) {
    return user.firstName.slice(0, 2).toUpperCase();
  }
  if (user.email) {
    return user.email.slice(0, 2).toUpperCase();
  }
  if (user.walletAddress) {
    return user.walletAddress.slice(2, 4).toUpperCase();
  }
  return "U";
}

function getProviderIcon(provider: AuthUser["provider"]) {
  switch (provider) {
    case "google":
      return "🔵";
    case "github":
      return "⚫";
    case "metamask":
      return "🦊";
    case "walletconnect":
      return "🔗";
    case "replit":
    default:
      return "💻";
  }
}

export function UserAvatar() {
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);

  if (isLoading) {
    return (
      <div className="w-10 h-10 rounded-full bg-muted animate-pulse" />
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <>
        <Button onClick={() => setShowLoginModal(true)} variant="default">
          Sign In
        </Button>
        <LoginModal open={showLoginModal} onOpenChange={setShowLoginModal} />
      </>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10">
            <AvatarImage src={user.profileImageUrl} alt={user.firstName || "User"} />
            <AvatarFallback className="bg-primary text-primary-foreground">
              {getInitials(user)}
            </AvatarFallback>
          </Avatar>
          {user.walletAddress && (
            <span className="absolute -bottom-0.5 -right-0.5 h-4 w-4 rounded-full bg-green-500 border-2 border-background flex items-center justify-center">
              <Wallet className="h-2.5 w-2.5 text-white" />
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {user.firstName} {user.lastName}
            </p>
            {user.email && (
              <p className="text-xs leading-none text-muted-foreground">
                {user.email}
              </p>
            )}
            <div className="flex items-center gap-1 text-xs text-muted-foreground pt-1">
              <span>{getProviderIcon(user.provider)}</span>
              <span className="capitalize">{user.provider}</span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {user.walletAddress && (
          <>
            <DropdownMenuItem disabled className="text-xs">
              <Wallet className="mr-2 h-4 w-4" />
              {user.walletAddress.slice(0, 6)}...{user.walletAddress.slice(-4)}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </>
        )}

        <DropdownMenuItem asChild>
          <a href="/app/profile">
            <User className="mr-2 h-4 w-4" />
            Profile
          </a>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <a href="/app/security">
            <Shield className="mr-2 h-4 w-4" />
            Security
          </a>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <a href="/app/settings">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </a>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={() => logout()} className="text-red-600">
          <LogOut className="mr-2 h-4 w-4" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
