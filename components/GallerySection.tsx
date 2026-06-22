"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface GalleryItem {
  src: string;
  alt: string;
  folder: string;
}

interface GalleryFolder {
  name: string;
  items: GalleryItem[];
}

export function GallerySection() {
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  const folders: GalleryFolder[] = [
    {
      name: "TV",
      items: [
        { src: "/assets/TV - 1, Fixed.png", alt: "TV Fixed 1", folder: "tv" },
        { src: "/assets/TV Showcase - 1.png", alt: "TV Showcase 1", folder: "tv" },
        { src: "/assets/TV Showcase - 2.png", alt: "TV Showcase 2", folder: "tv" },
      ],
    },
    {
      name: "Tangible Stuff",
      items: [
        { src: "/assets/TV - 5, Pt. I.png", alt: "Tangible TV Pt I", folder: "tangiblestuff" },
        { src: "/assets/TV - 5, Pt. II.png", alt: "Tangible TV Pt II", folder: "tangiblestuff" },
        { src: "/assets/TV - 5, Pt. III.png", alt: "Tangible TV Pt III", folder: "tangiblestuff" },
        { src: "/assets/TV - 5, Pt. IV.png", alt: "Tangible TV Pt IV", folder: "tangiblestuff" },
        { src: "/assets/TV - 5, Pt. V.png", alt: "Tangible TV Pt V", folder: "tangiblestuff" },
        { src: "/assets/TV - 5, Pt. VI.png", alt: "Tangible TV Pt VI", folder: "tangiblestuff" },
        { src: "/assets/TV - 5, Pt. VII.png", alt: "Tangible TV Pt VII", folder: "tangiblestuff" },
      ],
    },
  ].filter((folder) => folder.items.length > 0);

  return (
    <div className="space-y-8 py-4" id="gallery-section">
      <div className="space-y-2" id="gallery-header">
        <h2 className="text-2xl font-bold tracking-tight text-neutral-950 dark:text-neutral-50 font-sans">
          Gallery
        </h2>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 max-w-xl font-sans">
          A curated collection of banners, designs, and photography organized by folder.
        </p>
      </div>

      <div className="space-y-8" id="gallery-folders">
        {folders.map((folder) => (
          <div key={folder.name} className="space-y-4" id={`gallery-folder-${folder.name.toLowerCase().replace(/\s+/g, '-')}`}>
            <h3 className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest font-mono">
              {folder.name}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {folder.items.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => setSelectedImage(item)}
                  className="group relative cursor-pointer rounded-xl overflow-hidden border border-zinc-200/60 dark:border-zinc-800/50 bg-zinc-50/50 dark:bg-zinc-900/10 hover:border-zinc-400 dark:hover:border-zinc-600 transition-all"
                >
                  <div className="aspect-video w-full">
                    <img
                      src={item.src}
                      alt={item.alt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <motion.img
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="max-w-[90vw] max-h-[90vh] rounded-lg shadow-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}