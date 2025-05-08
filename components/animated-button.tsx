"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface AnimatedButtonProps {
  children: ReactNode
  className?: string
  variant?: "default" | "outline" | "accent"
  onClick?: () => void
}

export function AnimatedButton({ children, className, variant = "default", onClick }: AnimatedButtonProps) {
  const baseClasses =
    "relative inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background h-10 py-2 px-4"

  const variantClasses = {
    default: "bg-teal-600 text-white hover:bg-teal-700",
    outline: "border border-teal-500 text-teal-500 hover:bg-teal-950/20",
    accent: "bg-orange-600 text-white hover:bg-orange-700",
  }

  return (
    <motion.button
      className={cn(baseClasses, variantClasses[variant], className)}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <motion.span
        className="absolute inset-0 rounded-md bg-white opacity-0"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 0.1 }}
        transition={{ duration: 0.2 }}
      />
      {children}
    </motion.button>
  )
}
