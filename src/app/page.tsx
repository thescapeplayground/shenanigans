"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Home, 
  FolderGit2, 
  Mail, 
  Cpu 
} from "lucide-react";

// Types & Defaults
import { 
  DEFAULT_PROFILE, 
  DEFAULT_PROJECTS, 
  DEFAULT_EXPERIENCES, 
  DEFAULT_STACK 
} from "../data";

// Custom Section Components
import { HomeSection } from "@/components/HomeSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { StackSection } from "@/components/StackSection";
import { ContactSection } from "@/components/ContactSection";
import { GallerySection } from "@/components/GallerySection";
import { ServicesSection } from "@/components/ServicesSection";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Image, Wrench } from "lucide-react";

type ActiveTab = "home" | "projects" | "stack" | "gallery" | "services" | "contact";

export default function Page() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("home");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-black flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="flex flex-col items-center gap-4"
        >
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 font-sans"
          >
            Leonardo
          </motion.span>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.4 }}
            className="flex gap-1"
          >
            <motion.span
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ repeat: Infinity, duration: 1.2, delay: 0 }}
              className="h-1.5 w-1.5 rounded-full bg-zinc-900 dark:bg-zinc-100"
            />
            <motion.span
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ repeat: Infinity, duration: 1.2, delay: 0.2 }}
              className="h-1.5 w-1.5 rounded-full bg-zinc-900 dark:bg-zinc-100"
            />
            <motion.span
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ repeat: Infinity, duration: 1.2, delay: 0.4 }}
              className="h-1.5 w-1.5 rounded-full bg-zinc-900 dark:bg-zinc-100"
            />
          </motion.div>
        </motion.div>
      </div>
    );
  }

  const profile = DEFAULT_PROFILE;
  const projects = DEFAULT_PROJECTS;

  const renderActiveSection = () => {
    switch (activeTab) {
      case "home":
        return (
          <HomeSection 
            profile={profile} 
            experiences={DEFAULT_EXPERIENCES} 
          />
        );
      case "projects":
        return <ProjectsSection projects={projects} />;
      case "stack":
        return <StackSection stack={DEFAULT_STACK} />;
      case "gallery":
        return <GallerySection />;
      case "services":
        return <ServicesSection />;
      case "contact":
        return <ContactSection />;
      default:
        return null;
    }
  };

  const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "projects", label: "Projects", icon: FolderGit2 },
    { id: "stack", label: "Toolbox", icon: Cpu },
    { id: "gallery", label: "Gallery", icon: Image },
    { id: "services", label: "Services", icon: Wrench },
    { id: "contact", label: "Collaborate", icon: Mail },
  ];

  return (
    <div 
      className="min-h-screen bg-zinc-50/50 dark:bg-black text-neutral-900 dark:text-neutral-100 flex flex-col justify-between selection:bg-indigo-500/10 transition-colors duration-200"
      id="main-app-container"
    >
      {/* Top Header Navigation Line */}
      <header 
        className="sticky top-0 z-40 w-full border-b border-zinc-200/40 dark:border-zinc-800/20 bg-white/70 dark:bg-black/70 backdrop-blur-md"
        id="top-floating-header"
      >
        <div className="max-w-[1440px] mx-auto px-6 py-4 flex items-center justify-between" id="header-content-inner">
          {/* Logo Name block */}
          <div 
            className="flex items-center gap-1.5 cursor-pointer group select-none" 
            onClick={() => setActiveTab("home")}
            id="brand-logo"
          >
            <span className="font-mono text-sm tracking-tight font-bold text-zinc-900 dark:text-zinc-100">
              Leonardo's Terrace
            </span>
            <span className="text-zinc-300 dark:text-zinc-700 font-normal">/</span>
            <span className="font-mono text-xs text-zinc-500 capitalize">
              {activeTab}
            </span>
          </div>

          {/* Action Tools Panel (Dark/Light toggle) */}
          <div className="flex items-center gap-2" id="action-tools-panel">
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Core Content Stage */}
      <main className="flex-1 max-w-[1440px] mx-auto w-full px-6 pt-8 pb-24 md:pb-16" id="core-content-stage">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            id={`tab-content-panel-${activeTab}`}
          >
            {renderActiveSection()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Floating Bottom Navigator with Progressive Blur & Dark Transparency */}
      <div 
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-auto max-w-[95%] sm:max-w-lg"
        id="floating-dock-row"
      >
        <nav 
          className="p-1 px-1.5 sm:px-3 flex gap-0.5 sm:gap-1.5 justify-center sm:justify-start items-center rounded-full border border-zinc-200/10 dark:border-white/10 bg-black/70 dark:bg-black/65 backdrop-blur-xl shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)]"
          id="floating-navigation-island"
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as ActiveTab)}
                className="relative flex items-center justify-center p-2.5 sm:p-3 rounded-full transition-all group active:scale-95 cursor-pointer"
                id={`nav-island-btn-${item.id}`}
              >
                {/* Fully circular active container */}
                {isActive && (
                  <motion.div
                    layoutId="active-island-slide"
                    className="absolute inset-0 bg-white/10 dark:bg-white/10 border border-white/5 rounded-full z-0"
                    transition={{ type: "spring" as const, stiffness: 380, damping: 30 }}
                  />
                )}

                {/* Content */}
                <Icon className={`shrink-0 z-10 transition-all duration-200 ${
                  isActive 
                    ? "text-white w-3.5 h-3.5" 
                    : "text-zinc-400 group-hover:text-zinc-200 w-3.5 h-3.5 sm:w-4 sm:h-4"
                }`} />
              </button>
            );
          })}
        </nav>
      </div>

      {/* Standard structural tiny credit footer */}
      <footer 
        className="text-center py-6 border-t border-zinc-200/20 dark:border-zinc-800/20 max-w-[1440px] mx-auto w-full px-6 text-xs font-mono text-zinc-400 dark:text-zinc-600 flex flex-col sm:flex-row justify-between items-center gap-2 shrink-0"
        id="app-credit-footer"
      >
        <p>© 2026 @isaiahscape. Built with realm, shenanigans, shadcnUI.</p>
        <div className="flex gap-4">
          <a href="https://github.com/thescapeplayground/shenanigans" target="_blank" rel="noreferrer" className="hover:text-indigo-500 dark:hover:text-indigo-400">repository</a>
        </div>
      </footer>
    </div>
  );
}
