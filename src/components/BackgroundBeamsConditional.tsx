"use client";
import performanceModeAtom from "@/lib/atoms/performance-mode";
import { useAtom } from "jotai/react";
import { BackgroundBeams } from "@/components/background-beams";

export function BackgroundBeamsConditional() {
  const [performanceMode] = useAtom(performanceModeAtom);
  if (performanceMode) return null;
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
      }}
      aria-hidden="true"
    >
      <BackgroundBeams />
    </div>
  );
}
