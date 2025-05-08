"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Laptop, Server, Check } from "lucide-react"
import { motion } from "framer-motion"

export function TechRequirements() {
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
          <h3 className="text-xl font-bold mb-6 gradient-text">Gamer Requirements</h3>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
              <h4 className="text-lg font-medium mb-4">Minimum Requirements</h4>
              <ul className="space-y-3">
                <motion.li
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="mt-0.5 flex-shrink-0 rounded-full bg-green-500/20 p-1">
                    <Check className="h-4 w-4 text-green-500" />
                  </div>
                  <div>
                    <span className="font-medium">Internet Connection:</span>
                    <p className="text-sm text-muted-foreground">10 Mbps download / 5 Mbps upload</p>
                  </div>
                </motion.li>
                <motion.li
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="mt-0.5 flex-shrink-0 rounded-full bg-green-500/20 p-1">
                    <Check className="h-4 w-4 text-green-500" />
                  </div>
                  <div>
                    <span className="font-medium">Operating System:</span>
                    <p className="text-sm text-muted-foreground">Windows 10 or higher</p>
                  </div>
                </motion.li>
                <motion.li
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="mt-0.5 flex-shrink-0 rounded-full bg-green-500/20 p-1">
                    <Check className="h-4 w-4 text-green-500" />
                  </div>
                  <div>
                    <span className="font-medium">Processor:</span>
                    <p className="text-sm text-muted-foreground">Dual-core CPU @ 2.0 GHz or better</p>
                  </div>
                </motion.li>
                <motion.li
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="mt-0.5 flex-shrink-0 rounded-full bg-green-500/20 p-1">
                    <Check className="h-4 w-4 text-green-500" />
                  </div>
                  <div>
                    <span className="font-medium">Memory:</span>
                    <p className="text-sm text-muted-foreground">4 GB RAM</p>
                  </div>
                </motion.li>
                <motion.li
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="mt-0.5 flex-shrink-0 rounded-full bg-green-500/20 p-1">
                    <Check className="h-4 w-4 text-green-500" />
                  </div>
                  <div>
                    <span className="font-medium">Graphics:</span>
                    <p className="text-sm text-muted-foreground">Any GPU with hardware video decoding</p>
                  </div>
                </motion.li>
              </ul>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
              <h4 className="text-lg font-medium mb-4">Recommended Requirements</h4>
              <ul className="space-y-3">
                <motion.li
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="mt-0.5 flex-shrink-0 rounded-full bg-green-500/20 p-1">
                    <Check className="h-4 w-4 text-green-500" />
                  </div>
                  <div>
                    <span className="font-medium">Internet Connection:</span>
                    <p className="text-sm text-muted-foreground">25+ Mbps download / 10+ Mbps upload</p>
                  </div>
                </motion.li>
                <motion.li
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="mt-0.5 flex-shrink-0 rounded-full bg-green-500/20 p-1">
                    <Check className="h-4 w-4 text-green-500" />
                  </div>
                  <div>
                    <span className="font-medium">Network:</span>
                    <p className="text-sm text-muted-foreground">Wired ethernet connection</p>
                  </div>
                </motion.li>
                <motion.li
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="mt-0.5 flex-shrink-0 rounded-full bg-green-500/20 p-1">
                    <Check className="h-4 w-4 text-green-500" />
                  </div>
                  <div>
                    <span className="font-medium">Display:</span>
                    <p className="text-sm text-muted-foreground">1080p or higher resolution</p>
                  </div>
                </motion.li>
                <motion.li
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <div className="mt-0.5 flex-shrink-0 rounded-full bg-green-500/20 p-1">
                    <Check className="h-4 w-4 text-green-500" />
                  </div>
                  <div>
                    <span className="font-medium">Controller:</span>
                    <p className="text-sm text-muted-foreground">Xbox, PlayStation, or other compatible controller</p>
                  </div>
                </motion.li>
              </ul>
            </motion.div>
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
          <h3 className="text-xl font-bold mb-6 gradient-text">Host Requirements</h3>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
              <h4 className="text-lg font-medium mb-4">Minimum Requirements</h4>
              <ul className="space-y-3">
                <motion.li
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="mt-0.5 flex-shrink-0 rounded-full bg-green-500/20 p-1">
                    <Check className="h-4 w-4 text-green-500" />
                  </div>
                  <div>
                    <span className="font-medium">Internet Connection:</span>
                    <p className="text-sm text-muted-foreground">25 Mbps download / 10 Mbps upload</p>
                  </div>
                </motion.li>
                <motion.li
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="mt-0.5 flex-shrink-0 rounded-full bg-green-500/20 p-1">
                    <Check className="h-4 w-4 text-green-500" />
                  </div>
                  <div>
                    <span className="font-medium">Operating System:</span>
                    <p className="text-sm text-muted-foreground">Windows 10/11 64-bit</p>
                  </div>
                </motion.li>
                <motion.li
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="mt-0.5 flex-shrink-0 rounded-full bg-green-500/20 p-1">
                    <Check className="h-4 w-4 text-green-500" />
                  </div>
                  <div>
                    <span className="font-medium">Processor:</span>
                    <p className="text-sm text-muted-foreground">Quad-core CPU @ 3.0 GHz or better</p>
                  </div>
                </motion.li>
                <motion.li
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="mt-0.5 flex-shrink-0 rounded-full bg-green-500/20 p-1">
                    <Check className="h-4 w-4 text-green-500" />
                  </div>
                  <div>
                    <span className="font-medium">Memory:</span>
                    <p className="text-sm text-muted-foreground">8 GB RAM</p>
                  </div>
                </motion.li>
                <motion.li
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="mt-0.5 flex-shrink-0 rounded-full bg-green-500/20 p-1">
                    <Check className="h-4 w-4 text-green-500" />
                  </div>
                  <div>
                    <span className="font-medium">Graphics:</span>
                    <p className="text-sm text-muted-foreground">NVIDIA GTX 1060 / AMD RX 570 or better</p>
                  </div>
                </motion.li>
              </ul>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
              <h4 className="text-lg font-medium mb-4">Recommended Requirements</h4>
              <ul className="space-y-3">
                <motion.li
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="mt-0.5 flex-shrink-0 rounded-full bg-green-500/20 p-1">
                    <Check className="h-4 w-4 text-green-500" />
                  </div>
                  <div>
                    <span className="font-medium">Internet Connection:</span>
                    <p className="text-sm text-muted-foreground">50+ Mbps download / 20+ Mbps upload</p>
                  </div>
                </motion.li>
                <motion.li
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="mt-0.5 flex-shrink-0 rounded-full bg-green-500/20 p-1">
                    <Check className="h-4 w-4 text-green-500" />
                  </div>
                  <div>
                    <span className="font-medium">Network:</span>
                    <p className="text-sm text-muted-foreground">Wired ethernet connection</p>
                  </div>
                </motion.li>
                <motion.li
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="mt-0.5 flex-shrink-0 rounded-full bg-green-500/20 p-1">
                    <Check className="h-4 w-4 text-green-500" />
                  </div>
                  <div>
                    <span className="font-medium">Processor:</span>
                    <p className="text-sm text-muted-foreground">6+ core CPU @ 3.5+ GHz</p>
                  </div>
                </motion.li>
                <motion.li
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <div className="mt-0.5 flex-shrink-0 rounded-full bg-green-500/20 p-1">
                    <Check className="h-4 w-4 text-green-500" />
                  </div>
                  <div>
                    <span className="font-medium">Memory:</span>
                    <p className="text-sm text-muted-foreground">16+ GB RAM</p>
                  </div>
                </motion.li>
                <motion.li
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <div className="mt-0.5 flex-shrink-0 rounded-full bg-green-500/20 p-1">
                    <Check className="h-4 w-4 text-green-500" />
                  </div>
                  <div>
                    <span className="font-medium">Graphics:</span>
                    <p className="text-sm text-muted-foreground">NVIDIA RTX 2070 / AMD RX 5700 XT or better</p>
                  </div>
                </motion.li>
              </ul>
            </motion.div>
          </div>
        </motion.div>
      </TabsContent>
    </Tabs>
  )
}
