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

export function LazyImage({
  src,
  alt,
  className = '',
  style,
  onClick,
  priority = false,
}: LazyImageProps) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [loadedSrc, setLoadedSrc] = useState<string | null>(priority ? src : null);

  useEffect(() => {
    const img = imgRef.current;
    if (!img || !src) return;

    if (img.complete && img.naturalWidth > 0) {
      const id = requestAnimationFrame(() => setLoadedSrc(src));
      return () => cancelAnimationFrame(id);
    }
  }, [src]);

  const loaded = priority || (Boolean(src) && loadedSrc === src);

  return (
    <img
      ref={imgRef}
      src={src || undefined}
      alt={alt}
      className={`lazy-img${loaded ? ' lazy-img--loaded' : ''} ${className}`.trim()}
      style={style}
      onLoad={() => setLoadedSrc(src)}
      onError={() => setLoadedSrc(src)}
      onClick={onClick}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      fetchPriority={priority ? 'high' : 'auto'}
    />
  );
}
