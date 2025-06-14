import type React from "react"
import "@/app/globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/context/AuthContext"
import { Toaster } from "@/components/ui/toaster"
import QueryProvider from "./components/QueryProvider"
import { RootLayoutClient } from "./components/RootLayoutClient"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"


const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Reflex Cloud Gaming - P2P Remote Game Playing Service",
  description:
    "Connect directly to powerful host PCs for ultra-low latency remote gameplay, or earn by sharing your rig with the gaming community.",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <RootLayoutClient>
          {children}
        </RootLayoutClient>
        <Toaster />
        <Analytics />
        <SpeedInsights/>
      </body>
    </html>
  )
}
