"use client";

import { useState, useEffect } from "react";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { BrandIcon } from "@/components/ui/BrandIcons";

interface PresenceClockProps {
  location: string;
  statusText: string;
  codename?: string;
  instagramUsername?: string;
  instagramFollowers?: number;
}

export function PresenceClock({ location, statusText, codename, instagramUsername, instagramFollowers }: PresenceClockProps) {
  const [time, setTime] = useState("");
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
          timeZone: "Asia/Manila",
        })
      );
      setSeconds(now.getSeconds());
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const formattedFollowers = instagramFollowers !== undefined
    ? instagramFollowers.toLocaleString()
    : undefined;

  const socialLinks = [
    { href: "https://youtube.com/@isaiahscape", icon: "youtube" as const, label: "YouTube", color: "text-purple-600 dark:text-purple-400" },
    { href: "https://t.me/isaiahscape", icon: "send" as const, label: "Telegram", color: "text-purple-600 dark:text-purple-400" },
    { href: "https://linkedin.com/in/isaiahscape", icon: "linkedin" as const, label: "LinkedIn", color: "text-purple-600 dark:text-purple-400" },
    { href: "https://twitch.tv/isaiahscape", icon: "twitch" as const, label: "Twitch", color: "text-purple-600 dark:text-purple-400" },
    { href: "https://tiktok.com/@isaiahscape", icon: "tiktok" as const, label: "TikTok", color: "text-purple-600 dark:text-purple-400" },
    { href: "https://github.com/thescapeplayground/shenanigans", icon: "github" as const, label: "GitHub", color: "text-purple-600 dark:text-purple-400" },
  ];

  const renderSocialIcon = (icon: string, className: string) => {
    return <BrandIcon name={icon} size="1rem" className={`shrink-0 ${className || ""}`} />;
  };

  return (
    <div className="my-8" id="presence-clock-section">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" id="presence-clock-grid">
        <div 
          className="flex items-center gap-4 p-4 rounded-xl border border-zinc-200/60 dark:border-zinc-800/50 bg-white dark:bg-zinc-900 shadow-sm"
          id="col-location-time"
        >
          <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-900">
            <MaterialIcon icon="schedule" className="text-purple-600 dark:text-purple-400" size="1.25rem" />
            <span className="absolute bottom-1 right-1 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
          </div>
          <div className="text-left">
            <p className="text-xs text-zinc-400 dark:text-zinc-500 font-mono flex items-center gap-1">
              {location}
            </p>
            <h4 className="text-base font-semibold text-zinc-800 dark:text-zinc-200 font-mono tracking-tight mt-0.5">
              {time || "12:00 AM"} <span className="text-xs text-zinc-400 dark:text-zinc-500 font-normal">({seconds}s)</span>
            </h4>
          </div>
        </div>

        <div 
          className="flex items-center gap-4 p-4 rounded-xl border border-zinc-200/60 dark:border-zinc-800/50 bg-white dark:bg-zinc-900 shadow-sm"
          id="col-current-activity"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-900">
            <MaterialIcon icon="show_chart" className="text-purple-600 dark:text-purple-400 animate-pulse" size="1.25rem" />
          </div>
          <div className="text-left overflow-hidden w-full">
            <p className="text-xs text-zinc-400 dark:text-zinc-500 font-mono flex items-center gap-1 pr-2">
              Status indicator
            </p>
            <div className="text-xs font-medium text-zinc-700 dark:text-zinc-300 truncate mt-0.5" title={statusText}>
              {statusText}
            </div>
          </div>
        </div>

        <div
          className="flex items-center justify-between p-4 rounded-xl border border-zinc-200/60 dark:border-zinc-800/50 bg-white dark:bg-zinc-900 shadow-sm"
          id="col-codename"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-900">
              <MaterialIcon icon="fingerprint" className="text-purple-600 dark:text-purple-400" size="1.25rem" />
            </div>
            <div className="text-left">
              <p className="text-xs text-zinc-400 dark:text-zinc-500 font-mono flex items-center gap-1">
                Codename
              </p>
              <p className="text-xs font-medium text-zinc-700 dark:text-zinc-300 mt-0.5 truncate" title={codename}>
                {codename || "—"}
              </p>
            </div>
          </div>
        </div>

        <a
          href={`https://instagram.com/${instagramUsername || "isaiahscape"}`}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-between p-4 rounded-xl border border-zinc-200/60 dark:border-zinc-800/50 bg-white dark:bg-zinc-900 shadow-sm hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors duration-150"
          id="col-instagram"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-900">
              <BrandIcon name="instagram" size="1.25rem" className="text-purple-600 dark:text-purple-400" />
            </div>
            <div className="text-left">
              <p className="text-xs text-zinc-400 dark:text-zinc-500 font-mono flex items-center gap-1">
                Instagram
              </p>
              {instagramUsername ? (
                <div className="mt-0.5">
                  <p className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                    @{instagramUsername}
                  </p>
                  {formattedFollowers !== undefined && (
                    <p className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400">
                      {formattedFollowers} followers
                    </p>
                  )}
                </div>
              ) : (
                <p className="text-xs font-medium text-zinc-700 dark:text-zinc-300 mt-0.5">
                  No account linked
                </p>
              )}
            </div>
          </div>
        </a>

        <div 
          className="flex items-center justify-between p-4 rounded-xl border border-zinc-200/60 dark:border-zinc-800/50 bg-white dark:bg-zinc-900 shadow-sm"
          id="col-social-links"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-900">
              <MaterialIcon icon="share" className="text-purple-600 dark:text-purple-400" size="1.25rem" />
            </div>
            <div className="text-left">
              <p className="text-xs text-zinc-400 dark:text-zinc-500 font-mono flex items-center gap-1">
                Social Links
              </p>
              <div className="flex items-center gap-3 mt-1">
                {socialLinks.map((link) => {
                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      title={link.label}
                      className={`${link.color} hover:scale-110 transition-transform duration-150`}
                    >
                      {renderSocialIcon(link.icon, link.color)}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <a
          href="https://play.isaiahthings.me"
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-between p-4 rounded-xl border border-zinc-200/60 dark:border-zinc-800/50 bg-white dark:bg-zinc-900 shadow-sm hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors duration-150 group"
          id="col-playground"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-900">
              <MaterialIcon icon="sports_esports" className="text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform duration-200" size="1.25rem" />
            </div>
            <div className="text-left">
              <p className="text-xs text-zinc-400 dark:text-zinc-500 font-mono flex items-center gap-1">
                Playground
              </p>
              <p className="text-xs font-medium text-zinc-700 dark:text-zinc-300 mt-0.5 font-mono">
                play.isaiahthings.me
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1 text-zinc-400 group-hover:text-purple-600 transition-colors">
            <MaterialIcon icon="north_east" size="0.875rem" />
          </div>
        </a>
      </div>
    </div>
  );
}

export default PresenceClock;