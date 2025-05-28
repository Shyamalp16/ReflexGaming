"use client";

import { Flame, ArrowRight, TrendingUp, Users, Zap } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';
import Image from 'next/image';

interface HotGame {
  id: string;
  name: string;
  imageUrl?: string; // Optional image for the game
  genre: string;
  activePlayers: string;
  trend: string;
  streamers: string;
  // Add other relevant details like current players, genre, etc.
}

const hotGamesData: HotGame[] = [
  {
    id: "hg1",
    name: "Project AVAXIS",
    genre: "Tactical FPS",
    imageUrl: "/images/placeholder/avaxis.jpg",
    activePlayers: "120K+",
    trend: "+15% This Week",
    streamers: "2.1K Streaming",
  },
  {
    id: "hg2",
    name: "Cyber Realms Online",
    genre: "MMORPG",
    imageUrl: "/images/placeholder/cyberrealms.jpg",
    activePlayers: "85K+",
    trend: "New Release!",
    streamers: "1.5K Streaming",
  },
  {
    id: "hg3",
    name: "Speed Kingdom Kart",
    genre: "Kart Racer",
    imageUrl: "/images/placeholder/speedkingdom.jpg",
    activePlayers: "50K+",
    trend: "Tournament Ongoing",
    streamers: "800+ Streaming",
  },
];

export const HotGamesSection = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="bg-white dark:bg-slate-800/40 backdrop-blur-md rounded-xl border border-gray-200 dark:border-slate-700/80 shadow-xl dark:shadow-2xl p-6"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center">
          <Flame size={26} className="mr-3 text-pink-500 dark:text-orange-400" />
          Hot & Trending Games
        </h2>
        <Button variant="ghost" size="sm" className="text-pink-600 hover:text-purple-700 dark:text-orange-400 dark:hover:text-orange-300">
          Discover More <ArrowRight size={16} className="ml-1.5" />
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {hotGamesData.map((game, index) => (
          <motion.div 
            key={game.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
            className="bg-gray-50 dark:bg-slate-700/50 rounded-lg border border-gray-200 dark:border-slate-600/70 shadow-lg hover:shadow-xl dark:hover:shadow-orange-500/20 group overflow-hidden transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="relative h-40 w-full">
              <Image src={game.imageUrl || ''} alt={game.name} layout="fill" objectFit="cover" className="transition-transform duration-300 group-hover:scale-105"/>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent p-3 flex flex-col justify-end">
                <h3 className="text-lg font-semibold text-white shadow-sm truncate" title={game.name}>{game.name}</h3>
                <p className="text-xs text-pink-300 dark:text-orange-300 font-medium bg-black/40 px-1.5 py-0.5 rounded-sm inline-block">{game.genre}</p>
              </div>
            </div>
            <div className="p-4 space-y-2.5">
              <div className="flex items-center text-sm text-gray-600 dark:text-slate-300">
                <Users size={15} className="mr-2 text-pink-500 dark:text-orange-400" /> Active Players: <span className="font-medium text-gray-700 dark:text-slate-200 ml-1">{game.activePlayers}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600 dark:text-slate-300">
                <TrendingUp size={15} className="mr-2 text-green-500" /> Trend: <span className="font-medium text-green-600 dark:text-green-400 ml-1">{game.trend}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600 dark:text-slate-300">
                <Zap size={15} className="mr-2 text-yellow-500 dark:text-yellow-400" /> Streamers: <span className="font-medium text-gray-700 dark:text-slate-200 ml-1">{game.streamers}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}; 