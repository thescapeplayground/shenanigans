"use client";

import { useState, useEffect } from "react";
import { Clock, MapPin, Radio, Activity, Github, Instagram, Youtube, MessageCircle, Linkedin, Twitch, Music2, MailCheck, MailX, Fingerprint, Share2 } from "lucide-react";

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
  const [resendStatus, setResendStatus] = useState<{ connected: boolean; message: string } | null>(null);
  const [resendChecking, setResendChecking] = useState(true);

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

  useEffect(() => {
    fetch("/api/resend-status")
      .then((res) => res.json())
      .then((data) => {
        setResendStatus(data);
        setResendChecking(false);
      })
      .catch(() => {
        setResendStatus({ connected: false, message: "Could not check email service." });
        setResendChecking(false);
      });
  }, []);

  const formattedFollowers = instagramFollowers !== undefined
    ? instagramFollowers.toLocaleString()
    : undefined;
  const socialLinks = [
    { href: "https://youtube.com/@isaiahscape", icon: Youtube, label: "YouTube", color: "text-red-500" },
    { href: "https://t.me/isaiahscape", icon: MessageCircle, label: "Telegram", color: "text-sky-500" },
    { href: "https://linkedin.com/in/isaiahscape", icon: Linkedin, label: "LinkedIn", color: "text-blue-600" },
    { href: "https://twitch.tv/isaiahscape", icon: Twitch, label: "Twitch", color: "text-purple-500" },
    { href: "https://tiktok.com/@isaiahscape", icon: Music2, label: "TikTok", color: "text-zinc-900 dark:text-zinc-100" },
    { href: "https://github.com/thescapeplayground/shenanigans", icon: Github, label: "GitHub", color: "text-zinc-800 dark:text-zinc-200" },
  ];

  return (
    <div className="my-8" id="presence-clock-section">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" id="presence-clock-grid">
      {/* Timezone / Location Indicator */}
      <div 
        className="flex items-center gap-4 p-4 rounded-xl border border-zinc-200/60 dark:border-zinc-800/50 bg-zinc-50/50 dark:bg-zinc-900/10 backdrop-blur-sm shadow-sm"
        id="col-location-time"
      >
        <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-900 w-10 h-10">
          <Clock className="w-5 h-5 text-zinc-500 dark:text-zinc-400" />
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

      {/* Live Status Tracker */}
      <div 
        className="flex items-center gap-4 p-4 rounded-xl border border-zinc-200/60 dark:border-zinc-800/50 bg-zinc-50/50 dark:bg-zinc-900/10 backdrop-blur-sm shadow-sm"
        id="col-current-activity"
      >
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-900 w-10 h-10">
          <Activity className="w-5 h-5 text-zinc-500 dark:text-zinc-400 animate-pulse text-red-500 dark:text-red-400" />
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

      {/* Codename Card */}
      <div
        className="flex items-center justify-between p-4 rounded-xl border border-zinc-200/60 dark:border-zinc-800/50 bg-zinc-50/50 dark:bg-zinc-900/10 backdrop-blur-sm shadow-sm"
        id="col-codename"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-900">
            <Fingerprint className="w-5 h-5 text-red-500 dark:text-red-400" />
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

      {/* Instagram Card */}
      <a
        href={`https://instagram.com/${instagramUsername || "isaiahscape"}`}
        target="_blank"
        rel="noreferrer"
        className="flex items-center justify-between p-4 rounded-xl border border-zinc-200/60 dark:border-zinc-800/50 bg-zinc-50/50 dark:bg-zinc-900/10 backdrop-blur-sm shadow-sm hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors duration-150"
        id="col-instagram"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-900">
            <Instagram className="w-5 h-5 text-pink-500" />
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

      {/* Social Links Card */}
      <div 
        className="flex items-center justify-between p-4 rounded-xl border border-zinc-200/60 dark:border-zinc-800/50 bg-zinc-50/50 dark:bg-zinc-900/10 backdrop-blur-sm shadow-sm"
        id="col-social-links"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-900 w-10 h-10">
            <Share2 className="w-5 h-5 text-red-500 dark:text-red-400" />
          </div>
          <div className="text-left">
            <p className="text-xs text-zinc-400 dark:text-zinc-500 font-mono flex items-center gap-1">
              Social Links
            </p>
            <div className="flex items-center gap-3 mt-1">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    title={link.label}
                    className={`${link.color} hover:scale-110 transition-transform duration-150`}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Resend Status Card */}
      <div 
        className="flex items-center justify-between p-4 rounded-xl border border-zinc-200/60 dark:border-zinc-800/50 bg-zinc-50/50 dark:bg-zinc-900/10 backdrop-blur-sm shadow-sm"
        id="col-resend-status"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-900">
            {resendChecking ? (
              <Activity className="w-5 h-5 text-zinc-400 animate-spin" />
            ) : resendStatus?.connected ? (
              <MailCheck className="w-5 h-5 text-emerald-500" />
            ) : (
              <MailX className="w-5 h-5 text-red-500" />
            )}
          </div>
          <div className="text-left">
            <p className="text-xs text-zinc-400 dark:text-zinc-500 font-mono flex items-center gap-1">
              Email Service
            </p>
            <p className="text-xs font-medium text-zinc-700 dark:text-zinc-300 mt-0.5">
              {resendChecking
                ? "Checking connection..."
                : resendStatus?.connected
                  ? "Resend API connected"
                  : resendStatus?.message || "Not configured"}
            </p>
          </div>
        </div>
        <div className="flex-shrink-0">
          {resendChecking ? (
            <span className="inline-flex h-2 w-2 rounded-full bg-zinc-300 animate-pulse" />
          ) : resendStatus?.connected ? (
            <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          ) : (
            <span className="inline-flex h-2 w-2 rounded-full bg-red-500" />
          )}
        </div>
      </div>
    </div>
    </div>
  );
}
export default PresenceClock;
