import { useState, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { DEFAULT_GALLERY_ALBUMS, type GalleryAlbum, type GalleryItem } from '../data/gallery';
import { fetchGalleryData, getCachedGalleryData } from '../lib/galleryCache';
import { getPreviewImageUrl } from '../lib/imagePreview';

interface GalleryPageProps {
  initialAlbum?: string;
}

export function GalleryPage({ initialAlbum }: GalleryPageProps) {
  const initialCache = getCachedGalleryData();
  const [albums, setAlbums] = useState<GalleryAlbum[]>(() => initialCache?.albums ?? DEFAULT_GALLERY_ALBUMS);
  const [activeAlbumId, setActiveAlbumId] = useState<string>(() => initialAlbum || 'all');
  const [loading, setLoading] = useState(() => !initialCache);
  const [syncSource, setSyncSource] = useState<'github' | 'local' | 'fallback'>(() => initialCache?.source ?? 'fallback');
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [rawFallbackImages, setRawFallbackImages] = useState<Record<string, boolean>>({});
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const handlePopState = () => {
      const match = window.location.pathname.replace(/\/+$/, '').match(/^\/gallery\/([^/]+)$/i);
      setActiveAlbumId(match ? decodeURIComponent(match[1]) : 'all');
      setSelectedIndex(null);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    if (getCachedGalleryData()) {
      setLoading(false);
      return;
    }
    let active = true;

    fetchGalleryData()
      .then((data) => {
        if (!active) return;
        setAlbums(data.albums);
        setSyncSource(data.source);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const visibleAlbums = useMemo(() => {
    if (activeAlbumId === 'all') return albums;
    const matched = albums.filter((a) => a.id.toLowerCase() === activeAlbumId.toLowerCase());
    return matched.length > 0 ? matched : albums;
  }, [albums, activeAlbumId]);

  const flatPhotos = useMemo(() => {
    const list: Array<GalleryItem & { albumName: string }> = [];
    for (const album of visibleAlbums) {
      for (const item of album.items) {
        list.push({ ...item, albumName: album.name });
      }
    }
    return list;
  }, [visibleAlbums]);

  const flatIndexMap = useMemo(() => {
    const map = new Map<string, number>();
    flatPhotos.forEach((p, idx) => {
      map.set(`${p.id}::${p.src}`, idx);
    });
    return map;
  }, [flatPhotos]);

  const selectedPhoto = selectedIndex !== null ? flatPhotos[selectedIndex] ?? null : null;

  useEffect(() => {
    if (selectedIndex === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedIndex(null);
      } else if (e.key === 'ArrowRight') {
        setSelectedIndex((prev) => (prev === null ? null : (prev + 1) % flatPhotos.length));
      } else if (e.key === 'ArrowLeft') {
        setSelectedIndex((prev) => (prev === null ? null : (prev - 1 + flatPhotos.length) % flatPhotos.length));
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selectedIndex, flatPhotos.length]);

  const handleSelectAlbum = (albumId: string) => {
    setActiveAlbumId(albumId);
    setSelectedIndex(null);
    const nextPath = albumId === 'all' ? '/gallery' : `/gallery/${encodeURIComponent(albumId)}`;
    if (window.location.pathname !== nextPath) {
      window.history.pushState(null, '', nextPath);
    }
  };

  const totalCount = albums.reduce((sum, album) => sum + album.items.length, 0);

  return (
    <div className="page-view-container">
      <header className="page-header">
        <span className="page-label">
          isaiahscape // private-photos{' '}
          {loading
            ? '• syncing...'
            : syncSource === 'github'
              ? '• live'
              : syncSource === 'local'
                ? '• local'
                : '• offline fallback'}
        </span>
        <h1 className="page-title">gallery.</h1>
        <p className="page-description-sub">
          Street photography, portraits, 3D renders, and visual studies served securely from{' '}
          <code>isaiahscape/private-photos</code>.
        </p>

        {/* Album Filter Bar */}
        <div className="projects-filter-bar" style={{ marginTop: '24px', marginBottom: 0 }}>
          <button
            onClick={() => handleSelectAlbum('all')}
            className={`filter-btn ${activeAlbumId === 'all' ? 'active' : ''}`}
          >
            ALL ({totalCount})
          </button>
          {albums.map((album) => (
            <button
              key={album.id}
              onClick={() => handleSelectAlbum(album.id)}
              className={`filter-btn ${activeAlbumId.toLowerCase() === album.id.toLowerCase() ? 'active' : ''}`}
            >
              {album.name.toUpperCase()} ({album.items.length})
            </button>
          ))}
        </div>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '56px', width: '100%' }}>
        {visibleAlbums.map((album) => (
          <section key={album.id} className="projects-sub-section" id={album.id} style={{ marginTop: 0, paddingTop: '32px' }}>
            <div className="section-meta-header">
              <h2 className="section-section-title">{album.name.toLowerCase()}</h2>
              <span className="project-category-tag" style={{ marginLeft: 'auto' }}>
                {album.items.length} {album.items.length === 1 ? 'FRAME' : 'FRAMES'}
              </span>
            </div>
            <p className="section-intro-text" style={{ marginBottom: '24px' }}>
              {album.description}
            </p>

            {album.items.length > 0 ? (
              <div className="masonry-grid">
                {album.items.map((item) => {
                  const flatIdx = flatIndexMap.get(`${item.id}::${item.src}`) ?? -1;
                  const optimizedSrc = getPreviewImageUrl(item.src, 640, 75);
                  const useRaw = Boolean(rawFallbackImages[item.src]) || optimizedSrc === item.src;
                  const previewSrc = useRaw ? item.src : optimizedSrc;
                  const isFailed = Boolean(failedImages[item.src]);

                  return (
                    <div
                      key={item.id}
                      className="photo-card-wrapper masonry-item"
                      onClick={() => {
                        if (!isFailed && flatIdx >= 0) setSelectedIndex(flatIdx);
                      }}
                      style={{ cursor: isFailed ? 'default' : 'pointer' }}
                    >
                      <div className="photo-frame masonry-frame">
                        {!isFailed ? (
                          <img
                            src={previewSrc}
                            alt={item.alt || item.title}
                            className="gallery-photo lazy-img lazy-img--loaded"
                            loading="lazy"
                            decoding="async"
                            onError={() => {
                              if (!useRaw) {
                                setRawFallbackImages((prev) => ({ ...prev, [item.src]: true }));
                              } else {
                                setFailedImages((prev) => ({ ...prev, [item.src]: true }));
                              }
                            }}
                          />
                        ) : (
                          <div
                            style={{
                              minHeight: '200px',
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              justifyContent: 'center',
                              padding: '20px',
                              textAlign: 'center',
                              gap: '6px',
                              color: 'var(--text-muted)',
                              fontFamily: 'var(--mono)',
                              fontSize: '11px',
                            }}
                          >
                            <span>{item.title}</span>
                            <span style={{ opacity: 0.7 }}>Requires GITHUB_PHOTOS_TOKEN</span>
                          </div>
                        )}
                        <div className="photo-overlay"></div>
                      </div>

                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '10px 8px 4px',
                          gap: '8px',
                        }}
                      >
                        <span style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-dark)' }}>
                          {item.title}
                        </span>
                        {item.metadata?.model && (
                          <span
                            style={{
                              fontFamily: 'var(--mono)',
                              fontSize: '10px',
                              color: 'var(--text-muted)',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            {item.metadata.model}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="rom-info-card">
                <p className="body-para" style={{ fontSize: '14px' }}>
                  {syncSource === 'fallback' ? (
                    <>
                      Frames for <strong>{album.name}</strong> sync live from{' '}
                      <code>isaiahscape/private-photos</code> when <code>GITHUB_PHOTOS_TOKEN</code> is set (or from{' '}
                      <code>~/Downloads/private-photos</code> locally).
                    </>
                  ) : (
                    <>
                      No image frames matched <strong>{album.name}</strong> in{' '}
                      <code>isaiahscape/private-photos</code> ({syncSource}).
                    </>
                  )}
                </p>
              </div>
            )}
          </section>
        ))}
      </div>

      {/* Lightbox Modal with EXIF Details */}
      {selectedPhoto &&
        createPortal(
          <div className="photo-lightbox-overlay" onClick={() => setSelectedIndex(null)}>
            <div
              className="lightbox-content"
              onClick={(e) => e.stopPropagation()}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
                maxWidth: '1040px',
                width: '92vw',
              }}
            >
              <img
                src={selectedPhoto.src}
                alt={selectedPhoto.alt || selectedPhoto.title}
                className="lightbox-img"
                style={{ maxHeight: '72vh', objectFit: 'contain' }}
              />

              <div
                style={{
                  background: 'var(--card-bg-opaque, rgba(16, 16, 20, 0.92))',
                  border: 'none',
                  borderRadius: '16px',
                  padding: '14px 18px',
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '12px',
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-dark)' }}>
                    {selectedPhoto.title}
                  </span>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--text-muted)' }}>
                    {[
                      selectedPhoto.albumName,
                      selectedPhoto.metadata?.make && selectedPhoto.metadata?.model
                        ? `${selectedPhoto.metadata.make} ${selectedPhoto.metadata.model}`
                        : selectedPhoto.metadata?.model,
                      selectedPhoto.metadata?.lens,
                    ]
                      .filter(Boolean)
                      .join(' • ')}
                  </span>
                </div>

                {selectedPhoto.metadata && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {[
                      selectedPhoto.metadata.focalLength,
                      selectedPhoto.metadata.aperture,
                      selectedPhoto.metadata.shutterSpeed,
                      selectedPhoto.metadata.iso,
                      selectedPhoto.metadata.dimensions,
                      selectedPhoto.metadata.dateTaken,
                    ]
                      .filter(Boolean)
                      .map((spec, idx) => (
                        <span key={idx} className="tech-tag">
                          {spec}
                        </span>
                      ))}
                  </div>
                )}
              </div>

              {flatPhotos.length > 1 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <button
                    className="filter-btn"
                    onClick={() =>
                      setSelectedIndex((prev) =>
                        prev === null ? 0 : (prev - 1 + flatPhotos.length) % flatPhotos.length
                      )
                    }
                  >
                    ← PREV
                  </button>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: '#fff' }}>
                    {(selectedIndex ?? 0) + 1} / {flatPhotos.length}
                  </span>
                  <button
                    className="filter-btn"
                    onClick={() =>
                      setSelectedIndex((prev) => (prev === null ? 0 : (prev + 1) % flatPhotos.length))
                    }
                  >
                    NEXT →
                  </button>
                </div>
              )}

              <button className="lightbox-close-btn" onClick={() => setSelectedIndex(null)} aria-label="Close lightbox">
                ×
              </button>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
