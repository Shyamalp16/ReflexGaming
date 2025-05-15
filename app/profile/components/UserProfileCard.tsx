"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Button } from "@/components/ui/button"; // Button might not be needed if Share is removed and no other buttons remain
// import { Share2 } from "lucide-react"; // Share2 icon not needed
import { Switch } from "@/components/ui/switch"; // Assuming Switch component from shadcn/ui
import { Label } from "@/components/ui/label";   // Assuming Label component from shadcn/ui

interface UserProfileCardProps {
  avatarUrl?: string;
  username: string;
  countryFlagSrc: string;
  memberSince: string;
  bio?: string;
  // onShare: () => void; // Removed onShare prop
  isAcceptingGamers: boolean; // New prop for toggle state
  onAcceptingGamersChange: (isAccepting: boolean) => void; // New prop for toggle change handler
}

export const UserProfileCard = ({
  avatarUrl,
  username,
  countryFlagSrc,
  memberSince,
  bio,
  isAcceptingGamers,
  onAcceptingGamersChange,
}: UserProfileCardProps) => {
  const getAvatarFallbackText = (name: string) => {
    return name ? name.charAt(0).toUpperCase() : "U";
  };

  return (
    <div className="backdrop-blur-sm bg-white/30 dark:bg-gray-800/30 rounded-xl p-6 border border-gray-200/50 dark:border-gray-700/50">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-orange-500/20 to-transparent rounded-t-xl -mt-6 -mx-6 h-24" />
        <Avatar className="relative h-32 w-32 mx-auto mb-4 ring-4 ring-white dark:ring-gray-700 ring-offset-2 ring-offset-gray-100 dark:ring-offset-gray-800">
          <AvatarImage src={avatarUrl} alt={`${username}'s avatar`} className="object-cover" />
          <AvatarFallback className="text-4xl bg-gradient-to-br from-orange-500 to-orange-600 text-white">
            {getAvatarFallbackText(username)}
          </AvatarFallback>
        </Avatar>
      </div>
      
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center space-x-2">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{username}</h2>
          <img src={countryFlagSrc} alt="Country flag" className="w-6 h-auto rounded-sm shadow-sm" />
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400">Member since {memberSince}</p>
      </div>
      
      <div className="mt-6 p-4 bg-gradient-to-r from-gray-50/50 to-white/50 dark:from-gray-700/50 dark:to-gray-800/50 rounded-lg backdrop-blur-sm">
        <div className="flex items-center justify-between space-x-3">
          <Label htmlFor="accepting-gamers-toggle" className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Accepting Gamers
          </Label>
          <Switch 
            id="accepting-gamers-toggle" 
            checked={isAcceptingGamers}
            onCheckedChange={onAcceptingGamersChange}
            className="data-[state=checked]:bg-orange-500"
          />
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          {isAcceptingGamers ? "You're visible to other gamers" : "You're currently not accepting games"}
        </p>
      </div>

      {bio && (
        <div className="mt-6 p-4 bg-gradient-to-r from-gray-50/50 to-white/50 dark:from-gray-700/50 dark:to-gray-800/50 rounded-lg backdrop-blur-sm">
          <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line">
            {bio}
          </p>
        </div>
      )}
      
      <div className="mt-6 grid grid-cols-3 gap-4 p-4 bg-gradient-to-r from-gray-50/50 to-white/50 dark:from-gray-700/50 dark:to-gray-800/50 rounded-lg backdrop-blur-sm">
        <div className="text-center">
          <p className="text-2xl font-bold text-orange-500 dark:text-orange-400">4.8</p>
          <p className="text-xs text-gray-600 dark:text-gray-400">Rating</p>
        </div>
        <div className="text-center border-x border-gray-200 dark:border-gray-700">
          <p className="text-2xl font-bold text-orange-500 dark:text-orange-400">127</p>
          <p className="text-xs text-gray-600 dark:text-gray-400">Hosted</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-orange-500 dark:text-orange-400">89%</p>
          <p className="text-xs text-gray-600 dark:text-gray-400">Success</p>
        </div>
      </div>
    </div>
  );
}; 