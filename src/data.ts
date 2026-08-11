import { Project, Experience, Profile, StackItem, About, ServiceCategory, ServiceFaq } from './types';

export const DEFAULT_PROFILE: Profile = {
  name: "Leonardo",
  username: "isaiahscape",
  role: "Photographer, Graphic Designer",
  bio: "Not here to impress — just keeping it real. Welcome to my personal corner of the web.",
  secondaryBio: "I'm Isiaih Rafael Pavia, living in Davao, Philippines. If you're interested in working together, feel free to reach out via contact section.",
  location: "Manila, Philippines",
  avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=faces",
  availability: "available",
  statusHeading: "Currently building",
  statusText: "shenanigans version two-point-one",
  codename: "leonardo, isaiahscape",
  instagram: {
    username: "isaiahscape",
    followers: 990
  }
};

export const DEFAULT_PROJECTS: Project[] = [
    {
    id: "materialexp",
    title: "Material Explorer",
    description: "An Android APK explorer and file manager built with Material Design 3 principles for intuitive navigation and file operations.",
    longDescription: "Material Explorer is a modern Android application that provides a clean, intuitive interface for browsing and managing APK files and device storage. Built with Material Design 3 (Material You) guidelines, it offers seamless file navigation, APK inspection, and management tools with dynamic theming support.",
    category: "Experiment",
    tags: ["Android", "Material Design 3", "Kotlin", "APK Explorer"],
    github: "https://github.com/isaiahscape/materialexp",
    link: "https://github.com/isaiahscape/materialexp/releases",
    stats: "Android App",
    featured: true,
    date: "Jul 2026",
    status: "active"
  },
  {
    id: "bedrock",
    title: "Bedrock",
    description: "A minimalist notes editor built for focused writing and local-first security. Made with Material Design 3, Kotlin, and Java for Android.",
    longDescription: "Bedrock is a high-contrast, minimalist monochrome notes editor for Android. Built with a focus on simplicity and distraction-free writing, it combines the lightweight feel of Google Keep with powerful Markdown support and local-first security. Features include dual editing modes (plain notes and Markdown with live preview), interactive checklists, local SHA-256 encryption with PIN protection, tag-based categorization, offline sync engine, and JSON backup/restore.",
    category: "Experiment",
    tags: ["Kotlin", "Jetpack Compose", "Material Design 3", "Android", "Markdown"],
    github: "https://github.com/isaiahscape/bedrock",
    link: "https://foss.isaiahthings.me",
    stats: "Notes App",
    featured: true,
    date: "Jul 2026",
    status: "active"
  },
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

function computeAge(birthDate: Date): number {
  const now = new Date();
  let age = now.getFullYear() - birthDate.getFullYear();
  const monthDiff = now.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

const BIRTHDAY = new Date("2005-07-01T00:00:00+08:00");
const CURRENT_AGE = computeAge(BIRTHDAY);

export const DEFAULT_ABOUT: About = {
  heading: "More about me",
  paragraphs: [
    `I'm Isiaih Rafael Pavia, a ${CURRENT_AGE}-year-old photographer, graphic designer, and developer based in Davao, Philippines. I've always been drawn to the intersection of creativity and technology — whether it's framing the perfect shot, crafting visual identities, or building tools that make life a little easier.`,
    "I started my journey in the creative space through social media organizing and content editing, which naturally led to web development and automation. I believe in keeping things real, minimal, and functional. No fluff, just honest work.",
    "When I'm not behind a camera or a keyboard, you'll probably find me exploring new music, tinkering with audio gear, or brainstorming the next project under The Scape Network. I'm also a part-time IT instructor, which keeps me grounded and constantly learning from the students I teach.",
    "This site is my personal corner of the web — a place to document projects, share thoughts, and maybe inspire someone to build their own thing."
  ],
  image: {
    url: "/assets/hero.jpg",
    alt: "Profile portrait"
  },
  highlights: [
    { label: "Age", value: `${CURRENT_AGE}` },
    { label: "Location", value: "Davao, Philippines" },
    { label: "Role", value: "Photographer, Web/Graphic Designer" },
    { label: "Currently", value: "Finding a job" }
  ]
};

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

export const DEFAULT_SERVICES: ServiceCategory[] = [
  {
    id: "repairs",
    title: "Troubleshoots & Repairs",
    price: "Starts at ₱500",
    icon: "handyman",
    color: "text-red-500 dark:text-red-400",
    tagline: "Diagnostic and hardware fixes for PCs, laptops, and mobile devices.",
    items: [
      "PC / Laptop not turning on, no power, or not charging",
      "Phone running slow, bootlooping, stuck at logo, or crashing",
      "Broken USB ports (Type-C, HDMI, Type-A, etc.)",
      "Display & part replacements (LCD/OLED screens, peripherals)",
      "Factory Reset & installation/boot issue resolution"
    ],
    note: "Checking and diagnosing is free! Payment is only collected once the device is successfully fixed."
  },
  {
    id: "software",
    title: "Software & OS Installation",
    price: "Starts at ₱300",
    icon: "memory",
    color: "text-red-500 dark:text-red-400",
    tagline: "Operating system deployment, software suites, and licenses.",
    items: [
      "Windows 10 / 11 Pro with Free License",
      "Linux-based OS (Ubuntu, CachyOS, Fedora, Arch, etc.)",
      "Latest Microsoft Office Suite with Free License",
      "Custom editing & productivity software of your choice"
    ],
    note: "Available via online remote setup or in-home service. Select basic installs provided hassle-free."
  },
  {
    id: "cleaning",
    title: "PC / Laptop Maintenance & Cleaning",
    price: "Starts at ₱2,000",
    icon: "build",
    color: "text-red-500 dark:text-red-400",
    tagline: "Deep physical cleaning, thermal paste refresh, and cable routing.",
    items: [
      "Thermal Paste Replacement (any premium paste per request)",
      "Peripherals Deep Cleaning (keyboard, monitor, enclosures)",
      "Case Fans, Heatsink & Motherboard Dust Blowout",
      "Clean Internal Cable Management & Repositioning"
    ],
    note: "5-hour same-day turnaround time for full desktop and laptop maintenance."
  },
  {
    id: "desktop-build",
    title: "Desktop Installation & Building",
    price: "Starts at ₱500",
    icon: "construction",
    color: "text-red-500 dark:text-red-400",
    tagline: "Custom PC assembly, part upgrades, and initial setup.",
    items: [
      "Component Installation / Replacement (CPU Cooler, Motherboard, AIO, RAM, PSU)",
      "Case Fans Setup, Rehousing & Cable Routing",
      "Essential Apps Included (MS Office, Chrome, Adobe Suite)"
    ],
    note: "Want me to source and purchase parts for your build? Sourcing service available upon agreement."
  },
  {
    id: "shenanigans",
    title: "Other Shenanigans",
    price: "Starts at ₱1,500",
    icon: "palette",
    color: "text-red-500 dark:text-red-400",
    tagline: "Web development, multimedia production, and design work.",
    items: [
      "Full-stack web application development (React, Next.js, JavaScript, etc.)",
      "Photography & Videography production",
      "Graphic Designing (custom themes, banners, & occasions)",
      "Custom bots, tools, & tech consultation"
    ],
    note: "For specialized art and graphic designs, you can also connect with @thysvl.co on Instagram."
  }
];

export const DEFAULT_SERVICE_FAQS: ServiceFaq[] = [
  {
    question: "Do I have to pay first or not?",
    answer: "It depends. If the service requires pre-ordering specific hardware parts, upfront payment for materials is needed. Otherwise, repair labor is paid after completion.",
    icon: "payments"
  },
  {
    question: "So if no fix = no pay?",
    answer: "Definitely, without any regrets. Checking and diagnosing your device is 100% free if it cannot be repaired.",
    icon: "verified"
  },
  {
    question: "How long does cleaning, repairing, and building take?",
    answer: "• 5 hours for same-day cleaning (desktop & laptop)\n• 2 hours to 1 day for repairs (depending on issue complexity)\n• 3 hours minimum for building a desktop from scratch",
    icon: "schedule"
  },
  {
    question: "Are you willing to do home service?",
    answer: "Yes! No extra travel charges if you are located near Matina, Davao. Locations outside Matina will have minimal additional transportation fees.",
    icon: "home_repair_service"
  }
];

