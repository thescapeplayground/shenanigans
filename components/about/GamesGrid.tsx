"use client";

import { GameItem } from "@/src/types";

interface GamesGridProps {
  games: GameItem[];
}

export function GamesGrid({ games }: GamesGridProps) {
  if (!games || games.length === 0) return null;

  return (
    <div className="space-y-4" id="games-showcase-container">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-semibold font-mono tracking-widest text-zinc-400 dark:text-zinc-500 uppercase">
          Games & Media
        </h3>
        <span className="text-xs font-mono text-zinc-400 dark:text-zinc-600">
          {games.length} titles
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {games.map((game) => (
          <div
            key={game.id}
            className="group relative rounded-2xl border border-zinc-200/70 dark:border-zinc-800/70 bg-white/70 dark:bg-zinc-950/60 backdrop-blur-sm p-5 shadow-sm transition-all duration-300 hover:border-purple-500/40 dark:hover:border-purple-500/40 hover:-translate-y-0.5 flex flex-col justify-between"
          >
            <div className="space-y-2.5">
              <div className="flex items-start justify-between gap-3">
                <h4 className="text-base font-bold font-sans tracking-tight text-neutral-950 dark:text-neutral-50 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                  {game.title}
                </h4>
                {game.badge && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 whitespace-nowrap">
                    {game.badge}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 dark:text-zinc-400">
                <span>{game.platform}</span>
                <span>•</span>
                <span>{game.genre}</span>
              </div>

              <p className="text-xs sm:text-sm font-sans text-neutral-600 dark:text-neutral-300 leading-relaxed">
                {game.description}
              </p>
            </div>

            <div className="mt-4 pt-3.5 border-t border-zinc-100 dark:border-zinc-900/60 flex items-center justify-between gap-2">
              <div className="flex flex-wrap gap-1.5">
                {game.tags?.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border border-zinc-200/50 dark:border-zinc-800/50"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {game.link && (
                <a
                  href={game.link}
                  target="_blank"
                  rel="noreferrer"
                  className="shrink-0 text-xs font-mono text-zinc-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors flex items-center gap-0.5"
                >
                  <span>Link</span>
                  <span className="text-[10px]">↗</span>
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
