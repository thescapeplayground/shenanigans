"use client";

import Link from "next/link";
import { MaterialIcon } from "@/components/ui/MaterialIcon";

interface FolderCardProps {
  href?: string;
  badgeText?: string;
  title?: string;
  subtitle?: string;
}

export function FolderCard({
  href = "/about",
  badgeText = "About",
  title = "About Me",
  subtitle = "Personal dossier & background",
}: FolderCardProps) {
  return (
    <Link
      href={href}
      className="group relative block w-full max-w-[320px] sm:max-w-[360px] lg:max-w-[380px] aspect-[1.15/1] select-none cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 rounded-3xl"
      id="hero-folder-card"
      aria-label="View About Section"
    >
      <div className="relative w-full h-full p-2 transition-transform duration-500 ease-out group-hover:scale-[1.03] group-active:scale-[0.98]">
        {/* Back Plate with Top Tab */}
        <div className="absolute inset-x-2 top-2 bottom-3 rounded-[26px] overflow-hidden shadow-2xl transition-all duration-500 group-hover:shadow-purple-500/10">
          {/* Fluid dark marble artwork texture */}
          <div
            className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            style={{
              backgroundImage:
                "radial-gradient(circle at 10% 20%, rgba(220, 38, 38, 0.45) 0%, transparent 40%), radial-gradient(circle at 90% 10%, rgba(13, 148, 136, 0.45) 0%, transparent 45%), linear-gradient(135deg, #18181b 0%, #09090b 100%)",
            }}
          >
            {/* Top-right folder tab silhouette extension */}
            <div
              className="absolute top-0 right-0 w-[55%] h-8 bg-zinc-900/40 backdrop-blur-md rounded-bl-2xl border-b border-l border-white/10"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(0,0,0,0.5) 100%)",
              }}
            />
          </div>
        </div>

        {/* Middle Document Sheet */}
        <div className="absolute left-7 top-4 w-[68%] aspect-[1.2/1] rounded-2xl bg-zinc-100 dark:bg-zinc-200 shadow-lg -rotate-[6deg] origin-bottom-left transition-all duration-500 ease-out group-hover:-translate-y-3.5 group-hover:-rotate-[9deg] group-hover:shadow-xl border border-white/80 overflow-hidden flex flex-col justify-between p-3.5">
          <div className="flex items-center justify-between">
            <div className="w-6 h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-400" />
            <div className="w-2.5 h-2.5 rounded-full bg-zinc-300 dark:bg-zinc-400" />
          </div>
          <div className="space-y-1.5 opacity-60">
            <div className="w-full h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-400" />
            <div className="w-4/5 h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-400" />
            <div className="w-2/3 h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-400" />
          </div>
        </div>

        {/* Front Pocket with Chamfered Top-Right Corner */}
        <div
          className="absolute inset-x-2 bottom-3 top-10 rounded-[26px] overflow-hidden shadow-2xl p-5 sm:p-6 flex flex-col justify-between transition-colors duration-300 border border-white/15 dark:border-white/10"
          style={{
            background:
              "linear-gradient(160deg, rgba(75, 75, 82, 0.95) 0%, rgba(39, 39, 42, 0.98) 40%, rgba(9, 9, 11, 0.99) 100%)",
            clipPath:
              "polygon(0 0, calc(100% - 56px) 0, 100% 56px, 100% 100%, 0 100%)",
          }}
        >
          {/* Top highlight specular sheen */}
          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-white/30 via-white/50 to-transparent pointer-events-none" />

          {/* Top badge text: "About" */}
          <div className="relative z-10">
            <span className="text-xl sm:text-2xl font-bold font-sans tracking-tight text-white drop-shadow-sm">
              {badgeText}
            </span>
          </div>

          {/* Bottom Info & Action Button */}
          <div className="relative z-10 flex items-end justify-between gap-3 pt-4">
            <div className="space-y-0.5 max-w-[calc(100%-52px)]">
              <h3 className="text-sm sm:text-base font-bold font-sans text-white tracking-tight truncate">
                {title}
              </h3>
              <p className="text-[11px] sm:text-xs font-sans text-zinc-300/80 truncate">
                {subtitle}
              </p>
            </div>

            {/* Circular action button */}
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-zinc-900/90 border border-white/20 shadow-md flex items-center justify-center text-zinc-200 group-hover:text-white group-hover:border-purple-400/60 group-hover:bg-zinc-800 transition-all duration-300 shrink-0">
              <MaterialIcon
                icon="arrow_outward"
                size="1.2rem"
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
