"use client";

import { Navbar } from '@/components/navbar';
import { Construction } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ComingSoonPage() {
  return (
    <div className="min-h-screen bg-background text-foreground bg-dark-radial flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto py-20 px-4 flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <Construction size={64} className="text-primary mx-auto" />
          <h1 className="text-4xl md:text-5xl font-bold gradient-text">Coming Soon!</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We're working hard to bring you something amazing. Stay tuned!
          </p>
        </motion.div>
      </main>
      <footer className="container mx-auto py-6 px-4 text-center text-sm text-muted-foreground border-t border-border">
        <p>© {new Date().getFullYear()} Reflex Cloud Gaming. All rights reserved.</p>
      </footer>
    </div>
  );
} 