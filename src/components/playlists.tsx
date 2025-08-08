export type PlaylistItem = {
  id: string;
  title: string;
  description: string;
  cover: string;
  genre: string;
  date: string;
  downloadUrl: string;
};

export const playlistItems: PlaylistItem[] = [
  {
    id: "chill",
    title: "Kyedae's Playlist",
    description: "A collection of Kyedae's favorite chill tracks.",
    cover: "/playlists/kyedae.jpg",
    genre: "Chill",
    date: "2023-09-01",
    downloadUrl: "https://music.apple.com/ph/playlist/pov-you-love-kyedaes-playlist/pl.u-aZb0k25s1oXRjY0",
  },
  {
    id: "slow",
    title: "Wanna Sleep?",
    description: "A soothing collection of slow tracks to help you drift off to sleep.",
    cover: "/playlists/wind.jpg",
    genre: "Slow",
    date: "2025-06-15",
    downloadUrl: "https://music.apple.com/ph/playlist/pov-youre-in-a-bed-with-a-cozy-wind/pl.u-76oNNy6CvG1qD70",
  },
  {
    id: "alt",
    title: "Bring Back the Old Days",
    description: "A nostalgic mix of alternative hits that take you back in time.",
    cover: "/playlists/cat.jpg",
    genre: "Alternative",
    date: "2024-11-18",
    downloadUrl: "https://music.apple.com/ph/playlist/pov-bring-back-the-old-days/pl.u-mJy88DrtND4Y9M7",
  },
];