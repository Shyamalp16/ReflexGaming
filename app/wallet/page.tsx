"use client";

import type React from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Navbar } from '@/components/navbar';
import { motion } from 'framer-motion';
import { WalletCards } from 'lucide-react'; // Icon for wallet
import { Button } from '@/components/ui/button';

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
          className="space-y-4 w-full max-w-6xl mx-auto"
        >
          <WalletCards className="h-16 w-16 text-primary mx-auto mb-2 animate-float" />
          <h1 className="text-4xl sm:text-5xl font-extrabold gradient-text text-center">
            Wallet
          </h1>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto">
            Manage your funds, view transaction history, and add credits to your account.
          </p>

          {/* Balance Card */}
          <div className="backdrop-blur-sm bg-white/30 dark:bg-gray-800/30 rounded-xl p-8 border border-gray-200/50 dark:border-gray-700/50 flex flex-col items-center gap-4 card-hover">
            <h2 className="text-2xl font-semibold">Current Balance</h2>
            <p className="text-4xl font-extrabold text-teal-500">$0.00 <span className="text-lg text-muted-foreground">CAD</span></p>
            <Button variant="default" size="lg" className="mt-4">Add Funds</Button>
          </div>

          {/* Transactions Placeholder */}
          <div className="backdrop-blur-sm bg-white/30 dark:bg-gray-800/30 rounded-xl p-6 border border-gray-200/50 dark:border-gray-700/50 mt-6 overflow-x-auto">
            <h3 className="text-xl font-semibold mb-4">Recent Transactions</h3>
            <table className="min-w-full text-sm text-left table-auto divide-y divide-border">
              <thead className="bg-muted/40 dark:bg-gray-700/40">
                <tr>
                  <th scope="col" className="py-3 px-4 font-semibold tracking-wide text-muted-foreground">Date</th>
                  <th scope="col" className="py-3 px-4 font-semibold tracking-wide text-muted-foreground">Description</th>
                  <th scope="col" className="py-3 px-4 font-semibold tracking-wide text-muted-foreground">Amount</th>
                  <th scope="col" className="py-3 px-4 font-semibold tracking-wide text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {Array.from({ length: 4 }).map((_, i) => (
                  <tr key={i} className="even:bg-muted/20">
                    <td className="py-3 px-4 whitespace-nowrap">-- / -- / ----</td>
                    <td className="py-3 px-4">N/A</td>
                    <td className="py-3 px-4">$0.00</td>
                    <td className="py-3 px-4 text-muted-foreground">Pending</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </main>
      <footer className="container mx-auto py-4 px-4 text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} Reflex Cloud Gaming. All rights reserved.</p>
      </footer>
    </div>
  );
} 