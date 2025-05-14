"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Mail, Lock } from "lucide-react"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AnimatedButton } from "@/components/animated-button"
import { Navbar } from "@/components/navbar"

//exported functions
import { signInUser } from "@/lib/supabase/auth"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    const {data, error: signInError} = await signInUser({email, password})
    setIsLoading(false)

    if(signInError){
      setError(signInError.message)
      return
    }

    // Simulate login process
    if(data.user){
      console.log("Login Successful")
      router.push("/dashboard")
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground bg-dark-radial flex flex-col">
      {/* Header */}
      <Navbar />

      {/* Login Form */}
      <div className="flex-1 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Card className="border-border">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold">Login</CardTitle>
              <CardDescription>Enter your email and password to access your account</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      className="pl-10"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value)
                        if (error) setError("")
                      }}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link
                      href="/auth/forgot-password"
                      className="text-sm text-teal-500 hover:text-teal-600 transition-colors"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      className="pl-10"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value)
                        if (error) setError("")
                      }}
                      required
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                {error && (
                  <p className="text-sm text-red-500 dark:text-red-400 text-center mb-2">
                    {error}
                  </p>
                )}
                <AnimatedButton type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Logging in..." : "Login"}
                </AnimatedButton>
                <div className="text-center text-sm">
                  Don&apos;t have an account?{" "}
                  <Link href="/signup" className="text-teal-500 hover:text-teal-600 transition-colors font-medium">
                    Sign up
                  </Link>
                </div>
              </CardFooter>
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
