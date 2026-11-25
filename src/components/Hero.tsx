import { useState } from "react";
import { Lens } from "./Lens";
import "./Hero.css";

interface HeroProps {
  showContent: boolean;
}

export function Hero({ showContent }: HeroProps) {
  const [hovering, setHovering] = useState(false);

  return (
    <div className="hero-container">
      {/* Banner Card at the top */}
      <div className={`hero-visual-card reveal-item reveal-scale ${showContent ? "animate-reveal delay-1" : ""
        }`}>
        <Lens hovering={hovering} setHovering={setHovering} lensSize={180} zoomFactor={1.5}>
          <img src="/assets/folder-texture.jpg" alt="Hero Banner" className="hero-banner-image" fetchPriority="high" loading="eager" decoding="sync" />
        </Lens>
      </div>

      {/* Overlapping profile picture */}
      <div className={`hero-avatar-wrap reveal-item reveal-scale ${showContent ? "animate-reveal delay-2" : ""
        }`}>
        <img
          src="/assets/hero.jpg"
          alt="Leonardo (Isiaih Rafael Pavia) Profile"
          className="hero-avatar-image"
          fetchPriority="high"
          loading="eager"
          decoding="sync"
          onError={(e) => {
            e.currentTarget.src = "/favicon-with-bg.svg";
          }}
        />
      </div>

      {/* Details Row (Name, Tagline, and Social Buttons aligned beside the avatar) */}
      <div className={`hero-details-row reveal-item ${showContent ? "animate-reveal delay-3" : ""
        }`}>
        <div className="hero-text-container">
          <h1 className="hero-main-title">I am Leonardo</h1>
          <p className="hero-description">
            photographer, graphic designer & developer — keeping things real, minimal, and functional.
          </p>
        </div>

        <div className="hero-social-row">
          <a
            href="https://github.com/isaiahscape"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-social-button"
            aria-label="GitHub"
          >
            <img src="/github.svg" alt="GitHub" />
          </a>
          <a
            href="https://instagram.com/isaiahscape"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-social-button"
            aria-label="Instagram"
          >
            <img src="/instagram.png" alt="Instagram" />
          </a>
          <a
            href="https://t.me/isaiahscape"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-social-button"
            aria-label="Telegram"
          >
            <img src="/telegram.svg" alt="Telegram" />
          </a>
          <a
            href="https://linkedin.com/in/isaiahscape"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-social-button"
            aria-label="LinkedIn"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect width="4" height="12" x="2" y="9" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
