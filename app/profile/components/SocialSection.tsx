"use client";

import { Twitter, Shield, MessageSquare, Users, Link2, CheckCircle, XCircle, ExternalLink } from 'lucide-react';
import { Button } from "@/components/ui/button";
// import { AchievementsSection } from './AchievementsSection'; // Import will be removed
import { motion } from 'framer-motion';

interface ConnectableSocialLink {
  platform: string;
  icon: React.ElementType;
  username?: string; // Optional: display username if connected
  connected: boolean;
  onConnect: () => void;
  connectUrl?: string; // URL to initiate connection or view profile
}

export const SocialSection = () => {
  const socialLinks: ConnectableSocialLink[] = [
    {
      platform: "Steam",
      icon: Shield,
      username: "ShadyGamerX",
      connected: true,
      onConnect: () => console.log("Manage Steam clicked"),
      connectUrl: "https://steamcommunity.com/id/ShadyGamerX", // Example
    },
    {
      platform: "Twitter / X",
      icon: Twitter,
      connected: false,
      onConnect: () => console.log("Connect Twitter clicked"),
      connectUrl: "https://twitter.com/intent/oauth/authorize?client_id=YOUR_CLIENT_ID...", // Example OAuth URL
    },
    {
      platform: "Discord",
      icon: MessageSquare,
      username: "ReflexShady#1234",
      connected: true,
      onConnect: () => console.log("Manage Discord clicked"),
    },
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeInOut" } },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (index: number) => ({
      opacity: 1, x: 0, 
      transition: { delay: index * 0.1, duration: 0.3, ease: "easeOut" }
    }),
  };

  return (
    <div className="space-y-8">
      <motion.div 
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.3 }}
        className="bg-white dark:bg-slate-800/40 backdrop-blur-md rounded-xl border border-gray-200 dark:border-slate-700/80 shadow-lg dark:shadow-2xl p-6"
      >
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
          <Link2 size={24} className="mr-3 text-purple-600 dark:text-teal-400" />
          Social Connections
        </h2>
        
        {socialLinks.length > 0 ? (
          <div className="space-y-4">
            {socialLinks.map((link, index) => (
              <motion.div 
                key={link.platform} 
                custom={index}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                className="group relative bg-gray-50 dark:bg-slate-700/50 hover:bg-gray-100 dark:hover:bg-slate-700/80 border border-gray-200 dark:border-slate-600/70 hover:border-purple-500/60 dark:hover:border-teal-500/60 rounded-lg p-4 transition-all duration-200 shadow-sm"
              >
                <div className="flex items-center justify-between space-x-3">
                  <div className="flex items-center space-x-3 min-w-0 flex-1">
                    <div className={`p-2.5 rounded-lg shadow-inner ${link.connected ? 'bg-green-100 dark:bg-green-500/10 text-green-500 dark:text-green-400' : 'bg-gray-200 dark:bg-slate-600/50 text-gray-500 dark:text-slate-400'}`}>
                      <link.icon size={20} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="font-semibold text-gray-700 dark:text-slate-100 text-base truncate block">{link.platform}</span>
                      {link.connected && link.username ? (
                        <span className="text-xs text-gray-500 dark:text-slate-400 truncate block">@{link.username}</span>
                      ) : link.connected ? (
                        <span className="text-xs text-green-500 dark:text-green-400/80">Connected</span>
                      ) : (
                        <span className="text-xs text-gray-400 dark:text-slate-500">Not connected</span>
                      )}
                    </div>
                  </div>
                  
                  {/* Buttons will be re-added here with new logic */}
                  {link.connected ? (
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => console.log(`Disconnect ${link.platform}`)} 
                      className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-500 hover:bg-red-100 dark:hover:bg-red-500/10 flex-shrink-0 p-2 h-auto w-auto"
                      aria-label={`Disconnect ${link.platform}`}
                    >
                      <XCircle size={28} />
                    </Button>
                  ) : (
                    <Button 
                      onClick={link.onConnect} 
                      variant="outline"
                      size="icon"
                      className="text-purple-600 border-purple-500/70 hover:bg-purple-500/10 hover:border-purple-600 hover:text-purple-700 
                                 dark:text-teal-400 dark:border-teal-500/70 dark:hover:bg-teal-500/10 dark:hover:border-teal-400 dark:hover:text-teal-300 
                                 flex-shrink-0 p-2 h-auto w-auto"
                      aria-label={`Connect ${link.platform}`}
                    >
                      <Link2 size={28} />
                    </Button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500 dark:text-slate-500">
            <Users size={40} className="mx-auto mb-3 opacity-50" />
            <p>No social connections available to link.</p>
            {/* Maybe an 'Add Connection' button if user can manually add these */}
          </div>
        )}
      </motion.div>
      
      {/* AchievementsSection container removed
      <motion.div 
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.35 }} // Stagger from Social Connections card
        className="bg-slate-800/40 backdrop-blur-md rounded-xl border border-slate-700/80 shadow-2xl p-6"
      >
        <AchievementsSection />
      </motion.div> */}
    </div>
  );
}; 