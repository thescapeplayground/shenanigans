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
            <svg viewBox="0 0 30 30" width="18" height="18" fill="none" aria-hidden="true">
              <path
                d="M14.5834 2.43042C12.9875 2.43042 11.4072 2.74476 9.93277 3.3555C8.45833 3.96623 7.11862 4.8614 5.99013 5.98989C3.71104 8.26897 2.43066 11.3601 2.43066 14.5832C2.43066 19.9547 5.91851 24.512 10.7432 26.1283C11.3508 26.2256 11.5452 25.8488 11.5452 25.5207V23.4669C8.17893 24.196 7.46191 21.8384 7.46191 21.8384C6.90289 20.4287 6.11296 20.0519 6.11296 20.0519C5.00705 19.2985 6.19802 19.3228 6.19802 19.3228C7.4133 19.4079 8.0574 20.5745 8.0574 20.5745C9.11469 22.4217 10.9012 21.8749 11.5939 21.5832C11.7032 20.7933 12.0192 20.2585 12.3595 19.9547C9.66157 19.6509 6.82997 18.6058 6.82997 13.9756C6.82997 12.6266 7.29178 11.545 8.08171 10.6822C7.96018 10.3783 7.53483 9.11445 8.20323 7.47382C8.20323 7.47382 9.22407 7.1457 11.5452 8.71341C12.5053 8.44604 13.5505 8.31236 14.5834 8.31236C15.6164 8.31236 16.6616 8.44604 17.6216 8.71341C19.9428 7.1457 20.9636 7.47382 20.9636 7.47382C21.6321 9.11445 21.2067 10.3783 21.0852 10.6822C21.8751 11.545 22.3369 12.6266 22.3369 13.9756C22.3369 18.6179 19.4932 19.6388 16.7831 19.9426C17.2206 20.3193 17.6216 21.0606 17.6216 22.1908V25.5207C17.6216 25.8488 17.8161 26.2377 18.4359 26.1283C23.2605 24.4999 26.7362 19.9547 26.7362 14.5832C26.7362 12.9873 26.4219 11.407 25.8111 9.93253C25.2004 8.45809 24.3052 7.11838 23.1768 5.98989C22.0483 4.8614 20.7086 3.96623 19.2341 3.3555C17.7597 2.74476 16.1794 2.43042 14.5834 2.43042Z"
                fill="currentColor"
              />
            </svg>
          </a>
          <a
            href="https://instagram.com/isaiahscape"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-social-button"
            aria-label="Instagram"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
            </svg>
          </a>
          <a
            href="https://t.me/isaiahscape"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-social-button"
            aria-label="Telegram"
          >
            <svg viewBox="0 0 30 26" width="18" height="18" fill="none" aria-hidden="true">
              <path
                d="M12.0848 16.25L18.3081 20.29L23.1915 23.55C23.5515 23.79 23.7315 23.91 23.8931 23.91C23.963 23.9105 24.0321 23.8964 24.0961 23.8685C24.1601 23.8407 24.2176 23.7997 24.2648 23.7483C24.3765 23.6333 24.4098 23.4217 24.4765 22.9983L27.9181 1.25L2.37148 11.8717C1.71315 12.145 1.38482 12.2833 1.29982 12.4617C1.26297 12.5379 1.2461 12.6222 1.25076 12.7068C1.25542 12.7913 1.28148 12.8733 1.32648 12.945C1.43148 13.1117 1.77315 13.2117 2.45982 13.4133L12.0848 16.25ZM27.9181 1.25L12.0848 16.25M12.0848 16.25L12.3448 23.4167C12.3448 23.9733 12.3448 24.2517 12.4598 24.3917C12.5598 24.515 12.7098 24.585 12.8698 24.5833C13.0531 24.5817 13.2698 24.4033 13.7031 24.05L18.3081 20.29"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
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
          <a
            href="https://youtube.com/@isaiahscape"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-social-button"
            aria-label="YouTube"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
          </a>
          <a
            href="https://twitch.tv/isaiahscape"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-social-button"
            aria-label="Twitch"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
              <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0H6zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714v9.429z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
