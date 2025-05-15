"use client";

import Image from 'next/image'; // Optional: if you want to show game images

interface HotGame {
  id: string;
  name: string;
  imageUrl?: string; // Optional image for the game
  // Add other relevant details like current players, genre, etc.
}

export const HotGamesSection = () => {
  // Placeholder data - replace with actual dynamic data later
  const hotGames: HotGame[] = [
    { id: "1", name: "Apex Legends", imageUrl: "/placeholder-apex-banner.jpg" },
    { id: "2", name: "Helldivers 2", imageUrl: "/placeholder-helldivers2-banner.jpg" },
    { id: "3", name: "Palworld", imageUrl: "/placeholder-palworld-banner.jpg" },
    { id: "4", name: "Grand Theft Auto V", imageUrl: "/placeholder-gtav-banner.jpg" },
    { id: "5", name: "Lethal Company", imageUrl: "/placeholder-lethalcompany-banner.jpg" },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Hot Games Right Now</h2>
      {hotGames.length > 0 ? (
        <ul className="space-y-4">
          {hotGames.map((game, index) => (
            <li key={game.id} className="p-4 bg-gray-100 dark:bg-gray-700/50 rounded-lg flex items-center space-x-4 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              {game.imageUrl && (
                <div className="w-20 h-12 relative rounded overflow-hidden flex-shrink-0">
                  <Image src={game.imageUrl} alt={game.name} layout="fill" objectFit="cover" />
                </div>
              )}
              <span className="text-lg text-gray-800 dark:text-white font-medium">{index + 1}. {game.name}</span>
              {/* You could add more details here, e.g., player count, a link to the game */}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600 dark:text-gray-400">Could not load hot games at the moment.</p>
      )}
    </div>
  );
}; 