"use client";

import { Clock } from 'lucide-react';
import Link from 'next/link';

interface Achievement {
  id: string;
  name: string;
  description: string;
  achieved: boolean;
}

export const AchievementsSection = () => {
  // Placeholder data - replace with actual achievements data
  const allAchievements: Achievement[] = [
    {
      id: "1",
      name: "Master Hoster",
      description: "Host a total of 100 hours of gameplay.",
      achieved: true,
    },
    {
      id: "2",
      name: "First Victory",
      description: "Win your first competitive match.",
      achieved: true,
    },
    {
      id: "3",
      name: "Loyal Gamer",
      description: "Play for 500 hours on the platform.",
      achieved: false,
    }
  ];

  const displayedAchievements = allAchievements.slice(0, 3);
  const achievedCount = allAchievements.filter(a => a.achieved).length;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <h2 className="text-base font-medium text-gray-900 dark:text-white flex items-center">
            <Clock size={18} className="mr-2 text-gray-500" />
            Achievements
          </h2>
          <span className="px-2 py-0.5 bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 rounded-full text-sm">
            {achievedCount}/{allAchievements.length}
          </span>
        </div>
        <Link href="/profile/achievements" className="text-sm text-orange-500">
          View All
        </Link>
      </div>

      <div className="space-y-3">
        {displayedAchievements.map((ach) => (
          <div 
            key={ach.id} 
            className={`p-3 rounded-lg ${
              ach.achieved 
                ? 'bg-gray-50 dark:bg-gray-800/50' 
                : 'bg-gray-50/50 dark:bg-gray-800/30 opacity-60'
            }`}
          >
            <h4 className={`text-sm font-medium ${
              ach.achieved 
                ? 'text-gray-900 dark:text-white' 
                : 'text-gray-500 dark:text-gray-400'
            }`}>
              {ach.name}
            </h4>
            <p className={`text-xs mt-1 ${
              ach.achieved 
                ? 'text-gray-600 dark:text-gray-300' 
                : 'text-gray-500 dark:text-gray-500'
            }`}>
              {ach.description}
            </p>
          </div>
        ))}
      </div>

      <Link href="/profile/achievements" className="flex items-center justify-center text-sm text-orange-500 hover:text-orange-600 dark:text-orange-400 dark:hover:text-orange-500">
        <Clock size={16} className="mr-2" />
        View all achievements
      </Link>
    </div>
  );
}; 