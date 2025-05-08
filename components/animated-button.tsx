"use client"

import type { ReactNode, ButtonHTMLAttributes, MouseEventHandler } from "react"
import { motion, type HTMLMotionProps } from "framer-motion"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils"

// Define props that are specific to AnimatedButton or are safe to pass to motion.button
interface AnimatedButtonOwnProps {
  children: ReactNode
  className?: string
  variant?: "default" | "outline" | "accent"
  asChild?: boolean
  onClick?: MouseEventHandler<HTMLButtonElement> // Standard onClick
  type?: "button" | "submit" | "reset"
  // Add other framer-motion specific props if you want to control them via AnimatedButton props
}

// Combine with general ButtonHTMLAttributes for the ...restProps when asChild is true
// and to allow passing other standard HTML attributes if not asChild.
// We'll be careful what we pass from restProps to motion.button.
type AnimatedButtonProps = AnimatedButtonOwnProps & Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof AnimatedButtonOwnProps>;

export function AnimatedButton({
  children,
  className,
  variant = "default",
  asChild = false,
  ...restProps // These are the remaining ButtonHTMLAttributes
}: AnimatedButtonProps) {

  const baseClasses =
    "relative inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background h-10 py-2 px-4"

  const variantClasses = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    outline: "border-primary text-primary hover:bg-primary/10",
    accent: "bg-pink-500 text-white hover:bg-pink-600",
  }

  const framerMotionProps: HTMLMotionProps<"button"> = {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 },
    transition: { type: "spring", stiffness: 400, damping: 17 },
  }

  if (asChild) {
    // Slot will pass all ...restProps (including href, onClick from Link, etc.) to the child
    return (
      <Slot 
        className={cn(baseClasses, variantClasses[variant], className)} 
        {...restProps} // All other props (href, type, onClick for Link) come from here
      >
        {children}
      </Slot>
    )
  }

  // When not asChild, construct props for motion.button carefully
  const { onClick, type = "button", disabled, ...htmlButtonAttributes } = restProps as ButtonHTMLAttributes<HTMLButtonElement>
  
  const buttonProps: HTMLMotionProps<"button"> = {
    ...framerMotionProps,
    className: cn(baseClasses, variantClasses[variant], className),
    onClick: onClick,
    type: type,
    disabled: disabled,
  }
  if (htmlButtonAttributes.hasOwnProperty('aria-label')) {
    buttonProps['aria-label'] = htmlButtonAttributes['aria-label']
  }
  // Add any other specific safe HTML attributes from htmlButtonAttributes to buttonProps as needed

  return (
    <motion.button {...buttonProps}>
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
