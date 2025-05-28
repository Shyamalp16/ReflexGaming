"use client";

import type React from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Navbar } from '@/components/navbar'; // Assuming you want the navbar here too
import { motion } from 'framer-motion';

export default function DashboardPage() {
  const { user, isLoading, session } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Only redirect if done loading and no user/session
    if (!isLoading && !user && !session) {
      router.push('/login');
    }
  }, [user, isLoading, session, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background text-foreground bg-dark-radial flex flex-col items-center justify-center">
        <p>Loading user data...</p> {/* Or a spinner component */}
      </div>
    );
  }

  if (!user) {
    // This state might be brief before redirect, or if redirect hasn't triggered yet
    return (
        <div className="min-h-screen bg-background text-foreground bg-dark-radial flex flex-col items-center justify-center">
            <p>Redirecting to login...</p>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground bg-dark-radial flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center p-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-4 w-full max-w-6xl mx-auto"
        >
          <h1 className="text-4xl sm:text-5xl font-extrabold gradient-text text-center">
            Welcome, {user.email ? user.email.split('@')[0] : 'Gamer'}!
          </h1>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto">
            Here's a quick overview of your activity on Reflex Cloud Gaming.
          </p>

          {/* Metrics Grid */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
            {/* Sessions Hosted */}
            <div className="backdrop-blur-sm bg-white/30 dark:bg-gray-800/30 rounded-xl p-6 border border-gray-200/50 dark:border-gray-700/50 flex flex-col items-center card-hover">
              <span className="text-3xl font-bold text-teal-500">12</span>
              <span className="text-sm text-muted-foreground mt-2">Sessions Hosted</span>
            </div>

            {/* Games Played */}
            <div className="backdrop-blur-sm bg-white/30 dark:bg-gray-800/30 rounded-xl p-6 border border-gray-200/50 dark:border-gray-700/50 flex flex-col items-center card-hover">
              <span className="text-3xl font-bold text-orange-500">37</span>
              <span className="text-sm text-muted-foreground mt-2">Games Played</span>
            </div>

            {/* Friends */}
            <div className="backdrop-blur-sm bg-white/30 dark:bg-gray-800/30 rounded-xl p-6 border border-gray-200/50 dark:border-gray-700/50 flex flex-col items-center card-hover">
              <span className="text-3xl font-bold text-teal-500">43</span>
              <span className="text-sm text-muted-foreground mt-2">Friends</span>
            </div>

            {/* Wallet Balance */}
            <div className="backdrop-blur-sm bg-white/30 dark:bg-gray-800/30 rounded-xl p-6 border border-gray-200/50 dark:border-gray-700/50 flex flex-col items-center card-hover">
              <span className="text-3xl font-bold text-orange-500">$0.00</span>
              <span className="text-sm text-muted-foreground mt-2">Wallet Balance</span>
            </div>
          </section>

          {/* Placeholder for future content */}
          <div className="backdrop-blur-sm bg-white/30 dark:bg-gray-800/30 rounded-xl p-8 border border-gray-200/50 dark:border-gray-700/50 mt-8 card-hover">
            <h2 className="text-2xl font-semibold mb-2 text-center">Coming Soon</h2>
            <p className="text-muted-foreground text-center">Detailed analytics, achievements, and personalized recommendations will appear here.</p>
          </div>
        </motion.div>
      </main>
      <footer className="container mx-auto py-4 px-4 text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} Reflex Cloud Gaming. All rights reserved.</p>
      </footer>
    </div>
  );
} 