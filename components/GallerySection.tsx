"use client";

import { useState, useEffect, useCallback, useTransition } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { motion, AnimatePresence } from "motion/react";
import { DEFAULT_GALLERY_ALBUMS } from "@/src/data/gallery";
import { GalleryAlbum, GalleryPhoto, PhotoMetadata } from "@/src/types";
import { PhotoDetailsPanel } from "@/components/gallery/PhotoDetailsPanel";
import { extractPhotoMetadata } from "@/src/lib/exif";

function getPhotoIdentifier(photo: GalleryPhoto): string {
  const parts = photo.src.split("/");
  const filename = decodeURIComponent(parts[parts.length - 1] || "");
  return filename || photo.id;
}

export function GallerySection() {
  const searchParams = useSearchParams();
  const [albums, setAlbums] = useState<GalleryAlbum[]>(DEFAULT_GALLERY_ALBUMS);
  const [activeAlbum, setActiveAlbum] = useState<GalleryAlbum | null>(null);
  const [selectedImage, setSelectedImage] = useState<GalleryPhoto | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [activeMetadata, setActiveMetadata] = useState<PhotoMetadata | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [, startTransition] = useTransition();

  useEffect(() => {
    fetch("/api/gallery")
      .then((res) => res.json())
      .then((data: GalleryAlbum[]) => {
        if (Array.isArray(data) && data.length > 0) {
          setAlbums(data);
        }
      })
      .catch(() => {});
  }, []);

  const currentItems = activeAlbum?.items || [];
  const currentIndex = selectedImage
    ? currentItems.findIndex((item) => item.id === selectedImage.id)
    : -1;

  const updateUrl = useCallback((album: GalleryAlbum | null, photo: GalleryPhoto | null) => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    if (album) {
      url.searchParams.set("album", album.id);
      if (photo) {
        url.searchParams.set("photo", getPhotoIdentifier(photo));
      } else {
        url.searchParams.delete("photo");
      }
    } else {
      url.searchParams.delete("album");
      url.searchParams.delete("photo");
    }
    window.history.replaceState(null, "", url.toString());
  }, []);

  const handleSelectImage = useCallback(
    (photo: GalleryPhoto | null, syncUrl = true) => {
      setSelectedImage(photo);
      if (photo) {
        setActiveMetadata(photo.metadata || {});
        extractPhotoMetadata(photo.src, photo.metadata).then((extracted) => {
          setActiveMetadata(extracted);
        });
        if (syncUrl && activeAlbum) {
          updateUrl(activeAlbum, photo);
        }
      } else {
        setActiveMetadata(null);
        if (syncUrl && activeAlbum) {
          updateUrl(activeAlbum, null);
        }
      }
    },
    [activeAlbum, updateUrl]
  );

  const handleSelectAlbum = useCallback(
    (album: GalleryAlbum | null, syncUrl = true) => {
      startTransition(() => {
        setActiveAlbum(album);
        setSelectedImage(null);
        setActiveMetadata(null);
      });
      if (syncUrl) {
        updateUrl(album, null);
      }
    },
    [updateUrl]
  );

  useEffect(() => {
    const albumParam = searchParams.get("album");
    const photoParam = searchParams.get("photo");

    if (albumParam) {
      const matchedAlbum = albums.find(
        (a) =>
          a.id.toLowerCase() === albumParam.toLowerCase() ||
          a.folder.toLowerCase() === albumParam.toLowerCase()
      );
      if (matchedAlbum) {
        setActiveAlbum(matchedAlbum);
        if (photoParam) {
          const matchedPhoto = matchedAlbum.items.find(
            (p) =>
              p.id.toLowerCase() === photoParam.toLowerCase() ||
              getPhotoIdentifier(p).toLowerCase() === photoParam.toLowerCase()
          );
          if (matchedPhoto) {
            handleSelectImage(matchedPhoto, false);
          }
        }
      }
    }
  }, [searchParams, albums, handleSelectImage]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      handleSelectImage(currentItems[currentIndex - 1]);
    } else if (currentItems.length > 0) {
      handleSelectImage(currentItems[currentItems.length - 1]);
    }
  }, [currentIndex, currentItems, handleSelectImage]);

  const handleNext = useCallback(() => {
    if (currentIndex < currentItems.length - 1) {
      handleSelectImage(currentItems[currentIndex + 1]);
    } else if (currentItems.length > 0) {
      handleSelectImage(currentItems[0]);
    }
  }, [currentIndex, currentItems, handleSelectImage]);

  const handleShareLink = useCallback(() => {
    if (typeof window === "undefined" || !activeAlbum || !selectedImage) return;
    const photoParam = getPhotoIdentifier(selectedImage);
    const fullUrl = `${window.location.origin}/gallery?album=${encodeURIComponent(activeAlbum.id)}&photo=${encodeURIComponent(photoParam)}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  }, [activeAlbum, selectedImage]);

  useEffect(() => {
    if (!selectedImage) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (showDetails) {
          setShowDetails(false);
        } else {
          handleSelectImage(null);
        }
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "i" || e.key === "I") {
        setShowDetails((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage, showDetails, handlePrev, handleNext, handleSelectImage]);

  return (
    <div className="space-y-6 py-4" id="gallery-section">
      <AnimatePresence mode="wait">
        {!activeAlbum ? (
          <motion.div
            key="albums-grid"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-2 text-left"
              id="gallery-header"
            >
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-purple-600/10 text-purple-600">
                  <MaterialIcon icon="folder_special" size="1.25rem" />
                </div>
                <h2 className="text-2xl font-bold tracking-tight text-neutral-950 dark:text-neutral-50 font-sans">
                  Gallery & Albums
                </h2>
              </div>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 max-w-xl font-sans">
                A curated collection of banners, visual designs, and photography organized into interactive album folders.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
              {albums.map((album, index) => {
                const previewItems = album.items.slice(0, 3);
                return (
                  <motion.div
                    key={album.id}
                    initial={{ opacity: 0, y: 20, scale: 0.98 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: "0px 0px -30px 0px" }}
                    transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                    onClick={() => handleSelectAlbum(album)}
                    className="group relative cursor-pointer rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50/70 dark:bg-zinc-900/40 p-4 transition-all duration-300 hover:border-purple-600/40 hover:shadow-xl hover:shadow-purple-600/5 hover:-translate-y-1 text-left"
                  >
                    <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden mb-4 bg-zinc-200 dark:bg-zinc-800">
                      {previewItems[2] && (
                        <div className="absolute inset-0 translate-x-2 -translate-y-2 scale-[0.92] opacity-40 rounded-xl overflow-hidden border border-white/20">
                          <Image
                            src={previewItems[2].src}
                            alt=""
                            fill
                            className="object-cover"
                            sizes="120px"
                            quality={15}
                            loading="lazy"
                          />
                        </div>
                      )}
                      {previewItems[1] && (
                        <div className="absolute inset-0 translate-x-1 -translate-y-1 scale-[0.96] opacity-70 rounded-xl overflow-hidden border border-white/20">
                          <Image
                            src={previewItems[1].src}
                            alt=""
                            fill
                            className="object-cover"
                            sizes="120px"
                            quality={15}
                            loading="lazy"
                          />
                        </div>
                      )}

                      <Image
                        src={album.coverImage}
                        alt={album.name}
                        fill
                        sizes="(max-width: 640px) 320px, 380px"
                        quality={20}
                        loading="lazy"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md text-white text-xs font-medium border border-white/10">
                          <MaterialIcon icon={album.icon || "folder"} size="0.875rem" />
                          {album.items.length} photos
                        </span>
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-full bg-white/20 text-white backdrop-blur-md">
                          <MaterialIcon icon="arrow_forward" size="1rem" />
                        </span>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-base text-zinc-900 dark:text-zinc-100 group-hover:text-purple-600 transition-colors">
                          {album.name}
                        </h3>
                        <span className="text-xs font-mono text-zinc-400 dark:text-zinc-500 uppercase">
                          /{album.folder}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed font-sans">
                        {album.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="album-detail"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="space-y-6 text-left"
          >
            <div className="flex items-center justify-between pb-2 border-b border-zinc-200/80 dark:border-zinc-800/80">
              <button
                onClick={() => handleSelectAlbum(null)}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-800/80 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-xs font-medium text-zinc-800 dark:text-zinc-200 transition-colors cursor-pointer"
              >
                <MaterialIcon icon="arrow_back" size="1rem" />
                <span>All Albums</span>
              </button>

              <div className="flex items-center gap-2 text-xs text-zinc-400 dark:text-zinc-500 font-mono">
                <span>Gallery</span>
                <span>/</span>
                <span className="text-zinc-800 dark:text-zinc-200 font-semibold">{activeAlbum.name}</span>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-2xl p-5 border border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <MaterialIcon icon={activeAlbum.icon || "folder"} size="1.25rem" className="text-purple-600" />
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">{activeAlbum.name}</h3>
                </div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">{activeAlbum.description}</p>
              </div>
              <div className="shrink-0">
                <span className="px-3 py-1 rounded-full bg-purple-600/10 text-purple-600 text-xs font-semibold font-mono">
                  {activeAlbum.items.length} Photos
                </span>
              </div>
            </motion.div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {activeAlbum.items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.95, y: 15 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true, margin: "0px 0px -20px 0px" }}
                  transition={{ duration: 0.45, delay: Math.min(index * 0.04, 0.25), ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => handleSelectImage(item)}
                  className="group relative cursor-pointer rounded-xl overflow-hidden border border-zinc-200/60 dark:border-zinc-800/50 bg-zinc-50/50 dark:bg-zinc-900/10 hover:border-purple-600/50 transition-all shadow-sm hover:shadow-md"
                >
                  <div className="aspect-square w-full relative">
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      sizes="(max-width: 640px) 180px, (max-width: 1024px) 240px, 280px"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      quality={20}
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2.5">
                      <div className="flex justify-end">
                        {item.metadata?.focalLength && (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-zinc-300 border border-white/10">
                            {item.metadata.focalLength}
                          </span>
                        )}
                      </div>
                      <div className="space-y-0.5">
                        <p className="text-xs font-medium text-white line-clamp-1 truncate">
                          {item.title || item.alt}
                        </p>
                        {item.metadata?.model && (
                          <p className="text-[10px] text-zinc-400 font-mono truncate">
                            {item.metadata.model}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => handleSelectImage(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="absolute top-0 left-0 right-0 p-4 sm:p-5 flex items-center justify-between z-40 bg-gradient-to-b from-black/80 to-transparent pointer-events-auto"
            >
              <div className="flex items-center gap-3 min-w-0">
                {selectedImage.title && (
                  <span className="text-xs sm:text-sm font-medium text-zinc-200 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 truncate max-w-[200px] sm:max-w-md">
                    {selectedImage.title}
                  </span>
                )}
                {currentIndex >= 0 && (
                  <span className="text-xs font-mono text-zinc-400 bg-black/30 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/5 shrink-0">
                    {currentIndex + 1} / {currentItems.length}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={handleShareLink}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium bg-white/10 hover:bg-white/20 text-zinc-200 border border-white/10 transition-colors cursor-pointer"
                  title="Copy Direct Photo Link"
                >
                  <MaterialIcon icon={copiedLink ? "check" : "share"} size="1.05rem" />
                  <span className="hidden sm:inline">{copiedLink ? "Copied Link" : "Share"}</span>
                </button>

                <button
                  onClick={() => setShowDetails((prev) => !prev)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer border ${
                    showDetails
                      ? "bg-purple-600 text-white border-purple-500 shadow-lg shadow-purple-600/30"
                      : "bg-white/10 hover:bg-white/20 text-zinc-200 border-white/10"
                  }`}
                  title="Toggle Photo Details & EXIF Metadata (Key: I)"
                >
                  <MaterialIcon icon="info" size="1.1rem" />
                  <span className="hidden sm:inline">Details</span>
                </button>

                <button
                  onClick={() => handleSelectImage(null)}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer border border-white/10"
                  title="Close (Key: Esc)"
                  aria-label="Close lightbox"
                >
                  <MaterialIcon icon="close" size="1.15rem" />
                </button>
              </div>
            </div>

            {currentItems.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrev();
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 hover:bg-black/80 text-white border border-white/10 backdrop-blur-md transition-all hover:scale-105 z-30 cursor-pointer hidden sm:flex items-center justify-center"
                  aria-label="Previous photo"
                >
                  <MaterialIcon icon="chevron_left" size="1.5rem" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 hover:bg-black/80 text-white border border-white/10 backdrop-blur-md transition-all hover:scale-105 z-30 cursor-pointer hidden sm:flex items-center justify-center"
                  aria-label="Next photo"
                >
                  <MaterialIcon icon="chevron_right" size="1.5rem" />
                </button>
              </>
            )}

            <div
              onClick={(e) => e.stopPropagation()}
              className={`relative flex items-center justify-center transition-all duration-300 p-4 sm:p-8 w-full h-[85vh] ${
                showDetails ? "sm:pr-[430px]" : ""
              }`}
            >
              <div className="relative w-full h-full max-w-[90vw] max-h-[82vh] flex items-center justify-center">
                <Image
                  key={selectedImage.id}
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  fill
                  sizes="(max-width: 1024px) 90vw, 1200px"
                  quality={60}
                  priority
                  className="object-contain rounded-xl shadow-2xl select-none"
                />
              </div>
            </div>

            <AnimatePresence>
              {showDetails && activeMetadata && (
                <PhotoDetailsPanel
                  photo={selectedImage}
                  metadata={activeMetadata}
                  isOpen={showDetails}
                  onClose={() => setShowDetails(false)}
                />
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}