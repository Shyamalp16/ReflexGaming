"use client";

import { useState, useEffect } from 'react'; // For placeholder state AND dynamic duration
import { Zap, /* Users, */ Gamepad2, Clock, Wallet, TrendingUp, TrendingDown } from 'lucide-react'; // Removed Users icon
// import { Button } from '@/components/ui/button'; // Assuming Button component

// Placeholder types - replace with your actual data structures
interface ActiveHostingSession {
  gameName: string;
  // connectedGamers: number; // Removed
  // maxGamers: number; // Removed
  startTime: number; // Timestamp (e.g., Date.now()) or a pre-calculated elapsed seconds
  currentEarnings: number;
}

interface ActivePlayingSession {
  gameName: string;
  startTime: number; // Timestamp (e.g., Date.now()) or a pre-calculated elapsed seconds
  currentSpend: number;
}

export const ActiveSessionSection = () => {
  const [sessionType, setSessionType] = useState<'hosting' | 'playing' | null>('hosting');
  const [walletBalance, setWalletBalance] = useState(125.50);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  // --- Placeholder Initial Session Data (replace with actual fetched data) ---
  // For a real scenario, startTime would come from your backend or be set when a session begins.
  // Example: set to 2 hours 15 minutes and 30 seconds ago for hosting
  const initialHostingStartTime = Date.now() - (2 * 60 * 60 * 1000) - (15 * 60 * 1000) - (30 * 1000);
  // Example: set to 45 minutes and 10 seconds ago for playing
  const initialPlayingStartTime = Date.now() - (45 * 60 * 1000) - (10 * 1000);


  const activeHostingSession: ActiveHostingSession | null = sessionType === 'hosting' ? {
    gameName: "Dust2 Pro League - Advanced Tournament Semi Finals with a Very Long Name That Might Overflow",
    startTime: initialHostingStartTime,
    currentEarnings: 25.75,
  } : null;

  const activePlayingSession: ActivePlayingSession | null = sessionType === 'playing' ? {
    gameName: "Cyberpunk 2077 - Exploring Night City's Deepest Secrets and Long Quests",
    startTime: initialPlayingStartTime,
    currentSpend: 3.50,
  } : null;
  // --- End Placeholder State ---

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    let currentStartTime: number | undefined;

    if (sessionType === 'hosting' && activeHostingSession) {
      currentStartTime = activeHostingSession.startTime;
    } else if (sessionType === 'playing' && activePlayingSession) {
      currentStartTime = activePlayingSession.startTime;
    }

    if (currentStartTime) {
      // Calculate initial elapsed seconds
      const initialElapsed = Math.floor((Date.now() - currentStartTime) / 1000);
      setElapsedSeconds(initialElapsed);

      interval = setInterval(() => {
        setElapsedSeconds(prevSeconds => prevSeconds + 1);
      }, 1000);
    } else {
      setElapsedSeconds(0); // Reset if no active session
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [sessionType, activeHostingSession, activePlayingSession]);

  const formatDuration = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    // const seconds = totalSeconds % 60; // Seconds removed from display

    let formatted = "";
    if (hours > 0) {
      formatted += `${hours} hr `;
    }
    formatted += `${minutes} min`;
    return formatted.trim();
  };
  
  const currentDuration = formatDuration(elapsedSeconds);

  if (!sessionType) {
    return null;
  }

  const SummaryIcon = sessionType === 'hosting' ? TrendingUp : TrendingDown;
  const summaryTitle = sessionType === 'hosting' ? "Quick Earnings" : "Spending Summary";
  const summaryValue = sessionType === 'hosting' 
    ? `$${activeHostingSession?.currentEarnings.toFixed(2)}` 
    : `$${activePlayingSession?.currentSpend.toFixed(2)}`;

  return (
    <div className="mb-8 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 p-1 rounded-xl shadow-2xl">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div className="mb-4 md:mb-0 min-w-0"> {/* Added min-w-0 for flex child truncation */}
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center truncate">
              <Zap size={32} className="mr-3 text-yellow-400 flex-shrink-0" /> 
              <span className="truncate">Active Session</span>
            </h2>
            {sessionType === 'hosting' && activeHostingSession && (
              <p className="text-gray-600 dark:text-gray-400 text-lg truncate">You are currently hosting: <span className='text-orange-500 dark:text-orange-400 font-semibold truncate'>{activeHostingSession.gameName}</span></p>
            )}
            {sessionType === 'playing' && activePlayingSession && (
              <p className="text-gray-600 dark:text-gray-400 text-lg truncate">You are currently playing: <span className='text-sky-500 dark:text-sky-400 font-semibold truncate'>{activePlayingSession.gameName}</span></p>
            )}
          </div>
          <div className="flex items-center bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-lg shadow mt-4 md:mt-0 flex-shrink-0">
            <Wallet size={20} className="mr-2 text-green-500 dark:text-green-400" />
            <span className="text-gray-900 dark:text-white text-xl font-semibold">${walletBalance.toFixed(2)}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-900 dark:text-white"> {/* Changed text color default */}
          {/* Session Game Details */} 
          {sessionType === 'hosting' && activeHostingSession && (
            <div className="bg-gray-100/70 dark:bg-gray-700/70 p-4 rounded-lg flex items-center space-x-3 min-w-0">
              <Gamepad2 size={28} className="text-purple-500 dark:text-purple-400 flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-sm text-gray-500 dark:text-gray-400">GAME</p>
                <p className="text-lg font-semibold truncate">{activeHostingSession.gameName}</p>
              </div>
            </div>
          )}
          {sessionType === 'playing' && activePlayingSession && (
             <div className="bg-gray-100/70 dark:bg-gray-700/70 p-4 rounded-lg flex items-center space-x-3 min-w-0">
                <Gamepad2 size={28} className="text-sky-500 dark:text-sky-400 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-sm text-gray-500 dark:text-gray-400">CURRENTLY PLAYING</p>
                  <p className="text-lg font-semibold truncate">{activePlayingSession.gameName}</p>
                </div>
              </div>
          )}
          
          {/* GAMERS CONNECTED SECTION REMOVED */}

          {/* Duration */} 
          <div className="bg-gray-100/70 dark:bg-gray-700/70 p-4 rounded-lg flex items-center space-x-3">
            <Clock size={28} className="text-blue-500 dark:text-blue-400 flex-shrink-0" />
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">SESSION DURATION</p>
              <p className="text-lg font-semibold">
                {currentDuration}
              </p>
            </div>
          </div>

          {/* Quick Summary (Earnings/Spendings) */}
          {(activeHostingSession || activePlayingSession) && (
             <div className="bg-gray-100/70 dark:bg-gray-700/70 p-4 rounded-lg flex items-center space-x-3 md:col-span-2">
              <SummaryIcon size={28} className={`${sessionType === 'hosting' ? "text-green-500 dark:text-green-400" : "text-red-500 dark:text-red-400"} flex-shrink-0`} />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{summaryTitle.toUpperCase()}</p>
                <p className="text-lg font-semibold">{summaryValue}</p>
              </div>
            </div>
          )}
        </div>
        
      </div>
    </div>
  );
}; 