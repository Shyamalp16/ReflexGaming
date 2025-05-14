"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Mail, KeyRound } from "lucide-react" // KeyRound for password reset icon
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AnimatedButton } from "@/components/animated-button"
import { Navbar } from "@/components/navbar"
import { supabase } from "@/lib/supabase/client"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage("") // Clear previous messages
    setError("")

    const {data, error: resetLinkError} = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'http://localhost:3000/auth/update-password'
    })
    setIsLoading(false)

    if(resetLinkError){
      setError(resetLinkError.message)
      return
    }
    
    setMessage("Check your email for the Password Reset Link.")


  }

  return (
    <div className="min-h-screen bg-background text-foreground bg-dark-radial flex flex-col">
      {/* Header */}
      <Navbar />

      {/* Forgot Password Form */}
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
              <CardTitle className="text-2xl font-bold">Forgot Your Password?</CardTitle>
              <CardDescription>
                No problem! Enter your email address below and we'll send you a link to reset it.
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                {error && !message && (
                  <p className="text-sm text-center text-red-500 dark:text-red-400">
                    {error}
                  </p>
                )}
                {!message ? (
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        className="pl-10"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value)
                          if (error) setError("")
                          if (message) setMessage("")
                        }}
                        required
                      />
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-center text-green-600 dark:text-green-400 p-4 bg-green-50 dark:bg-green-900/30 rounded-md">
                    {message}
                  </p>
                )}
              </CardContent>
              {!message && (
                <CardFooter>
                  <AnimatedButton type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Sending..." : "Send Reset Link"}
                  </AnimatedButton>
                </CardFooter>
              )}
            </form>
          </Card>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="container mx-auto py-4 px-4 text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} Reflex Cloud Gaming. All rights reserved.</p>
      </footer>
    </div>
  )
} 