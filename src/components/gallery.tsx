export interface GalleryItem {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  date: string;
  location?: string;
  downloadUrl: string;
  quality: string;
}

export const galleryItems: GalleryItem[] = [
  {
    id: "light",
    title: "Enchanted",
    description: "A breathtaking sunset captured during golden hour, showcasing the natural beauty of the coastline with warm orange and pink hues reflecting on the water.",
    image: "/gallery/light.jpg",
    category: "Lights",
    date: "2025-07-19",
    location: "Seattle's Best Coffee",
    downloadUrl: "/gallery/light.jpg",
    quality: "80%"
  },
  {
    id: "ghost",
    title: "Feels Like There's a Ghost",
    description: "A hauntingly beautiful moment captured in low light, where shadows and ethereal forms create an otherworldly atmosphere that evokes mystery and intrigue.",
    image: "/gallery/ghost.jpg",
    category: "City",
    date: "2023-10-12",
    location: "HCDC Gymnasium",
    downloadUrl: "/gallery/ghost.jpg",
    quality: "80%"
  },
  {
    id: "tower",
    title: "Euro Hotel in Davao",
    description: "A stunning view of a modern hotel building, showcasing its architectural beauty against the city skyline.",
    image: "/gallery/tower.jpg",
    category: "Buildings",
    date: "2024-09-22",
    location: "Acacia",
    downloadUrl: "/gallery/tower.jpg",
    quality: "80%"
  },
  {
    id: "cafe",
    title: "The Green Coffee",
    description: "A cozy, modern café with industrial vibes — high stools, patterned tile floors, hanging lights, and a clean open counter setup. Feels chill, like a place you'd hang out for coffee and convo.",
    image: "/gallery/cafe.jpg",
    category: "Modern",
    date: "2024-01-15",
    location: "Green Coffee",
    downloadUrl: "/gallery/cafe.jpg",
    quality: "80%"
  },
  {
    id: "bus",
    title: "Just a Bus",
    description: "A city bus captured in motion, showcasing the vibrant life of urban transportation.",
    image: "/gallery/bus.jpg",
    category: "Transportation",
    date: "2024-02-14",
    location: "Downtown Davao",
    downloadUrl: "/gallery/bus.jpg",
    quality: "80%"
  },
  {
    id: "birds",
    title: "Parrots",
    description: "A stunning capture of parrots, sitting on a branch.",
    image: "/gallery/bird.jpg",
    category: "Nature",
    date: "2024-03-22",
    location: "Roxas Avenue",
    downloadUrl: "/gallery/bird.jpg",
    quality: "80%"
  }
];
