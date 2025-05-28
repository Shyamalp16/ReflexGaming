"use client";

import { useState, useEffect } from 'react';
import { Zap, Gamepad2, Clock, DollarSign, Users, Tv, Info, Play, StopCircle, AlertTriangle, ExternalLink, PlusCircle, Settings2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from "@/components/ui/badge";

interface ActiveHostingSession {
  gameName: string;
  startTime: number;
  currentEarnings: number;
  maxEarningsPotential?: number; // Optional: for a progress bar or projection
  statusMessage?: string; // e.g., "Broadcasting to 75 viewers"
}

interface ActivePlayingSession {
  gameName: string;
  startTime: number;
  currentSpend: number;
  sessionGoal?: string; // e.g., "Complete 'The Heist' mission"
}

// Mock data - replace with actual data source
const currentSessionData = {
  isActive: true,
  isHosting: true,
  game: "Dust2 Pro League - Advanced Tournament",
  gameImage: "/images/placeholder/d2-pro.jpg", // Placeholder image
  viewers: 75,
  sessionStartTime: new Date(Date.now() - 2 * 60 * 60 * 1000 - 15 * 60 * 1000 - 30 * 1000).toISOString(), // 2h 15m 30s ago
  currentEarnings: 125.50,
  currentSpend: 0, // Example, would be >0 if playing
  serverLocation: "Frankfurt, Germany",
  serverPing: "25ms",
};

// Helper to format duration
const formatDuration = (startTime?: string) => {
  if (!startTime) return "00:00:00";
  const now = new Date();
  const start = new Date(startTime);
  let durationSeconds = Math.floor((now.getTime() - start.getTime()) / 1000);

  if (durationSeconds < 0) durationSeconds = 0; // Ensure no negative duration

  const hours = Math.floor(durationSeconds / 3600);
  durationSeconds %= 3600;
  const minutes = Math.floor(durationSeconds / 60);
  const seconds = durationSeconds % 60;

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

interface DetailItemProps {
  icon: React.ElementType;
  label: string;
  value: string | number;
  iconColor?: string;
  valueColor?: string;
  isCurrency?: boolean;
}

const DetailItem: React.FC<DetailItemProps> = ({ icon: Icon, label, value, iconColor = "text-purple-500 dark:text-teal-400", valueColor = "text-gray-800 dark:text-white", isCurrency }) => (
  <div className="bg-gray-50 dark:bg-slate-700/30 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-slate-600/50 flex items-start space-x-3 transition-all hover:shadow-md hover:border-gray-300 dark:hover:border-slate-500">
    <div className={`p-2 bg-purple-100 dark:bg-slate-600/50 rounded-md mt-0.5 ${iconColor.replace("text-", "bg-").replace("dark:text-", "dark:bg-")}/20`}>
      <Icon size={18} className={iconColor} />
    </div>
    <div>
      <p className="text-xs text-gray-500 dark:text-slate-400 font-medium">{label}</p>
      <p className={`text-lg font-semibold ${valueColor}`}>
        {isCurrency && typeof value === 'number' ? `$${value.toFixed(2)}` : value}
      </p>
    </div>
  </div>
);

export const ActiveSessionSection = () => {
  const [session, setSession] = useState(currentSessionData);
  const [duration, setDuration] = useState(formatDuration(session?.sessionStartTime));

  useEffect(() => {
    if (session?.isActive && session?.sessionStartTime) {
      const interval = setInterval(() => {
        setDuration(formatDuration(session.sessionStartTime));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [session]);

  const cardVariants = {
    initial: { opacity: 0, y: 30, scale: 0.98 },
    animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] } },
    exit: { opacity: 0, y: -30, scale: 0.98, transition: { duration: 0.3, ease: [0.5, 0, 0.75, 0] } }
  };

  const headerBg = session?.isHosting 
    ? "bg-gradient-to-br from-purple-600 via-pink-500 to-rose-600 dark:from-teal-500 dark:via-cyan-500 dark:to-sky-600"
    : "bg-gradient-to-br from-indigo-600 via-purple-500 to-pink-600 dark:from-purple-500 dark:via-pink-500 dark:to-rose-600";
  
  const headerIconColor = session?.isHosting ? "text-white" : "text-white";
  const accentColor = session?.isHosting ? "pink" : "purple";
  const iconColor = session?.isHosting ? "text-pink-500 dark:text-teal-400" : "text-purple-500 dark:text-pink-400";
  const valueColor = session?.isHosting ? "text-gray-800 dark:text-white" : "text-gray-800 dark:text-white";

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={session?.isActive ? "active" : "inactive"}
        variants={cardVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="bg-white dark:bg-slate-800/60 backdrop-blur-lg rounded-xl border border-gray-200 dark:border-slate-700/80 shadow-xl dark:shadow-2xl overflow-hidden"
      >
        {session?.isActive ? (
          <>
            <div className={`p-6 ${headerBg} text-white`}>
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold flex items-center">
                    <Zap size={28} className={`mr-3 ${headerIconColor} transform -rotate-12`} />
                    Active {session.isHosting ? "Hosting" : "Gaming"} Session
            </h2>
                  <p className="text-sm opacity-80 mt-1">
                    {session.isHosting ? `Broadcasting to ${session.viewers} viewers on ReflexTV` : `Playing ${session.game}`}
                  </p>
                </div>
                {session.isHosting && session.currentEarnings > 0 && (
                  <Badge variant="outline" className="bg-white/20 dark:bg-black/20 border-none text-white text-sm font-semibold py-1.5 px-3 backdrop-blur-sm">
                    <DollarSign size={16} className="mr-1.5 text-green-300" />
                    {`$${session.currentEarnings.toFixed(2)}`}
                  </Badge>
                )}
                {!session.isHosting && session.currentSpend > 0 && (
                  <Badge variant="outline" className="bg-white/20 dark:bg-black/20 border-none text-white text-sm font-semibold py-1.5 px-3 backdrop-blur-sm">
                    <DollarSign size={16} className="mr-1.5 text-red-300" />
                    {`-$${session.currentSpend.toFixed(2)}`}
                  </Badge>
                )}
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <DetailItem icon={Gamepad2} label={session.isHosting ? "Hosting Game" : "Playing Game"} value={session.game} iconColor={iconColor} valueColor={valueColor} />
                <DetailItem icon={Clock} label="Session Duration" value={duration} iconColor={iconColor} valueColor={valueColor} />
                {session.isHosting ? (
                  <DetailItem icon={DollarSign} label="Current Earnings" value={session.currentEarnings} iconColor="text-green-500" valueColor="text-green-600 dark:text-green-400" isCurrency />
                ) : (
                  <DetailItem icon={DollarSign} label="Current Spend" value={session.currentSpend} iconColor="text-red-500" valueColor="text-red-600 dark:text-red-400" isCurrency />
                )}
              </div>
              
              {session.isHosting && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-4 border-t border-gray-200 dark:border-slate-700/50">
                    <DetailItem icon={Tv} label="Viewers" value={session.viewers} iconColor={iconColor} valueColor={valueColor} />
                    <DetailItem icon={AlertTriangle} label="Server Ping" value={session.serverPing} iconColor={iconColor} valueColor={valueColor} />
                    <DetailItem icon={ExternalLink} label="Location" value={session.serverLocation} iconColor={iconColor} valueColor={valueColor}/>
              </div>
          )}
          
              <div className="pt-6 border-t border-gray-200 dark:border-slate-700/50 flex flex-col sm:flex-row gap-3 sm:justify-between items-center">
                <Button 
                  variant="outline"
                  size="lg"
                  className={`w-full sm:w-auto border-${accentColor}-500/70 text-${accentColor}-600 hover:bg-${accentColor}-100 hover:text-${accentColor}-700 dark:border-${session.isHosting ? 'teal' : 'pink'}-500/70 dark:text-${session.isHosting ? 'teal' : 'pink'}-400 dark:hover:bg-${session.isHosting ? 'teal' : 'pink'}-500/10 dark:hover:text-${session.isHosting ? 'teal' : 'pink'}-300 shadow-sm hover:shadow-md transition-all group`}
                  onClick={() => console.log("Manage Session")}
                >
                  Manage {session.isHosting ? "Hosting" : "Gaming"} Session
                  <Settings2 size={18} className="ml-2 group-hover:rotate-45 transition-transform"/>
                </Button>
                <Button 
                  variant="destructive" 
                  size="lg"
                  className="w-full sm:w-auto group"
                  onClick={() => setSession(prev => ({...prev, isActive: false}))}
                 >
                  <StopCircle size={18} className="mr-2 group-hover:scale-110 transition-transform"/>
                  End Session
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="p-8 sm:p-10 text-center bg-gray-50 dark:bg-slate-800/30">
            <Info size={48} className="mx-auto mb-4 text-purple-500 dark:text-teal-400 opacity-70" />
            <h3 className="text-xl font-semibold text-gray-700 dark:text-slate-200 mb-2">No Active Session</h3>
            <p className="text-sm text-gray-500 dark:text-slate-400 mb-6 max-w-xs mx-auto">
              You are not currently hosting or playing any game. Start a new session to see details here.
            </p>
            <Button 
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 dark:from-teal-500 dark:to-cyan-500 dark:hover:from-teal-600 dark:hover:to-cyan-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all group"
              onClick={() => console.log("Start Hosting clicked from empty state")}
            >
              <PlusCircle size={20} className="mr-2 group-hover:rotate-90 transition-transform"/>
              Start Hosting Now
            </Button>
            </div>
          )}
      </motion.div>
    </AnimatePresence>
  );
}; 