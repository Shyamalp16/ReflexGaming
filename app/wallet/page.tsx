"use client";

import type React from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Navbar } from '@/components/navbar';
import { motion } from 'framer-motion';
import { WalletCards } from 'lucide-react'; // Icon for wallet

export default function WalletPage() {
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
        <p>Loading wallet information...</p>
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
          <WalletCards className="h-16 w-16 text-primary mx-auto mb-4" />
          <h1 className="text-4xl font-bold gradient-text">
            Wallet Balance
          </h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            Manage your funds, view transaction history, and add credits to your account.
            (Placeholder Content)
          </p>
          <div className="bg-card p-6 rounded-lg shadow-md border border-border max-w-md mx-auto mt-6">
            <h2 className="text-2xl font-semibold mb-3">Current Balance:</h2>
            <p className="text-3xl font-bold text-teal-500">$0.00 <span className="text-sm text-muted-foreground">(CAD)</span></p>            
            <p className="mt-4 text-sm italic">(Transaction history and top-up options coming soon!)</p>
          </div>
        </motion.div>
      </main>
      <footer className="container mx-auto py-4 px-4 text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} Reflex Cloud Gaming. All rights reserved.</p>
      </footer>
    </div>
  );
} 