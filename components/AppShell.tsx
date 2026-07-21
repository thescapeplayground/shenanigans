"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { LoadingScreen } from "@/components/LoadingScreen";
import { ThemeToggle } from "@/components/ThemeToggle";

const navItems: { id: string; label: string; href: string; icon: string }[] = [
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

function DesktopNav({
  activeTab,
}: {
  activeTab: string;
}) {
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div
      className="fixed top-16 left-0 right-0 z-30 hidden sm:block pointer-events-none"
      initial={false}
      animate={{
        y: visible ? 0 : -60,
        opacity: visible ? 1 : 0,
      }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
    >
      <nav className="mx-auto w-fit p-1 px-1.5 flex gap-0.5 justify-center items-center rounded-full shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] pointer-events-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <Link
              key={item.id}
              href={item.href}
              className="relative flex items-center justify-center p-2.5 rounded-full transition-all group active:scale-95 cursor-pointer"
            >
              {isActive && (
                <motion.div
                  layoutId="active-island-slide-desktop"
                  className="absolute inset-0 bg-red-500/15 dark:bg-red-500/10 border border-red-500/20 rounded-full z-0"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <MaterialIcon
                icon={item.icon}
                className={`shrink-0 z-10 transition-all duration-200 ${
                  isActive
                    ? "text-red-500 dark:text-red-400"
                    : "text-zinc-500 dark:text-zinc-400 group-hover:text-red-500 dark:group-hover:text-red-300"
                }`}
                size="1.25rem"
              />
            </Link>
          );
        })}
      </nav>
    </motion.div>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const [showApp, setShowApp] = useState(false);
  const [mobileNavVisible, setMobileNavVisible] = useState(true);
  const lastScrollY = useRef(0);
  const pathname = usePathname();
  const activeTab = resolveActiveTab(pathname);

  useEffect(() => {
    const timer = setTimeout(() => setShowApp(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
        setMobileNavVisible(false);
      } else {
        setMobileNavVisible(true);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
          <div
            className="min-h-screen bg-zinc-50/50 dark:bg-black text-neutral-900 dark:text-neutral-100 flex flex-col justify-between selection:bg-red-500/10 transition-colors duration-200"
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
              {children}
            </main>

            {/* Mobile — bottom nav bar with auto-hide on scroll */}
            <motion.div
              className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-auto max-w-[95%] sm:max-w-lg pointer-events-none"
              id="floating-dock-row"
              initial={false}
              animate={{
                y: mobileNavVisible ? 0 : 100,
                opacity: mobileNavVisible ? 1 : 0,
              }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
            >
              <nav
                className="p-1 px-1.5 sm:px-3 flex gap-0.5 sm:gap-1.5 justify-center sm:justify-start items-center rounded-full border border-red-500/20 dark:border-red-500/15 bg-white/70 dark:bg-black/65 backdrop-blur-xl shadow-[0_20px_40px_-10px_rgba(0,0,0,0.08)] dark:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)] pointer-events-auto"
                id="floating-navigation-island"
              >
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <Link
                      key={item.id}
                      href={item.href}
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
                      <MaterialIcon
                        icon={item.icon}
                        className={`shrink-0 z-10 transition-all duration-200 ${
                          isActive
                            ? "text-red-500 dark:text-red-400"
                            : "text-zinc-500 dark:text-zinc-400 group-hover:text-red-500 dark:group-hover:text-red-300"
                        }`}
                        size="1.25rem"
                      />
                    </Link>
                  );
                })}
              </nav>
            </motion.div>

            <footer
              className="text-center py-6 border-t border-zinc-200/20 dark:border-zinc-800/20 max-w-[1800px] mx-auto w-full px-4 sm:px-6 lg:px-8 text-xs font-mono text-zinc-400 dark:text-zinc-600 flex flex-col sm:flex-row justify-between items-center gap-2 shrink-0"
              id="app-credit-footer"
            >
              <p>&copy; 2026 The Scape Series: Playground</p>
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