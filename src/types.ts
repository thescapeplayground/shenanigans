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
}

export interface StackItem {
  name: string;
  category: 'languages' | 'frameworks' | 'tools' | 'hardware';
  iconName: string;
  level?: string;
}
