"use client";

import type React from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/context/AuthContext"
import { Toaster } from "@/components/ui/toaster"
import QueryProvider from "../components/QueryProvider"
import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'

export function RootLayoutClient({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = usePathname()
  const router = useRouter()
  
  useEffect(() => {
    // Only apply redirects in production mode
    if (process.env.NODE_ENV === 'production') {
      // Only allow homepage and coming-soon page
      const allowedPaths = ['/', '/coming-soon']
      const isAllowedPath = allowedPaths.some(path => pathname === path)
      
      // If not homepage or coming-soon, redirect to coming-soon
      if (!isAllowedPath) {
        router.replace('/coming-soon')
      }
    }
  }, [pathname, router])

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange>
      <AuthProvider>
        <QueryProvider>
          {children}
          <Toaster />
        </QueryProvider>
      </AuthProvider>
    </ThemeProvider>
  )
} 