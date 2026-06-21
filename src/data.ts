import { Project, Experience, Profile, StackItem } from './types';

export const DEFAULT_PROFILE: Profile = {
  name: "Leonardo",
  username: "isaiahscape",
  role: "Photographer, Graphic Designer",
  bio: "Not here to impress — just keeping it real. Welcome to my personal corner of the web.",
  secondaryBio: "I'm Isiaih Rafael Pavia, living in Davao, Philippines. Age 20. If you're interested in working together, feel free to reach out via my work email.",
  location: "Manila, Philippines",
  avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=faces",
  availability: "available",
  statusHeading: "Currently building",
  statusText: "shenanigans version two-point-one"
};

export const DEFAULT_PROJECTS: Project[] = [
  {
    id: "snapweb",
    title: "Snapseed for Web",
    description: "A client-side photo processing web app styled directly after Google's Snapseed mobile experience, enabling fast aesthetic filters and RAW tuning.",
    longDescription: "Snapseed for Web introduces layout adjustments, visual histograms, selective brightness mapping, and RAW-like adjustments directly to desktop or mobile browsers. Experience fluid image tuning, fine-grain saturation curves, and retro-stylized film filters processed completely on your local device.",
    category: "Design",
    tags: ["HTML5 Canvas", "Image Processing", "Tailwind CSS", "TypeScript"],
    link: "https://snapweb.isaiahthings.me/",
    stats: "Photo Editor",
    featured: true,
    date: "May 2026",
    status: "active"
  },
  {
    id: "mikrotik-ipoemgr",
    title: "Mikrotik Manager",
    description: "An automated helper utility designed to manage DHCP & IP Allocations/Leases on Mikrotik routing systems.",
    longDescription: "Mikrotik IPoE Manager is an automate agent crafted to simplify DHCP lease processes, prevent localized ip-conflicts, and query server active subnets on Mikrotik devices using API endpoints and network administration tasks.",
    category: "Development",
    tags: ["Mikrotik API", "TypeScript", "Node.js", "Network Tools"],
    github: "https://github.com/isaiahscape/mikrotik-ipoemgr",
    stats: "Router Utility",
    featured: true,
    date: "Apr 2026",
    status: "completed"
  },
  {
    id: "scapenetwork",
    title: "The Scape Network",
    description: "A digital social update log, archive channel, and interactive developer community platform built around Telegram.",
    longDescription: "The Scape Network serves as an active hub and interactive bulletin channel on Telegram. It acts as a primary announcement platform for custom bot deployments, visual graphic experiments, and general technology modifications built under the Scape Sandbox banner.",
    category: "Other",
    tags: ["Community", "Telegram", "Graphics", "Archiving"],
    link: "https://telegram.me/thescapenetwork",
    stats: "tg Community",
    featured: true,
    date: "Jan 2026",
    status: "active"
  },
  {
    id: "kairobot",
    title: "Kairo's Old Bot",
    description: "A legacy open-source modular Telegram utility bot built for fast channel administrative workflows and automation.",
    longDescription: "KairoKangedBot functions as a heritage utility bot focusing on community management, automated server triggers, admin tools, and light-weight automated scripts compiled to run efficiently on small cloud servers.",
    category: "Experiment",
    tags: ["Telegram Bot API", "Python", "Automation", "Group Utility"],
    github: "https://github.com/isaiahscape/KairoKangedBot",
    stats: "Legacy Project",
    featured: false,
    date: "Nov 2025",
    status: "archived"
  }
];

export const DEFAULT_EXPERIENCES: Experience[] = [
  {
    id: "exp-1",
    role: "Founder, Social Media Organizer / Editor",
    company: "The Scape Network",
    companyUrl: "https://telegram.me/thescapenetwork",
    period: "2023 - Present",
    description: "A social media organization that brings you some photos, videos, graphics, and projects on various platforms. Some of them might be too minimalistic.",
    tags: ["Photography", "Videography", "Graphics", "Community"]
  },
  {
    id: "exp-2",
    role: "Technical Support - Hybrid",
    company: "Alorica Philippines",
    companyUrl: "#",
    period: "2025 - 2026",
    description: "Alorica is a global company providing customer experience (CX) management and Business Process Outsourcing (BPO) services, offering contact center solutions, tech support, and digital services for various industries.",
    tags: ["Tech Support", "Customer Experience", "BPO", "Troubleshooting"]
  },
  {
    id: "exp-3",
    role: "Part-time IT Instructor",
    company: "Braintrust Computer Systems, Inc.",
    companyUrl: "#",
    period: "2023 - 2026",
    description: "Teaching computer fundamentals, graphical concepts, and IT skills to students. Developing curriculum and providing hands-on technical training.",
    tags: ["Computer Fundamentals", "IT Instruction", "Graphics", "Technical Training"]
  },
  {
    id: "exp-4",
    role: "Productions Committee",
    company: "HCDC College of Technology Students Organization",
    companyUrl: "#",
    period: "2023 - 2024",
    description: "Collaborated on organizing student events, managing production logistics, and coordinating multimedia content for college activities and programs.",
    tags: ["Event Production", "Multimedia Co-ordination", "Logistics"]
  }
];

export const DEFAULT_STACK: StackItem[] = [
  { name: "React", category: "frameworks", iconName: "Code2", level: "Advanced" },
  { name: "TypeScript", category: "languages", iconName: "Terminal", level: "Expert" },
  { name: "Vite", category: "tools", iconName: "Cpu", level: "Advanced" },
  { name: "Tailwind CSS", category: "frameworks", iconName: "Palette", level: "Expert" },
  { name: "Framer Motion", category: "frameworks", iconName: "Activity", level: "Advanced" },
  { name: "Node.js (Express)", category: "frameworks", iconName: "Server", level: "Intermediate" },
  { name: "Git / GitHub", category: "tools", iconName: "Github", level: "Advanced" },
  { name: "VS Code", category: "tools", iconName: "Laptop", level: "Expert" },
  { name: "Figma", category: "tools", iconName: "PenTool", level: "Intermediate" },
  { name: "Audio Gear", category: "hardware", iconName: "Music", level: "Favorite" },
  { name: "HHKB Professional", category: "hardware", iconName: "Keyboard", level: "Daily Driver" },
  { name: "MacBook Pro m3", category: "hardware", iconName: "Laptop", level: "Workhorse" }
];
