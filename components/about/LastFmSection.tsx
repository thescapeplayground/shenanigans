"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { LastFmCombinedData } from "@/src/types";
import { LastFmWidget } from "./LastFmWidget";
import { LastFmUserProfileCard } from "./LastFmUserProfileCard";
import { LastFmRecentTracksList } from "./LastFmRecentTracksList";

interface LastFmSectionProps {
  username?: string;
}

const DEFAULT_COMBINED: LastFmCombinedData = {
  currentTrack: {
    title: "seasons",
    artist: "wave to earth",
    album: "summer flows 0.02",
    imageUrl: "https://lastfm-img.freetls.fastly.net/i/u/300x300/9efc83368bf5ec624dcf258499d8051c.jpg",
    url: "https://www.last.fm/music/wave+to+earth/_/seasons",
    isNowPlaying: true,
    playedAt: "Now Playing",
  },
  recentTracks: [
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
  ],
  userProfile: {
    username: "isaiahthings",
    realName: "Leonardo",
    playCount: 5,
    artistCount: 4,
    trackCount: 5,
    registeredDate: "2026",
    avatarUrl: "https://lastfm-img.freetls.fastly.net/i/u/300x300/49eacbb6c1314c60ec27ed2c740a272b.png",
    url: "https://www.last.fm/user/isaiahthings",
    country: "Philippines",
  },
};

export function LastFmSection({ username = "isaiahthings" }: LastFmSectionProps) {
  const [data, setData] = useState<LastFmCombinedData>(DEFAULT_COMBINED);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/lastfm?username=${encodeURIComponent(username)}&type=all`);
        if (!res.ok) return;
        const json = await res.json();
        if (isMounted && json?.currentTrack) {
          setData(json);
        }
      } catch {
        // Fallback remains active
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 10000);

    const onVisibilityOrFocus = () => {
      if (document.visibilityState === "visible") {
        fetchData();
      }
    };

    window.addEventListener("focus", onVisibilityOrFocus);
    document.addEventListener("visibilitychange", onVisibilityOrFocus);

    return () => {
      isMounted = false;
      clearInterval(interval);
      window.removeEventListener("focus", onVisibilityOrFocus);
      document.removeEventListener("visibilitychange", onVisibilityOrFocus);
    };
  }, [username]);

  return (
    <div className="space-y-4" id="lastfm-combined-section">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-center justify-between"
      >
        <h3 className="text-xs font-semibold font-mono tracking-widest text-zinc-400 dark:text-zinc-500 uppercase">
          Listening Activity
        </h3>
        <span className="text-xs font-mono text-zinc-400 dark:text-zinc-600">
          LastFM Live
        </span>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -30px 0px" }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 flex flex-col gap-4"
        >
          <LastFmWidget username={username} initialTrack={data.currentTrack} />
          <LastFmUserProfileCard profile={data.userProfile} loading={loading} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -30px 0px" }}
          transition={{ duration: 0.55, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5"
        >
          <LastFmRecentTracksList tracks={data.recentTracks} />
        </motion.div>
      </div>
    </div>
  );
}
