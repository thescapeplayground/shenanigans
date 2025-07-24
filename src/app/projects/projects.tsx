// Add animation styles for project transitions
// You can move these to your global CSS if preferred
"use client";
import { Project } from "./page";

export const projects: Project[] = [
  {
    id: "shenanigans",
    title: "Shenanigans",
    description: "The first portfolio that I've ever made.",
    longDescription: "This is the first portfolio website that I've made in my whole entire life, this includes all of my projects, blogs, and social media platforms that I've been. It's still work-in-progress, but here we are.",
    category: "Web Development",
    image: "/projects/portfolio/pb.jpg",
    screenshots: [
      "/projects/portfolio/pb.jpg",
      "/projects/portfolio/main.jpg",
      "/projects/portfolio/cards.jpg",
      "/projects/portfolio/server.jpg"
    ],
    technologies: ["Next.js", "TypeScript", "TailwindCSS", "ESLint", "Node.js", "Vercel"],
    features: [
      "The home page, of course",
      "Projects, which is this one",
      "Smooth page transitions",
      "Responsive design for all devices",
      "Server status, for checking server",
      "Nothing else, I guess?"
    ],
    links: {
      live: "https://isaiahthings.vercel.app/",
      github: "https://github.com/isaiahscape/shenanigans"
    },
    featured: true
  },
  {
    id: "thescapenetwork",
    title: "The Scape Network",
    description: "My own social media organization.",
    longDescription: "A social media organization that brings you some photos, videos, graphics, and projects. Some of them might be too minimalistic.",
    category: "Social Media Organization",
    image: "/profpic.png",
    screenshots: [
      "/profpic.png",
      "/lamp.jpg",
      "/typography.svg",
      "/design-kits.svg"
    ],
    technologies: ["Photoshop", "Premiere Pro", "Capcut", "Alight Motion", "Davinci Resolve", "Github", "Visual Studio Code"],
    features: [
      "Banners for ROMs, Projects, etc.",
      "Photography and Videography",
      "Tech-related tips and tricks",
      "Building Custom ROMs, Recoveries, etc.",
      "Android-related communities",
      "Modern UI/UX design"
    ],
    links: {
      live: "https://telegram.me/thescapenetwork/",
      github: "https://github.com/tsn-playground"
    },
    featured: true
  },
  {
    id: "telegram-bot",
    title: "KairoKanged Bot (unmaintained)",
    description: "A modular telegram Python bot running on python3 with an sqlalchemy database.",
    longDescription: "Originally a Marie and Kigyō fork - KairoKanged Bot has evolved further and was built to be more useful for some chats.",
    category: "Development Tools",
    image: "/typography.svg",
    screenshots: [
      "/typography.svg",
      "/illustrations.svg",
      "/design-kits.svg",
      "/lamp.jpg"
    ],
    technologies: ["Python", "JavaScript", "HTML/CSS", "MongoDB", "PostgreSQL", "Telegram"],
    features: [
      "Powerful group manager bot",
      "Fast and responsive technicalities",
      "Federation for your own organization",
      "Basic functions for Telegram groups",
      "Some funny features included",
      "Auto-banning insensitive spambots"
    ],
    links: {
      github: "https://github.com/isaiahscape/KairoKangedBot",
      download: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    },
    featured: true
  }
];
