"use client"

import Link from "next/link"
import { Zap, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { AnimatedButton } from "@/components/animated-button"
import { motion } from "framer-motion"

export function Navbar() {
  return (
    <header className="container mx-auto py-6 px-4 flex items-center justify-between">
      <Link href="/" className="flex items-center gap-2">
        <motion.div
          initial={{ rotate: -10 }}
          animate={{ rotate: 10 }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
        >
          <Zap className="h-8 w-8 text-teal-500" />
        </motion.div>
        <span className="text-xl font-bold gradient-text">Reflex Cloud Gaming</span>
      </Link>

      <nav className="hidden md:flex items-center gap-8">
        <Link
          href="/#features"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors hover:text-teal-400"
        >
          Features
        </Link>
        <Link
          href="/#how-it-works"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors hover:text-teal-400"
        >
          How It Works
        </Link>
        <Link
          href="/#use-cases"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors hover:text-teal-400"
        >
          Use Cases
        </Link>
        <Link
          href="/#pricing"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors hover:text-teal-400"
        >
          Pricing
        </Link>
      </nav>

      <div className="flex items-center gap-4">
        <ThemeToggle />
        <Button variant="outline" className="hidden sm:flex border-teal-500 text-teal-500 hover:bg-teal-950/20" asChild>
          <Link href="/login">Log In</Link>
        </Button>
        <AnimatedButton variant="accent" asChild>
          <Link href="/signup">Sign Up</Link>
        </AnimatedButton>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
        </Button>
      </div>
    </header>
  )
}
