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
          className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-purple-700 data-[state=active]:text-primary-foreground"
        >
          <div className="flex items-center gap-2">
            <Laptop className="h-4 w-4" />
            <span>For Gamers</span>
          </div>
        </TabsTrigger>
        <TabsTrigger
          value="hosts"
          className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-pink-700 data-[state=active]:text-primary-foreground"
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
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-purple-700 opacity-70"></div>
          <h3 className="text-xl font-bold mb-6 gradient-text">Gamer Requirements</h3>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
              <h4 className="text-lg font-medium mb-4">Minimum Requirements</h4>
              <ul className="space-y-3">
                {["Internet Connection", "Operating System", "Processor", "Memory", "Graphics"].map((item, idx) => (
                  <motion.li
                    key={idx}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + idx * 0.1 }}
                  >
                    <div className="mt-0.5 flex-shrink-0 rounded-full bg-primary/10 p-1">
                      <Check className="h-4 w-4 text-primary/80" />
                    </div>
                    <div>
                      <span className="font-medium">{item}:</span>
                      <p className="text-sm text-muted-foreground">
                        {item === "Internet Connection" ? "10 Mbps download / 5 Mbps upload" :
                        item === "Operating System" ? "Windows 10 or higher" :
                        item === "Processor" ? "Dual-core CPU @ 2.0 GHz or better" :
                        item === "Memory" ? "4 GB RAM" :
                        "Any GPU with hardware video decoding"}
                      </p>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
              <h4 className="text-lg font-medium mb-4">Recommended Requirements</h4>
              <ul className="space-y-3">
                {["Internet Connection", "Network", "Display", "Input Device"].map((item, idx) => (
                  <motion.li
                    key={idx}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + idx * 0.1 }}
                  >
                    <div className="mt-0.5 flex-shrink-0 rounded-full bg-primary/10 p-1">
                      <Check className="h-4 w-4 text-primary/80" />
                    </div>
                    <div>
                      <span className="font-medium">{item}:</span>
                      <p className="text-sm text-muted-foreground">
                        {item === "Internet Connection" ? "25+ Mbps download / 10+ Mbps upload" :
                        item === "Network" ? "Wired ethernet connection" :
                        item === "Display" ? "1080p or higher resolution" :
                        "Mouse and Keyboard (For Now!)"}
                      </p>
                    </div>
                  </motion.li>
                ))}
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
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 to-pink-700 opacity-70"></div>
          <h3 className="text-xl font-bold mb-6 gradient-text">Host Requirements</h3>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
              <h4 className="text-lg font-medium mb-4">Minimum Requirements</h4>
              <ul className="space-y-3">
                {["Internet Connection", "Operating System", "Processor", "Memory", "Graphics Card", "Storage"].map((item, idx) => (
                  <motion.li
                    key={idx}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + idx * 0.1 }}
                  >
                    <div className="mt-0.5 flex-shrink-0 rounded-full bg-primary/10 p-1">
                      <Check className="h-4 w-4 text-primary/80" />
                    </div>
                    <div>
                      <span className="font-medium">{item}:</span>
                      <p className="text-sm text-muted-foreground">
                        {item === "Internet Connection" ? "25 Mbps download / 10 Mbps upload" :
                        item === "Operating System" ? "Windows 10/11 64-bit" :
                        item === "Processor" ? "Quad-core CPU @ 3.0 GHz or better" :
                        item === "Memory" ? "8 GB RAM" :
                        item === "Graphics Card" ? "NVIDIA GTX 1060 / AMD RX 580 or equivalent (DX11 required)" :
                        "Sufficient space for games hosted"}
                      </p>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
              <h4 className="text-lg font-medium mb-4">Recommended Requirements</h4>
              <ul className="space-y-3">
                {["Internet Connection", "Processor", "Memory", "Graphics Card", "Storage"].map((item, idx) => (
                  <motion.li
                    key={idx}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + idx * 0.1 }}
                  >
                    <div className="mt-0.5 flex-shrink-0 rounded-full bg-primary/10 p-1">
                      <Check className="h-4 w-4 text-primary/80" />
                    </div>
                    <div>
                      <span className="font-medium">{item}:</span>
                      <p className="text-sm text-muted-foreground">
                        {item === "Internet Connection" ? "50+ Mbps download / 20+ Mbps upload (Fiber optic recommended)" :
                        item === "Processor" ? "Intel Core i7 / AMD Ryzen 7 (latest generations)" :
                        item === "Memory" ? "16 GB RAM or more" :
                        item === "Graphics Card" ? "NVIDIA RTX 30-series / AMD RX 6000-series or better" :
                        "NVMe SSD for faster game loading"}
                      </p>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </motion.div>
      </TabsContent>
    </Tabs>
  )
}
