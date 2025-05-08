"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface AnimatedTextProps {
  children: ReactNode
  className?: string
  delay?: number
  gradient?: boolean
  neon?: boolean
}

export function AnimatedText({ children, className, delay = 0, gradient = false, neon = false }: AnimatedTextProps) {
  return (
    <motion.div
      className={cn(gradient && "gradient-text", className)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.5,
        delay: delay,
        type: "spring",
        stiffness: 100,
      }}
    >
      {children}
    </motion.div>
  )
}
