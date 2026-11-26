import { useState, useEffect } from "react";
import { AccordionGallery, type AccordionGalleryItem } from "./AccordionGallery";
import { DEFAULT_GALLERY_ALBUMS, type GalleryAlbum } from "../data/gallery";
import { getPreviewImageUrl } from "../lib/imagePreview";
import "./Hero.css";

interface HeroProps {
  showContent: boolean;
}

const COVER_PANEL_COUNT = 6;

function buildCoverItems(albums: GalleryAlbum[]): AccordionGalleryItem[] {
  const photography = albums.find((a) => a.id.toLowerCase() === "photography")?.items ?? [];
  const socialClub = albums.find((a) => a.id.toLowerCase() === "social-club")?.items ?? [];

  const toGalleryItem = (
    item: GalleryAlbum["items"][number],
    tag: string
  ): AccordionGalleryItem => ({
    image: getPreviewImageUrl(item.src, 1080, 75),
    rawImage: item.src,
    label: item.title,
    tag,
    alt: item.alt || item.title,
    fallbackImage: "/assets/folder-texture.jpg",
  });

  const result: AccordionGalleryItem[] = [];
  const maxLen = Math.max(photography.length, socialClub.length);

  for (let i = 0; i < maxLen && result.length < COVER_PANEL_COUNT; i++) {
    if (i < photography.length && result.length < COVER_PANEL_COUNT) {
      result.push(toGalleryItem(photography[i], "Photography"));
    }
    if (i < socialClub.length && result.length < COVER_PANEL_COUNT) {
      result.push(toGalleryItem(socialClub[i], "Social Club"));
    }
  }

  return result.length > 0
    ? result
    : [{ image: "/assets/folder-texture.jpg", label: "Visual Archive", tag: "Portfolio" }];
}

export function Hero({ showContent }: HeroProps) {
  const [coverItems, setCoverItems] = useState<AccordionGalleryItem[]>(() =>
    buildCoverItems(DEFAULT_GALLERY_ALBUMS)
  );

  useEffect(() => {
    let active = true;

    fetch("/api/gallery")
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { albums?: GalleryAlbum[] | null } | null) => {
        if (!active || !Array.isArray(data?.albums) || data.albums.length === 0) return;
        const nextItems = buildCoverItems(data.albums);
        if (nextItems.length > 0) {
          setCoverItems(nextItems);
        }
      })
      .catch(() => {
        // Keep default fallback photography frames
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="hero-container">
      {/* Banner Card at the top */}
      <div className={`hero-visual-card reveal-item reveal-scale ${showContent ? "animate-reveal delay-1" : ""
        }`}>
        <AccordionGallery items={coverItems} defaultIndex={2} />
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
