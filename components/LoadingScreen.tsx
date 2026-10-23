"use client";

import { useEffect } from "react";
import { motion } from "motion/react";
import { LiquidGlassLogo } from "@/components/liquid-glass-logo";

export function LoadingScreen() {
  useEffect(() => {
    const isDarkStored =
      localStorage.getItem("theme") === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);
    if (isDarkStored) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="fixed inset-0 z-50 bg-black flex items-center justify-center pointer-events-auto overflow-hidden select-none"
      id="liquid-glass-loading-screen"
    >
      <div className="w-full h-full max-w-4xl max-h-[600px] flex items-center justify-center p-4">
        <LiquidGlassLogo
          logo="/public/favicon.svg"
          ending="logo"
          logoScale={1}
          finalLogoScale={0.7}
          background="#000000"
          style={{ height: 480, width: "100%" }}
        />
      </div>
    </motion.div>
  );
}
