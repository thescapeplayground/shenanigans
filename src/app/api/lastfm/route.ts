import { LastFmTrack, LastFmUserProfile, LastFmCombinedData } from "@/src/types";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const INITIAL_PROFILE: LastFmUserProfile = {
  username: "isaiahthings",
  realName: "Leonardo",
  playCount: 5,
  artistCount: 4,
  trackCount: 5,
  registeredDate: "2026",
  avatarUrl: "https://lastfm-img.freetls.fastly.net/i/u/300x300/49eacbb6c1314c60ec27ed2c740a272b.png",
  url: "https://www.last.fm/user/isaiahthings",
  country: "Philippines",
};

const INITIAL_TRACKS: LastFmTrack[] = [
  {
    title: "seasons",
    artist: "wave to earth",
    album: "summer flows 0.02",
    imageUrl: "https://lastfm-img.freetls.fastly.net/i/u/300x300/9efc83368bf5ec624dcf258499d8051c.jpg",
    url: "https://www.last.fm/music/wave+to+earth/_/seasons",
    isNowPlaying: true,
    playedAt: "Now Playing",
  },
  {
    title: "Fade Into You",
    artist: "Mazzy Star",
    album: "So Tonight That I Might See",
    imageUrl: "https://lastfm-img.freetls.fastly.net/i/u/300x300/60615ead3d8383e70e84a526817de4bf.jpg",
    url: "https://www.last.fm/music/Mazzy+Star/_/Fade+Into+You",
    isNowPlaying: false,
    playedAt: "Recently",
  },
  {
    title: "o ninanais",
    artist: "Arthur Nery",
    album: "o ninanais",
    imageUrl: "https://lastfm-img.freetls.fastly.net/i/u/300x300/60debcb8374abd3a287340925b2209c6.jpg",
    url: "https://www.last.fm/music/Arthur+Nery/_/o+ninanais",
    isNowPlaying: false,
    playedAt: "Recently",
  },
  {
    title: "Higa",
    artist: "Arthur Nery",
    album: "Elevator",
    imageUrl: "https://lastfm-img.freetls.fastly.net/i/u/300x300/60debcb8374abd3a287340925b2209c6.jpg",
    url: "https://www.last.fm/music/Arthur+Nery/_/Higa",
    isNowPlaying: false,
    playedAt: "Recently",
  },
  {
    title: "Sino",
    artist: "Unique Salonga",
    album: "Grandma",
    imageUrl: "https://lastfm-img.freetls.fastly.net/i/u/300x300/4ea90d03368f45e0a9170e47b012f5b5.jpg",
    url: "https://www.last.fm/music/Unique+Salonga/_/Sino",
    isNowPlaying: false,
    playedAt: "Recently",
  },
];

function extractImage(images: any[]): string {
  if (!Array.isArray(images) || images.length === 0) return "";
  const valid = [...images]
    .reverse()
    .find((img) => img["#text"] && !img["#text"].includes("2a96cbd8b46e442fc41c2b86b821562f"));
  return valid ? valid["#text"] : "";
}

function formatRelativeTime(uts?: string | number): string {
  if (!uts) return "Recently";
  const timestamp = typeof uts === "string" ? parseInt(uts, 10) * 1000 : uts * 1000;
  if (isNaN(timestamp)) return "Recently";

  const diff = Date.now() - timestamp;
  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (minutes < 2) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username") || process.env.NEXT_PUBLIC_LASTFM_USER || "isaiahthings";
  const apiKey = process.env.LASTFM_API_KEY || process.env.NEXT_PUBLIC_LASTFM_API_KEY || "c0a8e935644458896a1bda5e8468ec52";
  const type = searchParams.get("type") || "all";

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 4000);

  try {
    const recentUrl = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${encodeURIComponent(
      username
    )}&api_key=${apiKey}&format=json&limit=8`;

    const userUrl = `https://ws.audioscrobbler.com/2.0/?method=user.getinfo&user=${encodeURIComponent(
      username
    )}&api_key=${apiKey}&format=json`;

    const [recentRes, userRes] = await Promise.allSettled([
      fetch(recentUrl, { signal: controller.signal, cache: "no-store" }),
      fetch(userUrl, { signal: controller.signal, cache: "no-store" }),
    ]);

    clearTimeout(timeoutId);

    let parsedTracks: LastFmTrack[] = INITIAL_TRACKS;
    if (recentRes.status === "fulfilled" && recentRes.value.ok) {
      const recentJson = await recentRes.value.json();
      const rawTracks = recentJson?.recenttracks?.track;
      const trackList = Array.isArray(rawTracks) ? rawTracks : rawTracks ? [rawTracks] : [];

      if (trackList.length > 0) {
        parsedTracks = trackList.map((t: any) => ({
          title: t.name || "Unknown Track",
          artist: t.artist?.["#text"] || t.artist?.name || "Unknown Artist",
          album: t.album?.["#text"] || "",
          imageUrl: extractImage(t.image) || INITIAL_TRACKS[0].imageUrl,
          url: t.url || `https://www.last.fm/user/${username}`,
          isNowPlaying: t["@attr"]?.nowplaying === "true",
          playedAt: t["@attr"]?.nowplaying === "true" ? "Now Playing" : formatRelativeTime(t.date?.uts),
        }));
      }
    }

    let parsedProfile: LastFmUserProfile = INITIAL_PROFILE;
    if (userRes.status === "fulfilled" && userRes.value.ok) {
      const userJson = await userRes.value.json();
      const u = userJson?.user;
      if (u) {
        const regYear = u.registered?.unixtime
          ? new Date(parseInt(u.registered.unixtime, 10) * 1000).getFullYear().toString()
          : "2026";

        parsedProfile = {
          username: u.name || username,
          realName: u.realname || "Leonardo",
          playCount: parseInt(u.playcount, 10) || 0,
          artistCount: parseInt(u.artist_count, 10) || undefined,
          trackCount: parseInt(u.track_count, 10) || undefined,
          registeredDate: regYear,
          avatarUrl: extractImage(u.image) || INITIAL_PROFILE.avatarUrl,
          url: u.url || `https://www.last.fm/user/${username}`,
          country: u.country || "Philippines",
        };
      }
    }

    const currentTrack = parsedTracks[0] || INITIAL_TRACKS[0];

    const liveHeaders = {
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
      Pragma: "no-cache",
      Expires: "0",
    };

    if (type === "track") {
      return Response.json(currentTrack, { headers: liveHeaders });
    }

    if (type === "user") {
      return Response.json(parsedProfile, { headers: liveHeaders });
    }

    if (type === "recent") {
      return Response.json(parsedTracks, { headers: liveHeaders });
    }

    const combined: LastFmCombinedData = {
      currentTrack,
      recentTracks: parsedTracks,
      userProfile: parsedProfile,
    };

    return Response.json(combined, { headers: liveHeaders });
  } catch {
    clearTimeout(timeoutId);
    const fallbackCombined: LastFmCombinedData = {
      currentTrack: INITIAL_TRACKS[0],
      recentTracks: INITIAL_TRACKS,
      userProfile: INITIAL_PROFILE,
    };

    if (type === "track") return Response.json(INITIAL_TRACKS[0]);
    if (type === "user") return Response.json(INITIAL_PROFILE);
    if (type === "recent") return Response.json(INITIAL_TRACKS);

    return Response.json(fallbackCombined, {
      headers: { "Cache-Control": "public, s-maxage=30, stale-while-revalidate=60" },
    });
  }
}
