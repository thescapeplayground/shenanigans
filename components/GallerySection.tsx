"use client";

import { useState } from "react";
import Image from "next/image";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { motion, AnimatePresence } from "motion/react";
import { DEFAULT_GALLERY_ALBUMS } from "@/src/data/gallery";
import { GalleryAlbum, GalleryPhoto } from "@/src/types";

export function GallerySection() {
  const [activeAlbum, setActiveAlbum] = useState<GalleryAlbum | null>(null);
  const [selectedImage, setSelectedImage] = useState<GalleryPhoto | null>(null);

  const albums = DEFAULT_GALLERY_ALBUMS;

  return (
    <div className="space-y-6 py-4" id="gallery-section">
      <AnimatePresence mode="wait">
        {!activeAlbum ? (
          /* ================= ALBUMS OVERVIEW VIEW ================= */
          <motion.div
            key="albums-grid"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            <div className="space-y-2" id="gallery-header">
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
            </div>

            {/* Folder Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
              {albums.map((album, index) => {
                const previewItems = album.items.slice(0, 3);
                return (
                  <motion.div
                    key={album.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.08 }}
                    onClick={() => setActiveAlbum(album)}
                    className="group relative cursor-pointer rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50/70 dark:bg-zinc-900/40 p-4 transition-all duration-300 hover:border-purple-600/40 hover:shadow-xl hover:shadow-purple-600/5 hover:-translate-y-1"
                  >
                    {/* Visual Folder Card Stack Effect */}
                    <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden mb-4 bg-zinc-200 dark:bg-zinc-800">
                      {/* Back stack card 2 */}
                      {previewItems[2] && (
                        <div className="absolute inset-0 translate-x-2 -translate-y-2 scale-[0.92] opacity-40 rounded-xl overflow-hidden border border-white/20">
                          <Image
                            src={previewItems[2].src}
                            alt=""
                            fill
                            className="object-cover"
                            sizes="30vw"
                          />
                        </div>
                      )}
                      {/* Back stack card 1 */}
                      {previewItems[1] && (
                        <div className="absolute inset-0 translate-x-1 -translate-y-1 scale-[0.96] opacity-70 rounded-xl overflow-hidden border border-white/20">
                          <Image
                            src={previewItems[1].src}
                            alt=""
                            fill
                            className="object-cover"
                            sizes="30vw"
                          />
                        </div>
                      )}

                      {/* Main Cover Image */}
                      <Image
                        src={album.coverImage}
                        alt={album.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                      {/* Folder Badge & Count */}
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

                    {/* Album Info */}
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
          /* ================= SINGLE ALBUM DETAIL VIEW ================= */
          <motion.div
            key="album-detail"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            {/* Header / Breadcrumb Navigation */}
            <div className="flex items-center justify-between pb-2 border-b border-zinc-200/80 dark:border-zinc-800/80">
              <button
                onClick={() => setActiveAlbum(null)}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-800/80 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-xs font-medium text-zinc-800 dark:text-zinc-200 transition-colors"
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

            {/* Folder Header Info Banner */}
            <div className="rounded-2xl p-5 border border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
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
            </div>

            {/* Photo Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {activeAlbum.items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.04 }}
                  onClick={() => setSelectedImage(item)}
                  className="group relative cursor-pointer rounded-xl overflow-hidden border border-zinc-200/60 dark:border-zinc-800/50 bg-zinc-50/50 dark:bg-zinc-900/10 hover:border-purple-600/50 transition-all shadow-sm hover:shadow-md"
                >
                  <div className="aspect-square w-full relative">
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      quality={25}
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                      <p className="text-xs font-medium text-white line-clamp-1 truncate">
                        {item.title || item.alt}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/85 backdrop-blur-md p-4"
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <MaterialIcon icon="close" size="1.25rem" />
            </button>
            <motion.img
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="max-w-[90vw] max-h-[85vh] rounded-xl shadow-2xl object-contain"
            />
            {selectedImage.title && (
              <p className="mt-3 text-xs font-mono text-zinc-300 bg-black/60 px-3 py-1.5 rounded-full border border-white/10">
                {selectedImage.title}
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}