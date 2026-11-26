export const PREVIEW_IMAGE_QUALITY = 75;

/**
 * Returns a 75%-quality resized Vercel Image Optimization URL for same-origin
 * raster previews in production builds while preserving raw local/dev URLs.
 */
export function getPreviewImageUrl(
  src: string,
  width = 828,
  quality = PREVIEW_IMAGE_QUALITY
): string {
  if (!src || !import.meta.env.PROD) return src;
  if (!src.startsWith('/') || src.endsWith('.svg') || src.startsWith('/_vercel/image')) {
    return src;
  }
  return `/_vercel/image?url=${encodeURIComponent(src)}&w=${width}&q=${quality}`;
}
