import { LastFmTrack } from "@/src/types";

const DEFAULT_TRACK: LastFmTrack = {
  title: "babydoll",
  artist: "boywithuke",
  album: "Lucid Dreams",
  imageUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&h=300&fit=crop",
  url: "https://www.last.fm/user/isaiahthings",
  isNowPlaying: false,
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username") || process.env.NEXT_PUBLIC_LASTFM_USER || "isaiahthings";
  const apiKey = process.env.LASTFM_API_KEY || process.env.NEXT_PUBLIC_LASTFM_API_KEY || "c0a8e935644458896a1bda5e8468ec52";

  try {
    const url = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${encodeURIComponent(
      username
    )}&api_key=${apiKey}&format=json&limit=1`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    const res = await fetch(url, {
      signal: controller.signal,
      next: { revalidate: 30 },
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      return Response.json(DEFAULT_TRACK, {
        headers: { "Cache-Control": "public, s-maxage=30, stale-while-revalidate=60" },
      });
    }

    const data = await res.json();
    const trackData = data?.recenttracks?.track;
    const track = Array.isArray(trackData) ? trackData[0] : trackData;

    if (!track || !track.name) {
      return Response.json(DEFAULT_TRACK, {
        headers: { "Cache-Control": "public, s-maxage=30, stale-while-revalidate=60" },
      });
    }

    const imageArray = track.image;
    const albumArt =
      (Array.isArray(imageArray) &&
        [...imageArray].reverse().find((img) => img["#text"] && !img["#text"].includes("2a96cbd8b46e442fc41c2b86b821562f"))?.["#text"]) ||
      DEFAULT_TRACK.imageUrl;

    const trackResponse: LastFmTrack = {
      title: track.name,
      artist: track.artist?.["#text"] || track.artist?.name || "Unknown Artist",
      album: track.album?.["#text"] || "",
      imageUrl: albumArt,
      url: track.url || `https://www.last.fm/user/${username}`,
      isNowPlaying: track["@attr"]?.nowplaying === "true",
    };

    return Response.json(trackResponse, {
      headers: { "Cache-Control": "public, s-maxage=30, stale-while-revalidate=60" },
    });
  } catch {
    return Response.json(DEFAULT_TRACK, {
      headers: { "Cache-Control": "public, s-maxage=30, stale-while-revalidate=60" },
    });
  }
}
