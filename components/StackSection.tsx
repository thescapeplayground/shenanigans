"use client";

import React, { useState } from "react";
import { StackItem } from "@/src/types";
import { 
  Code2, 
  Terminal, 
  Cpu, 
  Palette, 
  Activity, 
  Server, 
  Github, 
  Laptop, 
  PenTool, 
  Music, 
  Keyboard, 
  Boxes,
  Settings,
  Smartphone,
  Headphones,
  Mouse,
  ChevronDown,
  ChevronUp,
  FileText,
  Sliders,
  Database,
  Monitor
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger 
} from "@/components/ui/tooltip";

interface StackSectionProps {
  stack: StackItem[];
}

interface SpecItem {
  label: string;
  value: string;
}

export function StackSection({ stack }: StackSectionProps) {
  // Device toggle state
  const [openDevice, setOpenDevice] = useState<string | null>(null);

  const toggleDevice = (id: string) => {
    setOpenDevice(openDevice === id ? null : id);
  };

  // Helper to map dynamic icon name strings to Lucide elements
  const getIconElement = (name: string) => {
    switch (name) {
      case "Code2":
        return <Code2 className="w-5 h-5 text-red-500 dark:text-red-400" />;
      case "Terminal":
        return <Terminal className="w-5 h-5 text-red-500 dark:text-red-400" />;
      case "Cpu":
        return <Cpu className="w-5 h-5 text-red-500 dark:text-red-400" />;
      case "Palette":
        return <Palette className="w-5 h-5 text-red-500 dark:text-red-400" />;
      case "Activity":
        return <Activity className="w-5 h-5 text-red-500 dark:text-red-400" />;
      case "Server":
        return <Server className="w-5 h-5 text-red-500 dark:text-red-400" />;
      case "Github":
        return <Github className="w-5 h-5 text-red-500 dark:text-red-400" />;
      case "Laptop":
        return <Laptop className="w-5 h-5 text-red-500 dark:text-red-400" />;
      case "PenTool":
        return <PenTool className="w-5 h-5 text-red-500 dark:text-red-400" />;
      case "Music":
        return <Music className="w-5 h-5 text-red-500 dark:text-red-400" />;
      case "Keyboard":
        return <Keyboard className="w-5 h-5 text-red-500 dark:text-red-400" />;
      default:
        return <Boxes className="w-5 h-5 text-red-500 dark:text-red-400" />;
    }
  };

  const softwareStack = stack.filter(item => item.category !== 'hardware');

  // Hardcoded device specifications for interactive dropdown checkups
  const s24Specs: SpecItem[] = [
    { label: "Display", value: "6.2\" Dynamic AMOLED 2X, FHD+, 120Hz Variable Refresh" },
    { label: "SoC System", value: "Samsung Exynos 2400 (4nm) Deca-Core Processing" },
    { label: "Memory", value: "8GB LPDDR5X RAM + 256GB High-Speed UFS 4.0 Storage" },
    { label: "Battery Unit", value: "4,000 mAh with Intelligent battery management & 25W Charging" },
    { label: "Camera Cluster", value: "50MP Wide OIS + 10MP Telephoto OIS + 12MP Ultrawide" },
    { label: "Operating OS", value: "Android 16 with One UI 8.5" }
  ];

  const gamingSpecs: SpecItem[] = [
    { label: "Processor (CPU)", value: "AMD Ryzen 7 5700X3D (8 Cores, 16 Threads, 4.1GHz Max Boost)" },
    { label: "Graphics (GPU)", value: "ASUS Dual GeForce RTX 4060 OC 8GB GDDR6" },
    { label: "Motherboard", value: "MSI MAG B550 Tomahawk" },
    { label: "System RAM", value: "32GB Kingston FURY Beast DDR4" },
    { label: "Main Storage", value: "1TB Samsung EVO 990 NVMe M.2" },
    { label: "Power Supply", value: "MSI MAG A850GL PCIE5.0 850W 80+ GOLD GEN 5" }
  ];

  const lenovoSpecs: SpecItem[] = [
    { label: "Processor", value: "AMD Ryzen 5 7530U Series (6 Cores, 12 Threads, up to 4.5GHz)" },
    { label: "Graphics", value: "AMD Radeon RX Vega Integrated Graphics pipeline" },
    { label: "Memory Type", value: "16GB Dual-Channel high efficiency DDR4-3200" },
    { label: "Solid Storage", value: "512GB M.2 Solid State Drive PCIe 4.0x4 NVMe" },
    { label: "Screen Panel", value: "15.6\" FHD (1920x1080) anti-glare vibrant display panel" },
    { label: "Accessories", value: "Secure fingerprint reader, HD Camera with privacy shutter" }
  ];

  // Animation constants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    show: { opacity: 1, scale: 1, transition: { type: "spring" as const, stiffness: 100, damping: 15 } }
  };

  return (
    <TooltipProvider delay={150}>
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="space-y-10 py-4 text-left font-sans"
        id="stack-section-container"
      >
        {/* Header Block */}
        <div className="space-y-2" id="stack-header">
          <h2 className="text-2xl font-bold tracking-tight text-neutral-950 dark:text-neutral-50 flex items-center gap-2">
            Devices & Toolbox
          </h2>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 max-w-xl">
            A curated record of custom hardware configurations, dynamic workspace kits, and core software tools.
          </p>
        </div>

        {/* SECTION 1: Devices and Kits (gadgets.md layout) */}
        <div className="space-y-4" id="gadgets-markdown-group">
          <div 
            className="w-full rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 overflow-hidden shadow-xs"
            id="gadgets-editor-frame"
          >
            {/* Header tab */}
            <div 
              className="flex items-center gap-2 px-4 py-3 bg-zinc-50 dark:bg-zinc-900/50 border-b border-zinc-200 dark:border-zinc-800/80"
              id="gadgets-editor-header"
            >
              <FileText className="w-4 h-4 text-red-500 dark:text-red-400" />
              <span className="font-mono text-xs font-semibold text-zinc-600 dark:text-zinc-400 tracking-tight">
                gadgets.md
              </span>
            </div>

            {/* Contents block matching screenshot */}
            <div className="p-5 space-y-6" id="gadgets-editor-contents">
              
              {/* Devices Category */}
              <div className="space-y-3" id="gadgets-category-devices">
                <h3 className="text-xs font-mono font-medium tracking-wider text-zinc-400 dark:text-zinc-500 uppercase">
                  Devices
                </h3>

                <div className="space-y-2.5" id="devices-toggles-container">
                  {/* Samsung Galaxy S24 5G Accordion */}
                  <div 
                    className="border border-zinc-100 dark:border-zinc-800/60 rounded-xl bg-zinc-50/50 dark:bg-zinc-900/10 overflow-hidden transition-all duration-200 hover:border-zinc-200 dark:hover:border-zinc-800"
                    id="device-card-samsung"
                  >
                    <button
                      onClick={() => toggleDevice("s24")}
                      className="w-full flex items-center justify-between p-4 text-left focus:outline-none cursor-pointer"
                      id="device-toggle-s24"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-90 w-10 h-10 flex items-center justify-center border border-zinc-200/50 dark:border-zinc-800/40 shrink-0">
                          <Smartphone className="w-5 h-5 text-red-500 dark:text-red-400" />
                        </div>
                        <a
                          href="https://www.samsung.com/ph/smartphones/galaxy-s24/"
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-sm font-bold text-zinc-800 dark:text-zinc-200 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                        >
                          Samsung Galaxy S24 5G
                        </a>
                      </div>
                      {openDevice === "s24" ? (
                        <ChevronUp className="w-4 h-4 text-red-500 dark:text-red-400" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-red-500 dark:text-red-400" />
                      )}
                    </button>

                    <AnimatePresence>
                      {openDevice === "s24" && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="border-t border-zinc-100 dark:border-zinc-800/60 bg-white/50 dark:bg-zinc-950/40"
                          id="device-specs-samsung"
                        >
                          <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 text-xs">
                            {s24Specs.map((spec) => (
                              <div key={spec.label} className="flex flex-col gap-0.5 py-1">
                                <span className="font-mono text-[10px] text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">{spec.label}</span>
                                <span className="font-medium text-zinc-700 dark:text-zinc-300">{spec.value}</span>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Gaming Specifications Accordion */}
                  <div 
                    className="border border-zinc-100 dark:border-zinc-800/60 rounded-xl bg-zinc-50/50 dark:bg-zinc-900/10 overflow-hidden transition-all duration-200 hover:border-zinc-200 dark:hover:border-zinc-800"
                    id="device-card-gaming"
                  >
                    <button
                      onClick={() => toggleDevice("gaming")}
                      className="w-full flex items-center justify-between p-4 text-left focus:outline-none cursor-pointer"
                      id="device-toggle-gaming"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-90 w-10 h-10 flex items-center justify-center border border-zinc-200/50 dark:border-zinc-800/40 shrink-0">
                          <Cpu className="w-5 h-5 text-red-500 dark:text-red-400" />
                        </div>
                        <span className="text-sm font-bold text-zinc-800 dark:text-zinc-200">
                          Gaming Specifications
                        </span>
                      </div>
                      {openDevice === "gaming" ? (
                        <ChevronUp className="w-4 h-4 text-red-500 dark:text-red-400" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-red-500 dark:text-red-400" />
                      )}
                    </button>

                    <AnimatePresence>
                      {openDevice === "gaming" && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="border-t border-zinc-100 dark:border-zinc-800/60 bg-white/50 dark:bg-zinc-950/40"
                          id="device-specs-gaming"
                        >
                          <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 text-xs">
                            {gamingSpecs.map((spec) => (
                              <div key={spec.label} className="flex flex-col gap-0.5 py-1">
                                <span className="font-mono text-[10px] text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">{spec.label}</span>
                                <span className="font-medium text-zinc-700 dark:text-zinc-300">{spec.value}</span>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Lenovo Ideapad Slim 3 (8th) Accordion */}
                  <div 
                    className="border border-zinc-100 dark:border-zinc-800/60 rounded-xl bg-zinc-50/50 dark:bg-zinc-900/10 overflow-hidden transition-all duration-200 hover:border-zinc-200 dark:hover:border-zinc-800"
                    id="device-card-lenovo"
                  >
                    <button
                      onClick={() => toggleDevice("lenovo")}
                      className="w-full flex items-center justify-between p-4 text-left focus:outline-none cursor-pointer"
                      id="device-toggle-lenovo"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-90 w-10 h-10 flex items-center justify-center border border-zinc-200/50 dark:border-zinc-800/40 shrink-0">
                          <Laptop className="w-5 h-5 text-red-500 dark:text-red-400" />
                        </div>
                        <a
                          href="https://www.lenovo.com/ph/en/p/laptops/ideapad/ideapad-3/ideapad-slim-3-gen-8-15-inch-amd/"
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-sm font-bold text-zinc-800 dark:text-zinc-200 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                        >
                          Lenovo Ideapad Slim 3 (8th)
                        </a>
                      </div>
                      {openDevice === "lenovo" ? (
                        <ChevronUp className="w-4 h-4 text-red-500 dark:text-red-400" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-red-500 dark:text-red-400" />
                      )}
                    </button>

                    <AnimatePresence>
                      {openDevice === "lenovo" && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="border-t border-zinc-100 dark:border-zinc-800/60 bg-white/50 dark:bg-zinc-950/40"
                          id="device-specs-lenovo"
                        >
                          <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 text-xs">
                            {lenovoSpecs.map((spec) => (
                              <div key={spec.label} className="flex flex-col gap-0.5 py-1">
                                <span className="font-mono text-[10px] text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">{spec.label}</span>
                                <span className="font-medium text-zinc-700 dark:text-zinc-300">{spec.value}</span>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              {/* Kits Category */}
              <div className="space-y-3" id="gadgets-category-kits">
                <h3 className="text-xs font-mono font-medium tracking-wider text-zinc-400 dark:text-zinc-500 uppercase">
                  Kits
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5" id="kits-grid-container">
                  {/* Kit Item 1 */}
                  <a
                    href="https://www.linsoul.com/products/simgot-ew300"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-start gap-4 p-4 rounded-xl border border-zinc-100 dark:border-zinc-800/60 bg-zinc-50/20 dark:bg-zinc-900/5 hover:border-zinc-200 dark:hover:border-zinc-800 transition-colors"
                    id="kit-card-truthear"
                  >
                    <div className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-90 w-10 h-10 flex items-center justify-center border border-zinc-200/50 dark:border-zinc-800/40 shrink-0">
                      <Headphones className="w-5 h-5 text-red-500 dark:text-red-400" />
                    </div>
                    <div className="space-y-1 text-left min-w-0">
                      <h4 className="text-sm font-bold text-zinc-800 dark:text-zinc-200 leading-tight truncate">
                        Simgot EW300 1DD + 1 Planar + 1PZT Tribrid Driver IEMs
                      </h4>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-mono">
                        TRN T2 16 Core, Kinera Celest Ruyi Pro
                      </p>
                    </div>
                  </a>

                  {/* Kit Item 2 */}
                  <a
                    href="https://trn-audio.com/trn-black-pearl.html"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-start gap-4 p-4 rounded-xl border border-zinc-100 dark:border-zinc-800/60 bg-zinc-50/20 dark:bg-zinc-900/5 hover:border-zinc-200 dark:hover:border-zinc-800 transition-colors"
                    id="kit-card-tbk"
                  >
                    <div className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-90 w-10 h-10 flex items-center justify-center border border-zinc-200/50 dark:border-zinc-800/40 shrink-0">
                      <Sliders className="w-5 h-5 text-red-500 dark:text-red-400" />
                    </div>
                    <div className="space-y-1 text-left min-w-0">
                      <h4 className="text-sm font-bold text-zinc-800 dark:text-zinc-200 leading-tight truncate">
                        TRN Black Pearl
                      </h4>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-mono">
                        C43131 DAC, CB5100 Amplifier + 8-Band EQ
                      </p>
                    </div>
                  </a>

                  {/* Kit Item 3 */}
                  <a
                    href="https://www.pulsar.gg/products/tenz-signature-edition"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-start gap-4 p-4 rounded-xl border border-zinc-100 dark:border-zinc-800/60 bg-zinc-50/20 dark:bg-zinc-900/5 hover:border-zinc-200 dark:hover:border-zinc-800 transition-colors"
                    id="kit-card-pulsar"
                  >
                    <div className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-90 w-10 h-10 flex items-center justify-center border border-zinc-200/50 dark:border-zinc-800/40 shrink-0">
                      <Mouse className="w-5 h-5 text-red-500 dark:text-red-400" />
                    </div>
                    <div className="space-y-1 text-left min-w-0">
                      <h4 className="text-sm font-bold text-zinc-800 dark:text-zinc-200 leading-tight truncate">
                        Pulsar's TenZ Signature Edition
                      </h4>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-mono">
                        XS-1 Sensor, 32,000 DPI, 8K PR
                      </p>
                    </div>
                  </a>

                  {/* Kit Item 4 */}
                  <div 
                    className="flex items-start gap-4 p-4 rounded-xl border border-zinc-100 dark:border-zinc-800/60 bg-zinc-50/20 dark:bg-zinc-900/5 hover:border-zinc-200 dark:hover:border-zinc-800 transition-colors"
                    id="kit-card-aula"
                  >
                    <div className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-90 w-10 h-10 flex items-center justify-center border border-zinc-200/50 dark:border-zinc-800/40 shrink-0">
                      <Keyboard className="w-5 h-5 text-red-500 dark:text-red-400" />
                    </div>
                    <div className="space-y-1 text-left min-w-0">
                      <h4 className="text-sm font-bold text-zinc-800 dark:text-zinc-200 leading-tight truncate">
                        Aula F75
                      </h4>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-mono">
                        75% Wireless Gasket Mounted Keyboard
                      </p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* SECTION 2: Development Stack / Technical Skills (under device details) */}
        <div className="space-y-4" id="tech-stack-group">
          <h3 className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest font-mono flex items-center gap-1.5">
            <Settings className="w-3.5 h-3.5" /> Technical Skills
          </h3>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3" id="tech-skills-grid">
            {softwareStack.map((item) => (
              <React.Fragment key={item.name}>
                <Tooltip>
                  <TooltipTrigger
                    render={
                      <motion.div
                        variants={itemVariants}
                        className="flex items-center gap-3 p-3 rounded-xl border border-zinc-200/50 dark:border-zinc-800/40 bg-zinc-50/50 dark:bg-zinc-900/10 hover:border-zinc-300 dark:hover:border-zinc-700/80 transition-colors duration-200 cursor-help"
                        id={`stack-item-${item.name.replace(/\s+/g, '-').toLowerCase()}`}
                      />
                    }
                  >
                    <div className="p-1.5 rounded-lg bg-white dark:bg-zinc-950 border border-zinc-100/80 dark:border-zinc-800/80 shadow-xs">
                      {getIconElement(item.iconName)}
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 leading-tight">
                        {item.name}
                      </h4>
                      <p className="text-[10px] font-mono text-zinc-400 dark:text-zinc-500 capitalize leading-tight">
                        {item.category}
                      </p>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="bg-zinc-950 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-950 rounded-lg px-2.5 py-1 text-xs font-mono border-none shadow-md">
                    Level: {item.level || "Highly Capable"}
                  </TooltipContent>
                </Tooltip>
              </React.Fragment>
            ))}
          </div>
        </div>
      </motion.div>
    </TooltipProvider>
  );
}
export default StackSection;