import { useRef, useState, useEffect } from 'react';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  /** Set true for above-the-fold images — skips lazy entirely */
  priority?: boolean;
  /** Kept for API compatibility; browser-native loading="lazy" is always used */
  native?: boolean;
}

const loadedImageCache = new Set<string>();

export function LazyImage({
  src,
  alt,
  className = '',
  style,
  onClick,
  priority = false,
}: LazyImageProps) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [loadedSrc, setLoadedSrc] = useState<string | null>(() =>
    priority || (src && loadedImageCache.has(src)) ? src : null
  );

  const markLoaded = (url: string) => {
    if (url) loadedImageCache.add(url);
    setLoadedSrc(url);
  };

  useEffect(() => {
    const img = imgRef.current;
    if (!img || !src) return;

    if (loadedImageCache.has(src) || (img.complete && img.naturalWidth > 0)) {
      loadedImageCache.add(src);
      const id = requestAnimationFrame(() => setLoadedSrc(src));
      return () => cancelAnimationFrame(id);
    }
  }, [src]);

  const loaded = priority || (Boolean(src) && (loadedSrc === src || loadedImageCache.has(src)));

  return (
    <img
      ref={imgRef}
      src={src || undefined}
      alt={alt}
      className={`lazy-img${loaded ? ' lazy-img--loaded' : ''} ${className}`.trim()}
      style={style}
      onLoad={() => markLoaded(src)}
      onError={() => markLoaded(src)}
      onClick={onClick}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      fetchPriority={priority ? 'high' : 'auto'}
    />
  );
}
