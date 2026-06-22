"use client";

export function Logo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <div
      className={`flex items-center justify-center rounded-lg bg-black text-white font-sans font-bold ${className}`}
    >
      <span className="text-lg leading-none">삶</span>
    </div>
  );
}