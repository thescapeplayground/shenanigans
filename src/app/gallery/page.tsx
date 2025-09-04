import { Metadata } from "next";
import type { WebPage, WithContext } from "schema-dts";
import { PageContainer } from "@/components/page-container";
import { ArrowLeft, Camera, MapPin, Calendar, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "next-view-transitions";
import Image from "next/image";
import { galleryItems } from "@/components/gallery";

export const metadata: Metadata = {
  title: "Gallery",
  description: "A collection of photography and visual content.",
  openGraph: {
    title: "Gallery",
    description: "A collection of photography and visual content.",
  },
};

export default function Gallery() {
  const jsonLd: WithContext<WebPage> = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Gallery",
    alternateName: "shenanigans.",
    mainEntityOfPage: "https://isaiahthings.eu.org/gallery",
    description: "A collection of photography and visual content.",
    url: "https://isaiahthings.eu.org/gallery",
  };

  return (
    <>
      <PageContainer className="py-4 md:py-8">
        <div className="space-y-6 md:space-y-8">
          {/* Header Section */}
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              className="gap-2 bg-background/80 hover:bg-background border-border/50 hover:border-border backdrop-blur-sm transition-all duration-200"
              asChild
            >
              <Link href="/">
                <ArrowLeft className="size-4" />
                Back
              </Link>
            </Button>

            <div className="hidden md:flex items-center gap-2 text-muted-foreground">
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
              </div>
              <span className="text-xs font-mono ml-2">gallery.ts</span>
            </div>
          </div>

          {/* Main Gallery Showcase */}
          <div className="w-full bg-background/60 backdrop-blur-xl rounded-2xl border border-border/60 shadow-xl shadow-black/5 overflow-hidden">
            <div className="p-6 md:p-8">
              <div className="flex items-center gap-3 text-muted-foreground mb-6 md:mb-8">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Camera className="size-4 text-primary" />
                </div>
                <span className="text-sm font-mono font-medium">gallery.md</span>
                <div className="flex-1 h-px bg-gradient-to-r from-border to-transparent"></div>
              </div>

              <div className="mb-8">
                <h1 className="text-xl md:text-2xl font-bold mb-4">Collections</h1>
                <p className="text-sm text-muted-foreground">
                  A curated collection of photography and visual content showcasing various moments,
                  places, and perspectives through my lens. You can download the full resolution images
                  by clicking the download icon on each card if you want them to set as your wallpaper.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {galleryItems.map((item, index) => (
                  <div
                    key={item.id}
                    className="group relative h-full"
                  >
                    {/* Card Glow Effect */}
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    {/* Reduced transition duration above */}

                    <Card className="relative bg-background/80 backdrop-blur-xl hover:bg-background/90 rounded-2xl border border-border/50 hover:border-border/80 overflow-hidden transition-colors duration-200 hover:shadow-xl hover:shadow-black/10 hover:-translate-y-0.5 h-full">
                      <div className="relative aspect-[3/4] overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover group-hover:scale-102 transition-transform duration-300"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        {/* Overlay gradient for desktop hover */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-80 transition-opacity duration-200 hidden md:block"></div>
                        {/* Reduced transition duration above */}

                        <div className="absolute top-3 left-3">
                          <span className="px-2 py-1 text-xs font-medium text-white bg-black/50 backdrop-blur-sm rounded-full">
                            {item.category}
                          </span>
                        </div>

                        {/* Desktop Hoverable Content Overlay */}
                        <div className="hidden md:flex absolute inset-0 p-4 flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-200 translate-y-2 group-hover:translate-y-0">
                          <div className="text-white space-y-2">
                            <h3 className="text-lg font-bold group-hover:text-primary transition-colors">{item.title}</h3>
                            <p className="text-sm text-white/90 line-clamp-3">
                              {item.description}
                            </p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4 text-xs text-white/80">
                                <div className="flex items-center gap-1">
                                  <Calendar className="size-3" />
                                  <span>{new Date(item.date).toLocaleDateString()}</span>
                                </div>
                                {item.location && (
                                  <div className="flex items-center gap-1">
                                    <MapPin className="size-3" />
                                    <span>{item.location}</span>
                                  </div>
                                )}
                              </div>
                              <a
                                href={item.downloadUrl}
                                download={`${item.title.toLowerCase().replace(/\s+/g, '-')}.jpg`}
                                className="p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
                                title="Download full resolution"
                              >
                                <Download className="size-4 text-white" />
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Mobile Description Section */}
                      <div className="md:hidden p-4 space-y-3">
                        <div className="space-y-2">
                          <h3 className="text-lg font-bold">{item.title}</h3>
                          <p className="text-sm text-muted-foreground line-clamp-3">
                            {item.description}
                          </p>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="size-3" />
                              <span>{new Date(item.date).toLocaleDateString()}</span>
                            </div>
                            {item.location && (
                              <div className="flex items-center gap-1">
                                <MapPin className="size-3" />
                                <span>{item.location}</span>
                              </div>
                            )}
                          </div>
                          <a
                            href={item.downloadUrl}
                            download={`${item.title.toLowerCase().replace(/\s+/g, '-')}.jpg`}
                            className="p-2 rounded-full transition-colors"
                            title="Download full resolution"
                          >
                            <Download className="size-4 text-muted-foreground" />
                          </a>
                        </div>
                      </div>
                    </Card>
                  </div>
                ))}
              </div>

              <div className="mt-12 text-center">
                <p className="text-sm text-muted-foreground">
                  More content coming soon. Follow my journey for updates.
                </p>
              </div>
            </div>
          </div>
        </div>
      </PageContainer>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
