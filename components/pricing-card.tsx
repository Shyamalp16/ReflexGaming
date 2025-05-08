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
  return (
    <motion.div
      className={cn(
        "rounded-xl p-8 border border-border hover:border-teal-500/50 transition-colors card-hover relative overflow-hidden",
        buttonVariant === "default"
          ? "bg-gradient-to-br from-teal-900/30 to-teal-900/10"
          : "bg-gradient-to-br from-orange-900/30 to-orange-900/10",
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
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-500 to-orange-500 opacity-70"></div>
      <div className="flex items-center gap-3 mb-4">
        <motion.div
          className={`p-2 rounded-lg ${buttonVariant === "default" ? "bg-teal-900/30" : "bg-orange-900/30"}`}
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
            <div className="mt-0.5 flex-shrink-0 rounded-full bg-green-500/20 p-1">
              <Check className="h-4 w-4 text-green-500" />
            </div>
            <span className="text-muted-foreground">{feature}</span>
          </motion.li>
        ))}
      </ul>

      <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
        <Button
          variant={buttonVariant}
          className={
            buttonVariant === "default"
              ? "w-full bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800"
              : "w-full border-teal-500 text-teal-500 hover:bg-teal-950/20"
          }
        >
          {buttonText}
        </Button>
      </motion.div>
    </motion.div>
  )
}
