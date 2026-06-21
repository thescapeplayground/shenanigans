"use client";

import { useState, useEffect } from "react";
import { Clock, MapPin, Radio, Activity } from "lucide-react";
import { motion } from "motion/react";

interface PresenceClockProps {
  location: string;
  statusText: string;
}

export function PresenceClock({ location, statusText }: PresenceClockProps) {
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
        })
      );
      setSeconds(now.getSeconds());
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8" id="presence-clock-grid">
      {/* Timezone / Location Indicator */}
      <div 
        className="flex items-center gap-4 p-4 rounded-xl border border-zinc-200/60 dark:border-zinc-800/50 bg-zinc-50/50 dark:bg-zinc-900/10 backdrop-blur-sm shadow-sm"
        id="col-location-time"
      >
        <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-90 w-10 h-10">
          <Clock className="w-5 h-5 text-zinc-500 dark:text-zinc-400" />
          <span className="absolute bottom-1 right-1 flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
        </div>
        <div className="text-left">
          <p className="text-xs text-zinc-400 dark:text-zinc-500 font-mono flex items-center gap-1">
            <MapPin className="w-3 h-3 h-3 text-zinc-500" /> {location}
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
          <Activity className="w-5 h-5 text-zinc-500 dark:text-zinc-400 animate-pulse text-indigo-500 dark:text-indigo-400" />
        </div>
        <div className="text-left overflow-hidden w-full">
          <p className="text-xs text-zinc-400 dark:text-zinc-500 font-mono flex items-center gap-1 pr-2">
            <Radio className="w-3 h-3 text-emerald-500" /> Status indicator
          </p>
          <div className="text-xs font-medium text-zinc-700 dark:text-zinc-300 truncate mt-0.5" title={statusText}>
            {statusText}
          </div>
        </div>
      </div>
    </div>
  );
}
export default PresenceClock;
