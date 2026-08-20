"use client";

import { useEffect, useRef } from "react";

interface BlobNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  phase: number;
  speed: number;
  spikes: number;
}

export function FerrofluidBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const mouse = {
      x: width / 2,
      y: height / 2,
      targetX: width / 2,
      targetY: height / 2,
      active: false,
    };

    const numBlobs = 6;
    const blobs: BlobNode[] = [];

    for (let i = 0; i < numBlobs; i++) {
      const radius = Math.min(width, height) * (0.12 + Math.random() * 0.1);
      blobs.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        radius,
        baseRadius: radius,
        phase: Math.random() * Math.PI * 2,
        speed: 0.008 + Math.random() * 0.012,
        spikes: 8 + Math.floor(Math.random() * 6),
      });
    }

    const particles: { x: number; y: number; r: number; alpha: number; vx: number; vy: number }[] = [];
    const numParticles = 28;
    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: 1.5 + Math.random() * 2.5,
        alpha: 0.2 + Math.random() * 0.4,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
      });
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.active = true;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouse.targetX = e.touches[0].clientX;
        mouse.targetY = e.touches[0].clientY;
        mouse.active = true;
      }
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    let time = 0;

    const render = () => {
      time += 0.015;
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      ctx.clearRect(0, 0, width, height);

      const bgGlow = ctx.createRadialGradient(
        mouse.x,
        mouse.y,
        10,
        mouse.x,
        mouse.y,
        Math.max(width, height) * 0.7
      );
      bgGlow.addColorStop(0, "rgba(147, 51, 234, 0.12)");
      bgGlow.addColorStop(0.5, "rgba(88, 28, 135, 0.05)");
      bgGlow.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = bgGlow;
      ctx.fillRect(0, 0, width, height);

      blobs.forEach((blob) => {
        blob.phase += blob.speed;
        blob.x += blob.vx;
        blob.y += blob.vy;

        if (blob.x - blob.radius < 0 || blob.x + blob.radius > width) blob.vx *= -1;
        if (blob.y - blob.radius < 0 || blob.y + blob.radius > height) blob.vy *= -1;

        const dx = mouse.x - blob.x;
        const dy = mouse.y - blob.y;
        const dist = Math.hypot(dx, dy);
        const maxMagneticDist = 450;

        let magneticPullX = 0;
        let magneticPullY = 0;

        if (dist < maxMagneticDist && mouse.active) {
          const force = (1 - dist / maxMagneticDist) * 0.6;
          magneticPullX = (dx / dist) * force * 40;
          magneticPullY = (dy / dist) * force * 40;
        }

        const renderX = blob.x + magneticPullX;
        const renderY = blob.y + magneticPullY;

        ctx.save();
        ctx.beginPath();

        const numPoints = 120;
        for (let i = 0; i <= numPoints; i++) {
          const angle = (i / numPoints) * Math.PI * 2;
          
          let spikeOffset = Math.sin(angle * blob.spikes + blob.phase) * (blob.radius * 0.12);
          spikeOffset += Math.cos(angle * (blob.spikes - 2) - time * 2) * (blob.radius * 0.08);

          if (dist < maxMagneticDist && mouse.active) {
            const angleToMouse = Math.atan2(dy, dx);
            const angleDiff = Math.cos(angle - angleToMouse);
            if (angleDiff > 0) {
              const magneticSpike = Math.pow(angleDiff, 4) * (1 - dist / maxMagneticDist) * 70;
              spikeOffset += magneticSpike;
            }
          }

          const currentRadius = blob.radius + spikeOffset;
          const px = renderX + Math.cos(angle) * currentRadius;
          const py = renderY + Math.sin(angle) * currentRadius;

          if (i === 0) {
            ctx.moveTo(px, py);
          } else {
            ctx.lineTo(px, py);
          }
        }

        ctx.closePath();

        const gradient = ctx.createRadialGradient(
          renderX - blob.radius * 0.3,
          renderY - blob.radius * 0.3,
          5,
          renderX,
          renderY,
          blob.radius * 1.4
        );
        gradient.addColorStop(0, "rgba(192, 132, 252, 0.45)");
        gradient.addColorStop(0.4, "rgba(147, 51, 234, 0.3)");
        gradient.addColorStop(0.8, "rgba(59, 7, 100, 0.2)");
        gradient.addColorStop(1, "rgba(15, 3, 25, 0)");

        ctx.fillStyle = gradient;
        ctx.shadowColor = "rgba(168, 85, 247, 0.35)";
        ctx.shadowBlur = 35;
        ctx.fill();

        ctx.lineWidth = 1.5;
        ctx.strokeStyle = "rgba(192, 132, 252, 0.25)";
        ctx.stroke();

        ctx.restore();
      });

      ctx.fillStyle = "rgba(192, 132, 252, 0.5)";
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.globalAlpha = p.alpha;
        ctx.fill();
      });
      ctx.globalAlpha = 1;

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 w-full h-full opacity-60 dark:opacity-75 mix-blend-screen dark:mix-blend-lighten"
      aria-hidden="true"
    />
  );
}
