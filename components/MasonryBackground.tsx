"use client";

import { useRef, useEffect, useState, useMemo, useCallback } from "react";
import Image from "next/image";

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
  return cols;
}

export function MasonryBackground() {
  const [columnCount, setColumnCount] = useState(4);
  const containerRef = useRef<HTMLDivElement>(null);
  // One ref per column for direct DOM access
  const colElsRef = useRef<(HTMLDivElement | null)[]>([]);
  const animRef = useRef<number>(0);
  const lastTimeRef = useRef(0);

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

  // Set up animation loop
  useEffect(() => {
    const els = colElsRef.current;
    if (!els || els.length === 0) return;

    // Initialize scroll positions
    els.forEach((el, i) => {
      if (!el) return;
      el.dataset.scrollPos = "0";
    });

    // Per-column speeds (px/s): even cols go up (-), odd go down (+)
    const speeds = els.map((_, i) => {
      const base = 18 + i * 2.5;
      const dir = i % 2 === 0 ? -1 : 1;
      return dir * base;
    });

    lastTimeRef.current = performance.now();

    function tick(now: number) {
      const dt = (now - lastTimeRef.current) / 1000;
      lastTimeRef.current = now;

      for (let i = 0; i < els.length; i++) {
        const el = els[i];
        if (!el) continue;

        const halfH = el.scrollHeight / 2;
        if (halfH <= 0) continue;

        let pos = parseFloat(el.dataset.scrollPos || "0");
        pos += speeds[i] * dt;

        // Wrap at exactly half the height — pixel-perfect seamless loop
        while (pos > 0) pos -= halfH;
        while (pos <= -halfH) pos += halfH;

        el.dataset.scrollPos = String(pos);
        el.style.transform = `translateY(${pos}px)`;
      }

      animRef.current = requestAnimationFrame(tick);
    }

    animRef.current = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(animRef.current);
  }, [columns.length]);

  const setColRef = useCallback(
    (idx: number) => (el: HTMLDivElement | null) => {
      colElsRef.current[idx] = el;
    },
    []
  );

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-y-0 right-0 z-0 w-full max-w-[45%] lg:max-w-[50%] xl:max-w-[55%] overflow-hidden max-sm:hidden"
      style={{
        maskImage: "linear-gradient(to right, transparent 0%, black 25%, black 100%)",
        WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 25%, black 100%)",
      }}
      aria-hidden="true"
    >
      <div className="flex gap-3 sm:gap-4 h-full w-full py-8">
        {columns.map((col, colIdx) => (
          <div
            key={colIdx}
            ref={setColRef(colIdx)}
            className="flex-1 flex flex-col gap-3 sm:gap-4"
            style={{ transform: "translateY(0)", willChange: "transform" }}
          >
            {/* Two copies for visual continuity during scroll */}
            {[...col, ...col].map((item, itemIdx) => (
              <div
                key={`${item.id}-${itemIdx}`}
                className="w-full aspect-[3/4] rounded-xl overflow-hidden shrink-0 relative bg-zinc-900/20 dark:bg-black/40 border border-zinc-800/10 dark:border-zinc-800/10"
              >
                <Image
                  src={item.src}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 25vw, (max-width: 1024px) 17vw, 12vw"
                  className="object-cover"
                  quality={20}
                  priority={itemIdx < 4}
                  loading={itemIdx < 4 ? undefined : "lazy"}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}