"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, Calendar, ArrowRight, Shield, CheckCircle2, AlertCircle, Plus, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';

// Placeholder data - replace with actual data from your backend
const subscriptionData = {
  plan: "Pro Host",
  status: "active",
  price: 19.99,
  billingCycle: "monthly",
  startDate: "2024-03-15",
  nextBilling: "2024-04-15",
  features: [
    "Unlimited hosting hours",
    "Priority support",
    "Advanced analytics",
    "Custom server configurations",
    "0% platform fee"
  ]
};

export const BillingsSection = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100
      }
    },
    hover: {
      scale: 1.02,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-8"
    >
      {/* Current Subscription Card */}
      <motion.div 
        variants={itemVariants}
        whileHover="hover"
        className="bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-rose-500/5 
        dark:from-orange-500/10 dark:via-purple-500/10 dark:to-pink-500/10 
        rounded-xl p-8 shadow-lg dark:shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-sm border border-gray-200 dark:border-white/10
        hover:shadow-xl dark:hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)] transition-all duration-300"
      >
        <div className="flex items-start justify-between flex-wrap gap-6">
          <div className="w-full md:w-auto">
            <div className="flex items-center gap-4 mb-6">
              <span className="bg-gradient-to-br from-purple-500 to-pink-500 p-3 rounded-xl">
                <Sparkles size={24} className="text-white" />
              </span>
              <div>
                <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-orange-500 dark:to-pink-500 bg-clip-text text-transparent">
                  {subscriptionData.plan}
                </h3>
                <p className="text-sm mt-1">
                  {subscriptionData.status === 'active' ? (
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 size={14} className="text-green-500" />
                      <span className="text-green-600 dark:text-green-500 font-medium">Active</span>
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5">
                      <AlertCircle size={14} className="text-yellow-500" />
                      <span className="text-yellow-600 dark:text-yellow-500 font-medium">Pending</span>
                    </span>
                  )}
                </p>
              </div>
            </div>

            <div> 
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-orange-500 dark:to-pink-500 bg-clip-text text-transparent">
                  ${subscriptionData.price}
                </span>
                <span className="text-gray-500 dark:text-gray-400">
                  /{subscriptionData.billingCycle}
                </span>
              </div>

              <div className="flex flex-col gap-3 text-sm">
                <motion.div 
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-2 text-gray-600 dark:text-gray-300"
                >
                  <Calendar size={16} className="text-purple-500 dark:text-orange-500" />
                  <span>Started on {new Date(subscriptionData.startDate).toLocaleDateString()}</span>
                </motion.div>
                <motion.div 
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-2 text-gray-600 dark:text-gray-300"
                >
                  <ArrowRight size={16} className="text-pink-500" />
                  <span>Next billing on {new Date(subscriptionData.nextBilling).toLocaleDateString()}</span>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main content grid */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column: Plan Features */}
        <div className="md:pl-8 border-l border-gray-200 dark:border-gray-200/10">
          <h4 className="text-sm font-medium text-gray-700 dark:text-white mb-4">Plan Features</h4>
          <ul className="space-y-3">
            {subscriptionData.features.map((feature, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ x: 5 }}
                className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300"
              >
                <Shield size={14} className="text-purple-500 dark:text-orange-500" />
                {feature}
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Right Column: Billing Summary, Buttons, and other info */}
        <div className="space-y-4">
          <div className="bg-gray-50 dark:bg-white/5 dark:dark:bg-gray-800/50 rounded-lg p-4 border border-gray-200 dark:border-gray-200/10 dark:dark:border-gray-700/10">
            <div className="space-y-3">
              <div className="flex justify-between items-center gap-12 text-sm">
                <span className="text-gray-500 dark:text-gray-400">Billing Cycle</span>
                <span className="text-gray-700 dark:text-white font-medium">Monthly</span>
              </div>
              <div className="flex justify-between items-center gap-12 text-sm">
                <span className="text-gray-500 dark:text-gray-400">Next Payment</span>
                <span className="text-gray-700 dark:text-white font-medium">${subscriptionData.price}</span>
              </div>
              <div className="flex justify-between items-center gap-12 text-sm">
                <span className="text-gray-500 dark:text-gray-400">Auto-renewal</span>
                <span className="text-green-600 dark:text-green-400 font-medium flex items-center gap-1">
                  <CheckCircle2 size={14} />
                  Enabled
                </span>
              </div>
            </div>
          </div>

          <motion.div whileHover={{ scale: 1.02 }}>
            <Button 
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 dark:from-orange-500 dark:to-pink-500 dark:hover:from-orange-600 dark:hover:to-pink-600 transition-all duration-300"
            >
              Change Plan
            </Button>
          </motion.div>

          <div className="space-y-2">
            <motion.div whileHover={{ scale: 1.02 }}>
              <Button 
                variant="outline"
                className="w-full border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400 dark:border-gray-200 dark:dark:border-gray-700 dark:hover:bg-gray-100 dark:dark:hover:bg-gray-800"
              >
                View Billing History
              </Button>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.02 }}>
              <Button 
                variant="ghost"
                className="w-full text-gray-600 hover:text-purple-600 dark:text-gray-400 dark:hover:text-white dark:hover:text-white"
              >
                Download Invoices
              </Button>
            </motion.div>
          </div>

          <div className="bg-purple-500/5 dark:bg-orange-500/5 dark:dark:bg-orange-500/10 rounded-lg p-4 border border-purple-200/20 dark:border-orange-200/10 dark:dark:border-orange-700/10">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-purple-500/10 dark:bg-orange-500/10 rounded-lg">
                <Sparkles size={16} className="text-purple-500 dark:text-orange-500" />
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-900 dark:dark:text-white">Pro Benefits</h4>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  You're saving $5.99/month with annual billing. <button className="text-purple-600 hover:text-pink-600 dark:text-orange-500 dark:hover:text-orange-600 font-medium">Learn more</button>
                </p>
              </div>
            </div>
          </div>

          <div className="text-xs text-center text-gray-500 dark:text-gray-400">
            Need help? <button className="text-purple-600 hover:text-pink-600 dark:text-orange-500 dark:hover:text-orange-600">Contact support</button>
          </div>
        </div>
      </div>

      {/* Payment Methods Section */}
      <motion.div 
        variants={itemVariants}
        whileHover="hover"
        className="bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-rose-500/5 
        dark:from-orange-500/10 dark:via-purple-500/10 dark:to-pink-500/10 
        rounded-xl p-8 shadow-lg dark:shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-sm border border-gray-200 dark:border-white/10
        hover:shadow-xl dark:hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)] transition-all duration-300"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <span className="bg-gradient-to-br from-purple-500 to-pink-500 p-3 rounded-xl">
              <CreditCard size={20} className="text-white" />
            </span>
            <h3 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-orange-500 dark:to-pink-500 bg-clip-text text-transparent">
              Payment Methods
            </h3>
          </div>
          <motion.div whileHover={{ scale: 1.05 }}>
            <Button 
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 dark:from-orange-500 dark:to-pink-500 dark:hover:from-orange-600 dark:hover:to-pink-600 transition-all duration-300"
            >
              <Plus size={16} className="mr-2" />
              Add New
            </Button>
          </motion.div>
        </div>

        <div className="space-y-4">
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-2 rounded-lg">
                <img src="/visa-icon.png" alt="Visa" className="w-8 h-8" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">•••• 4242</p>
                <p className="text-xs text-gray-500">Expires 12/25</p>
              </div>
            </div>
            <span className="px-3 py-1 text-xs bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full font-medium">
              Default
            </span>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}; 