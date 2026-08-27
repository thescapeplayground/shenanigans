import exifr from "exifr";
import { PhotoMetadata } from "@/src/types";

function formatShutterSpeed(seconds?: number): string | undefined {
  if (!seconds || seconds <= 0) return undefined;
  if (seconds >= 1) {
    return `${Math.round(seconds * 10) / 10}s`;
  }
  const denominator = Math.round(1 / seconds);
  return `1/${denominator}s`;
}

function formatAperture(fNumber?: number): string | undefined {
  if (!fNumber || fNumber <= 0) return undefined;
  const rounded = Math.round(fNumber * 10) / 10;
  return `f/${rounded}`;
}

function formatFocalLength(fl?: number): string | undefined {
  if (!fl || fl <= 0) return undefined;
  const rounded = Math.round(fl * 10) / 10;
  return `${rounded}mm`;
}

function formatDateTaken(date?: Date | string | number): string | undefined {
  if (!date) return undefined;
  try {
    const d = new Date(date);
    if (isNaN(d.getTime())) return typeof date === "string" ? date : undefined;
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return typeof date === "string" ? date : undefined;
  }
}

export async function extractPhotoMetadata(
  src: string,
  fallback?: PhotoMetadata
): Promise<PhotoMetadata> {
  const meta: PhotoMetadata = { ...fallback };

  if (typeof window === "undefined" || !src) {
    return meta;
  }

  try {
    const parsed = await exifr.parse(src, {
      tiff: true,
      xmp: true,
      icc: false,
      iptc: false,
      jfif: true,
      gps: true,
      translateKeys: true,
      reviveValues: true,
    });

    if (parsed) {
      if (parsed.Make) meta.make = String(parsed.Make).trim();
      if (parsed.Model) meta.model = String(parsed.Model).trim();
      if (parsed.LensModel) meta.lens = String(parsed.LensModel).trim();
      if (parsed.FocalLength) {
        meta.focalLength = formatFocalLength(parsed.FocalLength);
      }
      if (parsed.FocalLengthIn35mmFormat) {
        meta.focalLength35mm = `${parsed.FocalLengthIn35mmFormat}mm eq.`;
      }
      if (parsed.FNumber) {
        meta.aperture = formatAperture(parsed.FNumber);
      }
      if (parsed.ExposureTime) {
        meta.shutterSpeed = formatShutterSpeed(parsed.ExposureTime);
      }
      if (parsed.ISO) {
        meta.iso = `ISO ${parsed.ISO}`;
      }
      if (parsed.ExposureBiasValue !== undefined && parsed.ExposureBiasValue !== null) {
        const bias = Number(parsed.ExposureBiasValue);
        meta.exposureBias = bias > 0 ? `+${bias} EV` : `${bias} EV`;
      }
      if (parsed.ExifImageWidth && parsed.ExifImageHeight) {
        meta.dimensions = `${parsed.ExifImageWidth} × ${parsed.ExifImageHeight}`;
      } else if (parsed.ImageWidth && parsed.ImageHeight) {
        meta.dimensions = `${parsed.ImageWidth} × ${parsed.ImageHeight}`;
      }
      if (parsed.Software) {
        meta.software = String(parsed.Software).trim();
      }
      if (parsed.DateTimeOriginal || parsed.CreateDate || parsed.ModifyDate) {
        meta.dateTaken = formatDateTaken(
          parsed.DateTimeOriginal || parsed.CreateDate || parsed.ModifyDate
        );
      }
      if (parsed.ColorSpace) {
        meta.colorSpace = parsed.ColorSpace === 1 ? "sRGB" : String(parsed.ColorSpace);
      }
      if (parsed.Flash) {
        meta.flash = typeof parsed.Flash === "string" ? parsed.Flash : "Flash triggered/available";
      }

      const rawTags: Record<string, unknown> = { ...(fallback?.rawTags || {}) };
      for (const [key, value] of Object.entries(parsed)) {
        if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
          rawTags[key] = value;
        } else if (value instanceof Date) {
          rawTags[key] = value.toISOString();
        } else if (Array.isArray(value) || (typeof value === "object" && value !== null)) {
          try {
            rawTags[key] = JSON.stringify(value);
          } catch {
            rawTags[key] = String(value);
          }
        }
      }
      meta.rawTags = rawTags;
    }
  } catch {
    // If runtime EXIF reading fails or CORS prevents blob inspection, fallback metadata is preserved
  }

  return meta;
}
