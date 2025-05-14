"use client"

import type React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { CheckCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AnimatedButton } from "@/components/animated-button"
import { Navbar } from "@/components/navbar"

export default function EmailConfirmedPage() {
  return (
    <div className="min-h-screen bg-background text-foreground bg-dark-radial flex flex-col">
      {/* Header */}
      <Navbar />

      {/* Confirmation Message */}
      <div className="flex-1 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Card className="border-border">
            <CardHeader className="space-y-1 items-center text-center">
              <CheckCircle className="h-12 w-12 text-green-500 dark:text-green-400 mb-2" />
              <CardTitle className="text-2xl font-bold">Email Verified Successfully!</CardTitle>
              <CardDescription>Your account has been confirmed. You can now log in.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-4">
              <Link href="/login" legacyBehavior passHref>
                <AnimatedButton className="w-full max-w-xs">
                  Proceed to Login
                </AnimatedButton>
              </Link>
            </CardContent>
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