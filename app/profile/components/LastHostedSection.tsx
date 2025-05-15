"use client";

import Image from 'next/image';
import { CalendarDays, Users, Monitor, PlayCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HostedGameCardProps {
  game: {
    id: string;
    name: string;
    imageUrl: string;
    lastHostedDate: string;
    playersServed: string;
  };
}

const HostedGameCard = ({ game }: HostedGameCardProps) => (
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
            <CalendarDays size={14} className="mr-1.5" /> Last Hosted
          </p>
          <p className="text-base font-semibold text-sky-600 dark:text-sky-400">
            {game.lastHostedDate}
          </p>
        </div>
        <div className="space-y-1">
          <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
            <Users size={14} className="mr-1.5" /> Players Served
          </p>
          <p className="text-base font-semibold text-teal-600 dark:text-teal-400">
            {game.playersServed}
          </p>
        </div>
      </div>
    </div>
  </div>
);

export const LastHostedSection = () => {
  // Placeholder data - replace with actual data fetching
  const lastHostedGames = [
    {
      id: "1",
      name: "Counter-Strike 2",
      imageUrl: "/placeholder-cs2.jpg",
      lastHostedDate: "1h ago",
      playersServed: "12 players"
    },
    {
      id: "2",
      name: "Palworld",
      imageUrl: "/placeholder-palworld.jpg",
      lastHostedDate: "Yesterday",
      playersServed: "8 players"
    },
    {
      id: "3",
      name: "GTA V",
      imageUrl: "/placeholder-gtav.jpg",
      lastHostedDate: "2 days ago",
      playersServed: "15 players"
    }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
          <Monitor size={20} className="mr-2 text-orange-500" />
          Last Hosted Games
        </h3>
        <Button variant="ghost" size="sm" className="text-orange-500 hover:text-orange-600 dark:text-orange-400 dark:hover:text-orange-500">
          View All
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lastHostedGames.map(game => (
          <HostedGameCard key={game.id} game={game} />
        ))}
      </div>
    </div>
  );
}; 