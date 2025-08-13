"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import type { CSSProperties } from "react"; // added

export function Hello({ show = true }: { show?: boolean }) {
  const [gradient, setGradient] = useState<string>();

  useEffect(() => {
    let cancelled = false;

    const hexToRgb = (hex: string) => {
      const h = hex.replace("#", "");
      const full = h.length === 3 ? h.split("").map(c => c + c).join("") : h;
      const num = parseInt(full, 16);
      return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
    };

    const rgbToHex = (r: number, g: number, b: number) =>
      `#${[r, g, b].map(v => v.toString(16).padStart(2, "0")).join("")}`;

    const rgbToHsl = ({ r, g, b }: { r: number; g: number; b: number }) => {
      r /= 255; g /= 255; b /= 255;
      const max = Math.max(r, g, b), min = Math.min(r, g, b);
      let h = 0, s = 0;
      const l = (max + min) / 2; // prefer-const
      if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
          case r: h = (g - b) / d + (g < b ? 6 : 0); break;
          case g: h = (b - r) / d + 2; break;
          case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
      }
      return { h, s, l };
    };

    const hslToRgb = ({ h, s, l }: { h: number; s: number; l: number }) => {
      let r: number, g: number, b: number;
      if (s === 0) {
        r = g = b = l;
      } else {
        const hue2rgb = (p: number, q: number, t: number) => {
          if (t < 0) t += 1;
          if (t > 1) t -= 1;
          if (t < 1 / 6) return p + (q - p) * 6 * t;
          if (t < 1 / 2) return q;
          if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
          return p;
        };
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
      }
      return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255),
      };
    };

    const lighten = (hex: string, amt = 0.12) => {
      const hsl = rgbToHsl(hexToRgb(hex));
      hsl.l = Math.max(0, Math.min(1, hsl.l + amt));
      const { r, g, b } = hslToRgb(hsl);
      return rgbToHex(r, g, b);
    };
    const darken = (hex: string, amt = 0.12) => lighten(hex, -amt);

    const extractColors = (svg: string): string[] => {
      const colors = new Set<string>();
      // common attributes: fill, stroke, stop-color
      const regex = /(fill|stroke|stop-color)\s*=\s*["'](#[0-9a-fA-F]{3,6}|rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)|[a-zA-Z]+)["']/g;
      let m: RegExpExecArray | null;
      while ((m = regex.exec(svg))) {
        const val = m[2].toLowerCase();
        if (val === "none" || val === "currentcolor") continue;
        if (val.startsWith("#")) {
          colors.add(val);
        } else if (val.startsWith("rgb")) {
          const nums = val.match(/\d+/g)?.map(Number);
          if (nums && nums.length >= 3) {
            colors.add(rgbToHex(nums[0], nums[1], nums[2]));
          }
        }
      }
      return Array.from(colors);
    };

    const buildGradient = (palette: string[]) => {
      const stops = [...palette];
      if (stops.length === 0) {
        // safe fallback
        return "radial-gradient(160% 160% at 50% 50%, #fc5555ff 0%, #ec3333ff 40%, #f55858ff 75%, #f05f5fff 100%)";
      }
      if (stops.length === 1) {
        const base = stops[0];
        stops.push(lighten(base, 0.18), darken(base, 0.18));
      } else if (stops.length === 2) {
        // add a mid stop
        stops.splice(1, 0, lighten(stops[1], 0.12));
      }
      const pct = stops.map((_, i) => Math.round((i / (stops.length - 1)) * 100));
      return `radial-gradient(160% 160% at 50% 50%, ${stops
        .map((c, i) => `${c} ${pct[i]}%`)
        .join(", ")})`;
    };

    (async () => {
      try {
        const res = await fetch("/favicon.svg", { cache: "force-cache" });
        const svg = await res.text();
        const colors = extractColors(svg).slice(0, 5);
        const g = buildGradient(colors);
        if (!cancelled) setGradient(g);
      } catch {
        if (!cancelled) {
          setGradient(
            "radial-gradient(160% 160% at 50% 50%, #f0473aff 0%, #eb4f4fff 40%, #d65f5fff 75%, #c55959ff 100%)"
          );
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  if (!show) return null;

  // type-safe CSS custom property (fixes no-explicit-any)
  const overlayStyle: CSSProperties & { ["--hello-gradient"]?: string } = {
    ["--hello-gradient"]: gradient,
  };

  return (
    <>
      <div
        className="hello-overlay pointer-events-none fixed inset-0 z-[70] flex items-center justify-center"
        style={overlayStyle}
      >
        {/* replaced text with logo */}
        <Image
          src="/icon.svg"
          alt="Logo"
          width={400}
          height={400}
          priority
          draggable={false}
          className="hello-logo"
        />
      </div>
      <style>{`
        /* Theme variables */
        :root {
          --hello-bg-start: #f5f5f7;
          --hello-bg-end: #eaeaf0;
        }
        @media (prefers-color-scheme: dark) {
          :root {
            --hello-bg-start: #0a0a0a;
            --hello-bg-end: #111113;
          }
        }

        .hello-overlay {
          background: var(--hello-gradient, radial-gradient(160% 160% at 50% 50%, #000000ff 0%, #080808ff 40%, #000000ff 75%, #000000ff 100%));
          animation: overlay-hide 700ms ease 3.2s forwards;
        }

        .hello-logo {
          opacity: 0;
          transform: translateY(6px) translateZ(0); /* remove scale to keep crisp */
          transform-origin: center;
          will-change: transform, opacity;
          backface-visibility: hidden;
          image-rendering: -webkit-optimize-contrast;
          image-rendering: crisp-edges;
          filter: drop-shadow(0 1px 4px rgba(0,0,0,0.18)); /* lighter shadow */
          animation:
            hello-logo-in 700ms cubic-bezier(0.22, 1, 0.36, 1) 0.35s forwards,
            hello-logo-float 2400ms ease-in-out 1.1s 1 alternate;
        }

        @keyframes hello-logo-in {
          to {
            opacity: 1;
            transform: translateY(0) translateZ(0); /* no scale to avoid blur */
          }
        }

        @keyframes hello-logo-float {
          from { transform: translateY(0) translateZ(0); }
          to   { transform: translateY(-6px) translateZ(0); } /* gentle float only */
        }

        @keyframes overlay-hide {
          to { opacity: 0; visibility: hidden; }
        }
      `}</style>
    </>
  );
}

// Shows Hello only on client-side navigations (not on initial load)
export function HelloOnNavigate() {
  const pathname = usePathname();
  const mounted = useRef(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true; // initial load: do not show
      return;
    }
    setShow(true);
    const t = setTimeout(() => setShow(false), 3900); // duration to cover draw + fade
    return () => clearTimeout(t);
  }, [pathname]);

  return <Hello show={show} />;
}
