"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Navbar } from '@/components/navbar';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getUserProfile } from '@/lib/supabase/db';

export default function DummyProfilePage() {
  const { user, isLoading: authIsLoading, session } = useAuth();
  const router = useRouter();
  
  const [profileAvatarUrl, setProfileAvatarUrl] = useState<string | null>(null);
  const [profileUsername, setProfileUsername] = useState<string | null>(null);
  const [isProfileFetching, setIsProfileFetching] = useState(true);

  useEffect(() => {
    if (!authIsLoading && !user && !session) {
      router.push('/login');
    }
  }, [user, authIsLoading, session, router]);

  useEffect(() => {
    const fetchPageProfile = async () => {
      if (user?.id) {
        setIsProfileFetching(true);
        try {
          const profile = await getUserProfile(user.id);
          if (profile) {
            setProfileAvatarUrl(profile.avatar_url || null);
            setProfileUsername(profile.username || user.email?.split('@')[0] || "User");
          } else {
            setProfileUsername(user.email?.split('@')[0] || "User");
          }
        } catch (error) {
          console.error("Error fetching profile for page:", error);
          setProfileUsername(user.email?.split('@')[0] || "User");
        } finally {
          setIsProfileFetching(false);
        }
      }
    };

    if (!authIsLoading && user) {
      fetchPageProfile();
    } else if (!authIsLoading && !user) {
        setIsProfileFetching(false); // No user, so not fetching
    }
  }, [user, authIsLoading]);

  const getAvatarFallbackText = () => {
    if (isProfileFetching && !profileUsername) return "L"; // Loading
    return (profileUsername || "U").charAt(0).toUpperCase();
  }

  if (authIsLoading || (user && isProfileFetching)) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center">
        <Navbar />
        <p className="mt-8">Loading profile...</p>
      </div>
    );
  }

  if (!user) {
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
          <AvatarImage src={profileAvatarUrl || undefined} alt={profileUsername || "User avatar"} />
          <AvatarFallback className="text-4xl">{getAvatarFallbackText()}</AvatarFallback>
        </Avatar>
        <h1 className="text-4xl font-bold mb-2">
          {profileUsername || 'User Profile'}
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