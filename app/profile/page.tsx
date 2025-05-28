"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Navbar } from '@/components/navbar';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getUserProfile } from '@/lib/supabase/db';
import { useQuery } from "@tanstack/react-query";
import { UserProfileCard } from './components/UserProfileCard';
import { MyGamesLibrary } from './components/MyGamesLibrary';
import { LastHostedSection } from './components/LastHostedSection';
import { SocialSection } from './components/SocialSection';
import { LastPlayedSection } from './components/LastPlayedSection';
import { HotGamesSection } from './components/HotGamesSection';
import { ActiveSessionSection } from './components/ActiveSessionSection';
import { HostingStatsSection } from './components/HostingStatsSection';
import { PlayerStatsSection } from './components/PlayerStatsSection';
import { BillingsSection } from './components/BillingsSection';
import { Edit, Share2, ChevronDown, Settings, LogOut, ShieldCheck, Users, Trophy, PlayCircle, MessageSquare, Video, Rss, ShoppingBag, Flame, CreditCard, LayoutGrid, BarChartHorizontalBig, RadioTower, Gamepad2 } from 'lucide-react';
import { motion } from 'framer-motion';

// Reusable fetcher function (can be moved to a shared file if used elsewhere)
const fetchUserProfile = async (userId: string) => {
  if (!userId) throw new Error("User ID is required to fetch profile.");
  const profile = await getUserProfile(userId);
  return profile;
};

interface UserProfile {
  username: string | null;
  avatar_url: string | null;
  created_at?: string | null;
  bio?: string | null;
  // Add other fields from your Supabase table as needed
  // e.g., country: string | null;
}

export default function ProfilePage() {
  const { user, isLoading: authIsLoading, session } = useAuth();
  const router = useRouter();
  const [isAcceptingGamers, setIsAcceptingGamers] = useState(true);
  
  const { 
    data: userProfile,
    isLoading: isProfileFetching, 
  } = useQuery<UserProfile | null>({
    queryKey: ['userProfile', user?.id],
    queryFn: () => user?.id ? fetchUserProfile(user.id) as Promise<UserProfile | null> : Promise.resolve(null),
    enabled: !!user && !authIsLoading,
  });

  useEffect(() => {
    if (!authIsLoading && !user && !session) {
      router.push('/login');
    }
  }, [user, authIsLoading, session, router]);

  const formatDate = (dateString?: string | null) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch (e) {
      console.error("Error formatting date:", e);
      return "Invalid Date";
    }
  };

  const memberSince = formatDate(userProfile?.created_at);

  if (authIsLoading || (user && isProfileFetching && !userProfile)) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white flex flex-col items-center justify-center p-4">
        <Navbar />
        <div className="flex flex-col items-center justify-center flex-1">
          <div className="animate-pulse flex flex-col items-center space-y-4">
            <div className="w-24 h-24 bg-slate-700 rounded-full"></div>
            <div className="h-6 w-48 bg-slate-700 rounded"></div>
            <div className="h-4 w-32 bg-slate-700 rounded"></div>
          </div>
          <p className="mt-8 text-lg text-slate-400">Loading your awesome profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white flex flex-col items-center justify-center">
        <Navbar />
        <p className="mt-8 text-lg">Redirecting to login...</p>
      </div>
    );
  }

  const friendsCount = 43;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gradient-to-br dark:from-slate-900 dark:via-slate-900 dark:to-gray-900 text-gray-800 dark:text-slate-100 flex flex-col">
      <Navbar />

      <main className="flex-1 container mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-10">
          <aside className="w-full lg:w-1/3 lg:sticky lg:top-24 space-y-8 self-start">
            <UserProfileCard
              avatarUrl={userProfile?.avatar_url || undefined}
              username={userProfile?.username || user?.email?.split('@')[0] || "User"}
              countryFlagSrc="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.5.0/flags/4x3/ca.svg"
              memberSince={memberSince}
              bio={userProfile?.bio || "This user is a mystery wrapped in an enigma, shrouded in cool."}
              isAcceptingGamers={isAcceptingGamers}
              onAcceptingGamersChange={setIsAcceptingGamers}
            />
            <MyGamesLibrary />
            <div className="hidden lg:block">
              <SocialSection />
            </div>
          </aside>

          <section className="w-full lg:w-2/3">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="sticky top-0 z-10 flex w-full gap-1.5 bg-gray-100/80 dark:bg-slate-800/60 backdrop-blur-md p-1.5 rounded-lg mb-8 shadow-sm border border-gray-200 dark:border-slate-700">
                <TabsTrigger value="overview" className="profile-tab-trigger w-full flex-1">
                  <LayoutGrid size={18} className="mr-0 md:mr-2" /> <span className="hidden md:inline">Overview</span>
                </TabsTrigger>
                <TabsTrigger value="stats" className="profile-tab-trigger w-full flex-1">
                  <BarChartHorizontalBig size={18} className="mr-0 md:mr-2" /> <span className="hidden md:inline">Stats</span>
                </TabsTrigger>
                <TabsTrigger value="hot_games" className="profile-tab-trigger w-full flex-1">
                  <Flame size={18} className="mr-0 md:mr-2" /> <span className="hidden md:inline">Hot Games</span>
                </TabsTrigger>
                <TabsTrigger value="billing" className="profile-tab-trigger w-full flex-1">
                  <CreditCard size={18} className="mr-0 md:mr-2" /> <span className="hidden md:inline">Billing</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="animate-fadeIn">
                <div className="space-y-8">
                  <ActiveSessionSection />
                  <LastHostedSection />
                  <LastPlayedSection />
                  <div className="lg:hidden space-y-8">
                    <SocialSection />
                    <UserProfileCard 
                      username="ShadowGamerX"
                      memberSince="Jan 2022"
                      bio="Loves FPS, RPGs, and competitive gaming. Streaming on ReflexTV most evenings."
                      avatarUrl="/images/avatars/avatar-1.png"
                      countryFlagSrc="/images/flags/us.svg"
                      isAcceptingGamers={isAcceptingGamers}
                      onAcceptingGamersChange={setIsAcceptingGamers}
                    />
                    <MyGamesLibrary />
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="stats" className="animate-fadeIn">
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="bg-white dark:bg-slate-800/40 backdrop-blur-md rounded-xl border border-gray-200 dark:border-slate-700/80 shadow-xl dark:shadow-2xl p-6 md:p-8"
                >
                  <Tabs defaultValue="hosting-stats" className="w-full">
                    <TabsList className="flex w-full bg-gray-100 dark:bg-slate-700/60 p-1.5 rounded-lg mb-6 border border-gray-200 dark:border-slate-600/80 gap-1.5">
                      <TabsTrigger value="hosting-stats" className="profile-nested-tab-trigger w-full flex-1">
                        <RadioTower size={18} className="mr-2" /> Hosting Stats
                      </TabsTrigger>
                      <TabsTrigger value="player-stats" className="profile-nested-tab-trigger w-full flex-1">
                        <Gamepad2 size={18} className="mr-2" /> Player Stats
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="hosting-stats" className="animate-fadeIn">
                      <HostingStatsSection />
                    </TabsContent>
                    <TabsContent value="player-stats" className="animate-fadeIn">
                      <PlayerStatsSection />
                    </TabsContent>
                  </Tabs>
                </motion.div>
              </TabsContent>

              <TabsContent value="hot_games" className="animate-fadeIn">
                <HotGamesSection />
              </TabsContent>

              <TabsContent value="billing" className="animate-fadeIn">
                <BillingsSection />
              </TabsContent>
            </Tabs>
          </section>
        </div>
      </main>

      <footer className="container mx-auto py-6 px-4 text-center text-sm text-gray-600 dark:text-slate-500 border-t border-gray-200 dark:border-slate-800">
        <p>© {new Date().getFullYear()} Reflex Cloud Gaming. All rights reserved. Elevate Your Play.</p>
      </footer>
    </div>
  );
} 