export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  category: 'Development' | 'Design' | 'Experiment' | 'Other';
  tags: string[];
  link?: string;
  github?: string;
  stats?: string;
  featured: boolean;
  date: string;
  status?: 'active' | 'completed' | 'archived' | 'building';
  image?: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  companyUrl?: string;
  period: string;
  description: string;
  tags?: string[];
}

export interface Profile {
  name: string;
  username: string;
  role: string;
  bio: string;
  secondaryBio?: string;
  location: string;
  avatarUrl?: string;
  availability: 'available' | 'busy' | 'away';
  statusHeading?: string;
  statusText?: string;
  codename?: string;
  instagram?: {
    username: string;
    followers: number;
  };
}

export interface GameItem {
  id: string;
  title: string;
  badge?: string;
  description: string;
  platform: string;
  genre: string;
  status?: string;
  tags?: string[];
  link?: string;
  image?: string;
}

export interface LastFmTrack {
  title: string;
  artist: string;
  album?: string;
  imageUrl?: string;
  url: string;
  isNowPlaying: boolean;
  playedAt?: string;
}

export interface LastFmUserProfile {
  username: string;
  realName?: string;
  playCount: number;
  artistCount?: number;
  trackCount?: number;
  registeredDate?: string;
  avatarUrl?: string;
  url: string;
  country?: string;
}

export interface LastFmCombinedData {
  currentTrack: LastFmTrack;
  recentTracks: LastFmTrack[];
  userProfile: LastFmUserProfile;
}

export interface About {
  heading: string;
  paragraphs: string[];
  image?: {
    url: string;
    alt: string;
  };
  highlights: {
    label: string;
    value: string;
  }[];
  games?: GameItem[];
  lastFmUsername?: string;
}

export interface StackItem {
  name: string;
  category: 'languages' | 'frameworks' | 'tools' | 'hardware';
  iconName: string;
  level?: string;
}

export interface ServiceCategory {
  id: string;
  title: string;
  price: string;
  icon: string;
  color: string;
  tagline: string;
  items: string[];
  note?: string;
}

export interface ServiceFaq {
  question: string;
  answer: string;
  icon: string;
}

export interface GalleryPhoto {
  id: string;
  src: string;
  alt: string;
  title?: string;
  date?: string;
  folder: string;
}

export interface GalleryAlbum {
  id: string;
  name: string;
  description: string;
  coverImage: string;
  folder: string;
  icon?: string;
  items: GalleryPhoto[];
}


