"use client";

import { 
  Clock, 
  Trophy, 
  Target, 
  Gamepad2, 
  TrendingUp,
  Users,
  Crown,
  Medal,
  BarChart4,
  Percent,
  Star,
  TrendingDown,
  CalendarDays,
  ListFilter,
  ShieldCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend?: string;
  description?: string;
}

const StatCard = ({ title, value, icon, trend, description }: StatCardProps) => (
  <motion.div 
    whileHover={{ scale: 1.02 }}
    transition={{ type: "spring", stiffness: 300 }}
    className="bg-gradient-to-br from-white/10 to-white/5 dark:from-gray-800/90 dark:to-gray-800/50 rounded-xl p-6 
    shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-sm border border-white/10 
    hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)] transition-all duration-300"
  >
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{title}</p>
        <h3 className="text-3xl font-bold mt-2 text-gray-900 dark:text-white tracking-tight">{value}</h3>
        {description && (
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 font-medium">{description}</p>
        )}
      </div>
      <div className="text-orange-500 dark:text-orange-400 bg-orange-500/10 p-3 rounded-xl">
        {icon}
      </div>
    </div>
    {trend && (
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-3 flex items-center text-xs bg-green-500/10 w-fit px-2 py-1 rounded-full"
      >
        <TrendingUp size={14} className="text-green-500 mr-1" />
        <span className="text-green-500 font-medium">{trend}</span>
      </motion.div>
    )}
  </motion.div>
);

// Dummy data - replace with actual data source
const playerData = {
  lifetime: {
    gamesPlayed: 320,
    hoursPlayed: 1250.5,
    winRate: 62.5,
    favoriteGame: "Helldivers 2",
    favoriteGenre: "Co-op Shooter",
    achievementsUnlocked: 158,
    currentRank: "Diamond III",
    longestSession: 8.2, // hours
    friendsPlayedWith: 42,
  },
  last30days: {
    gamesPlayed: 45,
    hoursPlayed: 88.0,
    winRate: 68.2,
    favoriteGame: "Elden Ring",
    favoriteGenre: "Action RPG",
    achievementsUnlocked: 15,
    currentRank: "Diamond III", // Assuming rank doesn't change much in 30 days for example
    longestSession: 6.5,
    friendsPlayedWith: 12,
  },
  last7days: {
    gamesPlayed: 12,
    hoursPlayed: 25.7,
    winRate: 71.0,
    favoriteGame: "Stardew Valley",
    favoriteGenre: "Farming Sim",
    achievementsUnlocked: 5,
    currentRank: "Diamond III",
    longestSession: 4.0,
    friendsPlayedWith: 5,
  }
};

interface PlayerStatCardProps {
  icon: React.ElementType;
  label: string;
  value: string | number;
  trend?: string;
  trendDirection?: 'up' | 'down' | 'neutral';
  iconColorClass?: string;
  note?: string;
  index: number;
  animate?: boolean;
}

const PlayerStatCard: React.FC<PlayerStatCardProps> = ({ icon: Icon, label, value, trend, trendDirection, iconColorClass = "text-purple-600 dark:text-sky-400", note, index, animate = true }) => {
  let trendIcon = null;
  let trendColor = "text-gray-500 dark:text-slate-500";
  if (trendDirection === 'up') {
    trendIcon = <TrendingUp size={14} className="mr-1" />;
    trendColor = "text-green-500 dark:text-green-400";
  } else if (trendDirection === 'down') {
    trendIcon = <TrendingDown size={14} className="mr-1" />;
    trendColor = "text-red-500 dark:text-red-400";
  }
  
  const motionProps = animate ? {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4, delay: index * 0.07, ease: "easeOut" }
  } : {};

  return (
    <motion.div 
      {...motionProps}
      className="bg-gray-50 dark:bg-slate-700/30 backdrop-blur-sm p-5 rounded-xl shadow-md hover:shadow-lg border border-gray-200 dark:border-slate-600/50 transition-all duration-300 hover:border-purple-500/30 dark:hover:border-sky-500/30 transform hover:-translate-y-0.5"
    >
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm font-medium text-gray-600 dark:text-slate-300 flex items-center">
          <Icon size={18} className={`mr-2.5 ${iconColorClass}`} />
          {label}
        </p>
      </div>
      <p className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-1">{value}</p>
      {trend && (
        <div className={`flex items-center text-xs ${trendColor}`}>
          {trendIcon}
          {trend}
        </div>
      )}
      {note && <p className="text-xs text-gray-400 dark:text-slate-500 mt-1.5">{note}</p>}
    </motion.div>
  );
}

export const PlayerStatsSection = () => {
  const [timeRange, setTimeRange] = useState<keyof typeof playerData>("last30days");
  const currentStats = playerData[timeRange];

  const keyStats: PlayerStatCardProps[] = [
    { index:0, icon: Gamepad2, label: "Games Played", value: currentStats.gamesPlayed, trend: "vs prev. period", trendDirection: 'up' },
    { index:1, icon: Clock, label: "Hours Played", value: `${currentStats.hoursPlayed} hrs`, trend: "+10%", trendDirection: 'up' },
    { index:2, icon: Percent, label: "Win Rate", value: `${currentStats.winRate}%`, trend: "+2.5%", trendDirection: 'up', iconColorClass: "text-green-500 dark:text-green-400" },
  ];

  const favoritesStats: PlayerStatCardProps[] = [
    { index:0, icon: Star, label: "Favorite Game", value: currentStats.favoriteGame, note: `Most hours in ${timeRange.replace("last", "last ")}` },
    { index:1, icon: ListFilter, label: "Favorite Genre", value: currentStats.favoriteGenre },
    { index:2, icon: Users, label: "Friends Played With", value: currentStats.friendsPlayedWith, note: "Unique friends in sessions" },
  ];

  const performanceMetrics: PlayerStatCardProps[] = [
    { index:0, icon: Trophy, label: "Current Rank", value: currentStats.currentRank, iconColorClass: "text-yellow-500 dark:text-yellow-400" },
    { index:1, icon: ShieldCheck, label: "Achievements Unlocked", value: currentStats.achievementsUnlocked, trend: "+5 this period", trendDirection: 'up' },
    { index:2, icon: CalendarDays, label: "Longest Single Session", value: `${currentStats.longestSession} hrs` },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3 sm:mb-0">Your Player Performance</h3>
        <Select value={timeRange} onValueChange={(value) => setTimeRange(value as keyof typeof playerData)}>
          <SelectTrigger className="w-full sm:w-[180px] bg-gray-50 dark:bg-slate-700/50 border-gray-300 dark:border-slate-600 text-gray-700 dark:text-slate-200 focus:ring-purple-500 dark:focus:ring-sky-500">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent className="bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 text-gray-700 dark:text-slate-200">
            <SelectItem value="last7days" className="hover:bg-gray-100 dark:hover:bg-slate-700 focus:bg-gray-100 dark:focus:bg-slate-700">Last 7 Days</SelectItem>
            <SelectItem value="last30days" className="hover:bg-gray-100 dark:hover:bg-slate-700 focus:bg-gray-100 dark:focus:bg-slate-700">Last 30 Days</SelectItem>
            <SelectItem value="lifetime" className="hover:bg-gray-100 dark:hover:bg-slate-700 focus:bg-gray-100 dark:focus:bg-slate-700">Lifetime</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="key_metrics" className="w-full">
        <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 gap-2 bg-gray-100 dark:bg-slate-700/60 p-1.5 rounded-lg mb-6 border border-gray-200 dark:border-slate-600/80">
          <TabsTrigger value="key_metrics" className="profile-stats-tab data-[state=active]:bg-white dark:data-[state=active]:bg-slate-600 data-[state=active]:shadow-md">Key Metrics</TabsTrigger>
          <TabsTrigger value="favorites" className="profile-stats-tab data-[state=active]:bg-white dark:data-[state=active]:bg-slate-600 data-[state=active]:shadow-md">Gameplay Style</TabsTrigger>
          <TabsTrigger value="achievements_rank" className="profile-stats-tab data-[state=active]:bg-white dark:data-[state=active]:bg-slate-600 data-[state=active]:shadow-md">Rank & Milestones</TabsTrigger>
        </TabsList>

        <AnimatePresence mode="wait">
          <motion.div
            key={timeRange + "_player_stats"} // Ensure re-render on timeRange change
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <TabsContent value="key_metrics" className="outline-none">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {keyStats.map((stat, idx) => <PlayerStatCard key={stat.label + idx} {...stat} index={idx} />)}
              </div>
            </TabsContent>

            <TabsContent value="favorites" className="outline-none">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {favoritesStats.map((stat, idx) => <PlayerStatCard key={stat.label + idx} {...stat} index={idx} />)}
              </div>
            </TabsContent>

            <TabsContent value="achievements_rank" className="outline-none">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {performanceMetrics.map((stat, idx) => <PlayerStatCard key={stat.label + idx} {...stat} index={idx} />)}
              </div>
            </TabsContent>
          </motion.div>
        </AnimatePresence>
      </Tabs>

      {/* Example Progress: Overall Profile Completion - can be dynamic */}
      <div className="mt-8 pt-6 border-t border-gray-200 dark:border-slate-700/50">
        <h4 className="text-md font-semibold text-gray-700 dark:text-slate-200 mb-2">Next Rank Progress (Example)</h4>
        <div className="flex items-center mb-1">
          <p className="text-sm text-purple-600 dark:text-sky-400 font-medium">XP: 1250 / 2000</p>
          <p className="text-xs text-gray-500 dark:text-slate-400 ml-auto">{2000 - 1250} XP to go</p> 
        </div>
        <Progress value={(1250 / 2000) * 100} className="w-full h-2.5 [&>div]:bg-gradient-to-r [&>div]:from-purple-500 [&>div]:to-pink-500 dark:[&>div]:from-sky-500 dark:[&>div]:to-blue-500" />
      </div>

    </motion.div>
  );
}; 