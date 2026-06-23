"use client";

import { useRef, useEffect, useState, useMemo } from "react";

// All photography images from /assets/masonry/
const IMAGE_FILES = [
  "0065_3_4_img_260608_180608.jpg",
  "AGC_20260515_173533357.jpg",
  "DSC_20230611_101123_Lmc8.4_R17_Prashant_Premium(beta2).jpg",
  "DSC_20230726_174759_Lmc8.4_R17_Prashant_Premium(beta2).jpg",
  "ghost 1.png",
  "IMG_7663 1.png",
  "IMG_7691 1.png",
  "IMG_20260623_204532.png",
  "IMG_20260623_204813.jpg",
  "IMG_20260623_205128.jpg",
  "IMG_Veux_20240218_074746_lmc_8.4~2.jpg",
  "light 1.png",
  "noob_v2.2_13-Feb-24_20.24.22.Profile2.jpg",
  "tower 1.png",
];

interface MasonryItem {
  id: number;
  src: string;
}

function generateItems(): MasonryItem[] {
  return IMAGE_FILES.map((file, i) => ({
    id: i,
    src: `/assets/masonry/${encodeURIComponent(file)}`,
  }));
}

function distributeColumns(items: MasonryItem[], columnCount: number): MasonryItem[][] {
  const cols: MasonryItem[][] = Array.from({ length: columnCount }, () => []);
  items.forEach((item, i) => {
    cols[i % columnCount].push(item);
  });
  // Exactly 2 copies — animation travels 50% (one full copy), so reset is invisible
  return cols.map(col => [...col, ...col]);
}

export function MasonryBackground() {
  const [columnCount, setColumnCount] = useState(4);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleResize() {
      const w = window.innerWidth;
      if (w < 640) setColumnCount(2);
      else if (w < 1024) setColumnCount(3);
      else setColumnCount(4);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const items = useMemo(() => generateItems(), []);
  const columns = useMemo(() => distributeColumns(items, columnCount), [items, columnCount]);

  // Left columns (even index) go UP, right columns (odd index) go DOWN
  const speeds = useMemo(() => columns.map((_, i) => {
    return 20 + i * 4 + Math.sin(i * 1.7) * 6;
  }), [columns]);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-y-0 right-0 z-0 w-full max-w-[45%] lg:max-w-[50%] xl:max-w-[55%] overflow-hidden"
      style={{
        maskImage: "linear-gradient(to right, transparent 0%, black 25%, black 100%)",
        WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 25%, black 100%)",
      }}
      aria-hidden="true"
    >
      <div className="flex gap-3 sm:gap-4 h-full w-full py-8">
        {columns.map((col, colIdx) => {
          const isUp = colIdx % 2 === 0;
          return (
            <div
              key={colIdx}
              className="flex-1 flex flex-col gap-3 sm:gap-4"
              style={{
                animation: `masonry-${isUp ? "up" : "down"}-${colIdx} ${speeds[colIdx]}s linear infinite`,
                transform: isUp ? "translateY(0)" : "translateY(-50%)",
              }}
            >
              {col.map((item, itemIdx) => (
                <div
                  key={`${item.id}-${itemIdx}`}
                  className="w-full aspect-[3/4] rounded-xl overflow-hidden shrink-0 relative bg-zinc-700/30 dark:bg-zinc-800/40 border border-zinc-600/20 dark:border-zinc-700/20"
                >
                  <img
                    src={item.src}
                    alt=""
                    className="w-full h-full object-cover"
                    fetchPriority="low"
                  />
                </div>
              ))}
            </div>
          );
        })}
      </div>

      {/* Keyframes injected via style tag */}
      <style>{`
        ${columns.map((_, i) => {
          const up = i % 2 === 0;
          return `
            @keyframes masonry-${up ? "up" : "down"}-${i} {
              0% {
                transform: translateY(${up ? "0" : "-50%"});
              }
              100% {
                transform: translateY(${up ? "-50%" : "0"});
              }
            }
          `;
        }).join('')}
      `}</style>
    </div>
  );
}