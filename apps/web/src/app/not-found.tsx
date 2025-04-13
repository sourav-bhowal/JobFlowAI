"use client";
import { motion } from "framer-motion";
import { AlertCircle, Home } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] bg-neutral-950 flex items-center justify-center p-4">
      <div className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            duration: 0.6,
          }}
          className="flex justify-center mb-8"
        >
          <AlertCircle className="w-32 h-32 text-red-500" />
        </motion.div>

        <motion.h1
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-7xl font-bold text-white mb-4"
        >
          404
        </motion.h1>

        <motion.p
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-xl text-gray-400 mb-8"
        >
          Oops! The page you're looking for doesn't exist.
        </motion.p>

        <Link href={"/"}>
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r hover:scale-105 duration-300 transition-all from-yellow-600 to-orange-600 hover:bg-red-600 text-white px-6 py-3 rounded-lg flex items-center justify-center mx-auto space-x-2 shadow-lg"
          >
            <Home className="w-5 h-5" />
            <span>Back to Home</span>
          </motion.button>
        </Link>
      </div>
    </div>
  );
}
