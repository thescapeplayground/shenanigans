"use client";

import { motion } from "motion/react";

export function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-zinc-50 dark:bg-black flex items-center justify-center"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.6, 
          ease: [0.16, 1, 0.3, 1] 
        }}
        className="flex flex-col items-center gap-6"
      >
        <motion.span
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            delay: 0.2, 
            duration: 0.5,
            ease: "easeOut"
          }}
          className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 font-sans"
        >
          Leonardo
        </motion.span>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex gap-2"
        >
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              animate={{ 
                opacity: [0.3, 1, 0.3],
                scale: [0.8, 1.2, 0.8]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 1.4, 
                delay: i * 0.2,
                ease: "easeInOut"
              }}
              className="h-2 w-2 rounded-full bg-zinc-900 dark:bg-zinc-100"
            />
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}