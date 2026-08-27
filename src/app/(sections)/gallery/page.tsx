import { Metadata } from "next";
import { Suspense } from "react";
import { GallerySection } from "@/components/GallerySection";

export const metadata: Metadata = {
  title: "Gallery & Albums",
  description: "A curated collection of banners, visual designs, and photography organized into interactive album folders.",
};

export default function GalleryPage() {
  return (
    <Suspense fallback={<div className="h-64 flex items-center justify-center text-xs text-zinc-500 font-mono">Loading gallery...</div>}>
      <GallerySection />
    </Suspense>
  );
}
