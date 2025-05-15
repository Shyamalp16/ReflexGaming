"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Navbar } from '@/components/navbar';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getUserProfile } from '@/lib/supabase/db';
import { useQuery } from "@tanstack/react-query";

// Reusable fetcher function (can be moved to a shared file if used elsewhere)
const fetchUserProfile = async (userId: string) => {
  if (!userId) throw new Error("User ID is required to fetch profile.");
  const profile = await getUserProfile(userId);
  return profile;
};

export default function DummyProfilePage() {
  const { user, isLoading: authIsLoading, session } = useAuth();
  const router = useRouter();
  
  // Fetch user profile using TanStack Query
  const { 
    data: userProfile,
    isLoading: isProfileFetching, 
    // error: profileError // Optionally handle error
  } = useQuery({
    queryKey: ['userProfile', user?.id], // Same query key as in Navbar
    queryFn: () => user?.id ? fetchUserProfile(user.id) : Promise.resolve(null),
    enabled: !!user && !authIsLoading,
  });

  useEffect(() => {
    if (!authIsLoading && !user && !session) {
      router.push('/login');
    }
  }, [user, authIsLoading, session, router]);

  const getAvatarFallbackText = () => {
    if (isProfileFetching && !userProfile) return "L"; // Loading only if no cached data
    return (userProfile?.username || user?.email?.split('@')[0] || "U").charAt(0).toUpperCase();
  }
  
  const displayUsername = userProfile?.username || user?.email?.split('@')[0] || "User";
  const avatarUrl = userProfile?.avatar_url || null;

  if (authIsLoading || (user && isProfileFetching && !userProfile)) {
    // Show loading if auth is loading, OR if fetching profile AND no cached profile data exists yet
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center">
        <Navbar />
        <p className="mt-8">Loading profile...</p>
      </div>
    );
  }

  if (!user) {
    // This case should ideally be handled by the useEffect pushing to /login
    // but kept as a fallback or if there's a brief moment before redirect.
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center">
        <Navbar />
        <p className="mt-8">Redirecting to login...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto py-12 px-4 flex flex-col items-center text-center">
        <Avatar className="h-32 w-32 text-primary mb-6">
          <AvatarImage src={avatarUrl || undefined} alt={displayUsername || "User avatar"} />
          <AvatarFallback className="text-4xl">{getAvatarFallbackText()}</AvatarFallback>
        </Avatar>
        <h1 className="text-4xl font-bold mb-2">
          {displayUsername}
        </h1>
        <div className="bg-card border border-border rounded-lg p-6 shadow-sm w-full max-w-md mt-4">
          <h2 className="text-2xl font-semibold mb-4">Profile Overview</h2>
          <p className="text-muted-foreground">
            This is your basic profile page. Detailed account management and settings are available under the "Settings" section.
          </p>
        </div>
      </main>
    </div>
  );
} 