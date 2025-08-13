"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";

export function Hello({ show = true }: { show?: boolean }) {
  if (!show) return null;
  return (
    <>
      <div className="hello-overlay pointer-events-none fixed inset-0 z-[70] flex items-center justify-center">
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
          background: radial-gradient(120% 120% at 50% 50%, var(--hello-bg-start) 0%, var(--hello-bg-end) 100%);
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
