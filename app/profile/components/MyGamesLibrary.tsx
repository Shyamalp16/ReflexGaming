"use client";

import { useState, useMemo, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Search, Gamepad2, Library, Star, Settings2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface GameEntry {
  id: string;
  name: string;
  isHostEnabled: boolean;
  platform: string;
  isActive: boolean;
  coverArt: string;
}

// Placeholder game data - replace with actual data source and fetching
const ALL_AVAILABLE_GAMES: GameEntry[] = Array.from({ length: 15 }, (_, i) => ({
  id: `game-${i + 1}`,
  name: `Awesome Game Title ${i + 1} With A Potentially Long Name That Needs Ellipsis`,
  isHostEnabled: i < 3, // Make first 3 enabled by default for example
  platform: 'PC',
  isActive: true,
  coverArt: '/images/placeholder/cyberpunk.jpg',
}));

export const MyGamesLibrary = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [games, setGames] = useState<GameEntry[]>(ALL_AVAILABLE_GAMES.slice(0, 3)); // Show top 3 initially
  const [showAll, setShowAll] = useState(false); // Not used currently, but could be for a "View All" button

  const filteredGames = useMemo(() => {
    if (!searchTerm) {
      // If no search term, userGames is the source (could be their full library or a pre-filtered list)
      return ALL_AVAILABLE_GAMES;
    }
    // If there is a search term, filter from the user's games
    return ALL_AVAILABLE_GAMES.filter(game => 
      game.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [ALL_AVAILABLE_GAMES, searchTerm]);

  // Effect to update displayed games when filter changes, still respecting the top 3 limit
  useEffect(() => {
    setGames(filteredGames.slice(0,3));
  }, [filteredGames]);

  const handleToggleHostEnabled = (gameId: string, isEnabled: boolean) => {
    setGames(prevGames => 
      prevGames.map(game => 
        game.id === gameId ? { ...game, isHostEnabled: isEnabled } : game
      )
    );
    // Here you would also make an API call to save this preference
    console.log(`Game ${gameId} hosting ${isEnabled ? 'enabled' : 'disabled'}`);
  };

  const toggleGameActive = (id: string) => {
    // This would typically update backend state
    // For demo, just updating local state temporarily
    const updatedGames = ALL_AVAILABLE_GAMES.map(g => g.id === id ? { ...g, isActive: !g.isActive } : g);
    // Note: This local update to `ALL_AVAILABLE_GAMES` won't persist or reflect globally unless `ALL_AVAILABLE_GAMES` is managed by a higher state or context.
    // To see the change reflected in the displayed list, you might need to re-filter/re-slice from the updated `ALL_AVAILABLE_GAMES`.
    // For simplicity, this example won't immediately show the toggle change. 
    // A more robust solution would involve updating the source `ALL_AVAILABLE_GAMES` state or re-fetching.
    console.log(`Toggled game ${id}`);
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeInOut", delay: 0.1 } },
  };

  const listItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.08, duration: 0.3, ease: "easeOut" },
    }),
  };

  return (
    <motion.div 
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="bg-white dark:bg-slate-800/40 backdrop-blur-md rounded-xl border border-gray-200 dark:border-slate-700/80 shadow-lg dark:shadow-2xl p-6"
    >
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center">
          <Library size={22} className="mr-2.5 text-purple-600 dark:text-teal-400" />
          My Games Library
        </h2>
        {/* Could add a settings/filter icon here */}
        {/* <Settings2 size={18} className="text-slate-500 hover:text-teal-400 transition-colors cursor-pointer" /> */}
      </div>

      <div className="relative mb-5">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-500" />
        <Input 
          type="text"
          placeholder="Search games..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 dark:bg-slate-700/50 border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:focus:ring-teal-500 focus:border-purple-500 dark:focus:border-teal-500 text-gray-700 dark:text-slate-200 placeholder-gray-400 dark:placeholder-slate-500"
        />
      </div>

      {games.length > 0 ? (
        <div className="space-y-3 min-h-[210px]"> 
          {games.map((game, index) => (
            <motion.div 
              key={game.id} 
              custom={index} 
              variants={listItemVariants} 
              initial="hidden"
              animate="visible"
              className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-700/30 hover:bg-gray-100 dark:hover:bg-slate-700/60 rounded-lg border border-gray-200 dark:border-slate-600/50 transition-all duration-200 group"
            >
              <div className="flex items-center space-x-3 min-w-0">
                <Gamepad2 size={20} className="text-purple-600 dark:text-teal-400 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-700 dark:text-slate-200 truncate group-hover:text-purple-600 dark:group-hover:text-teal-300">{game.name}</p>
                  <p className="text-xs text-gray-500 dark:text-slate-400">{game.platform}</p>
                </div>
              </div>
              <Switch 
                checked={game.isHostEnabled}
                onCheckedChange={(checked) => handleToggleHostEnabled(game.id, checked)}
                className="data-[state=checked]:bg-purple-600 dark:data-[state=checked]:bg-teal-500 data-[state=unchecked]:bg-gray-300 dark:data-[state=unchecked]:bg-slate-600 ml-2 flex-shrink-0"
              />
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500 dark:text-slate-500 min-h-[210px] flex flex-col justify-center items-center">
          <Gamepad2 size={36} className="mb-3 opacity-50" />
          <p className="text-sm">No games found matching your search.</p>
        </div>
      )}
      {/* Removed "View All" button for now, as we only show top 3 */}
    </motion.div>
  );
}; 