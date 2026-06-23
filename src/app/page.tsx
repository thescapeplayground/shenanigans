"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Home, FolderGit2, Mail, Cpu } from "lucide-react";

import { DEFAULT_PROFILE, DEFAULT_PROJECTS, DEFAULT_EXPERIENCES, DEFAULT_STACK } from "../data";

import { HomeSection } from "@/components/HomeSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { StackSection } from "@/components/StackSection";
import { ContactSection } from "@/components/ContactSection";
import { GallerySection } from "@/components/GallerySection";
import { ServicesSection } from "@/components/ServicesSection";
import { LoadingScreen } from "@/components/LoadingScreen";
import { MasonryBackground } from "@/components/MasonryBackground";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Image, Wrench } from "lucide-react";

type ActiveTab = "home" | "projects" | "stack" | "gallery" | "services" | "contact";

export default function Page() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("home");
  const [showApp, setShowApp] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowApp(true), 1400);
    return () => clearTimeout(timer);
  }, []);

  const profile = DEFAULT_PROFILE;
  const projects = DEFAULT_PROJECTS;

  const renderActiveSection = () => {
    switch (activeTab) {
      case "home":
        return <HomeSection profile={profile} experiences={DEFAULT_EXPERIENCES} />;
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
    <AnimatePresence mode="wait">
      {!showApp ? (
        <LoadingScreen key="loading" />
      ) : (
        <motion.div
          key="app"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          {activeTab === "home" && <MasonryBackground />}
          <div
            className="min-h-screen bg-zinc-50/50 dark:bg-black text-neutral-900 dark:text-neutral-100 flex flex-col justify-between selection:bg-red-500/10 transition-colors duration-200"
            id="main-app-container"
          >
            <header
              className="sticky top-0 z-40 w-full border-b border-zinc-200/40 dark:border-zinc-800/20 bg-white/70 dark:bg-black/70 backdrop-blur-md"
              id="top-floating-header"
            >
              <div className="max-w-[1440px] mx-auto px-6 py-4 flex items-center justify-between" id="header-content-inner">
                <div
                  className="flex items-center gap-2 cursor-pointer group select-none"
                  onClick={() => setActiveTab("home")}
                  id="brand-logo"
                >
                  <img src="/favicon.svg" alt="Logo" className="w-6 h-6 dark:invert" />
                  <span className="font-mono text-sm tracking-tight font-bold text-zinc-900 dark:text-zinc-100">
                    Leonardo's Terrace
                  </span>
                  <span className="text-zinc-300 dark:text-zinc-700 font-normal">/</span>
                  <span className="font-mono text-xs text-zinc-500 capitalize">{activeTab}</span>
                </div>
                <div className="flex items-center gap-2" id="action-tools-panel">
                  <ThemeToggle />
                </div>
              </div>
            </header>

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

            <div
              className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-auto max-w-[95%] sm:max-w-lg"
              id="floating-dock-row"
            >
              <nav
                className="p-1 px-1.5 sm:px-3 flex gap-0.5 sm:gap-1.5 justify-center sm:justify-start items-center rounded-full border border-red-500/20 dark:border-red-500/15 bg-white/70 dark:bg-black/65 backdrop-blur-xl shadow-[0_20px_40px_-10px_rgba(0,0,0,0.08)] dark:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)]"
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
                      {isActive && (
                        <motion.div
                          layoutId="active-island-slide"
                          className="absolute inset-0 bg-red-500/15 dark:bg-red-500/10 border border-red-500/20 rounded-full z-0"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                      <Icon
                        className={`shrink-0 z-10 transition-all duration-200 ${
                          isActive
                            ? "text-red-500 dark:text-red-400 w-3.5 h-3.5"
                            : "text-zinc-500 dark:text-zinc-400 group-hover:text-red-500 dark:group-hover:text-red-300 w-3.5 h-3.5 sm:w-4 sm:h-4"
                        }`}
                      />
                    </button>
                  );
                })}
              </nav>
            </div>

            <footer
              className="text-center py-6 border-t border-zinc-200/20 dark:border-zinc-800/20 max-w-[1440px] mx-auto w-full px-6 text-xs font-mono text-zinc-400 dark:text-zinc-600 flex flex-col sm:flex-row justify-between items-center gap-2 shrink-0"
              id="app-credit-footer"
            >
              <p>© 2026 @isaiahscape. Built with realm, shenanigans, shadcnUI.</p>
              <div className="flex gap-4">
                <a href="https://github.com/thescapeplayground/shenanigans" target="_blank" rel="noreferrer" className="hover:text-red-500 dark:hover:text-red-400">
                  repository
                </a>
              </div>
            </footer>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}