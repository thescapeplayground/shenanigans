"use client";

import {
  Camera,
  Code2,
  Github,
  Home,
  Info,
  InstagramIcon,
  Newspaper,
  Server,
  Twitter,
  Settings,
  YoutubeIcon,
  Music,
  User,
  Menu // add Menu icon
} from "lucide-react";
import { usePathname } from "next/navigation";
import { Link } from "next-view-transitions";
import performanceModeAtom from "@/lib/atoms/performance-mode";
import { useAtom } from "jotai/react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

type NavItem = {
  href: string;
  label: string;
  icon: React.ReactNode;
  external?: boolean;
};

export function FAB() {
  const pathname = usePathname();
  const [performanceMode] = useAtom(performanceModeAtom);

  // Reduce icon size
  const iconSizeClass = "size-4 md:size-5";

  const baseItems: NavItem[] = [
    { href: "/", label: "Home", icon: <Home className={iconSizeClass} /> },
    { href: "/blog", label: "Blog", icon: <Newspaper className={iconSizeClass} /> },
    { href: "/projects", label: "Projects", icon: <Code2 className={iconSizeClass} /> },
    { href: "/playlists", label: "Playlists", icon: <Music className={iconSizeClass} /> },
    { href: "/gallery", label: "Gallery", icon: <Camera className={iconSizeClass} /> },
  ];

  const optionLinks: NavItem[] = [
    { href: "/status", label: "Server Status", icon: <Server className={iconSizeClass} /> },
    { href: "/settings", label: "Settings", icon: <Settings className={iconSizeClass} /> },
    { href: "/about", label: "About", icon: <Info className={iconSizeClass} /> },
  ];

  const shellClasses = [
    "fixed bottom-5 left-1/2 -translate-x-1/2 z-50",
  ].join(" ");

  const barClasses = [
    // Reduced gap, padding, and shadow
    "flex items-center gap-3 rounded-full border border-border shadow-lg",
    "px-4 py-2 whitespace-nowrap overflow-x-auto",
    "[&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']",
    performanceMode ? "bg-background"
      : "bg-background/70 backdrop-blur-md supports-[backdrop-filter]:bg-background/50"
  ].join(" ");

  // Reduce item hit area
  const itemBase =
    "flex items-center gap-2 px-2 py-1 rounded-md transition-colors";
  const itemIdle = "text-muted-foreground hover:text-foreground";
  const itemActive = "text-primary";

  const popoverClasses = [
    "p-2 border border-border rounded-xl shadow-lg",
    performanceMode
      ? "bg-background"
      : "bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/80",
    "data-[state=open]:animate-in data-[state=closed]:animate-out",
    "data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95",
    "data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0",
  ].join(" ");

  // Add animation classes for active and hover icon backgrounds
  const iconBgBase =
    "absolute inset-0 rounded-md z-0 transition-all duration-300";
  const iconBgActive =
    "bg-primary/10 scale-100 translate-x-0";
  const iconBgHoverable =
    `${iconBgBase} -translate-x-full group-hover:translate-x-0 group-hover:bg-primary/20 group-hover:scale-100`;

  return (
    <nav className={shellClasses} aria-label="Floating navigation">
      <ul className={barClasses}>
        {/* Render all base items except Gallery */}
        {baseItems.slice(0, -1).map(({ href, label, icon }) => {
          const isActive = pathname === href;
          const className = `${itemBase} relative overflow-hidden group ${isActive ? itemActive : itemIdle}`;
          return (
            <li key={href}>
              <Link
                href={href}
                className={className}
                aria-label={label}
                title={label}
              >
                <span
                  className={
                    isActive
                      ? `${iconBgBase} ${iconBgActive}`
                      : iconBgHoverable
                  }
                  aria-hidden="true"
                />
                <span className="relative z-10">{icon}</span>
              </Link>
            </li>
          );
        })}
        {/* Socials button before Gallery */}
        <li key="socials">
          <Link
            href="/socials"
            className={`${itemBase} relative overflow-hidden group ${pathname === "/socials" ? itemActive : itemIdle}`}
            aria-label="Socials"
            title="Socials"
          >
            <span
              className={
                pathname === "/socials"
                  ? `${iconBgBase} ${iconBgActive}`
                  : iconBgHoverable
              }
              aria-hidden="true"
            />
            <span className="relative z-10">
              <User className={iconSizeClass} />
            </span>
          </Link>
        </li>
        {/* Gallery button */}
        {(() => {
          const { href, label, icon } = baseItems[baseItems.length - 1];
          const isActive = pathname === href;
          const className = `${itemBase} relative overflow-hidden group ${isActive ? itemActive : itemIdle}`;
          return (
            <li key={href}>
              <Link
                href={href}
                className={className}
                aria-label={label}
                title={label}
              >
                <span
                  className={
                    isActive
                      ? `${iconBgBase} ${iconBgActive}`
                      : iconBgHoverable
                  }
                  aria-hidden="true"
                />
                <span className="relative z-10">{icon}</span>
              </Link>
            </li>
          );
        })()}
        {/* Options pop-up for mobile, separate icons for desktop */}
        <li key="options">
          <div className="block sm:hidden">
            <Popover>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  className={`${itemBase} relative overflow-hidden group ${itemIdle}`}
                  aria-haspopup="menu"
                  aria-label="Options"
                  title="Options"
                >
                  <span className={iconBgHoverable} aria-hidden="true" />
                  <span className="relative z-10">
                    <Menu className={iconSizeClass} />
                  </span>
                </button>
              </PopoverTrigger>
              <PopoverContent
                side="top"
                align="center"
                sideOffset={10}
                className={popoverClasses}
              >
                <ul className="flex flex-col gap-2">
                  {optionLinks.map(({ href, label, icon }) => (
                    <li key={href}>
                      <Link
                        href={href}
                        className="flex items-center gap-2 px-3 py-2 rounded-md text-sm hover:bg-secondary hover:text-secondary-foreground transition-colors"
                        aria-label={label}
                        title={label}
                      >
                        {icon}
                        <span>{label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </PopoverContent>
            </Popover>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            {optionLinks.map(({ href, label, icon }) => {
              const isActive = pathname === href;
              const className = `${itemBase} relative overflow-hidden group ${isActive ? itemActive : itemIdle}`;
              return (
                <Link
                  key={href}
                  href={href}
                  className={className}
                  aria-label={label}
                  title={label}
                >
                  <span
                    className={
                      isActive
                        ? `${iconBgBase} ${iconBgActive}`
                        : iconBgHoverable
                    }
                    aria-hidden="true"
                  />
                  <span className="relative z-10">{icon}</span>
                </Link>
              );
            })}
          </div>
        </li>
      </ul>
    </nav>
  );
}