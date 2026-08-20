"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { LoadingScreen } from "@/components/LoadingScreen";
import { ThemeToggle } from "@/components/ThemeToggle";
import { PageTransition } from "@/components/PageTransition";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";

const navItems = [
  { id: "home", label: "Home", href: "/", icon: "home" },
  { id: "about", label: "About", href: "/about", icon: "person" },
  { id: "projects", label: "Projects", href: "/projects", icon: "folder" },
  { id: "stack", label: "Toolbox", href: "/stack", icon: "memory" },
  { id: "gallery", label: "Gallery", href: "/gallery", icon: "image" },
  { id: "services", label: "Services", href: "/services", icon: "build" },
  { id: "contact", label: "Collaborate", href: "/contact", icon: "mail" },
  { id: "blog", label: "Blog", href: "/blog", icon: "article" },
];

function resolveActiveTab(pathname: string): string {
  if (pathname === "/") return "home";
  return pathname.replace(/^\//, "");
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const [showApp, setShowApp] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const pathname = usePathname();
  const activeTab = resolveActiveTab(pathname);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setShowApp(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <SmoothScrollProvider>
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
            <div
              className="min-h-screen bg-zinc-50/50 dark:bg-black text-neutral-900 dark:text-neutral-100 flex flex-col justify-between selection:bg-purple-500/15 transition-colors duration-200"
              id="main-app-container"
            >
              <header
                className="sticky top-0 z-40 w-full border-b border-zinc-200/40 dark:border-zinc-800/20 bg-white/70 dark:bg-black/70 backdrop-blur-md"
                id="top-floating-header"
              >
                <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between" id="header-content-inner">
                  <Link
                    href="/"
                    className="flex items-center gap-2 cursor-pointer group select-none"
                    id="brand-logo"
                  >
                    <img src="/favicon.svg" alt="Logo" className="w-6 h-6 dark:invert" />
                    <span className="text-medium tracking-tight font-bold text-zinc-900 dark:text-zinc-100">
                      Leonardo's Terrace
                    </span>
                  </Link>
                  <div className="flex items-center gap-2" id="action-tools-panel">
                    <ThemeToggle />
                  </div>
                </div>
              </header>

              <main className="flex-1 max-w-[1800px] mx-auto w-full px-4 sm:px-6 lg:px-8 pt-8 pb-24 md:pb-16" id="core-content-stage">
                <PageTransition>{children}</PageTransition>
              </main>

              {/* Floating Action Button Navigation (notayan.in design) */}
              <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 pointer-events-auto" ref={menuRef} id="fab-nav-container">
                <AnimatePresence>
                  {menuOpen && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9, y: 12 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, y: 12 }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                      className="w-64 p-3 rounded-2xl bg-white/90 dark:bg-zinc-950/90 border border-zinc-200/80 dark:border-zinc-800/80 shadow-2xl backdrop-blur-xl flex flex-col gap-2 origin-bottom-right overflow-hidden"
                      id="fab-menu-card"
                    >
                      <div className="flex flex-col gap-1 max-h-[60vh] overflow-y-auto p-1">
                        {navItems.map((item) => {
                          const isActive = activeTab === item.id;
                          return (
                            <Link
                              key={item.id}
                              href={item.href}
                              className={`flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium transition-all duration-150 group ${
                                isActive
                                  ? "bg-purple-500/10 text-purple-600 dark:text-purple-400 font-semibold"
                                  : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-purple-600 dark:hover:text-purple-400"
                              }`}
                            >
                              <div className="flex items-center gap-2.5">
                                <MaterialIcon
                                  icon={item.icon}
                                  size="1.15rem"
                                  className={isActive ? "text-purple-600 dark:text-purple-400" : "text-zinc-400 group-hover:text-purple-500"}
                                />
                                <span>{item.label}</span>
                              </div>
                              {isActive ? (
                                <span className="w-1.5 h-1.5 rounded-full bg-purple-600 dark:bg-purple-400" />
                              ) : (
                                <MaterialIcon icon="arrow_forward" size="0.9rem" className="opacity-0 group-hover:opacity-100 transition-opacity text-zinc-400" />
                              )}
                            </Link>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex items-center gap-2">
                  <AnimatePresence>
                    {showScrollTop && (
                      <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        onClick={handleScrollTop}
                        className="w-12 h-12 aspect-square rounded-2xl bg-white/80 dark:bg-zinc-900/80 border border-zinc-200/80 dark:border-zinc-800/80 text-neutral-800 dark:text-neutral-200 shadow-xl backdrop-blur-md hover:bg-purple-600 hover:text-white dark:hover:bg-purple-600 dark:hover:text-white transition-all duration-200 cursor-pointer flex items-center justify-center shrink-0"
                        aria-label="Scroll to top"
                      >
                        <MaterialIcon icon="arrow_upward" size="1.25rem" />
                      </motion.button>
                    )}
                  </AnimatePresence>

                  <button
                    onClick={() => setMenuOpen((prev) => !prev)}
                    className={`w-12 h-12 aspect-square rounded-2xl border shadow-xl backdrop-blur-xl transition-all duration-300 cursor-pointer flex items-center justify-center shrink-0 ${
                      menuOpen
                        ? "bg-purple-600 text-white border-purple-600 shadow-purple-500/20"
                        : "bg-white/80 dark:bg-zinc-900/80 text-neutral-900 dark:text-neutral-100 border-zinc-200/80 dark:border-zinc-800/80 hover:border-purple-500/40 hover:text-purple-600 dark:hover:text-purple-400"
                    }`}
                    aria-label="Toggle navigation menu"
                  >
                    <motion.div
                      animate={{ rotate: menuOpen ? 90 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center justify-center"
                    >
                      <MaterialIcon icon={menuOpen ? "close" : "grid_view"} size="1.35rem" />
                    </motion.div>
                  </button>
                </div>
              </div>

              <footer
                className="text-center py-6 border-t border-zinc-200/20 dark:border-zinc-800/20 max-w-[1800px] mx-auto w-full px-4 sm:px-6 lg:px-8 text-xs font-mono text-zinc-400 dark:text-zinc-600 flex flex-col sm:flex-row justify-between items-center gap-2 shrink-0"
                id="app-credit-footer"
              >
                <p>&copy; 2026 The Scape Series: Playground</p>
                <div className="flex gap-4">
                  <a href="https://github.com/thescapeplayground/shenanigans" target="_blank" rel="noreferrer" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                    repository
                  </a>
                </div>
              </footer>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </SmoothScrollProvider>
  );
}