"use client";

import Link from "next/link";
import { MaterialIcon } from "@/components/ui/MaterialIcon";

interface FolderCardProps {
  href?: string;
  badgeText?: string;
}

export function FolderCard({
  href = "/about",
  badgeText = "About",
}: FolderCardProps) {
  return (
    <Link
      href={href}
      className="group relative block w-full max-w-[300px] sm:max-w-[340px] lg:max-w-[360px] aspect-[1.18/1] select-none cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 rounded-3xl"
      id="hero-folder-card"
      aria-label="View About Section"
    >
      <div className="relative w-full h-full p-2 transition-transform duration-500 ease-out group-hover:scale-[1.03] group-active:scale-[0.98]">
        {/* SVG Definition & Shapes */}
        <svg
          viewBox="0 0 380 320"
          className="w-full h-full drop-shadow-2xl overflow-visible"
        >
          <defs>
            {/* Backplate Clip Path */}
            <clipPath id="folder-back-clip">
              <path d="M 16,84 Q 16,56 44,56 L 165,56 Q 185,56 195,36 Q 205,16 228,16 L 336,16 Q 364,16 364,44 L 364,276 Q 364,304 336,304 L 44,304 Q 16,304 16,276 Z" />
            </clipPath>

            {/* Front Pocket Clip Path (All smooth rounded fillets) */}
            <clipPath id="folder-front-clip">
              <path d="M 16,92 Q 16,64 44,64 L 244,64 Q 266,64 280,78 L 350,148 Q 364,162 364,184 L 364,276 Q 364,304 336,304 L 44,304 Q 16,304 16,276 Z" />
            </clipPath>

            {/* Gradients */}
            <linearGradient id="front-metal-grad" x1="0%" y1="0%" x2="40%" y2="100%">
              <stop offset="0%" stopColor="#404047" />
              <stop offset="45%" stopColor="#27272a" />
              <stop offset="100%" stopColor="#09090b" />
            </linearGradient>

            <linearGradient id="front-sheen-stroke" x1="0%" y1="0%" x2="100%" y2="50%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.4)" />
              <stop offset="60%" stopColor="rgba(255,255,255,0.15)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.03)" />
            </linearGradient>
          </defs>

          {/* 1. Back Plate */}
          <g clipPath="url(#folder-back-clip)">
            {/* Dark fluid marble texture background */}
            <rect width="380" height="320" fill="#18181b" />
            <circle cx="50" cy="80" r="140" fill="rgba(220, 38, 38, 0.45)" />
            <circle cx="320" cy="60" r="150" fill="rgba(13, 148, 136, 0.45)" />
            <circle cx="200" cy="240" r="160" fill="rgba(15, 23, 42, 0.8)" />
            {/* Dark tab highlight */}
            <path
              d="M 170,56 Q 195,56 205,36 Q 215,16 235,16 L 364,16 L 364,80 Z"
              fill="rgba(255, 255, 255, 0.06)"
            />
          </g>
          {/* Back plate border */}
          <path
            d="M 16,84 Q 16,56 44,56 L 165,56 Q 185,56 195,36 Q 205,16 228,16 L 336,16 Q 364,16 364,44 L 364,276 Q 364,304 336,304 L 44,304 Q 16,304 16,276 Z"
            fill="none"
            stroke="rgba(255, 255, 255, 0.12)"
            strokeWidth="1.5"
          />

          {/* 2. Front Pocket */}
          <g clipPath="url(#folder-front-clip)">
            <rect width="380" height="320" fill="url(#front-metal-grad)" />
            {/* Subtle inner ambient reflection */}
            <circle cx="190" cy="200" r="160" fill="rgba(255, 255, 255, 0.03)" />
          </g>

          {/* Front Pocket Smooth Specular Stroke */}
          <path
            d="M 16,92 Q 16,64 44,64 L 244,64 Q 266,64 280,78 L 350,148 Q 364,162 364,184 L 364,276 Q 364,304 336,304 L 44,304 Q 16,304 16,276 Z"
            fill="none"
            stroke="url(#front-sheen-stroke)"
            strokeWidth="1.5"
          />
        </svg>

        {/* Middle Document Sheet (Tilted & Animating) */}
        <div className="absolute left-[8%] top-[10%] w-[68%] aspect-[1.18/1] rounded-2xl bg-zinc-100 dark:bg-zinc-200 shadow-xl -rotate-[6deg] origin-bottom-left transition-all duration-500 ease-out group-hover:-translate-y-4 group-hover:-rotate-[9deg] group-hover:shadow-2xl border border-white/90 overflow-hidden flex flex-col justify-between p-3.5 pointer-events-none z-[1]">
          <div className="flex items-center justify-between">
            <div className="w-7 h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-400" />
            <div className="w-2.5 h-2.5 rounded-full bg-zinc-300 dark:bg-zinc-400" />
          </div>
          <div className="space-y-1.5 opacity-60">
            <div className="w-full h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-400" />
            <div className="w-4/5 h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-400" />
            <div className="w-2/3 h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-400" />
          </div>
        </div>

        {/* Foreground Content Overlay */}
        <div className="absolute inset-x-[7%] top-[24%] bottom-[7%] z-[2] flex flex-col justify-between pointer-events-none p-3 sm:p-4">
          {/* Top Badge: "About" */}
          <div className="pt-1">
            <span className="text-2xl sm:text-3xl font-bold font-sans tracking-tight text-white drop-shadow-md">
              {badgeText}
            </span>
          </div>

          {/* Bottom Action Icon */}
          <div className="flex items-end justify-end pb-1">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-zinc-900/95 border border-white/25 shadow-lg flex items-center justify-center text-zinc-200 group-hover:text-white group-hover:border-purple-400/60 group-hover:bg-zinc-800 transition-all duration-300 shrink-0 pointer-events-auto">
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
