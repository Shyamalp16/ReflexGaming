"use client";

import Image from 'next/image';
import { CalendarDays, Hourglass, PlayCircle } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface PlayedGameCardProps {
  game: {
    id: string;
    name: string;
    imageUrl: string;
    lastPlayedDate: string;
    hoursLogged: string;
  };
}

const PlayedGameCard = ({ game }: PlayedGameCardProps) => (
  <div className="group relative bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
    <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    <div className="relative w-full h-40">
      <Image 
        src={game.imageUrl} 
        alt={game.name} 
        layout="fill" 
        objectFit="cover" 
        className="group-hover:scale-105 transition-transform duration-300"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      <h4 className="absolute bottom-2 left-3 right-3 text-lg font-semibold text-white truncate">
        {game.name}
      </h4>
    </div>
    <div className="p-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
            <CalendarDays size={14} className="mr-1.5" /> Last Played
          </p>
          <p className="text-base font-semibold text-sky-600 dark:text-sky-400">
            {game.lastPlayedDate}
          </p>
        </div>
        <div className="space-y-1">
          <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
            <Hourglass size={14} className="mr-1.5" /> Time Played
          </p>
          <p className="text-base font-semibold text-teal-600 dark:text-teal-400">
            {game.hoursLogged}
          </p>
        </div>
      </div>
    </div>
  </div>
);

export const LastPlayedSection = () => {
  // Placeholder data - replace with actual data fetching
  const lastPlayedGames = [
    {
      id: "1",
      name: "Cyberpunk 2077",
      imageUrl: "/placeholder-game1.jpg",
      lastPlayedDate: "2h ago",
      hoursLogged: "23h 45m"
    },
    {
      id: "2",
      name: "Elden Ring",
      imageUrl: "/placeholder-game2.jpg",
      lastPlayedDate: "Yesterday",
      hoursLogged: "158h 20m"
    },
    {
      id: "3",
      name: "Baldur's Gate 3",
      imageUrl: "/placeholder-game3.jpg",
      lastPlayedDate: "3 days ago",
      hoursLogged: "42h 15m"
    }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
          <PlayCircle size={20} className="mr-2 text-orange-500" />
          Last Played Games
        </h3>
        <Button variant="ghost" size="sm" className="text-orange-500 hover:text-orange-600 dark:text-orange-400 dark:hover:text-orange-500">
          View All
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lastPlayedGames.map(game => (
          <PlayedGameCard key={game.id} game={game} />
        ))}
      </div>
    </div>
  );
}; 