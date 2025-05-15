"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Navbar } from '@/components/navbar';
import { UserCircle } from 'lucide-react';

export default function DummyProfilePage() {
  const { user, isLoading, session } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user && !session) {
      router.push('/login');
    }
  }, [user, isLoading, session, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center">
        <Navbar />
        <p className="mt-8">Loading profile...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center">
        <Navbar />
        <p className="mt-8">Redirecting to login...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto py-12 px-4 flex flex-col items-center text-center">
        <UserCircle className="h-32 w-32 text-primary mb-6" />
        <h1 className="text-4xl font-bold mb-2">
          {user.email ? user.email.split('@')[0] : 'User Profile'}
        </h1>
        <p className="text-lg text-muted-foreground mb-4">
          {user.email}
        </p>
        <div className="bg-card border border-border rounded-lg p-6 shadow-sm w-full max-w-md">
          <h2 className="text-2xl font-semibold mb-4">Profile Overview</h2>
          <p className="text-muted-foreground">
            This is your basic profile page. Detailed account management and settings are available under the "Settings" section.
          </p>
          {/* You can add more dummy content here if needed */}
        </div>
      </main>
    </div>
  );
} 