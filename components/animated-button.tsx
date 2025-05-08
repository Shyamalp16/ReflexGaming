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
  onClick,
  type = "button",
  ...restProps // These are the remaining ButtonHTMLAttributes
}: AnimatedButtonProps) {

  const baseClasses =
    "relative inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background h-10 py-2 px-4"

  const variantClasses = {
    default: "bg-teal-600 text-white hover:bg-teal-700",
    outline: "border border-teal-500 text-teal-500 hover:bg-teal-950/20",
    accent: "bg-orange-600 text-white hover:bg-orange-700",
  }

  const framerMotionProps: HTMLMotionProps<"button"> = {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 },
    transition: { type: "spring", stiffness: 400, damping: 17 },
  }

  if (asChild) {
    // When asChild is true, Slot handles prop merging.
    // Pass all ...restProps (which are ButtonHTMLAttributes not defined in AnimatedButtonOwnProps)
    // and explicitly passed props like className, children to Slot.
    // The Link component will be the child and receive its necessary props.
    return (
      <Slot 
        className={cn(baseClasses, variantClasses[variant], className)} 
        onClick={onClick} // onClick from AnimatedButtonProps if any
        type={type}       // type from AnimatedButtonProps if any
        {...restProps}    // Other HTML attributes for the Link/Slot
      >
        {children}
      </Slot>
    )
  }

  // When not asChild, render a motion.button directly.
  // Construct props carefully.
  const buttonProps: HTMLMotionProps<"button"> = {
    ...framerMotionProps,
    className: cn(baseClasses, variantClasses[variant], className),
    onClick: onClick,
    type: type,
    disabled: restProps.disabled, // Explicitly pick from restProps
    // Add other safe attributes from restProps as needed, e.g.:
    // 'aria-label': restProps['aria-label'],
  };
  if (restProps.hasOwnProperty('aria-label')) {
    buttonProps['aria-label'] = restProps['aria-label'];
  }
  // Add more safe props from restProps here if they are commonly used

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
