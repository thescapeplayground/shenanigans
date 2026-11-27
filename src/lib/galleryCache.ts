import { DEFAULT_GALLERY_ALBUMS, type GalleryAlbum } from '../data/gallery';

export interface GalleryApiPayload {
  source: 'github' | 'local' | 'fallback';
  albums: GalleryAlbum[];
}

let cachedPayload: GalleryApiPayload | null = null;
let inflightRequest: Promise<GalleryApiPayload> | null = null;

function mergeAlbumsWithDefaults(albums: GalleryAlbum[]): GalleryAlbum[] {
  const returnedIds = new Set(albums.map((a) => a.id.toLowerCase()));
  const missingDefaults = DEFAULT_GALLERY_ALBUMS.filter(
    (a) => !returnedIds.has(a.id.toLowerCase())
  ).map((a) => ({ ...a, items: [] }));
  return [...albums, ...missingDefaults];
}

export function getCachedGalleryData(): GalleryApiPayload | null {
  return cachedPayload;
}

export function fetchGalleryData(): Promise<GalleryApiPayload> {
  if (cachedPayload) return Promise.resolve(cachedPayload);
  if (inflightRequest) return inflightRequest;

  inflightRequest = fetch('/api/gallery')
    .then((res) => {
      if (!res.ok) throw new Error('Failed to load gallery');
      return res.json();
    })
    .then((data: { source?: 'github' | 'local' | 'fallback'; albums?: GalleryAlbum[] | null }) => {
      if (Array.isArray(data?.albums) && data.albums.length > 0) {
        cachedPayload = {
          source: data.source === 'github' ? 'github' : data.source === 'local' ? 'local' : 'fallback',
          albums: mergeAlbumsWithDefaults(data.albums),
        };
        return cachedPayload;
      }
      return { source: 'fallback' as const, albums: DEFAULT_GALLERY_ALBUMS };
    })
    .catch(() => ({
      source: 'fallback' as const,
      albums: DEFAULT_GALLERY_ALBUMS,
    }))
    .finally(() => {
      inflightRequest = null;
    });

  return inflightRequest;
}
