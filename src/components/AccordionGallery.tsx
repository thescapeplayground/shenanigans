import { useState, type CSSProperties } from 'react';
import './AccordionGallery.css';

export interface AccordionGalleryItem {
  image: string;
  rawImage?: string;
  label?: string;
  tag?: string;
  alt?: string;
  fallbackImage?: string;
}

export interface AccordionGalleryProps {
  items: AccordionGalleryItem[];
  defaultIndex?: number;
  accentColor?: string;
  overlayColor?: string;
  textColor?: string;
  grayscale?: boolean;
  showLabels?: boolean;
  duration?: number;
  parallax?: number;
  tilt?: number;
  stagger?: number;
  trigger?: 'hover' | 'click';
  className?: string;
}

export function AccordionGallery({
  items,
  defaultIndex = 2,
  accentColor = 'var(--accent)',
  overlayColor = '#060708',
  textColor = '#ffffff',
  grayscale = false,
  showLabels = true,
  duration = 0.4,
  trigger = 'hover',
  className = '',
}: AccordionGalleryProps) {
  const safeDefault = items.length > 0 ? Math.min(Math.max(defaultIndex, 0), items.length - 1) : 0;
  const [activeIndex, setActiveIndex] = useState<number>(safeDefault);
  const [errorStage, setErrorStage] = useState<Record<string, number>>({});

  const clampedActive = items.length > 0 ? Math.min(activeIndex, items.length - 1) : 0;

  return (
    <div
      className={`accordion-gallery ${className}`.trim()}
      role="region"
      aria-label="Photography and Social Club cover gallery"
      style={
        {
          '--ag-duration': `${duration}s`,
          '--ag-accent': accentColor,
          '--ag-overlay': overlayColor,
          '--ag-text': textColor,
        } as CSSProperties
      }
    >
      {items.map((item, idx) => {
        const isActive = idx === clampedActive;
        const candidates = Array.from(
          new Set([item.image, item.rawImage, item.fallbackImage].filter((v): v is string => Boolean(v)))
        );
        const stage = errorStage[item.image] ?? 0;
        const resolvedSrc = candidates[Math.min(stage, Math.max(candidates.length - 1, 0))] || item.image;

        return (
          <div
            key={`${item.image}-${idx}`}
            className={`accordion-panel ${isActive ? 'is-active' : ''} ${grayscale ? 'use-grayscale' : ''}`}
            tabIndex={0}
            role="button"
            aria-expanded={isActive}
            aria-label={item.alt || item.label || `Cover frame ${idx + 1}`}
            onMouseEnter={() => {
              if (trigger === 'hover') setActiveIndex(idx);
            }}
            onFocus={() => setActiveIndex(idx)}
            onClick={() => setActiveIndex(idx)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setActiveIndex(idx);
              } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                setActiveIndex((idx + 1) % items.length);
              } else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                setActiveIndex((idx - 1 + items.length) % items.length);
              }
            }}
          >
            <img
              src={resolvedSrc}
              alt={item.alt || item.label || `Cover photo ${idx + 1}`}
              className="accordion-panel-img"
              loading="eager"
              decoding="async"
              draggable={false}
              onError={() => {
                if (stage + 1 < candidates.length) {
                  setErrorStage((prev) => ({ ...prev, [item.image]: stage + 1 }));
                }
              }}
            />

            <div className="accordion-panel-scrim" aria-hidden="true" />

            {showLabels && (item.label || item.tag) && (
              <div className="accordion-panel-caption" aria-hidden={!isActive}>
                <span className="accordion-caption-bar" />
                <div className="accordion-caption-text">
                  {item.tag && <span className="accordion-caption-tag">{item.tag}</span>}
                  {item.label && <span className="accordion-caption-label">{item.label}</span>}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
