"use client";

import type React from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/context/AuthContext"
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
      // Allow homepage, coming-soon, and waitlist pages
      const allowedPaths = ['/', '/coming-soon', '/waitlist']
      const isAllowedPath = allowedPaths.some(path => pathname === path)
      
      // If not an allowed path, redirect to coming-soon
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
        </QueryProvider>
      </AuthProvider>
    </ThemeProvider>
  )
} 