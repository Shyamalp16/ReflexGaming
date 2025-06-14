"use client"

import Link from "next/link"
import { Zap, Menu, X, UserCircle, LogOut, User as UserIcon, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { AnimatedButton } from "@/components/animated-button"
import { motion, AnimatePresence } from "framer-motion"
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
import { useEffect, useState, useRef } from "react"
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const isProd = process.env.NODE_ENV === 'production'

  useEffect(() => {
    let lastScroll = 0;
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      // Only update state if scroll difference is significant (prevent micro-adjustments)
      if (Math.abs(currentScroll - lastScroll) > 10) {
        setIsScrolled(currentScroll > 20);
        lastScroll = currentScroll;
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMobileMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node) &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isMobileMenuOpen])

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

  const handleSectionClick = (sectionId: string) => {
    setIsMobileMenuOpen(false);
    
    // Wait for mobile menu to close before scrolling
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        // Get current viewport height to account for mobile browser UI
        const viewportHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementPosition = elementTop + window.pageYOffset;
        
        // Adjust offset based on viewport height
        const offset = viewportHeight * 0.1; // 10% of viewport height
        
        window.scrollTo({
          top: elementPosition - offset,
          behavior: 'smooth'
        });
      }
    }, 300); // Wait for menu close animation
  };

  const renderAuthButtons = () => {
    if (isProd) {
      return (
        <AnimatedButton variant="accent" className="whitespace-nowrap px-4 h-9" asChild>
          <Link href="/waitlist">Join Waitlist</Link>
        </AnimatedButton>
      );
    }

    return (
      <>
        <Button 
          variant="outline" 
          className="hidden sm:flex whitespace-nowrap px-4 h-9 border-primary text-primary hover:bg-primary/10 hover:text-primary" 
          asChild
        >
          <Link href="/login">Log In</Link>
        </Button>
        <AnimatedButton 
          variant="accent" 
          className="whitespace-nowrap px-4 h-9"
          asChild
        >
          <Link href="/signup">Sign Up</Link>
        </AnimatedButton>
      </>
    );
  };

  const renderMobileMenu = () => {
    return (
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            ref={mobileMenuRef}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[72px] p-4 bg-background/95 backdrop-blur-lg border-b border-border md:hidden"
          >
            <nav className="flex flex-col space-y-4">
              {user ? (
                <>
                  <Link
                    href="/dashboard"
                    className={`text-sm font-medium transition-colors px-4 py-2 rounded-md ${pathname === '/dashboard' ? 'bg-primary/10 text-primary' : 'hover:bg-muted'}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/my-sessions"
                    className={`text-sm font-medium transition-colors px-4 py-2 rounded-md ${pathname === '/my-sessions' ? 'bg-primary/10 text-primary' : 'hover:bg-muted'}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    My Sessions
                  </Link>
                  <Link
                    href="/wallet"
                    className={`text-sm font-medium transition-colors px-4 py-2 rounded-md ${pathname === '/wallet' ? 'bg-primary/10 text-primary' : 'hover:bg-muted'}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Wallet
                  </Link>
                  <div className="pt-4 border-t border-border">
                    <Link
                      href="/profile"
                      className="flex items-center px-4 py-2 text-sm font-medium hover:bg-muted rounded-md"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <UserIcon className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                    <Link
                      href="/settings"
                      className="flex items-center px-4 py-2 text-sm font-medium hover:bg-muted rounded-md"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="flex items-center w-full px-4 py-2 text-sm font-medium hover:bg-muted rounded-md"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Log out
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <button
                    onClick={() => handleSectionClick('features')}
                    className="text-left text-sm font-medium px-4 py-2 hover:bg-muted rounded-md"
                  >
                    Features
                  </button>
                  <button
                    onClick={() => handleSectionClick('how-it-works')}
                    className="text-left text-sm font-medium px-4 py-2 hover:bg-muted rounded-md"
                  >
                    How It Works
                  </button>
                  <button
                    onClick={() => handleSectionClick('use-cases')}
                    className="text-left text-sm font-medium px-4 py-2 hover:bg-muted rounded-md"
                  >
                    Use Cases
                  </button>
                  <button
                    onClick={() => handleSectionClick('pricing')}
                    className="text-left text-sm font-medium px-4 py-2 hover:bg-muted rounded-md"
                  >
                    Pricing
                  </button>
                  <div className="pt-4 border-t border-border space-y-2">
                    {isProd ? (
                      <Button 
                        className="w-full bg-pink-500 hover:bg-pink-600 text-white" 
                        asChild
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Link href="/waitlist">Join Waitlist</Link>
                      </Button>
                    ) : (
                      <>
                        <Button 
                          className="w-full" 
                          variant="outline" 
                          asChild
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <Link href="/login">Log In</Link>
                        </Button>
                        <Button 
                          className="w-full bg-pink-500 hover:bg-pink-600 text-white" 
                          asChild
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <Link href="/signup">Sign Up</Link>
                        </Button>
                      </>
                    )}
                  </div>
                </>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
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

        <div className="flex items-center gap-2 sm:gap-4">
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
          <Button 
            ref={menuButtonRef}
            variant="ghost" 
            size="icon" 
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>
      {renderMobileMenu()}
    </header>
  )
}
