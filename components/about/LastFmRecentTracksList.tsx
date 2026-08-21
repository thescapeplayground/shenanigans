"use client";

import { LastFmTrack } from "@/src/types";

interface LastFmRecentTracksListProps {
  tracks: LastFmTrack[];
}

export function LastFmRecentTracksList({ tracks }: LastFmRecentTracksListProps) {
  if (!tracks || tracks.length === 0) return null;

  return (
    <div
      className="rounded-2xl border border-zinc-200/70 dark:border-zinc-800/70 bg-white/70 dark:bg-zinc-950/60 backdrop-blur-sm p-5 sm:p-6 shadow-sm space-y-3.5"
      id="lastfm-recent-tracks-list"
    >
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-semibold font-mono tracking-widest text-zinc-400 dark:text-zinc-500 uppercase">
          Recent Scrobbles
        </h4>
        <span className="text-xs font-mono text-zinc-400 dark:text-zinc-600">
          LastFM Live
        </span>
      </div>

      <div className="divide-y divide-zinc-100 dark:divide-zinc-900/60">
        {tracks.slice(0, 6).map((track, idx) => (
          <a
            key={`${track.title}-${idx}`}
            href={track.url}
            target="_blank"
            rel="noreferrer"
            className="group flex items-center justify-between gap-3 py-2.5 first:pt-0 last:pb-0 hover:bg-zinc-50/50 dark:hover:bg-zinc-900/30 px-1 -mx-1 rounded-lg transition-colors"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-zinc-200/70 dark:border-zinc-800/70 shrink-0 bg-zinc-100 dark:bg-zinc-900">
                <img
                  src={track.imageUrl || "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=150&h=150&fit=crop"}
                  alt={track.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=150&h=150&fit=crop";
                  }}
                />
              </div>

              <div className="min-w-0">
                <p className="text-xs sm:text-sm font-semibold font-sans text-neutral-900 dark:text-neutral-100 truncate group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                  {track.title}
                </p>
                <p className="text-[11px] sm:text-xs font-sans text-neutral-500 dark:text-neutral-400 truncate">
                  {track.artist}
                </p>
              </div>
            </div>

            <div className="shrink-0 flex items-center gap-1.5 text-right">
              {track.isNowPlaying ? (
                <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-600 dark:text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Live
                </span>
              ) : (
                <span className="text-[11px] font-mono text-zinc-400 dark:text-zinc-500">
                  {track.playedAt || "Recent"}
                </span>
              )}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
