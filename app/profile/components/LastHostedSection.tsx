"use client";

import Image from 'next/image';
import { CalendarDays, Users, Monitor, PlayCircle, ChevronRight, ChevronLeft, Gamepad2, ExternalLink, Eye, BarChart, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Badge } from "@/components/ui/badge";
import { useRouter } from 'next/navigation';

interface HostedGame {
    id: string;
    name: string;
    imageUrl: string;
    lastHostedDate: string;
    playersServed: string;
  genre?: string; // Optional
}

interface HostedGameCardProps {
  game: HostedGame;
}

const HostedGameCard = ({ game }: HostedGameCardProps) => (
  <motion.div 
    key={game.id}
    initial={{ opacity: 0, x: 50 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -50 }}
    transition={{ duration: 0.3, ease: "easeInOut" }}
    className="group relative bg-slate-800/50 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:bg-slate-700/70 border border-slate-700/80 hover:border-teal-500/50 w-full"
  >
    <div className="relative w-full h-44 sm:h-48 md:h-56">
      <Image 
        src={game.imageUrl} 
        alt={game.name} 
        layout="fill" 
        objectFit="cover" 
        className="group-hover:scale-105 transition-transform duration-300 ease-in-out"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
      {game.genre && (
        <span className="absolute top-2 right-2 bg-teal-500/80 text-white text-xs font-semibold px-2.5 py-1 rounded-full backdrop-blur-sm shadow">{game.genre}</span>
      )}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h4 className="text-lg font-bold text-white truncate group-hover:text-teal-300 transition-colors">
        {game.name}
      </h4>
      </div>
    </div>
    <div className="p-5 space-y-3">
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center text-slate-400">
          <CalendarDays size={15} className="mr-2 text-cyan-400" /> 
          <span>Last Hosted:</span>
        </div>
        <span className="font-semibold text-slate-200">{game.lastHostedDate}</span>
      </div>
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center text-slate-400">
          <Users size={15} className="mr-2 text-cyan-400" /> 
          <span>Players Served:</span>
        </div>
        <span className="font-semibold text-slate-200">{game.playersServed}</span>
      </div>
      <Button variant="outline" size="sm" className="w-full mt-2 border-teal-500/60 text-teal-400 hover:bg-teal-500/10 hover:text-teal-300 hover:border-teal-400 transition-all group-hover:border-teal-400">
        <>
          View Details <ChevronRight size={16} className="ml-1.5" />
        </>
      </Button>
    </div>
  </motion.div>
);

// Dummy data for last hosted games
const lastHostedGamesData = [
  {
    id: "lh1",
    name: "Cosmic Frontiers MMO",
    genre: "Sci-Fi MMO",
    imageUrl: "/images/placeholder/cosmic-frontiers.jpg", // Replace with actual image path
    lastPlayed: "Yesterday",
    totalHours: 120,
    avgViewers: 150,
    peakViewers: 350,
    uniqueChatters: 85,
    sessionLink: "/session/lh1"
  },
  {
    id: "lh2",
    name: "Valheim - Viking Survival",
    genre: "Survival Crafting",
    imageUrl: "/images/placeholder/valheim.jpg",
    lastPlayed: "3 days ago",
    totalHours: 85,
    avgViewers: 90,
    peakViewers: 210,
    uniqueChatters: 60,
    sessionLink: "/session/lh2"
  },
  {
    id: "lh3",
    name: "Age of Empires IV - Ranked",
    genre: "RTS",
    imageUrl: "/images/placeholder/aoe4.jpg",
    lastPlayed: "Last week",
    totalHours: 250,
    avgViewers: 220,
    peakViewers: 480,
    uniqueChatters: 130,
    sessionLink: "/session/lh3"
  },
  {
    id: "lh4",
    name: "Cyberpunk 2077 - Phantom Liberty",
    genre: "Action RPG",
    imageUrl: "/images/placeholder/cyberpunk.jpg",
    lastPlayed: "2 weeks ago",
    totalHours: 95,
    avgViewers: 180,
    peakViewers: 400,
    uniqueChatters: 110,
    sessionLink: "/session/lh4"
  },
];

export const LastHostedSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [games, setGames] = useState(lastHostedGamesData);
  const router = useRouter();

  // Ensure we always have at least 2 games for the dual display or show empty state.
  // For simplicity in this example, we'll filter to an even number or handle odd numbers gracefully.
  // A more robust solution might involve duplicating the last item or adjusting the view.
  const displayableGames = games.length >= 2 ? games : [];

  if (displayableGames.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        className="bg-white dark:bg-slate-800/40 backdrop-blur-md rounded-xl border border-gray-200 dark:border-slate-700/80 shadow-lg dark:shadow-2xl p-6 text-center"
      >
        <Gamepad2 size={36} className="mx-auto text-gray-400 dark:text-slate-500 mb-3 opacity-70" />
        <h3 className="text-lg font-semibold text-gray-700 dark:text-slate-200 mb-1">No Recently Hosted Games</h3>
        <p className="text-sm text-gray-500 dark:text-slate-400">Start hosting a game to see your history here.</p>
      </motion.div>
    );
  }
  
  const gamesPerPage = 2;
  // Calculate the games to display for the current pair
  const currentGames = displayableGames.slice(currentIndex, currentIndex + gamesPerPage);

  const nextGames = () => {
    setCurrentIndex((prevIndex) => {
      const nextIdx = prevIndex + gamesPerPage;
      return nextIdx >= displayableGames.length ? 0 : nextIdx;
    });
  };

  const prevGames = () => {
    setCurrentIndex((prevIndex) => {
      const prevIdx = prevIndex - gamesPerPage;
      return prevIdx < 0 ? Math.max(0, displayableGames.length - gamesPerPage) : prevIdx;
    });
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeInOut", delay: 0.2 } },
  };

  const slideTransition = {
    type: "spring",
    stiffness: 300,
    damping: 30,
    duration: 0.3
  };
  
  const itemVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 30 : -30,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 30 : -30,
      opacity: 0,
      scale: 0.95
    })
  };

  const [direction, setDirection] = useState(0); // 0 for initial, 1 for next, -1 for prev

  const handleNavigation = (newDirection: number) => {
    setDirection(newDirection);
    if (newDirection > 0) nextGames();
    else prevGames();
  };

  return (
    <motion.div 
      variants={cardVariants} initial="hidden" animate="visible"
      className="bg-white dark:bg-slate-800/40 backdrop-blur-md rounded-xl border border-gray-200 dark:border-slate-700/80 shadow-lg dark:shadow-2xl p-6 relative overflow-hidden min-h-[450px] flex flex-col"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">Recently Hosted Games</h2>
        <Button variant="ghost" size="sm" className="text-purple-600 hover:text-pink-700 dark:text-teal-400 dark:hover:text-teal-300">
            View All <ArrowRight size={16} className="ml-1.5" />
        </Button>
      </div>

      <div className="flex-grow flex flex-col justify-center items-center relative">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex} // Key now represents the start index of the pair
            custom={direction}
            variants={itemVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={slideTransition}
            className="w-full flex gap-4 justify-center" // Use flex to display cards side-by-side
          >
            {currentGames.map((game) => (
              <div key={game.id} className="w-full sm:w-1/2 max-w-sm"> {/* Adjust width for two cards */}
                <div className="bg-gray-50 dark:bg-slate-700/50 rounded-lg shadow-md dark:shadow-xl border border-gray-200 dark:border-slate-600/70 overflow-hidden group transition-all duration-300 hover:shadow-lg dark:hover:shadow-slate-600/50 h-full flex flex-col">
                  <div className="relative h-40 w-full"> {/* Slightly reduced height */}
                    <Image src={game.imageUrl} alt={game.name} layout="fill" objectFit="cover" className="transition-transform duration-300 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
                    <Badge className="absolute top-2 right-2 bg-purple-500 dark:bg-teal-500 text-white text-xs border-none shadow-sm">{game.genre}</Badge>
                  </div>
                  <div className="p-4 flex flex-col flex-grow"> {/* Adjusted padding & flex for content */}
                    <h3 className="text-base font-semibold text-gray-800 dark:text-white mb-1 truncate" title={game.name}>{game.name}</h3>
                    <p className="text-xs text-gray-500 dark:text-slate-400 mb-2">Last Hosted: {game.lastPlayed}</p>
                    
                    <div className="grid grid-cols-1 gap-2 text-xs mb-3"> {/* Single column for smaller cards */}
                        {[  { icon: Eye, label: "Avg Viewers", value: game.avgViewers },
                            { icon: Users, label: "Peak Viewers", value: game.peakViewers },
                            { icon: BarChart, label: "Total Hours", value: `${game.totalHours} hrs` },
                            { icon: Users, label: "Chatters", value: game.uniqueChatters }].map(item => (
                          <div key={item.label} className="flex items-center text-gray-600 dark:text-slate-300">
                            <item.icon size={12} className="mr-1.5 text-purple-500 dark:text-teal-400 opacity-80" /> {/* Smaller icon */}
                            <span>{item.label}: <span className="font-medium text-gray-700 dark:text-slate-200">{item.value}</span></span>
                          </div>
                        ))}
                    </div>

                    <Button 
                      className="mt-auto w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 dark:from-teal-500 dark:to-cyan-500 dark:hover:from-teal-600 dark:hover:to-cyan-600 text-white text-sm font-semibold shadow-md hover:shadow-lg transform hover:scale-105 transition-all group"
                      onClick={() => game.sessionLink && router.push(game.sessionLink)} // Basic navigation for now
                    >
                        <span>
                          View Session
                          <ExternalLink size={14} className="ml-1.5 opacity-80 group-hover:opacity-100 transition-opacity"/>
                        </span>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
        
        {displayableGames.length > gamesPerPage && (
          <>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => handleNavigation(-1)} 
              className="absolute left-0 sm:-left-2 top-1/2 -translate-y-1/2 z-10 bg-white/70 dark:bg-slate-800/70 hover:bg-white dark:hover:bg-slate-700 border-gray-300 dark:border-slate-600 text-gray-700 dark:text-slate-200 shadow-md hover:scale-105 transition-all"
              aria-label="Previous game"
            >
              <ChevronLeft size={22} />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => handleNavigation(1)} 
              className="absolute right-0 sm:-right-2 top-1/2 -translate-y-1/2 z-10 bg-white/70 dark:bg-slate-800/70 hover:bg-white dark:hover:bg-slate-700 border-gray-300 dark:border-slate-600 text-gray-700 dark:text-slate-200 shadow-md hover:scale-105 transition-all"
              aria-label="Next game"
            >
              <ChevronRight size={22} />
            </Button>
          </>
        )}
      </div>
    </motion.div>
  );
}; 