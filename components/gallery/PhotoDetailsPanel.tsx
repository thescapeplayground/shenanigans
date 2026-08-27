"use client";

import React, { useState } from "react";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { motion } from "motion/react";
import { GalleryPhoto, PhotoMetadata } from "@/src/types";

interface PhotoDetailsPanelProps {
  photo: GalleryPhoto;
  metadata: PhotoMetadata;
  isOpen: boolean;
  onClose: () => void;
}

export function PhotoDetailsPanel({
  photo,
  metadata,
  isOpen,
  onClose,
}: PhotoDetailsPanelProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "raw">("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const rawTags = metadata.rawTags || {};
  const rawTagEntries = Object.entries(rawTags).filter(([key, val]) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      key.toLowerCase().includes(query) ||
      String(val).toLowerCase().includes(query)
    );
  });

  const handleCopyJson = () => {
    const fullData = {
      title: photo.title || photo.alt,
      src: photo.src,
      ...metadata,
    };
    navigator.clipboard.writeText(JSON.stringify(fullData, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const hasExposureData =
    metadata.focalLength ||
    metadata.aperture ||
    metadata.shutterSpeed ||
    metadata.iso;

  const hasDeviceData = metadata.make || metadata.model || metadata.lens;

  return (
    <motion.div
      initial={{ x: "100%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "100%", opacity: 0 }}
      transition={{ type: "spring", damping: 28, stiffness: 280 }}
      onClick={(e) => e.stopPropagation()}
      className="absolute right-0 top-0 bottom-0 w-full sm:w-[380px] md:w-[420px] bg-zinc-950/90 backdrop-blur-2xl border-l border-white/10 text-white z-50 flex flex-col shadow-2xl overflow-hidden select-text"
    >
      <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between gap-3 bg-zinc-900/40 shrink-0">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 shrink-0">
            <MaterialIcon icon="info" size="1.15rem" />
          </div>
          <div className="min-w-0">
            <h3 className="text-sm font-semibold text-zinc-100 truncate">
              {photo.title || photo.alt}
            </h3>
            <p className="text-xs font-mono text-zinc-400 truncate">
              Photo Details & Metadata
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          aria-label="Close details panel"
          className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
        >
          <MaterialIcon icon="close" size="1.25rem" />
        </button>
      </div>

      <div className="flex items-center px-4 pt-3 border-b border-white/5 gap-2 shrink-0 bg-zinc-900/20">
        <button
          onClick={() => setActiveTab("overview")}
          className={`pb-2.5 px-3 text-xs font-medium border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
            activeTab === "overview"
              ? "border-purple-500 text-purple-400 font-semibold"
              : "border-transparent text-zinc-400 hover:text-zinc-200"
          }`}
        >
          <MaterialIcon icon="tune" size="0.95rem" />
          Camera Specs
        </button>
        <button
          onClick={() => setActiveTab("raw")}
          className={`pb-2.5 px-3 text-xs font-medium border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
            activeTab === "raw"
              ? "border-purple-500 text-purple-400 font-semibold"
              : "border-transparent text-zinc-400 hover:text-zinc-200"
          }`}
        >
          <MaterialIcon icon="data_object" size="0.95rem" />
          Metadata
          {rawTagEntries.length > 0 && (
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-zinc-800 text-zinc-400">
              {rawTagEntries.length}
            </span>
          )}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5 scrollbar-thin scrollbar-thumb-zinc-700">
        {activeTab === "overview" ? (
          <div className="space-y-4">
            {hasDeviceData && (
              <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-white/5 space-y-2">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-white/5 text-purple-400 shrink-0">
                    <MaterialIcon icon="photo_camera" size="1.25rem" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 block">
                      Camera / Device
                    </span>
                    <div className="text-sm font-medium text-zinc-100 truncate">
                      {metadata.make ? `${metadata.make} ` : ""}
                      {metadata.model || "Unknown Device"}
                    </div>
                    {metadata.lens && (
                      <div className="text-xs text-zinc-400 truncate mt-0.5 flex items-center gap-1">
                        <MaterialIcon icon="center_focus_strong" size="0.85rem" />
                        <span>{metadata.lens}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {hasExposureData && (
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 block mb-2 px-1">
                  Exposure Parameters
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-3 rounded-xl bg-zinc-900/60 border border-white/5 flex flex-col justify-between">
                    <div className="flex items-center gap-1.5 text-zinc-400 text-xs">
                      <MaterialIcon icon="lens" size="0.9rem" className="text-purple-400" />
                      <span>Focal Length</span>
                    </div>
                    <div className="mt-2">
                      <span className="text-base font-semibold text-zinc-100">
                        {metadata.focalLength || "—"}
                      </span>
                      {metadata.focalLength35mm && (
                        <span className="text-[11px] text-zinc-500 block font-mono">
                          {metadata.focalLength35mm}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-zinc-900/60 border border-white/5 flex flex-col justify-between">
                    <div className="flex items-center gap-1.5 text-zinc-400 text-xs">
                      <MaterialIcon icon="camera" size="0.9rem" className="text-purple-400" />
                      <span>Aperture</span>
                    </div>
                    <div className="mt-2">
                      <span className="text-base font-semibold text-zinc-100 font-mono">
                        {metadata.aperture || "—"}
                      </span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-zinc-900/60 border border-white/5 flex flex-col justify-between">
                    <div className="flex items-center gap-1.5 text-zinc-400 text-xs">
                      <MaterialIcon icon="timer" size="0.9rem" className="text-purple-400" />
                      <span>Shutter Speed</span>
                    </div>
                    <div className="mt-2">
                      <span className="text-base font-semibold text-zinc-100 font-mono">
                        {metadata.shutterSpeed || "—"}
                      </span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-zinc-900/60 border border-white/5 flex flex-col justify-between">
                    <div className="flex items-center gap-1.5 text-zinc-400 text-xs">
                      <MaterialIcon icon="iso" size="0.9rem" className="text-purple-400" />
                      <span>ISO</span>
                    </div>
                    <div className="mt-2">
                      <span className="text-base font-semibold text-zinc-100 font-mono">
                        {metadata.iso || "—"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-white/5 space-y-2.5">
              <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 block border-b border-white/5 pb-1.5">
                Image Properties
              </span>

              {metadata.dimensions && (
                <div className="flex items-center justify-between text-xs py-0.5">
                  <span className="text-zinc-400 flex items-center gap-1.5">
                    <MaterialIcon icon="aspect_ratio" size="0.9rem" />
                    Dimensions
                  </span>
                  <span className="font-mono text-zinc-200">{metadata.dimensions}</span>
                </div>
              )}

              {metadata.aspectRatio && (
                <div className="flex items-center justify-between text-xs py-0.5">
                  <span className="text-zinc-400 flex items-center gap-1.5">
                    <MaterialIcon icon="crop" size="0.9rem" />
                    Aspect Ratio
                  </span>
                  <span className="font-mono text-zinc-200">{metadata.aspectRatio}</span>
                </div>
              )}

              {metadata.dateTaken && (
                <div className="flex items-center justify-between text-xs py-0.5">
                  <span className="text-zinc-400 flex items-center gap-1.5">
                    <MaterialIcon icon="calendar_today" size="0.9rem" />
                    Captured Date
                  </span>
                  <span className="text-zinc-200 text-right">{metadata.dateTaken}</span>
                </div>
              )}

              {metadata.fileSize && (
                <div className="flex items-center justify-between text-xs py-0.5">
                  <span className="text-zinc-400 flex items-center gap-1.5">
                    <MaterialIcon icon="inventory_2" size="0.9rem" />
                    File Size
                  </span>
                  <span className="font-mono text-zinc-200">{metadata.fileSize}</span>
                </div>
              )}

              {metadata.software && (
                <div className="flex items-center justify-between text-xs py-0.5">
                  <span className="text-zinc-400 flex items-center gap-1.5">
                    <MaterialIcon icon="code" size="0.9rem" />
                    Software / Profile
                  </span>
                  <span className="text-zinc-200 font-mono truncate max-w-[180px] text-right" title={metadata.software}>
                    {metadata.software}
                  </span>
                </div>
              )}

              {metadata.colorSpace && (
                <div className="flex items-center justify-between text-xs py-0.5">
                  <span className="text-zinc-400 flex items-center gap-1.5">
                    <MaterialIcon icon="palette" size="0.9rem" />
                    Color Space
                  </span>
                  <span className="font-mono text-zinc-200">{metadata.colorSpace}</span>
                </div>
              )}

              {metadata.exposureBias && (
                <div className="flex items-center justify-between text-xs py-0.5">
                  <span className="text-zinc-400 flex items-center gap-1.5">
                    <MaterialIcon icon="exposure" size="0.9rem" />
                    Exposure Bias
                  </span>
                  <span className="font-mono text-zinc-200">{metadata.exposureBias}</span>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <MaterialIcon
                  icon="search"
                  size="1rem"
                  className="absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none"
                />
                <input
                  type="text"
                  placeholder="Filter metadata tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-zinc-900 border border-white/10 rounded-lg pl-8 pr-3 py-1.5 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-purple-500"
                />
              </div>
              <button
                onClick={handleCopyJson}
                className="px-2.5 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-medium text-zinc-200 transition-colors flex items-center gap-1 shrink-0 cursor-pointer"
                title="Copy all metadata as JSON"
              >
                <MaterialIcon icon={copied ? "check" : "content_copy"} size="0.95rem" />
                <span>{copied ? "Copied" : "JSON"}</span>
              </button>
            </div>

            <div className="border border-white/10 rounded-xl overflow-hidden bg-zinc-900/50">
              <div className="max-h-[380px] overflow-y-auto divide-y divide-white/5 font-mono text-xs">
                {rawTagEntries.length > 0 ? (
                  rawTagEntries.map(([key, val]) => (
                    <div
                      key={key}
                      className="p-2.5 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 hover:bg-white/5 transition-colors"
                    >
                      <span className="text-purple-300 select-all">{key}</span>
                      <span className="text-zinc-400 select-all break-all sm:text-right text-[11px]">
                        {String(val)}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="p-6 text-center text-zinc-500 text-xs font-sans">
                    {searchQuery
                      ? "No matching metadata tags found."
                      : "No extra raw EXIF tags found in file."}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-3 bg-zinc-900/70 border-t border-white/10 flex items-center justify-between text-xs text-zinc-400">
        <span className="font-mono text-[11px] truncate">
          {photo.folder ? `/${photo.folder}` : "Gallery"}
        </span>
        <button
          onClick={handleCopyJson}
          className="text-xs text-purple-400 hover:text-purple-300 font-medium cursor-pointer"
        >
          {copied ? "Copied to Clipboard!" : "Copy Full Metadata"}
        </button>
      </div>
    </motion.div>
  );
}
