"use client";

import {
  ArrowRight,
  ArrowUp,
  Camera,
  Code2,
  GitGraph,
  Github,
  Home,
  Info,
  InstagramIcon,
  Newspaper,
  Server,
  Twitter,
  User,
  X,
  YoutubeIcon,
  Eye,
  Users,
  Music
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Link } from "next-view-transitions";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import Image from "next/image";
import Hero from "@/assets/img/fab-hero.png";

export function FAB() {
  const [open, setOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [analytics, setAnalytics] = useState<{
    pageViews: number;
    uniqueVisitors: number;
    lastUpdated: string;
  } | null>(null);
  const [analyticsLoading, setAnalyticsLoading] = useState(false);

  const handleInteractOutside = (e: Event) => {
    e.preventDefault();
  };

  const handleOpen = () => {
    setOpen((prev) => {
      const newState = !prev;
      // Fetch analytics when opening the FAB
      if (newState && !analytics && !analyticsLoading) {
        fetchAnalytics();
      }
      return newState;
    });
  };

  const fetchAnalytics = async () => {
    setAnalyticsLoading(true);
    try {
      const response = await fetch('/api/analytics');
      if (response.ok) {
        const data = await response.json();
        setAnalytics(data);
      }
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
    } finally {
      setAnalyticsLoading(false);
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const trackScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", trackScroll);

    return () => {
      window.removeEventListener("scroll", trackScroll);
    };
  }, []);

  return (
    <>
      <button
        className={cn(
          "fixed bottom-20 md:bottom-25 flex items-center justify-center",
          "right-5 md:right-10 z-50 p-3 bg-background hover:bg-secondary rounded-lg",
          "text-foreground hover:text-secondary-foreground cursor-pointer",
          "border border-border transition-all outline-0",
          scrollY > 10 ? "opacity-100" : "opacity-0",
          open
            ? "translate-y-15 -translate-x-15"
            : "translate-y-0 -translate-x-0",
        )}
        onClick={handleScrollToTop}
      >
        <ArrowUp className="size-6" />
        <span className="sr-only">Scroll to top</span>
      </button>
      <Popover onOpenChange={handleOpen}>
        <PopoverTrigger asChild>
          <button
            className={cn(
              "fixed bottom-5 md:bottom-10 flex items-center justify-center",
              "right-5 z-50 md:right-10 p-3 bg-background hover:bg-secondary rounded-lg",
              "text-foreground hover:text-secondary-foreground cursor-pointer",
              "border border-border transition-colors outline-0",
            )}
          >
            <X
              className={cn(
                "size-6 transition-transform",
                open ? "rotate-0" : "rotate-45",
              )}
            />
            <span className="sr-only">Open FAB menu</span>
          </button>
        </PopoverTrigger>
        <PopoverContent
          onInteractOutside={handleInteractOutside}
          className="max-w-3xs sm:max-w-xs md:max-w-sm w-full p-0 overflow-clip"
          align="end"
          sideOffset={10}
        >
          <div className="h-auto overflow-clip w-full border-b border-border">
            <Image
              src={Hero}
              height={120}
              placeholder="blur"
              alt="FAB Hero Image"
              blurDataURL={Hero.blurDataURL}
              onLoad={() => setIsImageLoading(false)}
              className={`${isImageLoading ? "blur scale-150" : "remove-blur scale-100"
                } transition-all ease-[cubic-bezier(0.22,_1,_0.36,_1)] duration-500`}
            />
          </div>
          <h3 className="w-full flex items-center gap-3 bg-muted/20 px-4 py-2 border-b border-border font-bold">
            <span className="size-fit px-2 py-1 rounded-3xl bg-secondary text-secondary-foreground">
              <GitGraph className="size-4" />
            </span>
            <span>shenanigans. (v2.2)</span>
          </h3>
          {/* Analytics Section */}
          <div className="w-full bg-muted/10 px-4 py-3 border-b border-border">
            <div className="space-y-2">
              <div className="flex items-center gap-3 text-sm">
                <span className="size-fit px-2 py-1 rounded-3xl bg-primary/10 text-primary">
                  <Eye className="size-4" />
                </span>
                <span className="text-muted-foreground">
                  Page Views: {analyticsLoading ? (
                    <span className="inline-block w-12 h-4 bg-muted animate-pulse rounded"></span>
                  ) : (
                    <span className="font-mono font-semibold text-foreground">
                      {analytics?.pageViews.toLocaleString() || '--'}
                    </span>
                  )}
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <span className="size-fit px-2 py-1 rounded-3xl bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                  <Users className="size-4" />
                </span>
                <span className="text-muted-foreground">
                  Unique Visitors: {analyticsLoading ? (
                    <span className="inline-block w-12 h-4 bg-muted animate-pulse rounded"></span>
                  ) : (
                    <span className="font-mono font-semibold text-foreground">
                      {analytics?.uniqueVisitors.toLocaleString() || '--'}
                    </span>
                  )}
                </span>
              </div>
              {analytics && !analyticsLoading && (
                <div className="text-xs text-muted-foreground/70 mt-1">
                  Updated: {new Date(analytics.lastUpdated).toLocaleTimeString()}
                </div>
              )}
            </div>
          </div>
          <Link
            className="group relative border-b border-border text-sm cursor-pointer flex items-center gap-3 px-4 py-2 hover:bg-secondary hover:text-secondary-foreground transition-colors"
            href="/"
          >
            <Home className="size-4" />
            <span>Home</span>
            <div className="absolute opacity-0 translate-x-1/2 right-4 top-1/2 -translate-y-1/2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
              <ArrowRight className="size-4" />
            </div>
          </Link>
          <Link
            className="group relative border-b border-border text-sm cursor-pointer flex items-center gap-3 px-4 py-2 hover:bg-secondary hover:text-secondary-foreground transition-colors"
            href="/blog"
          >
            <Newspaper className="size-4" />
            <span>Blog</span>
            <div className="absolute opacity-0 translate-x-1/2 right-4 top-1/2 -translate-y-1/2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
              <ArrowRight className="size-4" />
            </div>
          </Link>
          <Link
            className="group relative border-b border-border text-sm cursor-pointer flex items-center gap-3 px-4 py-2 hover:bg-secondary hover:text-secondary-foreground transition-colors"
            href="/projects"
          >
            <Code2 className="size-4" />
            <span>Projects</span>
            <div className="absolute opacity-0 translate-x-1/2 right-4 top-1/2 -translate-y-1/2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
              <ArrowRight className="size-4" />
            </div>
          </Link>
          <Link
            className="group relative border-b border-border text-sm cursor-pointer flex items-center gap-3 px-4 py-2 hover:bg-secondary hover:text-secondary-foreground transition-colors"
            href="/playlists"
          >
            <Music className="size-4" />
            <span>Playlists</span>
            <div className="absolute opacity-0 translate-x-1/2 right-4 top-1/2 -translate-y-1/2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
              <ArrowRight className="size-4" />
            </div>
          </Link>
          <Link
            className="group relative border-b border-border text-sm cursor-pointer flex items-center gap-3 px-4 py-2 hover:bg-secondary hover:text-secondary-foreground transition-colors"
            href="/gallery"
          >
            <Camera className="size-4" />
            <span>Gallery</span>
            <div className="absolute opacity-0 translate-x-1/2 right-4 top-1/2 -translate-y-1/2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
              <ArrowRight className="size-4" />
            </div>
          </Link>
          <Link
            className="group relative border-b border-border text-sm cursor-pointer flex items-center gap-3 px-4 py-2 hover:bg-secondary hover:text-secondary-foreground transition-colors"
            href="/status"
          >
            <Server className="size-4" />
            <span>Server Status</span>
            <div className="absolute opacity-0 translate-x-1/2 right-4 top-1/2 -translate-y-1/2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
              <ArrowRight className="size-4" />
            </div>
          </Link>
          <Link
            className="group relative border-b border-border text-sm cursor-pointer flex items-center gap-3 px-4 py-2 hover:bg-secondary hover:text-secondary-foreground transition-colors"
            href="/about"
          >
            <Info className="size-4" />
            <span>About</span>
            <div className="absolute opacity-0 translate-x-1/2 right-4 top-1/2 -translate-y-1/2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
              <ArrowRight className="size-4" />
            </div>
          </Link>
          <h3 className="w-full flex items-center gap-3 bg-muted/20 px-4 py-2 border-b border-border font-semibold">
            <span className="size-fit px-2 py-1 rounded-3xl bg-secondary text-secondary-foreground">
              <User className="size-4" />
            </span>
            <span>Social</span>
          </h3>
          <a
            className="group relative border-b border-border text-sm cursor-pointer flex items-center gap-3 px-4 py-2 hover:bg-secondary hover:text-secondary-foreground transition-colors"
            href="https://youtube.com/@isaiahscape"
            target="_blank"
            rel="noopener noreferrer"
          >
            <YoutubeIcon className="size-4" />
            <span>YouTube</span>
            <div className="absolute opacity-0 translate-x-1/2 right-4 top-1/2 -translate-y-1/2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
              <ArrowRight className="size-4" />
            </div>
          </a>
          <a
            className="group relative border-b border-border text-sm cursor-pointer flex items-center gap-3 px-4 py-2 hover:bg-secondary hover:text-secondary-foreground transition-colors"
            href="https://instagram.com/isaiahscape"
            target="_blank"
            rel="noopener noreferrer"
          >
            <InstagramIcon className="size-4" />
            <span>Instagram</span>
            <div className="absolute opacity-0 translate-x-1/2 right-4 top-1/2 -translate-y-1/2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
              <ArrowRight className="size-4" />
            </div>
          </a>
          <a
            className="group relative border-b border-border text-sm cursor-pointer flex items-center gap-3 px-4 py-2 hover:bg-secondary hover:text-secondary-foreground transition-colors"
            href="https://github.com/isaiahscape"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github className="size-4" />
            <span>GitHub</span>
            <div className="absolute opacity-0 translate-x-1/2 right-4 top-1/2 -translate-y-1/2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
              <ArrowRight className="size-4" />
            </div>
          </a>
          <a
            className="group relative border-border text-sm cursor-pointer flex items-center gap-3 px-4 py-2 hover:bg-secondary hover:text-secondary-foreground transition-colors"
            href="https://x.com/isaiahscape"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Twitter className="size-4" />
            <span>X/Twitter</span>
            <div className="absolute opacity-0 translate-x-1/2 right-4 top-1/2 -translate-y-1/2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
              <ArrowRight className="size-4" />
            </div>
          </a>
        </PopoverContent>
      </Popover>
    </>
  );
}
