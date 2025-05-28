"use client";

import { 
  Clock, 
  DollarSign, 
  Users, 
  Award,
  TrendingUp,
  BarChart3,
  Timer,
  Target,
  TrendingDown,
  AlertCircle,
  CheckCircle2,
  CalendarDays,
  ListChecks,
  Eye,
  RadioTower,
  Gamepad2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";

// Placeholder for charting library integration
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Placeholder data - replace with actual fetched data
const totalHoursData = [
  { name: 'Jan', hours: 30 }, { name: 'Feb', hours: 45 }, { name: 'Mar', hours: 60 },
  { name: 'Apr', hours: 50 }, { name: 'May', hours: 70 }, { name: 'Jun', hours: 80 },
];

const totalEarningsData = [
  { name: 'Jan', earnings: 150 }, { name: 'Feb', earnings: 225 }, { name: 'Mar', earnings: 300 },
  { name: 'Apr', earnings: 250 }, { name: 'May', earnings: 350 }, { name: 'Jun', earnings: 400 },
];

const mostHostedGames = [
  { name: "Dust2 Deathmatch", hours: 210 },
  { name: "Mirage CS2 Server", hours: 120 },
  { name: "Ancient Arena", hours: 75 },
];

const kpiData = {
  lifetime: {
    totalSessions: 127,
    totalHoursHosted: 582.5,
    totalEarnings: 1850.75,
    avgViewers: 85,
    peakViewers: 450,
    uniquePlayersReached: 1250,
    uptimePercentage: 99.8,
    mostPopularGame: "Cosmic Frontiers MMO",
  },
  last30days: {
    totalSessions: 15,
    totalHoursHosted: 75.2,
    totalEarnings: 280.50,
    avgViewers: 110,
    peakViewers: 320,
    uniquePlayersReached: 350,
    uptimePercentage: 99.9,
    mostPopularGame: "Valheim",
  },
  last7days: {
    totalSessions: 5,
    totalHoursHosted: 22.0,
    totalEarnings: 95.00,
    avgViewers: 130,
    peakViewers: 280,
    uniquePlayersReached: 150,
    uptimePercentage: 100,
    mostPopularGame: "Dust2 Pro League",
  }
};

interface StatCardProps {
  icon: React.ElementType;
  label: string;
  value: string | number;
  trend?: string;
  trendDirection?: 'up' | 'down' | 'neutral';
  iconColorClass?: string;
  note?: string;
  index: number;
}

const StatCard: React.FC<StatCardProps> = ({ icon: Icon, label, value, trend, trendDirection, iconColorClass = "text-purple-600 dark:text-teal-400", note, index }) => {
  let trendIcon = null;
  let trendColor = "text-gray-500 dark:text-slate-500";
  if (trendDirection === 'up') {
    trendIcon = <TrendingUp size={14} className="mr-1" />;
    trendColor = "text-green-500 dark:text-green-400";
  } else if (trendDirection === 'down') {
    trendIcon = <TrendingDown size={14} className="mr-1" />;
    trendColor = "text-red-500 dark:text-red-400";
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.07, ease: "easeOut" }}
      className="bg-gray-50 dark:bg-slate-700/30 backdrop-blur-sm p-5 rounded-xl shadow-md hover:shadow-lg border border-gray-200 dark:border-slate-600/50 transition-all duration-300 hover:border-purple-500/30 dark:hover:border-teal-500/30 transform hover:-translate-y-0.5"
    >
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm font-medium text-gray-600 dark:text-slate-300 flex items-center">
          <Icon size={18} className={`mr-2.5 ${iconColorClass}`} />
          {label}
        </p>
        {/* Optional: A small info icon or action here */}
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

export const HostingStatsSection = () => {
  const [timeRange, setTimeRange] = useState<keyof typeof kpiData>("last30days");
  const currentStats = kpiData[timeRange];

  const primaryStats: StatCardProps[] = [
    { index:0, icon: ListChecks, label: "Total Sessions Hosted", value: currentStats.totalSessions, trend: "vs prev. period", trendDirection: 'up' },
    { index:1, icon: Clock, label: "Total Hours Streamed", value: `${currentStats.totalHoursHosted} hrs`, trend: "+5%", trendDirection: 'up' },
    { index:2, icon: DollarSign, label: "Total Earnings", value: `$${currentStats.totalEarnings.toFixed(2)}`, trend: "+12%", trendDirection: 'up', iconColorClass: "text-green-500 dark:text-green-400" },
  ];

  const audienceStats: StatCardProps[] = [
    { index:0, icon: Users, label: "Average Viewers", value: currentStats.avgViewers, trend: "+8%", trendDirection: 'up' },
    { index:1, icon: Eye, label: "Peak Concurrent Viewers", value: currentStats.peakViewers, trend: "-2%", trendDirection: 'down' },
    { index:2, icon: RadioTower, label: "Unique Players Reached", value: currentStats.uniquePlayersReached, note: "Across all sessions" },
  ];

  const performanceStats: StatCardProps[] = [
    { index:0, icon: CheckCircle2, label: "Server Uptime", value: `${currentStats.uptimePercentage}%`, iconColorClass: currentStats.uptimePercentage >= 99.9 ? "text-green-500 dark:text-green-400" : "text-yellow-500 dark:text-yellow-400" },
    { index:1, icon: Gamepad2, label: "Most Popular Game Hosted", value: currentStats.mostPopularGame, note: "Based on hours streamed" },
    { index:2, icon: AlertCircle, label: "Reported Issues", value: 3, trend: "Resolved", trendDirection: 'neutral', iconColorClass: "text-orange-500 dark:text-orange-400" }, // Example static
  ];
  
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3 sm:mb-0">Your Hosting Performance</h3>
        <Select value={timeRange} onValueChange={(value) => setTimeRange(value as keyof typeof kpiData)}>
          <SelectTrigger className="w-full sm:w-[180px] bg-gray-50 dark:bg-slate-700/50 border-gray-300 dark:border-slate-600 text-gray-700 dark:text-slate-200 focus:ring-purple-500 dark:focus:ring-teal-500">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent className="bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 text-gray-700 dark:text-slate-200">
            <SelectItem value="last7days" className="hover:bg-gray-100 dark:hover:bg-slate-700 focus:bg-gray-100 dark:focus:bg-slate-700">Last 7 Days</SelectItem>
            <SelectItem value="last30days" className="hover:bg-gray-100 dark:hover:bg-slate-700 focus:bg-gray-100 dark:focus:bg-slate-700">Last 30 Days</SelectItem>
            <SelectItem value="lifetime" className="hover:bg-gray-100 dark:hover:bg-slate-700 focus:bg-gray-100 dark:focus:bg-slate-700">Lifetime</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="overview_kpis" className="w-full">
        <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 gap-2 bg-gray-100 dark:bg-slate-700/60 p-1.5 rounded-lg mb-6 border border-gray-200 dark:border-slate-600/80">
          <TabsTrigger value="overview_kpis" className="profile-stats-tab data-[state=active]:bg-white dark:data-[state=active]:bg-slate-600 data-[state=active]:shadow-md">Key Metrics</TabsTrigger>
          <TabsTrigger value="audience_insights" className="profile-stats-tab data-[state=active]:bg-white dark:data-[state=active]:bg-slate-600 data-[state=active]:shadow-md">Audience Insights</TabsTrigger>
          <TabsTrigger value="service_quality" className="profile-stats-tab data-[state=active]:bg-white dark:data-[state=active]:bg-slate-600 data-[state=active]:shadow-md">Service Quality</TabsTrigger>
        </TabsList>

        <AnimatePresence mode="wait">
          <motion.div
            key={timeRange + "_overview"} // Ensure re-render on timeRange change
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <TabsContent value="overview_kpis">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {primaryStats.map((stat, idx) => <StatCard key={stat.label} {...stat} index={idx} />)}
              </div>
            </TabsContent>

            <TabsContent value="audience_insights">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {audienceStats.map((stat, idx) => <StatCard key={stat.label} {...stat} index={idx} />)}
              </div>
            </TabsContent>

            <TabsContent value="service_quality">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {performanceStats.map((stat, idx) => <StatCard key={stat.label} {...stat} index={idx} />)}
              </div>
              {currentStats.uptimePercentage < 99.5 && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                  className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-500/10 border border-yellow-300 dark:border-yellow-500/30 rounded-lg text-yellow-700 dark:text-yellow-300 text-sm flex items-center">
                  <AlertCircle size={18} className="mr-2 flex-shrink-0" />
                  Your server uptime is slightly below target. Consider checking server logs or resource usage.
                </motion.div>
              )}
            </TabsContent>
          </motion.div>
        </AnimatePresence>
      </Tabs>
      
      {/* Example of a progress bar, can be adapted for goals */}
      <div className="mt-8 pt-6 border-t border-gray-200 dark:border-slate-700/50">
        <h4 className="text-md font-semibold text-gray-700 dark:text-slate-200 mb-2">Monthly Earnings Goal</h4>
        <div className="flex items-center mb-1">
          <p className="text-sm text-green-600 dark:text-green-400 font-medium">${currentStats.totalEarnings.toFixed(2)}</p>
          <p className="text-xs text-gray-500 dark:text-slate-400 ml-auto">Target: $500</p> 
        </div>
        <Progress value={(currentStats.totalEarnings / 500) * 100} className="w-full h-2.5 [&>div]:bg-gradient-to-r [&>div]:from-purple-500 [&>div]:to-pink-500 dark:[&>div]:from-teal-500 dark:[&>div]:to-cyan-500" />
      </div>

    </motion.div>
  );
}; 