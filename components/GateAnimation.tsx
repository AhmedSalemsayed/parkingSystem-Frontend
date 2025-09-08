"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Car, Shield } from "lucide-react";

interface GateAnimationProps {
  onComplete: () => void;
  isVisible: boolean;
}

export function GateAnimation({ onComplete, isVisible }: GateAnimationProps) {
  const [gateOpen, setGateOpen] = useState(false);

  useEffect(() => {
    if (isVisible) {
      // Start gate opening animation after a brief delay
      const timer = setTimeout(() => {
        setGateOpen(true);
        // Call onComplete after gate fully opens
        setTimeout(onComplete, 1500);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [isVisible, onComplete]);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
      >
        <div className="relative">
          {/* Gate Structure */}
          <div className="relative w-80 h-48 bg-gray-800 rounded-lg overflow-hidden border-4 border-gray-600">
            {/* Gate Posts */}
            <div className="absolute left-0 top-0 w-4 h-full bg-gray-700"></div>
            <div className="absolute right-0 top-0 w-4 h-full bg-gray-700"></div>

            {/* Gate Barrier - Left Side */}
            <motion.div
              className="absolute top-1/2 left-4 h-3 bg-red-500 origin-left"
              style={{ transformOrigin: "left center" }}
              initial={{ width: "calc(50% - 1rem)", rotate: 0 }}
              animate={
                gateOpen ? { rotate: -75, width: "calc(50% - 1rem)" } : {}
              }
              transition={{ duration: 1.2, ease: "easeInOut" }}
            >
              <div className="w-full h-full bg-gradient-to-r from-red-500 to-red-400 rounded-r-full"></div>
            </motion.div>

            {/* Gate Barrier - Right Side */}
            <motion.div
              className="absolute top-1/2 right-4 h-3 bg-red-500 origin-right"
              style={{ transformOrigin: "right center" }}
              initial={{ width: "calc(50% - 1rem)", rotate: 0 }}
              animate={
                gateOpen ? { rotate: 75, width: "calc(50% - 1rem)" } : {}
              }
              transition={{ duration: 1.2, ease: "easeInOut" }}
            >
              <div className="w-full h-full bg-gradient-to-l from-red-500 to-red-400 rounded-l-full"></div>
            </motion.div>

            {/* Security Light */}
            <motion.div
              className="absolute top-2 left-1/2 transform -translate-x-1/2 w-3 h-3 rounded-full"
              animate={
                gateOpen
                  ? { backgroundColor: "#10b981" }
                  : { backgroundColor: "#ef4444" }
              }
              transition={{ duration: 0.5 }}
            ></motion.div>

            {/* Car Icon */}
            <motion.div
              className="absolute bottom-4 left-1/2 transform -translate-x-1/2"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <Car className="w-8 h-8 text-blue-400" />
            </motion.div>
          </div>

          {/* Status Text */}
          <motion.div
            className="text-center mt-6 space-y-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center justify-center gap-2">
              <Shield className="w-5 h-5 text-blue-400" />
              <span className="text-white font-semibold">
                Parking Gate System
              </span>
            </div>
            <motion.p
              className="text-gray-300 text-sm"
              key={gateOpen ? "opening" : "processing"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {gateOpen
                ? "Gate Opening... Generating Ticket"
                : "Processing Entry..."}
            </motion.p>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
