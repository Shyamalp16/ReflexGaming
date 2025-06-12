"use client"

import Link from "next/link"
import Image from "next/image"
import { Cpu, Gamepad2, MonitorPlay, Zap, Shield, DollarSign, Server, Laptop, ArrowRight } from "lucide-react"
import { HowItWorks } from "@/components/how-it-works"
import { FeatureCard } from "@/components/feature-card"
import { PricingCard } from "@/components/pricing-card"
import { TechRequirements } from "@/components/tech-requirements"
import { Navbar } from "@/components/navbar"
import { AnimatedButton } from "@/components/animated-button"
import { AnimatedText } from "@/components/animated-text"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { TypeAnimation } from "react-type-animation"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground bg-dark-radial overflow-x-hidden">
      {/* Header */}
      <Navbar />

      {/* Hero Section */}
      <section className="container mx-auto py-20 px-4 min-h-[calc(100vh-5rem)]">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight gradient-text">
              Play AAA Games{" "}
              <TypeAnimation
                sequence={[
                  "Instantly, No 100GB Game Downloads.",
                  2500,
                  "With Reflex-Ready Speed.",
                  2500,
                  "On Demand, Pay Per Session.",
                  2500,
                  "Like You're Really There.",
                  2500,
                  "Without Dropping Bucks on a Gaming Rig.",
                  2500,
                ]}
                wrapper="span"
                speed={50}
                cursor={true}
                repeat={Infinity}
                style={{ display: "inline-block" }}
              />
            </h1>
            <AnimatedText className="text-xl text-muted-foreground" delay={0.2}>
              Connect directly to powerful host PCs for ultra-low latency remote gameplay, or earn by sharing your rig
              with the gaming community.
            </AnimatedText>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <AnimatedButton variant="accent" className="h-12 px-6 text-base">
                Find a Game Host
              </AnimatedButton>
              <AnimatedButton variant="outline" className="h-12 px-6 text-base">
                Become a Host
              </AnimatedButton>
            </motion.div>
          </div>
          <motion.div
            className="relative h-[400px] rounded-xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-pink-700/10 z-10 rounded-xl"></div>
            <Image
              src="/placeholder.svg?height=800&width=1200"
              alt="P2P Gaming Connection"
              fill
              className="object-cover rounded-xl"
              priority
            />
            <motion.div
              className="absolute inset-0 flex items-center justify-center z-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <div className="bg-black/60 dark:bg-black/60 p-6 rounded-xl max-w-md backdrop-blur-sm border border-primary/20 dark:border-pink-700/20">
                <div className="flex justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    >
                      <Server className="h-5 w-5 text-primary" />
                    </motion.div>
                    <span className="text-sm font-medium">Host</span>
                  </div>
                  <motion.div
                    className="h-0.5 w-20 bg-gradient-to-r from-pink-500 to-purple-600 my-auto"
                    animate={{
                      background: [
                        "linear-gradient(to right, #14b8a6, #f97316)",
                        "linear-gradient(to right, #f97316, #14b8a6)",
                        "linear-gradient(to right, #14b8a6, #f97316)",
                      ],
                    }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  />
                  <div className="flex items-center gap-2">
                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
                    >
                      <Laptop className="h-5 w-5 text-pink-500" />
                    </motion.div>
                    <span className="text-sm font-medium">Gamer</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Direct peer-to-peer connection ensures ultra-low latency for responsive gameplay
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 relative overflow-hidden overscroll-none">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <AnimatedText className="text-3xl md:text-4xl font-bold mb-4" gradient>
              Powerful Features
            </AnimatedText>
            <AnimatedText className="text-xl text-muted-foreground max-w-2xl mx-auto" delay={0.2}>
              Experience gaming like never before with our innovative peer-to-peer platform
            </AnimatedText>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Zap className="h-10 w-10 text-teal-500" />}
              title="Ultra-Low Latency"
              description="Direct Peer-to-Peer connection minimizes input lag for responsive remote gameplay."
              className="bg-card"
              index={0}
            />
            <FeatureCard
              icon={<Cpu className="h-10 w-10 text-teal-500" />}
              title="Leverage Powerful Hardware"
              description="Play demanding titles your own PC can't handle by connecting to high-end Host rigs."
              className="bg-card"
              index={1}
            />
            <FeatureCard
              icon={<DollarSign className="h-10 w-10 text-teal-500" />}
              title="Earn By Hosting"
              description="Monetize your idle PC time. Earn for sharing your gaming power."
              className="bg-card"
              index={2}
            />
            <FeatureCard
              icon={<Shield className="h-10 w-10 text-teal-500" />}
              title="Secure Direct Connection"
              description="Game sessions run via a secure, end-to-end encrypted peer-to-peer link."
              className="bg-card"
              index={3}
            />
            <FeatureCard
              icon={<MonitorPlay className="h-10 w-10 text-teal-500" />}
              title="Dedicated Client App"
              description="Lightweight desktop client ensures optimal performance and seamless connection for Gamers."
              className="bg-card"
              index={4}
            />
            <FeatureCard
              icon={<Gamepad2 className="h-10 w-10 text-teal-500" />}
              title="Different Resolution Presets"
              description="Choose from various resolution presets to match your performance needs and budget."
              className="bg-card"
              index={5}
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 relative overflow-hidden overscroll-none">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <AnimatedText className="text-3xl md:text-4xl font-bold mb-4" gradient>
              How It Works
            </AnimatedText>
            <AnimatedText className="text-xl text-muted-foreground max-w-2xl mx-auto" delay={0.2}>
              Simple process for both Gamers and Hosts
            </AnimatedText>
          </div>

          <HowItWorks />
        </div>
      </section>

      {/* Use Cases Section */}
      <section id="use-cases" className="py-20 relative overflow-hidden overscroll-none">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <AnimatedText className="text-3xl md:text-4xl font-bold mb-4" gradient>
              Use Cases
            </AnimatedText>
            <AnimatedText className="text-xl text-muted-foreground max-w-2xl mx-auto" delay={0.2}>
              Discover how Reflex Cloud Gaming can benefit you
            </AnimatedText>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              className="bg-card rounded-xl p-8 border border-border hover:border-primary/50 transition-colors card-hover relative overflow-hidden"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-purple-700 opacity-70"></div>
              <div className="flex items-center gap-4 mb-6">
                <motion.div
                  className="p-3 rounded-lg"
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Laptop className="h-8 w-8 text-primary" />
                </motion.div>
                <h3 className="text-2xl font-bold">For Gamers</h3>
              </div>
              <ul className="space-y-4">
                <motion.li
                  className="flex gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                >
                  <div className="mt-1 flex-shrink-0">
                    <div className="h-5 w-5 rounded-full bg-primary flex items-center justify-center">
                      <ArrowRight className="h-3 w-3 text-primary-foreground" />
                    </div>
                  </div>
                  <p>Play AAA titles on budget laptops or older PCs without hardware upgrades</p>
                </motion.li>
                <motion.li
                  className="flex gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="mt-1 flex-shrink-0">
                    <div className="h-5 w-5 rounded-full bg-primary flex items-center justify-center">
                      <ArrowRight className="h-3 w-3 text-primary-foreground" />
                    </div>
                  </div>
                  <p>Access games requiring high specs without investing in expensive hardware</p>
                </motion.li>
                <motion.li
                  className="flex gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="mt-1 flex-shrink-0">
                    <div className="h-5 w-5 rounded-full bg-primary flex items-center justify-center">
                      <ArrowRight className="h-3 w-3 text-primary-foreground" />
                    </div>
                  </div>
                  <p>Choose from different resolution presets to match your budget and needs</p>
                </motion.li>
                <motion.li
                  className="flex gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="mt-1 flex-shrink-0">
                    <div className="h-5 w-5 rounded-full bg-primary flex items-center justify-center">
                      <ArrowRight className="h-3 w-3 text-primary-foreground" />
                    </div>
                  </div>
                  <p>Play anywhere with a stable internet connection</p>
                </motion.li>
              </ul>
            </motion.div>

            <motion.div
              className="bg-card rounded-xl p-8 border border-border hover:border-pink-500/50 transition-colors card-hover relative overflow-hidden"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 to-pink-700 opacity-70"></div>
              <div className="flex items-center gap-4 mb-6">
                <motion.div
                  className="p-3 rounded-lg"
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Server className="h-8 w-8 text-pink-500" />
                </motion.div>
                <h3 className="text-2xl font-bold">For Hosts</h3>
              </div>
              <ul className="space-y-4">
                <motion.li
                  className="flex gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                >
                  <div className="mt-1 flex-shrink-0">
                    <div className="h-5 w-5 rounded-full bg-pink-500 flex items-center justify-center">
                      <ArrowRight className="h-3 w-3 text-primary-foreground" />
                    </div>
                  </div>
                  <p>Generate passive income from your existing gaming hardware</p>
                </motion.li>
                <motion.li
                  className="flex gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="mt-1 flex-shrink-0">
                    <div className="h-5 w-5 rounded-full bg-pink-500 flex items-center justify-center">
                      <ArrowRight className="h-3 w-3 text-primary-foreground" />
                    </div>
                  </div>
                  <p>Earn based on your hardware specifications</p>
                </motion.li>
                <motion.li
                  className="flex gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="mt-1 flex-shrink-0">
                    <div className="h-5 w-5 rounded-full bg-pink-500 flex items-center justify-center">
                      <ArrowRight className="h-3 w-3 text-primary-foreground" />
                    </div>
                  </div>
                  <p>Control when your system is available for hosting</p>
                </motion.li>
                <motion.li
                  className="flex gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="mt-1 flex-shrink-0">
                    <div className="h-5 w-5 rounded-full bg-pink-500 flex items-center justify-center">
                      <ArrowRight className="h-3 w-3 text-primary-foreground" />
                    </div>
                  </div>
                  <p>Secure system with end-to-end encryption and sandboxed environment</p>
                </motion.li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tech Requirements Section */}
      <section className="py-20 relative overflow-hidden overscroll-none">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <AnimatedText className="text-3xl md:text-4xl font-bold mb-4" gradient>
              Technical Requirements
            </AnimatedText>
            <AnimatedText className="text-xl text-muted-foreground max-w-2xl mx-auto" delay={0.2}>
              What you need to get started
            </AnimatedText>
          </div>

          <TechRequirements />
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 relative overflow-hidden overscroll-none">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <AnimatedText className="text-3xl md:text-4xl font-bold mb-4" gradient>
              Marketplace Pricing
            </AnimatedText>
            <AnimatedText className="text-xl text-muted-foreground max-w-2xl mx-auto" delay={0.2}>
              Flexible & transparent marketplace where Gamers pay Hosts directly
            </AnimatedText>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <PricingCard
              title="For Gamers"
              description="Simple pay-per-use. Browse Hosts and see clear hourly rates. Pay only for the time you play."
              features={[
                "No subscription required",
                "Pay only for what you use",
                "Choose hosts based on specs and price",
                "Different resolution presets for different budgets",
                "Secure payment processing",
              ]}
              buttonText="Find a Game Host"
              buttonVariant="default"
              icon={<Gamepad2 className="h-6 w-6 text-primary" />}
              index={0}
            />

            <PricingCard
              title="For Hosts"
              description="Earn competitive rates for sharing your hardware. Low platform commission ensures you keep most of your earnings."
              features={[
                "Earn hourly rates",
                "Earn based on your hardware specs",
                "Low platform commission",
                "Flexible hosting schedule",
                "Secure hosting environment",
              ]}
              buttonText="Become a Host"
              buttonVariant="outline"
              icon={<Server className="h-6 w-6 text-pink-500" />}
              index={1}
            />
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="pt-20 pb-10 relative overflow-hidden overscroll-none">
        <div className="container mx-auto px-4 text-center relative z-10">
          <AnimatedText className="text-3xl md:text-4xl font-bold mb-6" gradient>
            Ready to Transform Your Gaming Experience?
          </AnimatedText>
          <AnimatedText className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10" delay={0.2}>
            Join our community of Gamers and Hosts today and experience the future of cloud gaming.
          </AnimatedText>

          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <AnimatedButton variant="accent" className="h-12 px-8 text-base">
              Find a Game Host
            </AnimatedButton>
            <AnimatedButton variant="outline" className="h-12 px-8 text-base">
              Become a Host
            </AnimatedButton>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t border-border pt-6 pb-12 relative">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Zap className="h-6 w-6 text-primary" />
                <span className="text-lg font-bold gradient-text">Reflex Cloud Gaming</span>
              </div>
              <p className="text-muted-foreground text-sm">
                The future of peer-to-peer cloud gaming. Play anywhere, earn by hosting.
              </p>
            </div>

            <div>
              <h4 className="font-medium mb-4 text-foreground">Platform</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                    Use Cases
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>

            <div className="md:-ml-8">
              <h4 className="font-medium mb-4 text-foreground">Resources</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                    Download Client
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                    Support
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} Reflex Cloud Gaming. All rights reserved.
            </p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <Link href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                Terms
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                Privacy
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
