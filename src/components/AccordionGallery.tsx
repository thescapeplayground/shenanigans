import { useState, type CSSProperties } from 'react';
import './AccordionGallery.css';

export interface AccordionGalleryItem {
  image: string;
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
  grayscale = true,
  showLabels = true,
  duration = 0.6,
  parallax = 0.5,
  tilt = 8,
  stagger = 0.06,
  trigger = 'hover',
  className = '',
}: AccordionGalleryProps) {
  const safeDefault = items.length > 0 ? Math.min(Math.max(defaultIndex, 0), items.length - 1) : 0;
  const [activeIndex, setActiveIndex] = useState<number>(safeDefault);
  const [failedSrcs, setFailedSrcs] = useState<Record<string, boolean>>({});

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
          '--ag-stagger': `${stagger}s`,
        } as CSSProperties
      }
    >
      {items.map((item, idx) => {
        const isActive = idx === clampedActive;
        const delta = idx - clampedActive;
        const panelTilt = isActive ? 0 : delta < 0 ? tilt : -tilt;
        const imgShift = isActive ? 0 : (delta < 0 ? -1 : 1) * 6 * parallax;
        const resolvedSrc = failedSrcs[item.image] && item.fallbackImage ? item.fallbackImage : item.image;

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
            style={
              {
                transform: `rotateY(${panelTilt}deg) scale(${isActive ? 1 : 0.985})`,
              } as CSSProperties
            }
          >
            <img
              src={resolvedSrc}
              alt={item.alt || item.label || `Cover photo ${idx + 1}`}
              className="accordion-panel-img"
              loading={isActive ? 'eager' : 'lazy'}
              decoding="async"
              draggable={false}
              onError={() => {
                if (!failedSrcs[item.image]) {
                  setFailedSrcs((prev) => ({ ...prev, [item.image]: true }));
                }
              }}
              style={{
                transform: `translateX(${imgShift}%) scale(${isActive ? 1.03 : 1.12})`,
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
