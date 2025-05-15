"use client";

import { Twitter, Shield, MessageSquare, Users } from 'lucide-react'; // Using Shield for Steam, MessageSquare for Discord as placeholders
import { Button } from "@/components/ui/button"; // Assuming Button component is available
import { FriendsSection } from './FriendsSection';
import { AchievementsSection } from './AchievementsSection';

interface ConnectableSocialLink {
  platform: string;
  icon: React.ElementType;
  connected: boolean; // You'll need to fetch this status
  onConnect: () => void; // Placeholder for connection logic
}

export const SocialSection = () => {
  // Placeholder data - replace with actual social links status from user profile
  const socialLinks: ConnectableSocialLink[] = [
    {
      platform: "Steam",
      icon: Shield, // Placeholder for Steam icon
      connected: false, // Example status
      onConnect: () => console.log("Connect Steam clicked"),
    },
    {
      platform: "Twitter",
      icon: Twitter,
      connected: true, // Example status
      onConnect: () => console.log("Connect Twitter clicked (or manage)"),
    },
    {
      platform: "Discord",
      icon: MessageSquare, // Placeholder for Discord icon
      connected: false, // Example status
      onConnect: () => console.log("Connect Discord clicked"),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
            <Users size={20} className="mr-2 text-orange-500" />
            Social Connections
          </h2>
        </div>
        
        {socialLinks.length > 0 ? (
          <div className="space-y-4">
            {socialLinks.map((link) => (
              <div 
                key={link.platform} 
                className="group relative overflow-hidden p-4 bg-gradient-to-r from-gray-50 to-white dark:from-gray-700/50 dark:to-gray-800/50 rounded-lg transition-all duration-300 hover:shadow-md"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${link.connected ? 'bg-green-500/10 text-green-500' : 'bg-gray-500/10 text-gray-500'}`}>
                      <link.icon size={24} />
                    </div>
                    <div>
                      <span className="font-medium text-gray-900 dark:text-white">{link.platform}</span>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {link.connected ? 'Connected' : 'Not connected'}
                      </p>
                    </div>
                  </div>
                  <Button 
                    onClick={link.onConnect} 
                    variant={link.connected ? "outline" : "default"}
                    size="sm"
                    className={`
                      relative overflow-hidden transition-all duration-300
                      ${link.connected 
                        ? 'border-green-500 text-green-500 hover:bg-green-500/10 dark:border-green-400 dark:text-green-400' 
                        : 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white border-none'
                      }
                    `}
                  >
                    {link.connected ? "Manage" : "Connect"}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500 dark:text-gray-400">No social connections available.</p>
          </div>
        )}
      </div>
      
      <div className="space-y-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl">
          <FriendsSection />
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl">
          <AchievementsSection />
        </div>
      </div>
    </div>
  );
}; 