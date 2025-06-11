"use client";

import { useState } from 'react';
import { Navbar } from '@/components/navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from '@/hooks/use-toast';
import { motion } from "framer-motion";
import { Sparkles, Share2, Loader2 } from "lucide-react";
import { createWishlistEntry } from '@/lib/supabase/db';
import { useMutation } from '@tanstack/react-query';

interface WishlistFormData {
  full_name: string;
  email: string;
  occupation: string;
  favourite_games: string;
  additional_message: string;
}

export default function WishlistPage() {
  const { toast } = useToast();
  const [formData, setFormData] = useState<WishlistFormData>({
    full_name: '',
    email: '',
    occupation: '',
    favourite_games: '',
    additional_message: ''
  });

  const wishlistMutation = useMutation({
    mutationFn: async (data: WishlistFormData) => {
      return createWishlistEntry({
        full_name: data.full_name,
        email: data.email,
        occupation: data.occupation || null,
        favourite_games: data.favourite_games || null,
        additional_message: data.additional_message || null
      });
    },
    onSuccess: () => {
      toast({
        title: "Successfully Joined! 🎮",
        description: "Thanks for joining our wishlist! We'll keep you updated on all the exciting developments.",
        variant: "default",
        duration: 3000,
      });

      // Clear form
      setFormData({
        full_name: '',
        email: '',
        occupation: '',
        favourite_games: '',
        additional_message: ''
      });
    },
    onError: (error: Error) => {
      console.error('Wishlist submission error:', error);
      toast({
        title: "Submission Failed",
        description: error.message || "Could not submit your information. Please try again.",
        variant: "destructive",
        duration: 3000,
      });
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    wishlistMutation.mutate(formData);
  };

  return (
    <div className="min-h-screen bg-background text-foreground bg-dark-radial">
      <Navbar />
      <main className="container mx-auto py-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          <Card className="border-border">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Sparkles className="h-6 w-6 text-primary" />
                <CardTitle className="text-2xl">Join Our Wishlist</CardTitle>
              </div>
              <CardDescription>
                Be among the first to experience Reflex Cloud Gaming. Fill out this form to join our exclusive wishlist.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="full_name">Full Name</Label>
                      <Input
                        id="full_name"
                        name="full_name"
                        placeholder="John Doe"
                        value={formData.full_name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="occupation">Occupation</Label>
                    <Input
                      id="occupation"
                      name="occupation"
                      placeholder="What do you do? (optional)"
                      value={formData.occupation}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="favourite_games">Favorite Games</Label>
                    <Input
                      id="favourite_games"
                      name="favourite_games"
                      placeholder="What games do you love? (optional)"
                      value={formData.favourite_games}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="additional_message">Additional Message</Label>
                    <Textarea
                      id="additional_message"
                      name="additional_message"
                      placeholder="Any other suggestions? (or you can show love to the devs)"
                      value={formData.additional_message}
                      onChange={handleChange}
                      className="min-h-[100px]"
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={wishlistMutation.isPending}
                >
                  {wishlistMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Join Wishlist"
                  )}
                </Button>

                <div className="text-center text-sm text-muted-foreground mt-6 space-y-2">
                  <p className="flex items-center justify-center gap-2">
                    <Share2 className="h-4 w-4" />
                    <span>Share With Your Friends Pretty Please 👉👈</span>
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  );
} 