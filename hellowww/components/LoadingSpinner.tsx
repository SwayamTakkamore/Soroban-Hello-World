"use client";

import { motion } from "framer-motion";

export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center">
      <motion.div
        className="relative"
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      >
        <div className="w-8 h-8 border-4 border-violet-200 border-t-violet-600 rounded-full"></div>
        <motion.div
          className="absolute inset-0 w-8 h-8 border-4 border-transparent border-r-cyan-600 rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>
    </div>
  );
}
