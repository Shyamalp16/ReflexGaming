"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users } from 'lucide-react';
import Link from 'next/link';

interface Friend {
  id: string;
  username: string;
  avatarUrl?: string;
  status: 'online' | 'offline' | 'playing';
}

const getAvatarFallbackText = (name: string) => {
  return name ? name.charAt(0).toUpperCase() : "U";
};

const FriendCard = ({ friend }: { friend: Friend }) => (
  <Link href={`/profile/${friend.id}`}>
    <div className="flex items-center space-x-3">
      <div className="relative">
        <Avatar className="h-12 w-12">
          <AvatarImage src={friend.avatarUrl} alt={friend.username} />
          <AvatarFallback className="bg-orange-500 text-white">
            {getAvatarFallbackText(friend.username)}
          </AvatarFallback>
        </Avatar>
        <span className={`absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full ring-2 ring-white dark:ring-gray-900 ${
          friend.status === 'online' ? 'bg-green-500' :
          friend.status === 'playing' ? 'bg-orange-500' :
          'bg-gray-400'
        }`} />
      </div>
    </div>
  </Link>
);

export const FriendsSection = () => {
  // Placeholder data - replace with actual friends data
  const friends: Friend[] = [
    {
      id: "1",
      username: "C",
      status: 'playing',
    },
    {
      id: "2",
      username: "P",
      status: 'online',
    },
    {
      id: "3",
      username: "G",
      status: 'offline',
    },
    {
      id: "4",
      username: "S",
      status: 'playing',
    }
  ];

  const totalFriends = friends.length;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <h2 className="text-base font-medium text-gray-900 dark:text-white flex items-center">
            <Users size={18} className="mr-2 text-gray-500" />
            Friends
          </h2>
          <span className="px-2 py-0.5 bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 rounded-full text-sm">
            {totalFriends}
          </span>
        </div>
        <Link href="/profile/friends" className="text-sm text-orange-500">
          View All
        </Link>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {friends.map((friend) => (
          <FriendCard key={friend.id} friend={friend} />
        ))}
      </div>

      <Link href="/profile/friends" className="flex items-center justify-center text-sm text-orange-500 hover:text-orange-600 dark:text-orange-400 dark:hover:text-orange-500">
        <Users size={16} className="mr-2" />
        View all friends
      </Link>
    </div>
  );
}; 