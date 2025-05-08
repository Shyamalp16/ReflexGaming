"use client"

import type { ReactNode, ReactElement } from "react"
import React from 'react'
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface FeatureCardProps {
  icon: ReactNode
  title: string
  description: string
  className?: string
  index?: number
}

export function FeatureCard({ icon, title, description, className, index = 0 }: FeatureCardProps) {
  return (
    <motion.div
      className={cn(
        "rounded-xl p-6 border border-border hover:border-primary/50 transition-colors card-hover relative overflow-hidden",
        className,
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        type: "spring",
        stiffness: 100,
      }}
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 to-purple-600 opacity-70"></div>
      <div className="mb-4 relative">
        {React.isValidElement(icon) ? React.cloneElement(icon as ReactElement<{ className?: string }>, { className: cn((icon.props as { className?: string }).className, "h-10 w-10 text-primary") }) : icon}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </motion.div>
  )
}
