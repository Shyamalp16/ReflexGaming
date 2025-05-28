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
          className="space-y-4 w-full max-w-6xl mx-auto"
        >
          <History className="h-16 w-16 text-primary mx-auto mb-2 animate-float" />
          <h1 className="text-4xl sm:text-5xl font-extrabold gradient-text text-center">
            My Gaming Sessions
          </h1>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto">
            Track your past and ongoing cloud gaming sessions here.
          </p>

          {/* Sessions Table Placeholder */}
          <div className="backdrop-blur-sm bg-white/30 dark:bg-gray-800/30 rounded-xl p-6 border border-gray-200/50 dark:border-gray-700/50 mt-4 overflow-x-auto">
            <table className="min-w-full text-sm text-left table-auto divide-y divide-border">
              <thead className="bg-muted/40 dark:bg-gray-700/40">
                <tr>
                  <th scope="col" className="py-3 px-4 font-semibold tracking-wide text-muted-foreground">Date</th>
                  <th scope="col" className="py-3 px-4 font-semibold tracking-wide text-muted-foreground">Game</th>
                  <th scope="col" className="py-3 px-4 font-semibold tracking-wide text-muted-foreground">Duration</th>
                  <th scope="col" className="py-3 px-4 font-semibold tracking-wide text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="even:bg-muted/20">
                    <td className="py-3 px-4 whitespace-nowrap">-- / -- / ----</td>
                    <td className="py-3 px-4">Coming Soon</td>
                    <td className="py-3 px-4">--:--:--</td>
                    <td className="py-3 px-4 text-muted-foreground">N/A</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footnote */}
          <p className="text-xs text-muted-foreground text-center mt-2">
            Detailed session logs and statistics will be displayed here once available.
          </p>
        </motion.div>
      </main>
      <footer className="container mx-auto py-4 px-4 text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} Reflex Cloud Gaming. All rights reserved.</p>
      </footer>
    </div>
  );
} 