"use client";

import { 
  Clock, 
  Trophy, 
  Target, 
  Gamepad2, 
  TrendingUp,
  Users,
  Crown,
  Medal
} from 'lucide-react';
import { motion } from 'framer-motion';

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

export const PlayerStatsSection = () => {
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
          title="Total Play Time"
          value="565h"
          icon={<Clock size={24} />}
          trend="+12.3% vs last month"
        />
        <StatCard
          title="Games Played"
          value="247"
          icon={<Gamepad2 size={24} />}
          description="Across 12 different titles"
        />
        <StatCard
          title="Win Rate"
          value="68%"
          icon={<Trophy size={24} />}
          trend="+5.2% vs last month"
        />
        <StatCard
          title="Peak Concurrent"
          value="1,458"
          icon={<Users size={24} />}
          description="Players hosted simultaneously"
        />
      </div>

      {/* Achievements Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div 
          whileHover={{ scale: 1.01 }}
          className="bg-gradient-to-br from-white/10 to-white/5 dark:from-gray-800/90 dark:to-gray-800/50 
          rounded-xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-sm border border-white/10"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
            <span className="bg-orange-500/10 p-2 rounded-lg mr-3">
              <Crown size={20} className="text-orange-500" />
            </span>
            Top Achievements
          </h3>
          <div className="space-y-4">
            <motion.div 
              whileHover={{ x: 4 }}
              className="flex items-center justify-between p-3 bg-gray-50/5 rounded-lg border border-white/5 
              hover:border-orange-500/20 transition-colors duration-300"
            >
              <div className="flex items-center">
                <Medal className="text-yellow-500 mr-3" size={18} />
                <span className="text-sm text-gray-700 dark:text-gray-200 font-medium">Global Elite Rank</span>
              </div>
              <span className="text-xs text-gray-500 bg-gray-500/10 px-2 py-1 rounded-full">CS2</span>
            </motion.div>
            <motion.div 
              whileHover={{ x: 4 }}
              className="flex items-center justify-between p-3 bg-gray-50/5 rounded-lg border border-white/5 
              hover:border-orange-500/20 transition-colors duration-300"
            >
              <div className="flex items-center">
                <Medal className="text-yellow-500 mr-3" size={18} />
                <span className="text-sm text-gray-700 dark:text-gray-200 font-medium">1000+ Hours Hosted</span>
              </div>
              <span className="text-xs text-gray-500 bg-gray-500/10 px-2 py-1 rounded-full">Platform</span>
            </motion.div>
            <motion.div 
              whileHover={{ x: 4 }}
              className="flex items-center justify-between p-3 bg-gray-50/5 rounded-lg border border-white/5 
              hover:border-orange-500/20 transition-colors duration-300"
            >
              <div className="flex items-center">
                <Medal className="text-yellow-500 mr-3" size={18} />
                <span className="text-sm text-gray-700 dark:text-gray-200 font-medium">Top 1% Host Rating</span>
              </div>
              <span className="text-xs text-gray-500 bg-gray-500/10 px-2 py-1 rounded-full">Community</span>
            </motion.div>
          </div>
        </motion.div>

        <motion.div 
          whileHover={{ scale: 1.01 }}
          className="bg-gradient-to-br from-white/10 to-white/5 dark:from-gray-800/90 dark:to-gray-800/50 
          rounded-xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-sm border border-white/10"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
            <span className="bg-orange-500/10 p-2 rounded-lg mr-3">
              <Target size={20} className="text-orange-500" />
            </span>
            Performance Metrics
          </h3>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-600 dark:text-gray-300 font-medium">Average Session Length</span>
                <span className="text-sm font-semibold text-gray-900 dark:text-white">2.5 hours</span>
              </div>
              <div className="w-full bg-gray-200/10 rounded-full h-2 overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "75%" }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="bg-gradient-to-r from-orange-500 to-orange-400 h-full rounded-full"
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-600 dark:text-gray-300 font-medium">Host Rating</span>
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
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}; 