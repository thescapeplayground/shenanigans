"use client";

import { useEffect, useState } from "react";
import { LastFmTrack } from "@/src/types";

interface LastFmWidgetProps {
  username?: string;
  initialTrack?: LastFmTrack;
}

const FALLBACK_TRACK: LastFmTrack = {
  title: "babydoll",
  artist: "boywithuke",
  album: "Lucid Dreams",
  imageUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&h=300&fit=crop",
  url: "https://www.last.fm/user/isaiahthings",
  isNowPlaying: false,
};

export function LastFmWidget({ username = "isaiahthings", initialTrack }: LastFmWidgetProps) {
  const [track, setTrack] = useState<LastFmTrack>(initialTrack || FALLBACK_TRACK);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const fetchTrack = async () => {
      try {
        const res = await fetch(`/api/lastfm?username=${encodeURIComponent(username)}`);
        if (!res.ok) return;
        const data = await res.json();
        if (isMounted && data?.title) {
          setTrack(data);
        }
      } catch {
        // Fallback remains active
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchTrack();
    const interval = setInterval(fetchTrack, 30000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [username]);

  return (
    <div
      className="group relative overflow-hidden rounded-2xl border border-zinc-200/70 dark:border-zinc-800/70 bg-white/70 dark:bg-zinc-950/60 backdrop-blur-sm p-6 sm:p-7 shadow-sm transition-all duration-300 hover:border-purple-500/40 dark:hover:border-purple-500/40 hover:shadow-md flex flex-col justify-between min-h-[220px]"
      id="lastfm-widget-card"
    >
      <div className="flex items-start justify-between gap-4 z-10">
        <div className="space-y-1.5 max-w-[calc(100%-100px)]">
          <div className="flex items-center gap-2">
            {track.isNowPlaying ? (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium tracking-wide uppercase bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                now playing
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium tracking-wide uppercase bg-zinc-100 dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400 border border-zinc-200/50 dark:border-zinc-800/50">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-zinc-600" />
                last played
              </span>
            )}
          </div>

          <h3
            className="text-lg sm:text-xl font-bold font-sans tracking-tight text-neutral-900 dark:text-neutral-50 truncate"
            title={track.title}
          >
            {track.title}
          </h3>
          <p className="text-xs sm:text-sm font-sans text-neutral-500 dark:text-neutral-400 truncate" title={track.artist}>
            {track.artist}
          </p>
        </div>

        <div className="relative shrink-0 w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center">
          <div
            className={`w-full h-full rounded-full bg-zinc-900 dark:bg-zinc-950 p-1.5 border border-zinc-800 shadow-lg relative overflow-hidden transition-transform duration-500 group-hover:scale-105 ${
              track.isNowPlaying ? "animate-spin-vinyl" : "animate-spin-vinyl-paused"
            }`}
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px), radial-gradient(circle, #1a1a1a 0%, #0a0a0a 100%)",
            }}
          >
            <div className="absolute inset-1 rounded-full border border-zinc-700/30" />
            <div className="absolute inset-2.5 rounded-full border border-zinc-700/20" />
            <div className="absolute inset-4 rounded-full border border-zinc-700/30" />

            <div className="relative w-full h-full rounded-full overflow-hidden flex items-center justify-center">
              <img
                src={track.imageUrl || FALLBACK_TRACK.imageUrl}
                alt={track.title}
                className="w-full h-full object-cover rounded-full"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = FALLBACK_TRACK.imageUrl!;
                }}
              />
              <div className="absolute w-3.5 h-3.5 rounded-full bg-zinc-950 border border-zinc-700 shadow-inner" />
            </div>

            <div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0) 45%, rgba(0,0,0,0.3) 100%)",
              }}
            />
          </div>
        </div>
      </div>

      <div className="pt-4 mt-auto flex items-center justify-between z-10 border-t border-zinc-100 dark:border-zinc-900/60">
        <a
          href={track.url}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 text-xs font-mono text-neutral-500 hover:text-purple-600 dark:text-neutral-400 dark:hover:text-purple-400 transition-colors"
        >
          <span>lastfm</span>
          <span className="text-[10px]">↗</span>
        </a>

        <span className="text-[11px] font-mono text-zinc-400 dark:text-zinc-600">
          @{username}
        </span>
      </div>
    </div>
  );
}
