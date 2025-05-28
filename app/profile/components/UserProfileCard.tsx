"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Edit3, Award, Users, TrendingUp, MapPin, CalendarDays, Eye, EyeOff, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface UserProfileCardProps {
  avatarUrl?: string;
  username: string;
  countryFlagSrc?: string;
  memberSince: string;
  bio: string;
  isAcceptingGamers: boolean;
  onAcceptingGamersChange: (value: boolean) => void;
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

  const stats = [
    { label: "Rating", value: "4.8", icon: Award },
    { label: "Hosted", value: "127", icon: TrendingUp },
    { label: "Friends", value: "43", icon: Users }, // Example: replace with actual friend count
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="bg-white dark:bg-slate-800/40 backdrop-blur-md rounded-xl border border-gray-200 dark:border-slate-700/80 shadow-lg dark:shadow-2xl p-6 space-y-6"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Avatar className="w-20 h-20 border-4 border-white dark:border-teal-500/70 shadow-md">
            <AvatarImage src={avatarUrl} alt={username} />
            <AvatarFallback className="bg-gray-200 dark:bg-slate-700 text-gray-600 dark:text-slate-300 text-2xl">
              {username?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center">
              {username}
              {countryFlagSrc && (
                <img src={countryFlagSrc} alt="Country flag" className="w-5 h-auto ml-2 rounded-sm" />
              )}
            </h1>
            <div className="flex items-center text-xs text-gray-500 dark:text-slate-400 mt-1">
              <CalendarDays size={14} className="mr-1.5" />
              Member since {memberSince}
            </div>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="text-gray-500 hover:text-pink-600 dark:text-slate-400 dark:hover:text-teal-400">
          <Edit3 size={18} />
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-2 text-center pt-2 pb-4 border-t border-b border-gray-200 dark:border-slate-700/60">
        <div>
          <Award size={20} className="mx-auto mb-1 text-purple-600 dark:text-teal-400" />
          <p className="text-sm font-semibold text-gray-700 dark:text-slate-200">4.8</p>
          <p className="text-xs text-gray-500 dark:text-slate-400">Rating</p>
        </div>
        <div>
          <BarChart3 size={20} className="mx-auto mb-1 text-purple-600 dark:text-teal-400" />
          <p className="text-sm font-semibold text-gray-700 dark:text-slate-200">127</p>
          <p className="text-xs text-gray-500 dark:text-slate-400">Hosted</p>
        </div>
        <div>
          <Users size={20} className="mx-auto mb-1 text-purple-600 dark:text-teal-400" />
          <p className="text-sm font-semibold text-gray-700 dark:text-slate-200">43</p>
          <p className="text-xs text-gray-500 dark:text-slate-400">Friends</p>
        </div>
      </div>

      <div>
        <h3 className="text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">Bio</h3>
        <p className="text-sm text-gray-600 dark:text-slate-300 leading-relaxed">{bio}</p>
      </div>
      
      <div className="border-t border-gray-200 dark:border-slate-700/60 pt-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {isAcceptingGamers ? <Eye size={18} className="mr-2 text-green-500" /> : <EyeOff size={18} className="mr-2 text-gray-500 dark:text-slate-500" />}
            <div>
              <span className="text-sm font-medium text-gray-700 dark:text-slate-200">Accepting Gamers</span>
              <p className="text-xs text-gray-500 dark:text-slate-400">
                {isAcceptingGamers ? "Visible and open to game invites" : "Not accepting game invites currently"}
              </p>
            </div>
          </div>
          <Switch
            checked={isAcceptingGamers}
            onCheckedChange={onAcceptingGamersChange}
            className="data-[state=checked]:bg-purple-600 dark:data-[state=checked]:bg-teal-500 data-[state=unchecked]:bg-gray-300 dark:data-[state=unchecked]:bg-slate-600"
          />
        </div>
      </div>
    </motion.div>
  );
}; 