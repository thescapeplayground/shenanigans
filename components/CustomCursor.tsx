"use client";

import { useEffect, useState, useRef } from "react";

export function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [clicking, setClicking] = useState(false);

  const cursorPointRef = useRef<HTMLDivElement>(null);
  const cursorTrailRef = useRef<HTMLDivElement>(null);

  const mousePos = useRef({ x: -100, y: -100 });
  const trailPos = useRef({ x: -100, y: -100 });
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window;
    if (isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);

      if (cursorPointRef.current) {
        cursorPointRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    const handleMouseDown = () => setClicking(true);
    const handleMouseUp = () => setClicking(false);
    const handleMouseLeave = () => setVisible(false);
    const handleMouseEnter = () => setVisible(true);

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const isInteractive = Boolean(
        target.closest("a, button, input, textarea, select, [role='button'], [tabindex]:not([tabindex='-1'])")
      );
      setHovered(isInteractive);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseover", handleOver, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    const render = () => {
      const speed = 0.18;
      trailPos.current.x += (mousePos.current.x - trailPos.current.x) * speed;
      trailPos.current.y += (mousePos.current.y - trailPos.current.y) * speed;

      if (cursorTrailRef.current) {
        const scale = clicking ? 0.8 : hovered ? 1.5 : 1;
        cursorTrailRef.current.style.transform = `translate3d(${trailPos.current.x}px, ${trailPos.current.y}px, 0) scale(${scale})`;
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
  }, [visible, hovered, clicking]);

  return (
    <div className="pointer-events-none hidden md:block" aria-hidden="true">
      <div
        ref={cursorPointRef}
        className={`custom-cursor-pointer ${visible ? "opacity-100" : "opacity-0"} ${clicking ? "scale-75" : "scale-100"}`}
      />
      <div
        ref={cursorTrailRef}
        className={`custom-cursor-trail ${visible ? (hovered ? "opacity-90" : "opacity-60") : "opacity-0"}`}
      />
    </div>
  );
}
