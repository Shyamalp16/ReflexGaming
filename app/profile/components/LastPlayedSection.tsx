"use client";

import Image from 'next/image';
import { CalendarDays, Hourglass, PlayCircle, ChevronRight, ChevronLeft, Gamepad2, ExternalLink, Star, Clock, Zap, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Badge } from "@/components/ui/badge";

interface PlayedGame {
  id: string;
  name: string;
  imageUrl: string;
  lastPlayedDate: string;
  hoursLogged: string;
  genre?: string; // Optional
  achievements: string;
  gameHubLink: string;
}

interface PlayedGameCardProps {
  game: PlayedGame;
}

const PlayedGameCard = ({ game }: PlayedGameCardProps) => (
  <motion.div 
    key={game.id}
    initial={{ opacity: 0, x: 50 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -50 }}
    transition={{ duration: 0.3, ease: "easeInOut" }}
    className="group relative bg-slate-800/50 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:bg-slate-700/70 border border-slate-700/80 hover:border-sky-500/50 w-full"
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
        <span className="absolute top-2 right-2 bg-sky-500/80 text-white text-xs font-semibold px-2.5 py-1 rounded-full backdrop-blur-sm shadow">{game.genre}</span>
      )}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h4 className="text-lg font-bold text-white truncate group-hover:text-sky-300 transition-colors">
          {game.name}
        </h4>
      </div>
    </div>
    <div className="p-5 space-y-3">
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center text-slate-400">
          <CalendarDays size={15} className="mr-2 text-cyan-400" /> 
          <span>Last Played:</span>
        </div>
        <span className="font-semibold text-slate-200">{game.lastPlayedDate}</span>
      </div>
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center text-slate-400">
          <Hourglass size={15} className="mr-2 text-cyan-400" /> 
          <span>Time Played:</span>
        </div>
        <span className="font-semibold text-slate-200">{game.hoursLogged}</span>
      </div>
      <Button variant="outline" size="sm" className="w-full mt-2 border-sky-500/60 text-sky-400 hover:bg-sky-500/10 hover:text-sky-300 hover:border-sky-400 transition-all group-hover:border-sky-400">
        Game Hub <ChevronRight size={16} className="ml-1.5" />
      </Button>
    </div>
  </motion.div>
);

// Dummy data for last played games
const lastPlayedGamesData = [
  {
    id: "lp1",
    name: "Helldivers 2 - Galactic War",
    genre: "Co-op Shooter",
    imageUrl: "/images/placeholder/helldivers2.jpg", // Replace with actual image path
    lastPlayed: "2 hours ago",
    totalHours: 45,
    achievements: "15/50",
    gameHubLink: "/games/helldivers2"
  },
  {
    id: "lp2",
    name: "Elden Ring - Shadow of the Erdtree",
    genre: "Action RPG",
    imageUrl: "/images/placeholder/eldenring.jpg",
    lastPlayed: "Yesterday",
    totalHours: 180,
    achievements: "75%",
    gameHubLink: "/games/eldenring"
  },
  {
    id: "lp3",
    name: "Stardew Valley - Year 5 Farm",
    genre: "Farming Sim",
    imageUrl: "/images/placeholder/stardew.jpg",
    lastPlayed: "5 days ago",
    totalHours: 300,
    achievements: "Master Farmer",
    gameHubLink: "/games/stardew"
  },
  {
    id: "lp4",
    name: "Baldur's Gate 3 - Honour Mode",
    genre: "CRPG",
    imageUrl: "/images/placeholder/bg3.jpg", // Replace with actual image path
    lastPlayed: "1 week ago",
    totalHours: 250,
    achievements: "Golden Dice",
    gameHubLink: "/games/baldursgate3"
  }
];

export const LastPlayedSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [games, setGames] = useState(lastPlayedGamesData);

  const displayableGames = games.length >= 2 ? games : [];

  if (displayableGames.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
        className="bg-white dark:bg-slate-800/40 backdrop-blur-md rounded-xl border border-gray-200 dark:border-slate-700/80 shadow-lg dark:shadow-2xl p-6 text-center"
      >
        <Gamepad2 size={36} className="mx-auto text-gray-400 dark:text-slate-500 mb-3 opacity-70" />
        <h3 className="text-lg font-semibold text-gray-700 dark:text-slate-200 mb-1">No Recently Played Games</h3>
        <p className="text-sm text-gray-500 dark:text-slate-400">Play a game to see your history here.</p>
      </motion.div>
    );
  }
  
  const gamesPerPage = 2;
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
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeInOut", delay: 0.25 } }, // Slightly later delay than hosted
  };

  const slideTransition = {
    type: "spring",
    stiffness: 300,
    damping: 30,
    duration: 0.3
  };
  
  const itemVariants = {
    enter: (direction: number) => ({ x: direction > 0 ? 30 : -30, opacity: 0, scale: 0.95 }),
    center: { zIndex: 1, x: 0, opacity: 1, scale: 1 },
    exit: (direction: number) => ({ zIndex: 0, x: direction < 0 ? 30 : -30, opacity: 0, scale: 0.95 })
  };
  
  const [direction, setDirection] = useState(0);

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
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">Recently Played Games</h2>
        <Button variant="ghost" size="sm" className="text-purple-600 hover:text-pink-700 dark:text-sky-400 dark:hover:text-sky-300">
            View All <ArrowRight size={16} className="ml-1.5" />
        </Button>
      </div>

      <div className="flex-grow flex flex-col justify-center items-center relative">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex} 
            custom={direction}
            variants={itemVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={slideTransition}
            className="w-full flex gap-4 justify-center"
          >
            {currentGames.map((game) => (
              <div key={game.id} className="w-full sm:w-1/2 max-w-sm">
                <div className="bg-gray-50 dark:bg-slate-700/50 rounded-lg shadow-md dark:shadow-xl border border-gray-200 dark:border-slate-600/70 overflow-hidden group transition-all duration-300 hover:shadow-lg dark:hover:shadow-slate-600/50 h-full flex flex-col">
                  <div className="relative h-40 w-full">
                    <Image src={game.imageUrl} alt={game.name} layout="fill" objectFit="cover" className="transition-transform duration-300 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
                    <Badge className="absolute top-2 right-2 bg-purple-500 dark:bg-sky-500 text-white text-xs border-none shadow-sm">{game.genre}</Badge>
                  </div>
                  <div className="p-4 flex flex-col flex-grow">
                    <h3 className="text-base font-semibold text-gray-800 dark:text-white mb-1 truncate" title={game.name}>{game.name}</h3>
                    <p className="text-xs text-gray-500 dark:text-slate-400 mb-2">Last Played: {game.lastPlayed}</p>
                    
                    <div className="grid grid-cols-1 gap-2 text-xs mb-3">
                        {[  { icon: Clock, label: "Time Played", value: `${game.totalHours} hrs` },
                            { icon: Star, label: "Achievements", value: game.achievements },
                            { icon: Zap, label: "Avg Session", value: "2.5 hrs" }, 
                            { icon: Gamepad2, label: "Platform", value: "PC" }].map(item => (
                          <div key={item.label} className="flex items-center text-gray-600 dark:text-slate-300">
                            <item.icon size={12} className="mr-1.5 text-purple-500 dark:text-sky-400 opacity-80" />
                            <span>{item.label}: <span className="font-medium text-gray-700 dark:text-slate-200">{item.value}</span></span>
                          </div>
                        ))}
                    </div>
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