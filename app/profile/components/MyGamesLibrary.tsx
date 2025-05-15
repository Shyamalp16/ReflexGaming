"use client";

import { useState, useMemo } from 'react';
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
// import { ScrollArea } from "@/components/ui/scroll-area"; // ScrollArea removed
import { Search } from 'lucide-react';

interface GameEntry {
  id: string;
  name: string;
  isHostEnabled: boolean;
}

// Placeholder game data - replace with actual data source and fetching
const ALL_AVAILABLE_GAMES: GameEntry[] = Array.from({ length: 15 }, (_, i) => ({
  id: `game-${i + 1}`,
  name: `Awesome Game Title ${i + 1}`,
  isHostEnabled: i < 3, // Make first 3 enabled by default for example
}));

export const MyGamesLibrary = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [userGames, setUserGames] = useState<GameEntry[]>(ALL_AVAILABLE_GAMES); // This represents the user's full library

  const filteredGames = useMemo(() => {
    if (!searchTerm) {
      // If no search term, userGames is the source (could be their full library or a pre-filtered list)
      return userGames;
    }
    // If there is a search term, filter from the user's games
    return userGames.filter(game => 
      game.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [userGames, searchTerm]);

  // Always display up to 3 games from the (potentially filtered) list
  const displayedGames = filteredGames.slice(0, 3);

  const handleToggleHostEnabled = (gameId: string, isEnabled: boolean) => {
    setUserGames(prevGames => 
      prevGames.map(game => 
        game.id === gameId ? { ...game, isHostEnabled: isEnabled } : game
      )
    );
    // Here you would also make an API call to save this preference
    console.log(`Game ${gameId} hosting ${isEnabled ? 'enabled' : 'disabled'}`);
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">My Games Library</h3>
      <div className="relative">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-gray-400" />
        <Input 
          type="search"
          placeholder="Search your games..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-8 w-full bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:border-orange-500 dark:focus:border-orange-500"
        />
      </div>
      
      {/* Container for game entries, max 3 will be shown */} 
      <div className="space-y-3 min-h-[150px]"> {/* Added min-height to prevent collapse when empty search */}
        {displayedGames.length > 0 ? (
          displayedGames.map(game => (
            <div 
              key={game.id} 
              className="flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-700/60 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <Label htmlFor={`toggle-${game.id}`} className="text-sm font-medium text-gray-800 dark:text-gray-200 cursor-pointer truncate pr-2">
                {game.name}
              </Label>
              <Switch 
                id={`toggle-${game.id}`}
                checked={game.isHostEnabled}
                onCheckedChange={(checked) => handleToggleHostEnabled(game.id, checked)}
                aria-label={`Toggle hosting for ${game.name}`}
              />
            </div>
          ))
        ) : (
          searchTerm ? (
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">
              No games found matching "{searchTerm}".
            </p>
          ) : (
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">
              Your game library is currently empty or no games match the initial view.
            </p>
          )
        )}
      </div>
      {/* TODO: Add functionality/UI for adding games to this library if not automatically populated */}
    </div>
  );
}; 