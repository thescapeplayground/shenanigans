"use client";

import { useEffect, useRef } from "react";

export function CustomCursor() {
  const cursorPointRef = useRef<HTMLDivElement>(null);
  const cursorTrailRef = useRef<HTMLDivElement>(null);

  const mousePos = useRef({ x: -100, y: -100 });
  const trailPos = useRef({ x: -100, y: -100 });
  const currentScale = useRef(1);
  const targetScale = useRef(1);
  const visible = useRef(false);
  const hovered = useRef(false);
  const clicking = useRef(false);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const isTouch =
      window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window;
    if (isTouch) return;

    const pointEl = cursorPointRef.current;
    const trailEl = cursorTrailRef.current;

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;

      if (!visible.current) {
        visible.current = true;
        if (pointEl) pointEl.style.opacity = "1";
        if (trailEl) trailEl.style.opacity = hovered.current ? "0.9" : "0.6";
      }

      if (pointEl) {
        pointEl.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    const handleMouseDown = () => {
      clicking.current = true;
      targetScale.current = 0.8;
    };

    const handleMouseUp = () => {
      clicking.current = false;
      targetScale.current = hovered.current ? 1.4 : 1;
    };

    const handleMouseLeave = () => {
      visible.current = false;
      if (pointEl) pointEl.style.opacity = "0";
      if (trailEl) trailEl.style.opacity = "0";
    };

    const handleMouseEnter = () => {
      visible.current = true;
      if (pointEl) pointEl.style.opacity = "1";
      if (trailEl) trailEl.style.opacity = hovered.current ? "0.9" : "0.6";
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const isInteractive = Boolean(
        target.closest(
          "a, button, input, textarea, select, [role='button'], [tabindex]:not([tabindex='-1'])"
        )
      );

      if (hovered.current !== isInteractive) {
        hovered.current = isInteractive;
        if (!clicking.current) {
          targetScale.current = isInteractive ? 1.4 : 1;
        }
        if (trailEl && visible.current) {
          trailEl.style.opacity = isInteractive ? "0.9" : "0.6";
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseover", handleOver, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    const render = () => {
      const posLerp = 0.22;
      const scaleLerp = 0.2;

      trailPos.current.x += (mousePos.current.x - trailPos.current.x) * posLerp;
      trailPos.current.y += (mousePos.current.y - trailPos.current.y) * posLerp;
      currentScale.current += (targetScale.current - currentScale.current) * scaleLerp;

      if (trailEl) {
        trailEl.style.transform = `translate3d(${trailPos.current.x}px, ${trailPos.current.y}px, 0) scale(${currentScale.current})`;
      }

      rafId.current = requestAnimationFrame(render);
    };

    rafId.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <div className="pointer-events-none hidden md:block" aria-hidden="true">
      <div
        ref={cursorPointRef}
        className="custom-cursor-pointer opacity-0"
      />
      <div
        ref={cursorTrailRef}
        className="custom-cursor-trail opacity-0"
      />
    </div>
  );
}
