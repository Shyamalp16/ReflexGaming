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
import { FriendsSection } from './components/FriendsSection';
import { AchievementsSection } from './components/AchievementsSection';
import { LastPlayedSection } from './components/LastPlayedSection';
import { HotGamesSection } from './components/HotGamesSection';
import { ActiveSessionSection } from './components/ActiveSessionSection';
import { HostingStatsSection } from './components/HostingStatsSection';
import { PlayerStatsSection } from './components/PlayerStatsSection';
import { BillingsSection } from './components/BillingsSection';
import { Edit, Share2, ChevronDown, Settings, LogOut, ShieldCheck, Users, Trophy, PlayCircle, MessageSquare, Video, Rss, ShoppingBag, Flame, CreditCard } from 'lucide-react';

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
        month: 'short',
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
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white flex flex-col items-center justify-center">
        <Navbar />
        <p className="mt-8">Loading profile...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white flex flex-col items-center justify-center">
        <Navbar />
        <p className="mt-8">Redirecting to login...</p>
      </div>
    );
  }

  const friendsCount = 43;
  const followingCount = 16;
  const followersCount = 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-white flex flex-col">
      <Navbar />

      <main className="flex-1 container mx-auto py-8 px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-1/4 space-y-6 sticky top-8 self-start">
          <UserProfileCard
            avatarUrl={userProfile?.avatar_url || undefined}
            username={userProfile?.username || user?.email?.split('@')[0] || "User"}
            countryFlagSrc="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.5.0/flags/4x3/ca.svg"
            memberSince={memberSince}
            bio={userProfile?.bio || "This user prefers to keep an air of mystery."}
            isAcceptingGamers={isAcceptingGamers}
            onAcceptingGamersChange={setIsAcceptingGamers}
          />
          <div className="backdrop-blur-sm bg-white/30 dark:bg-gray-800/30 rounded-lg p-1">
            <MyGamesLibrary />
          </div>
        </div>

        <div className="w-full lg:w-3/4">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-5 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm p-1 rounded-xl mb-6 border border-gray-200/50 dark:border-gray-700/50">
              <TabsTrigger value="overview" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-orange-600 data-[state=active]:text-white text-gray-700 dark:text-gray-300 rounded-lg transition-all duration-200">
                <div className="flex items-center space-x-2">
                  <PlayCircle size={16} />
                  <span>OVERVIEW</span>
                </div>
              </TabsTrigger>
              <TabsTrigger value="stats" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-orange-600 data-[state=active]:text-white text-gray-700 dark:text-gray-300 rounded-lg transition-all duration-200">
                <div className="flex items-center space-x-2">
                  <Trophy size={16} />
                  <span>STATS</span>
                </div>
              </TabsTrigger>
              <TabsTrigger value="hot_games" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-orange-600 data-[state=active]:text-white text-gray-700 dark:text-gray-300 rounded-lg transition-all duration-200">
                <div className="flex items-center space-x-2">
                  <Flame size={16} />
                  <span>HOT GAMES</span>
                </div>
              </TabsTrigger>
              <TabsTrigger value="friends_list" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-orange-600 data-[state=active]:text-white text-gray-700 dark:text-gray-300 rounded-lg transition-all duration-200">
                <div className="flex items-center space-x-2">
                  <Users size={16} />
                  <span>FRIENDS</span>
                  <span className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs px-1.5 py-0.5 rounded-full">{friendsCount}</span>
                </div>
              </TabsTrigger>
              <TabsTrigger value="billings" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-orange-600 data-[state=active]:text-white text-gray-700 dark:text-gray-300 rounded-lg transition-all duration-200">
                <div className="flex items-center space-x-2">
                  <CreditCard size={16} />
                  <span>BILLING</span>
                </div>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6 animate-in slide-in-from-right-1/4 duration-500">
              <div className="backdrop-blur-sm bg-white/30 dark:bg-gray-800/30 rounded-xl p-1">
                <ActiveSessionSection />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-6">
                  <div className="backdrop-blur-sm bg-white/30 dark:bg-gray-800/30 rounded-xl p-1">
                    <LastHostedSection />
                  </div>
                  <div className="backdrop-blur-sm bg-white/30 dark:bg-gray-800/30 rounded-xl p-1">
                    <LastPlayedSection />
                  </div>
                </div>
                <div className="md:col-span-1 space-y-6">
                  <div className="backdrop-blur-sm bg-white/30 dark:bg-gray-800/30 rounded-xl p-1">
                    <SocialSection />
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="stats" className="space-y-6 animate-in slide-in-from-right-1/4 duration-500">
              <div className="backdrop-blur-sm bg-white/30 dark:bg-gray-800/30 rounded-xl p-6">
                <Tabs defaultValue="hostingStats" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 bg-white/50 dark:bg-gray-700/50 p-1 rounded-xl mb-4 border border-gray-200/50 dark:border-gray-700/50">
                    <TabsTrigger value="hostingStats" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-orange-600 data-[state=active]:text-white text-gray-700 dark:text-gray-300 rounded-lg">Hosting Stats</TabsTrigger>
                    <TabsTrigger value="playerStats" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-orange-600 data-[state=active]:text-white text-gray-700 dark:text-gray-300 rounded-lg">Player Stats</TabsTrigger>
                  </TabsList>
                  <TabsContent value="hostingStats">
                    <HostingStatsSection />
                  </TabsContent>
                  <TabsContent value="playerStats">
                    <PlayerStatsSection />
                  </TabsContent>
                </Tabs>
              </div>
            </TabsContent>

            <TabsContent value="hot_games" className="animate-in slide-in-from-right-1/4 duration-500">
              <div className="backdrop-blur-sm bg-white/30 dark:bg-gray-800/30 rounded-xl p-1">
                <HotGamesSection />
              </div>
            </TabsContent>

            <TabsContent value="friends_list" className="animate-in slide-in-from-right-1/4 duration-500">
              <div className="backdrop-blur-sm bg-white/30 dark:bg-gray-800/30 rounded-xl p-6">
                <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Friends List</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* Friend cards will be rendered here */}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="billings" className="animate-in slide-in-from-right-1/4 duration-500">
              <div className="backdrop-blur-sm bg-white/30 dark:bg-gray-800/30 rounded-xl p-6">
                <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Billing & Subscriptions</h2>
                <BillingsSection />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
} 