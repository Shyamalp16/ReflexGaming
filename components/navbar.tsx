"use client"

import Link from "next/link"
import { Zap, Menu, UserCircle, LogOut, User as UserIcon, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { AnimatedButton } from "@/components/animated-button"
import { motion } from "framer-motion"
import { useAuth } from "@/context/AuthContext"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useRouter, usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { getUserProfile } from "@/lib/supabase/db"
import { cn } from "@/lib/utils"
import { useQuery } from "@tanstack/react-query"

// Reusable fetcher function for user profile
const fetchUserProfile = async (userId: string) => {
  if (!userId) throw new Error("User ID is required to fetch profile.");
  const profile = await getUserProfile(userId);
  // if (!profile) throw new Error("Profile not found."); // useQuery handles null as data
  return profile;
};

export function Navbar() {
  const { user, isLoading: authIsLoading, signOut } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const isProd = process.env.NODE_ENV === 'production'

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Use TanStack Query to fetch user profile
  const { 
    data: userProfile,
    isLoading: isProfileLoading,
    // error: profileError, // Optionally handle error state
  } = useQuery({
    queryKey: ['userProfile', user?.id], // Query key includes user ID
    queryFn: () => user?.id ? fetchUserProfile(user.id) : Promise.resolve(null),
    enabled: !!user && !authIsLoading, // Only run query if user is authenticated and auth is not loading
    // staleTime can be configured here or globally as we did in QueryProvider
  });

  const handleLogout = async () => {
    await signOut() // This will change auth state, and useQuery will refetch/reset if necessary
    router.push("/")
  }
  
  const getAvatarFallback = () => {
    if (isProfileLoading && !userProfile) return "..."; // Show loading only if no cached data yet
    return (userProfile?.username || user?.email?.split('@')[0] || "U").charAt(0).toUpperCase();
  }

  const displayUsername = userProfile?.username || user?.email?.split('@')[0] || "User";
  const avatarUrl = userProfile?.avatar_url || null;

  const renderAuthButtons = () => {
    if (isProd) {
      return (
        <AnimatedButton variant="accent" asChild>
          <Link href="/wishlist">Join Wishlist</Link>
        </AnimatedButton>
      );
    }

    return (
      <>
        <Button variant="outline" className="hidden sm:flex border-primary text-primary hover:bg-primary/10 hover:text-primary" asChild>
          <Link href="/login">Log In</Link>
        </Button>
        <AnimatedButton variant="accent" asChild>
          <Link href="/signup">Sign Up</Link>
        </AnimatedButton>
      </>
    );
  };

  return (
    <header 
      className={cn(
        "sticky top-0 z-50 transition-all duration-300 ease-in-out",
        isScrolled 
          ? "bg-background/80 dark:bg-slate-900/80 backdrop-blur-md shadow-md" 
          : "bg-transparent",
        "py-4"
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <motion.div
            initial={{ rotate: -10 }}
            animate={{ rotate: 10 }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
          >
            <Zap className="h-8 w-8 text-primary" />
          </motion.div>
          <span className="text-xl font-bold gradient-text">Reflex Cloud Gaming</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {user ? (
            <>
              <Link
                href="/dashboard"
                className={`text-sm font-medium transition-colors ${pathname === '/dashboard' ? 'text-primary' : 'text-muted-foreground hover:text-teal-500'}`}
              >
                Dashboard
              </Link>
              <Link
                href="/my-sessions"
                className={`text-sm font-medium transition-colors ${pathname === '/my-sessions' ? 'text-primary' : 'text-muted-foreground hover:text-foreground hover:text-teal-500'}`}
              >
                My Sessions
              </Link>
              <Link
                href="/wallet"
                className={`text-sm font-medium transition-colors ${pathname === '/wallet' ? 'text-primary' : 'text-muted-foreground hover:text-foreground hover:text-teal-500'}`}
              >
                Wallet
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/#features"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors hover:text-teal-400"
              >
                Features
              </Link>
              <Link
                href="/#how-it-works"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors hover:text-teal-400"
              >
                How It Works
              </Link>
              <Link
                href="/#use-cases"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors hover:text-teal-400"
              >
                Use Cases
              </Link>
              <Link
                href="/#pricing"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors hover:text-teal-400"
              >
                Pricing
              </Link>
            </>
          )}
        </nav>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          {authIsLoading ? ( // Use authIsLoading for the initial auth check loader
            <div className="h-9 w-20 animate-pulse bg-muted rounded-md"></div>
          ) : user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 rounded-full px-2 py-1 h-auto">
                  <Avatar className="h-7 w-7">
                    <AvatarImage src={avatarUrl || undefined} alt={displayUsername || "User Avatar"} />
                    <AvatarFallback>{getAvatarFallback()}</AvatarFallback>
                  </Avatar>
                  {!isProfileLoading && displayUsername && (
                    <span className="text-sm font-medium hidden sm:inline-block">{displayUsername}</span>
                  )}
                  {(isProfileLoading && !userProfile) && <span className="text-sm font-medium hidden sm:inline-block">Loading...</span>}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{displayUsername || "My Account"}</p>
                    {user.email && <p className="text-xs leading-none text-muted-foreground">{user.email}</p>}
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile">
                    <UserIcon className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            renderAuthButtons()
          )}
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </header>
  )
}
