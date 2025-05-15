"use client";

import { 
  Clock, 
  DollarSign, 
  Users, 
  Award,
  TrendingUp,
  BarChart3,
  Timer,
  Target
} from 'lucide-react';
import { motion } from 'framer-motion';

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

export const HostingStatsSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-8"
    >
      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Hours Hosted"
          value="335h"
          icon={<Clock size={24} />}
          trend="+15.3% vs last month"
        />
        <StatCard
          title="Total Earnings"
          value="$1,245"
          icon={<DollarSign size={24} />}
          description="This month"
        />
        <StatCard
          title="Acceptance Rate"
          value="92%"
          icon={<Target size={24} />}
          trend="+2.5% vs last month"
        />
        <StatCard
          title="Avg. Session"
          value="2.5h"
          icon={<Timer size={24} />}
          description="Per gaming session"
        />
      </div>

      {/* Detailed Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Most Hosted Games */}
        <motion.div 
          whileHover={{ scale: 1.01 }}
          className="bg-gradient-to-br from-white/10 to-white/5 dark:from-gray-800/90 dark:to-gray-800/50 
          rounded-xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-sm border border-white/10"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
            <span className="bg-orange-500/10 p-2 rounded-lg mr-3">
              <Award size={20} className="text-orange-500" />
            </span>
            Most Hosted Games
          </h3>
          <div className="space-y-4">
            {mostHostedGames.map((game, index) => (
              <motion.div 
                key={game.name}
                whileHover={{ x: 4 }}
                className="flex items-center justify-between p-3 bg-gray-50/5 rounded-lg border border-white/5 
                hover:border-orange-500/20 transition-colors duration-300"
              >
                <div className="flex items-center">
                  <span className="text-2xl font-bold text-orange-500/20 mr-4">#{index + 1}</span>
                  <span className="text-sm text-gray-700 dark:text-gray-200 font-medium">{game.name}</span>
                </div>
                <span className="text-sm font-semibold bg-gray-500/10 px-2 py-1 rounded-full">
                  {game.hours}h
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Performance Metrics */}
        <motion.div 
          whileHover={{ scale: 1.01 }}
          className="bg-gradient-to-br from-white/10 to-white/5 dark:from-gray-800/90 dark:to-gray-800/50 
          rounded-xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-sm border border-white/10"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
            <span className="bg-orange-500/10 p-2 rounded-lg mr-3">
              <BarChart3 size={20} className="text-orange-500" />
            </span>
            Performance Metrics
          </h3>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-600 dark:text-gray-300 font-medium">Connection Stability</span>
                <span className="text-sm font-semibold text-gray-900 dark:text-white">99.9%</span>
              </div>
              <div className="w-full bg-gray-200/10 rounded-full h-2 overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "99.9%" }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="bg-gradient-to-r from-orange-500 to-orange-400 h-full rounded-full"
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-600 dark:text-gray-300 font-medium">User Satisfaction</span>
                <span className="text-sm font-semibold text-gray-900 dark:text-white">4.8/5.0</span>
              </div>
              <div className="w-full bg-gray-200/10 rounded-full h-2 overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "96%" }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="bg-gradient-to-r from-orange-500 to-orange-400 h-full rounded-full"
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-600 dark:text-gray-300 font-medium">Peak Hours Utilization</span>
                <span className="text-sm font-semibold text-gray-900 dark:text-white">85%</span>
              </div>
              <div className="w-full bg-gray-200/10 rounded-full h-2 overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "85%" }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="bg-gradient-to-r from-orange-500 to-orange-400 h-full rounded-full"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}; 