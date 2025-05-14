"use client";

import type React from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Navbar } from '@/components/navbar';
import { motion } from 'framer-motion';
import { History } from 'lucide-react'; // Icon for sessions

export default function MySessionsPage() {
  const { user, isLoading, session } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user && !session) {
      router.push('/login');
    }
  }, [user, isLoading, session, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background text-foreground bg-dark-radial flex flex-col items-center justify-center">
        <p>Loading session data...</p>
      </div>
    );
  }

  if (!user) {
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
          className="space-y-4"
        >
          <History className="h-16 w-16 text-primary mx-auto mb-4" />
          <h1 className="text-4xl font-bold gradient-text">
            My Gaming Sessions
          </h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            This is where your past and current gaming session history will be displayed.
            (Placeholder Content)
          </p>
          <div className="bg-card p-6 rounded-lg shadow-md border border-border max-w-md mx-auto mt-6">
            <h2 className="text-2xl font-semibold mb-3">Coming Soon!</h2>
            <p>Detailed session logs, recordings, and statistics will be available here.</p>
          </div>
        </motion.div>
      </main>
      <footer className="container mx-auto py-4 px-4 text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} Reflex Cloud Gaming. All rights reserved.</p>
      </footer>
    </div>
  );
} 