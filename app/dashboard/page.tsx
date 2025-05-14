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
          className="space-y-4"
        >
          <h1 className="text-4xl font-bold gradient-text">
            Welcome to Your Dashboard, {user.email ? user.email.split('@')[0] : 'User'}!
          </h1>
          <p className="text-muted-foreground">
            This is your personalized space. More features coming soon!
          </p>
          <div className="bg-card p-6 rounded-lg shadow-md border border-border max-w-lg mx-auto">
            <h2 className="text-2xl font-semibold mb-3">Temporary User Data:</h2>
            <p className="text-left">
              <span className="font-medium">User ID:</span> {user.id}
            </p>
            <p className="text-left">
              <span className="font-medium">Email:</span> {user.email}
            </p>
            <p className="text-left">
              <span className="font-medium">Last Sign In:</span> 
              {user.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleString() : 'N/A'}
            </p>
            {/* Add more temporary data as needed */}
          </div>
        </motion.div>
      </main>
      <footer className="container mx-auto py-4 px-4 text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} Reflex Cloud Gaming. All rights reserved.</p>
      </footer>
    </div>
  );
} 