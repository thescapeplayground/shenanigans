import { Metadata } from "next";
import { notFound } from "next/navigation";
import { GallerySection } from "@/components/GallerySection";
import { DEFAULT_GALLERY_ALBUMS } from "@/src/data/gallery";

interface GalleryPageProps {
  params: Promise<{ slug?: string[] }>;
}

function getPhotoFilename(src: string): string {
  const parts = src.split("/");
  return decodeURIComponent(parts[parts.length - 1] || "");
}

export async function generateStaticParams() {
  const params: Array<{ slug: string[] }> = [{ slug: [] }];

  for (const album of DEFAULT_GALLERY_ALBUMS) {
    params.push({ slug: [album.id] });
    if (album.folder && album.folder !== album.id) {
      params.push({ slug: [album.folder] });
    }

    for (const item of album.items) {
      const filename = getPhotoFilename(item.src);
      params.push({ slug: [album.id, filename] });
      if (item.id !== filename) {
        params.push({ slug: [album.id, item.id] });
      }
    }
  }

  return params;
}

export async function generateMetadata({
  params,
}: GalleryPageProps): Promise<Metadata> {
  const { slug } = await params;

  if (!slug || slug.length === 0) {
    return {
      title: "Gallery & Albums",
      description:
        "A curated collection of banners, visual designs, and photography organized into interactive album folders.",
    };
  }

  const albumSlug = decodeURIComponent(slug[0]);
  const album = DEFAULT_GALLERY_ALBUMS.find(
    (a) => a.id.toLowerCase() === albumSlug.toLowerCase() || a.folder.toLowerCase() === albumSlug.toLowerCase()
  );

  if (!album) {
    return {
      title: "Gallery",
    };
  }

  if (slug.length >= 2) {
    const photoSlug = decodeURIComponent(slug.slice(1).join("/"));
    const photo = album.items.find(
      (p) =>
        p.id.toLowerCase() === photoSlug.toLowerCase() ||
        getPhotoFilename(p.src).toLowerCase() === photoSlug.toLowerCase()
    );

    if (photo) {
      const title = photo.title || photo.alt;
      return {
        title: `${title} — ${album.name} | Gallery`,
        description: `View ${title} taken with ${photo.metadata?.model || "DSLR"} in ${album.name}.`,
      };
    }
  }

  return {
    title: `${album.name} | Gallery`,
    description: album.description,
  };
}

export default async function GalleryPage({ params }: GalleryPageProps) {
  const { slug } = await params;

  const initialAlbumSlug = slug && slug.length > 0 ? decodeURIComponent(slug[0]) : undefined;
  const initialPhotoSlug = slug && slug.length > 1 ? decodeURIComponent(slug.slice(1).join("/")) : undefined;

  if (initialAlbumSlug) {
    const albumExists = DEFAULT_GALLERY_ALBUMS.some(
      (a) =>
        a.id.toLowerCase() === initialAlbumSlug.toLowerCase() ||
        a.folder.toLowerCase() === initialAlbumSlug.toLowerCase()
    );
    if (!albumExists) {
      notFound();
    }
  }

  return (
    <GallerySection
      initialAlbumSlug={initialAlbumSlug}
      initialPhotoSlug={initialPhotoSlug}
    />
  );
}
