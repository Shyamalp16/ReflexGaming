"use client"

import { Laptop, Server } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"

export function HowItWorks() {
  return (
    <Tabs defaultValue="gamers" className="max-w-4xl mx-auto">
      <TabsList className="grid w-full grid-cols-2 mb-8">
        <TabsTrigger
          value="gamers"
          className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-600 data-[state=active]:to-teal-700"
        >
          <div className="flex items-center gap-2">
            <Laptop className="h-4 w-4" />
            <span>For Gamers</span>
          </div>
        </TabsTrigger>
        <TabsTrigger
          value="hosts"
          className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-600 data-[state=active]:to-orange-700"
        >
          <div className="flex items-center gap-2">
            <Server className="h-4 w-4" />
            <span>For Hosts</span>
          </div>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="gamers" className="mt-0">
        <motion.div
          className="bg-card rounded-xl p-8 border border-border relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-500 to-teal-700 opacity-70"></div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-8">
              <motion.div
                className="flex gap-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-r from-teal-600 to-teal-700 flex items-center justify-center text-lg font-bold">
                  1
                </div>
                <div>
                  <h4 className="text-lg font-medium mb-2">Install Client & Browse Hosts</h4>
                  <p className="text-muted-foreground text-sm">
                    Download our lightweight client app and browse available hosts based on specs, games, and pricing.
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="flex gap-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-r from-teal-600 to-teal-700 flex items-center justify-center text-lg font-bold">
                  2
                </div>
                <div>
                  <h4 className="text-lg font-medium mb-2">Select Host & Resolution Preset</h4>
                  <p className="text-muted-foreground text-sm">
                    Choose a host based on their hardware specs, available games, and pricing. Select your preferred
                    resolution preset.
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="flex gap-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-r from-teal-600 to-teal-700 flex items-center justify-center text-lg font-bold">
                  3
                </div>
                <div>
                  <h4 className="text-lg font-medium mb-2">Connect & Pay Securely</h4>
                  <p className="text-muted-foreground text-sm">
                    Connect to your chosen host and pay securely per session or hourly. Only pay for the time you play.
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="flex gap-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-r from-teal-600 to-teal-700 flex items-center justify-center text-lg font-bold">
                  4
                </div>
                <div>
                  <h4 className="text-lg font-medium mb-2">Play Instantly</h4>
                  <p className="text-muted-foreground text-sm">
                    Start playing immediately with ultra-low latency thanks to our direct peer-to-peer connection.
                  </p>
                </div>
              </motion.div>
            </div>

            <div className="relative rounded-xl overflow-hidden h-[400px]">
              <div className="absolute inset-0 bg-gradient-to-b from-teal-900/20 to-teal-900/40 z-10 rounded-xl"></div>
              <motion.div
                className="absolute bottom-0 left-0 right-0 p-6 bg-black/60 backdrop-blur-sm z-20 border-t border-teal-500/20"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <h4 className="text-lg font-medium mb-2 gradient-text">Gamer Experience</h4>
                <p className="text-muted-foreground text-sm">
                  Play demanding games on any device with a smooth, responsive experience
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </TabsContent>

      <TabsContent value="hosts" className="mt-0">
        <motion.div
          className="bg-card rounded-xl p-8 border border-border relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-orange-700 opacity-70"></div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-8">
              <motion.div
                className="flex gap-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-r from-orange-600 to-orange-700 flex items-center justify-center text-lg font-bold">
                  1
                </div>
                <div>
                  <h4 className="text-lg font-medium mb-2">Install Host App & Configure</h4>
                  <p className="text-muted-foreground text-sm">
                    Download our host application and configure your rig and available games for remote play.
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="flex gap-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-r from-orange-600 to-orange-700 flex items-center justify-center text-lg font-bold">
                  2
                </div>
                <div>
                  <h4 className="text-lg font-medium mb-2">Set Availability & Hourly Rate</h4>
                  <p className="text-muted-foreground text-sm">
                    Define when your system is available for hosting and set your hourly rate based on your hardware
                    specs.
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="flex gap-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-r from-orange-600 to-orange-700 flex items-center justify-center text-lg font-bold">
                  3
                </div>
                <div>
                  <h4 className="text-lg font-medium mb-2">Accept Connection Requests</h4>
                  <p className="text-muted-foreground text-sm">
                    Review and accept connection requests from gamers who want to use your system.
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="flex gap-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-r from-orange-600 to-orange-700 flex items-center justify-center text-lg font-bold">
                  4
                </div>
                <div>
                  <h4 className="text-lg font-medium mb-2">Earn Automatically</h4>
                  <p className="text-muted-foreground text-sm">
                    Get paid automatically for the time gamers spend using your system. Withdraw earnings anytime.
                  </p>
                </div>
              </motion.div>
            </div>

            <div className="relative rounded-xl overflow-hidden h-[400px]">
              <div className="absolute inset-0 bg-gradient-to-b from-orange-900/20 to-orange-900/40 z-10 rounded-xl"></div>
              <motion.div
                className="absolute bottom-0 left-0 right-0 p-6 bg-black/60 backdrop-blur-sm z-20 border-t border-orange-500/20"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <h4 className="text-lg font-medium mb-2 gradient-text">Host Dashboard</h4>
                <p className="text-muted-foreground text-sm">
                  Monitor your earnings, system usage, and manage gamer connections
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </TabsContent>
    </Tabs>
  )
}
