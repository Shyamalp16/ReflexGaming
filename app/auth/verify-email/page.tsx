"use client"

import type React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { MailCheck } from "lucide-react" // Using a more appropriate icon
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AnimatedButton } from "@/components/animated-button"
import { Navbar } from "@/components/navbar"

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen bg-background text-foreground bg-dark-radial flex flex-col">
      {/* Header */}
      <Navbar />

      {/* Verification Instruction Message */}
      <div className="flex-1 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Card className="border-border">
            <CardHeader className="space-y-1 items-center text-center">
              <MailCheck className="h-12 w-12 text-teal-500 dark:text-teal-400 mb-2" />
              <CardTitle className="text-2xl font-bold">Check Your Inbox!</CardTitle>
              <CardDescription>
                We've sent a verification link to your email address. Please click the link to activate your account.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-6">
              <p className="text-sm text-muted-foreground text-center">
                Didn't receive an email? Check your spam folder or try resending.
              </p>
              {/* Optionally, add a resend button here later */}
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