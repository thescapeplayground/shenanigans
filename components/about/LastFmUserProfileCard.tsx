"use client";

import { LastFmUserProfile } from "@/src/types";
import { MaterialIcon } from "@/components/ui/MaterialIcon";

interface LastFmUserProfileCardProps {
  profile: LastFmUserProfile;
  loading?: boolean;
}

export function LastFmUserProfileCard({ profile, loading = false }: LastFmUserProfileCardProps) {
  return (
    <div
      className="rounded-2xl border border-zinc-200/70 dark:border-zinc-800/70 bg-white/70 dark:bg-zinc-950/60 backdrop-blur-sm p-5 sm:p-6 shadow-sm flex flex-col justify-between space-y-4"
      id="lastfm-profile-card"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="relative w-12 h-12 rounded-full overflow-hidden border border-zinc-200 dark:border-zinc-800 shrink-0">
            <img
              src={profile.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop"}
              alt={profile.username}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h4 className="text-base font-bold font-sans tracking-tight text-neutral-950 dark:text-neutral-50">
              {profile.realName || profile.username}
            </h4>
            <p className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
              @{profile.username}
              {profile.country ? ` • ${profile.country}` : ""}
            </p>
          </div>
        </div>

        <a
          href={profile.url}
          target="_blank"
          rel="noreferrer"
          className="shrink-0 px-3 py-1 rounded-full text-xs font-mono text-neutral-600 dark:text-neutral-300 hover:text-purple-600 dark:hover:text-purple-400 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/50 transition-colors flex items-center gap-1"
        >
          <span>Profile</span>
          <span className="text-[10px]">↗</span>
        </a>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1">
        <div className="p-3 rounded-xl bg-zinc-50/80 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800/40">
          <div className="flex items-center gap-1 text-[11px] font-mono text-zinc-400 dark:text-zinc-500 mb-0.5">
            <MaterialIcon icon="equalizer" size="0.9rem" className="text-purple-500" />
            <span>Scrobbles</span>
          </div>
          <span className="text-sm sm:text-base font-bold font-mono text-neutral-900 dark:text-neutral-100">
            {profile.playCount ? profile.playCount.toLocaleString() : "—"}
          </span>
        </div>

        {profile.artistCount ? (
          <div className="p-3 rounded-xl bg-zinc-50/80 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800/40">
            <div className="flex items-center gap-1 text-[11px] font-mono text-zinc-400 dark:text-zinc-500 mb-0.5">
              <MaterialIcon icon="group" size="0.9rem" className="text-purple-500" />
              <span>Artists</span>
            </div>
            <span className="text-sm sm:text-base font-bold font-mono text-neutral-900 dark:text-neutral-100">
              {profile.artistCount.toLocaleString()}
            </span>
          </div>
        ) : null}

        <div className="p-3 rounded-xl bg-zinc-50/80 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800/40">
          <div className="flex items-center gap-1 text-[11px] font-mono text-zinc-400 dark:text-zinc-500 mb-0.5">
            <MaterialIcon icon="history" size="0.9rem" className="text-purple-500" />
            <span>Member</span>
          </div>
          <span className="text-sm sm:text-base font-bold font-mono text-neutral-900 dark:text-neutral-100">
            Since {profile.registeredDate || "2023"}
          </span>
        </div>
      </div>
    </div>
  );
}
