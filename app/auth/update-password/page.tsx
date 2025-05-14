"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation" // Or next/router depending on your Next.js version
import { motion } from "framer-motion"
import { Lock, KeyRound } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AnimatedButton } from "@/components/animated-button"
import { Navbar } from "@/components/navbar"
import { supabase } from "@/lib/supabase/client"
// import { supabase } from "@/lib/supabase/client" // You'll need this for the actual update

export default function UpdatePasswordPage() {
  const router = useRouter()
  const [newPassword, setNewPassword] = useState("")
  const [confirmNewPassword, setConfirmNewPassword] = useState("")
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isRecoveryTokenValid, setIsRecoveryTokenValid] = useState(false)

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "PASSWORD_RECOVERY") {
        setIsRecoveryTokenValid(true)
      } 
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isRecoveryTokenValid) {
      setError("Invalid or expired password recovery link. Please request a new reset link.");
      setIsLoading(false);
      return;
    }

    setIsLoading(true)
    setError("")

    if (newPassword !== confirmNewPassword) {
      setError("Passwords do not match.")
      setIsLoading(false)
      return
    }

    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters long.")
      setIsLoading(false)
      return
    }

    const { data, error: updateUserError } = await supabase.auth.updateUser({ password: newPassword })

    setIsLoading(false)

    if (updateUserError) {
      setError(updateUserError.message)
    } else if (data.user) {
      setMessage("Password updated successfully! Redirecting to login...")
      setNewPassword("");
      setConfirmNewPassword("");
      setTimeout(() => router.push("/login"), 3000)
    } else {
      setError("Failed to update password. The user data was not returned as expected. Please try again.")
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground bg-dark-radial flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Card className="border-border">
            <CardHeader className="space-y-1 items-center text-center">
              <KeyRound className="h-12 w-12 text-teal-500 dark:text-teal-400 mb-2" />
              <CardTitle className="text-2xl font-bold">Set New Password</CardTitle>
              {!isRecoveryTokenValid && !error && !message && (
                <CardDescription>Verifying password recovery link...</CardDescription>
              )}
              {isRecoveryTokenValid && !message && (
                 <CardDescription>Please enter your new password below.</CardDescription>
              )}
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                {error && (
                  <p className="text-sm text-center text-red-500 dark:text-red-400">
                    {error}
                  </p>
                )}
                {message && (
                  <p className="text-sm text-center text-green-600 dark:text-green-400 p-3 bg-green-50 dark:bg-green-900/30 rounded-md">
                    {message}
                  </p>
                )}
                {isRecoveryTokenValid && !message && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                        <Input
                          id="newPassword"
                          type="password"
                          placeholder="••••••••"
                          className="pl-10"
                          value={newPassword}
                          onChange={(e) => {
                            setNewPassword(e.target.value)
                            if (error) setError("")
                          }}
                          required
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">Must be at least 8 characters long.</p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmNewPassword">Confirm New Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                        <Input
                          id="confirmNewPassword"
                          type="password"
                          placeholder="••••••••"
                          className="pl-10"
                          value={confirmNewPassword}
                          onChange={(e) => {
                            setConfirmNewPassword(e.target.value)
                            if (error) setError("")
                          }}
                          required
                        />
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
              {isRecoveryTokenValid && !message && (
                <CardFooter>
                  <AnimatedButton type="submit" className="w-full" disabled={isLoading || !isRecoveryTokenValid}>
                    {isLoading ? "Updating..." : "Update Password"}
                  </AnimatedButton>
                </CardFooter>
              )}
            </form>
          </Card>
        </motion.div>
      </div>
      <footer className="container mx-auto py-4 px-4 text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} Reflex Cloud Gaming. All rights reserved.</p>
      </footer>
    </div>
  )
} 