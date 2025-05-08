"use client"

import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface PricingCardProps {
  title: string
  description: string
  features: string[]
  buttonText: string
  buttonVariant: "default" | "outline"
  icon: ReactNode
  index?: number
}

export function PricingCard({
  title,
  description,
  features,
  buttonText,
  buttonVariant,
  icon,
  index = 0,
}: PricingCardProps) {
  // Determine if this is the "primary themed" card (previously teal, now purple/magenta based on buttonVariant)
  const isPrimaryThemed = buttonVariant === "default"

  return (
    <motion.div
      className={cn(
        "flex flex-col rounded-xl p-8 border border-border hover:border-primary/50 transition-colors card-hover relative overflow-hidden",
        isPrimaryThemed
          ? "bg-gradient-to-br from-purple-400/10 to-purple-500/5"
          : "bg-gradient-to-br from-pink-300/10 to-pink-400/5",
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.2,
        type: "spring",
        stiffness: 100,
      }}
    >
      <div className="flex-grow">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 to-purple-600 opacity-70"></div>
        <div className="flex items-center gap-3 mb-4">
          <motion.div
            className={`p-2 rounded-lg ${isPrimaryThemed ? "bg-purple-400/10" : "bg-pink-300/10"}`}
            whileHover={{ rotate: 10, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            {icon}
          </motion.div>
          <h3 className="text-2xl font-bold">{title}</h3>
        </div>

        <p className="text-muted-foreground mb-6">{description}</p>

        <ul className="space-y-3 mb-8">
          {features.map((feature, idx) => (
            <motion.li
              key={idx}
              className="flex items-start gap-3"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * idx + 0.2 * index }}
            >
              <div className="mt-0.5 flex-shrink-0 rounded-full bg-primary/10 p-1">
                <Check className="h-4 w-4 text-primary/80" />
              </div>
              <span className="text-muted-foreground">{feature}</span>
            </motion.li>
          ))}
        </ul>
      </div>

      <motion.div className="mt-auto" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
        <Button
          variant={buttonVariant}
          className={cn(
            "w-full",
            isPrimaryThemed
              ? "bg-gradient-to-r from-primary to-purple-700 hover:from-purple-700 hover:to-primary"
              : "border-pink-500 text-pink-500 hover:bg-pink-500/10 dark:hover:bg-pink-700/20"
          )}
        >
          {buttonText}
        </Button>
      </motion.div>
    </motion.div>
  )
}
