// Add animation styles for project transitions
// You can move these to your global CSS if preferred
"use client";

// Subtle fade animation for project transitions (optimized)
const style = `
@layer utilities {
  .animate-fade-project {
    animation: fadeProject 0.18s cubic-bezier(0.4,0,0.2,1);
  }
  @keyframes fadeProject {
    0% { opacity: 0.5; }
    100% { opacity: 1; }
  }
}
`;
if (typeof window !== 'undefined' && !document.getElementById('project-anim-style')) {
  const s = document.createElement('style');
  s.id = 'project-anim-style';
  s.innerHTML = style;
  document.head.appendChild(s);
}


import { ArrowLeft, ExternalLink, Github, Code, ChevronLeft, ChevronRight, Star, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "next-view-transitions";
import Image from "next/image";
import { PageContainer } from "@/components/page-container";
import { useState } from "react";

interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  category: string;
  image: string;
  screenshots: string[];
  technologies: string[];
  features: string[];
  links: {
    github?: string;
    live?: string;
    download?: string;
  };
  featured: boolean;
}

const projects: Project[] = [
  {
    id: "shenanigans",
    title: "Shenanigans",
    description: "The first portfolio that I've ever made.",
    longDescription: "This is the first portfolio website that I've made in my whole entire life, this includes all of my projects, blogs, and social media platforms that I've been. It's still work-in-progress, but here we are.",
    category: "Web Development",
    image: "/projects/wallwidgy/hero.png",
    screenshots: [
      "/projects/wallwidgy/hero.png",
      "/projects/wallwidgy/main.png",
      "/projects/wallwidgy/search.png",
      "/projects/wallwidgy/similar.png"
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
    longDescription: "A social media organization that brings you some photos, videos, graphics, and projects. Some of them might be too minimalistic."
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

export default function Projects() {
  const [currentProject, setCurrentProject] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentScreenshot, setCurrentScreenshot] = useState(0);
  const [projectAnim, setProjectAnim] = useState("");
  
  const categories = ["All", ...Array.from(new Set(projects.map(p => p.category)))];
  const filteredProjects = selectedCategory === "All" 
    ? projects 
    : projects.filter(p => p.category === selectedCategory);
  
  const featuredProjects = filteredProjects.filter(p => p.featured);
  const currentFeatured = featuredProjects[currentProject] || featuredProjects[0];

  const nextProject = () => {
    setProjectAnim("fade-project");
    setTimeout(() => {
      setCurrentProject((prev) => (prev + 1) % featuredProjects.length);
      setCurrentScreenshot(0);
      setProjectAnim("");
    }, 180);
  };

  const prevProject = () => {
    setProjectAnim("fade-project");
    setTimeout(() => {
      setCurrentProject((prev) => (prev - 1 + featuredProjects.length) % featuredProjects.length);
      setCurrentScreenshot(0);
      setProjectAnim("");
    }, 180);
  };

  const nextScreenshot = () => {
    if (currentFeatured?.screenshots) {
      setCurrentScreenshot((prev) => (prev + 1) % currentFeatured.screenshots.length);
    }
  };

  const prevScreenshot = () => {
    if (currentFeatured?.screenshots) {
      setCurrentScreenshot((prev) => (prev - 1 + currentFeatured.screenshots.length) % currentFeatured.screenshots.length);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/95">
      <PageContainer className="py-4 md:py-8">
        <div className="space-y-6 md:space-y-8">
          {/* Header Section */}
          <div className="flex items-center justify-between">
            <Button 
              variant="outline" 
              className="gap-2 bg-background/80 hover:bg-background border-border/50 hover:border-border backdrop-blur-sm transition-all duration-200" 
              asChild
            >
              <Link href="/">
                <ArrowLeft className="size-4" />
                Back
              </Link>
            </Button>
            
            <div className="hidden md:flex items-center gap-2 text-muted-foreground">
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
              </div>
              <span className="text-xs font-mono ml-2">portfolio.ts</span>
            </div>
          </div>

          {/* Main Project Showcase */}
          <div className="w-full bg-background/60 backdrop-blur-xl rounded-2xl border border-border/60 shadow-xl shadow-black/5 overflow-hidden">
            <div className="p-6 md:p-8">
              <div className="flex items-center gap-3 text-muted-foreground mb-6 md:mb-8">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Code className="size-4 text-primary" />
                </div>
                <span className="text-sm font-mono font-medium">projects.md</span>
                <div className="flex-1 h-px bg-gradient-to-r from-border to-transparent"></div>
              </div>

              {/* Featured Project Display */}
              {currentFeatured && (
                <div className={`flex flex-col xl:flex-row gap-8 md:gap-12 mb-8 md:mb-12 min-h-[340px] xl:min-h-[420px] transition-all duration-300 ${
                  projectAnim ? "animate-fade-project" : ""
                }`}>
                  {/* Project Preview with Screenshots */}
                  <div className="relative flex-1 min-w-0 flex items-stretch rounded-2xl overflow-hidden order-2 xl:order-1">
                    {/* Gradient background for fallback/overlay */}
                    <div className="absolute inset-0 z-0 bg-gradient-to-br from-primary/30 via-background/60 to-primary/10" />
                    {/* Main Screenshot Display fills height */}
                    <div className="relative w-full h-full min-h-[320px] xl:min-h-[420px] flex items-center justify-center">
                      <Image
                        src={currentFeatured.screenshots[currentScreenshot] || currentFeatured.image}
                        alt={`${currentFeatured.title} - Screenshot ${currentScreenshot + 1}`}
                        fill
                        className="object-contain xl:object-cover transition-all duration-500 z-10"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 50vw"
                        priority
                      />
                      {/* Overlay gradient for better text readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent z-20 pointer-events-none" />
                    </div>
                    {/* Screenshot Navigation */}
                    {currentFeatured.screenshots.length > 1 && (
                      <div className="flex items-center justify-between absolute top-1/2 -translate-y-1/2 w-full px-4 md:px-6 z-30">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={prevScreenshot}
                          className="size-10 md:size-12 rounded-full bg-background/90 backdrop-blur-md hover:bg-background border-border/50 hover:border-border shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
                        >
                          <ChevronLeft className="size-4 md:size-5" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={nextScreenshot}
                          className="size-10 md:size-12 rounded-full bg-background/90 backdrop-blur-md hover:bg-background border-border/50 hover:border-border shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
                        >
                          <ChevronRight className="size-4 md:size-5" />
                        </Button>
                      </div>
                    )}
                    {/* Screenshot Counter */}
                    {currentFeatured.screenshots.length > 1 && (
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-background/80 backdrop-blur-sm rounded-full px-3 py-2 z-30">
                        {currentFeatured.screenshots.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentScreenshot(index)}
                            className={`w-2 h-2 rounded-full transition-all duration-200 ${
                              index === currentScreenshot 
                                ? 'bg-primary scale-125' 
                                : 'bg-muted hover:bg-muted-foreground/50'
                            }`}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Project Details */}
                  <div className="flex-[1.1] min-w-0 space-y-6 md:space-y-8 order-1 xl:order-2 flex flex-col justify-between">
                    <div className="space-y-4">
                      <div>
                        <h2 className="text-2xl md:text-3xl font-bold mb-3 bg-gradient-to-r from-foreground via-foreground to-foreground/80 bg-clip-text">
                          {currentFeatured.title}
                        </h2>
                        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                          {currentFeatured.longDescription}
                        </p>
                      </div>
                      
                      {/* Features */}
                      <div>
                        <h4 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wide flex items-center gap-2">
                          <Star className="size-3" />
                          Key Features
                        </h4>
                        <div className="space-y-2">
                          {currentFeatured.features.slice(0, 4).map((feature, index) => (
                            <div
                              key={feature}
                              className="flex items-center gap-2 text-sm"
                              style={{ animationDelay: `${index * 100}ms` }}
                            >
                              <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                              <span>{feature}</span>
                            </div>
                          ))}
                          {currentFeatured.features.length > 4 && (
                            <div className="text-xs text-muted-foreground mt-2">
                              +{currentFeatured.features.length - 4} more features
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {/* Technologies */}
                      <div>
                        <h4 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wide flex items-center gap-2">
                          <Zap className="size-3" />
                          Tech Stack
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {currentFeatured.technologies.map((tech, index) => (
                            <span
                              key={tech}
                              className="px-3 py-1.5 bg-gradient-to-r from-primary/10 to-primary/5 text-primary text-sm rounded-full border border-primary/20 hover:border-primary/30 hover:from-primary/15 hover:to-primary/10 transition-all duration-200 font-medium"
                              style={{ animationDelay: `${index * 100}ms` }}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Project Links */}
                    <div className="flex flex-wrap gap-3">
                      {currentFeatured.links.live && (
                        <Button 
                          variant="default" 
                          className="gap-2 text-sm md:text-base h-10 md:h-11 px-6 rounded-xl bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200" 
                          asChild
                        >
                          <a href={currentFeatured.links.live} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="size-4" />
                            View Live
                          </a>
                        </Button>
                      )}
                      {currentFeatured.links.github && (
                        <Button 
                          variant="outline" 
                          className="gap-2 text-sm md:text-base h-10 md:h-11 px-6 rounded-xl border-border/50 hover:border-border bg-background/50 hover:bg-background backdrop-blur-sm shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200" 
                          asChild
                        >
                          <a href={currentFeatured.links.github} target="_blank" rel="noopener noreferrer">
                            <Github className="size-4" />
                            <span className="hidden sm:inline">Source Code</span>
                            <span className="sm:hidden">Code</span>
                          </a>
                        </Button>
                      )}
                      {currentFeatured.links.download && (
                        <Button 
                          variant="outline" 
                          className="gap-2 text-sm md:text-base h-10 md:h-11 px-6 rounded-xl border-border/50 hover:border-border bg-background/50 hover:bg-background backdrop-blur-sm shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200" 
                          asChild
                        >
                          <Link href={currentFeatured.links.download}>
                            <Code className="size-4" />
                            <span className="hidden sm:inline">Download</span>
                            <span className="sm:hidden">Get</span>
                          </Link>
                        </Button>
                      )}
                    </div>

                    {/* Project Counter */}
                    {featuredProjects.length > 1 && (
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="font-mono text-xs">
                          {String(currentProject + 1).padStart(2, '0')} / {String(featuredProjects.length).padStart(2, '0')}
                        </span>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={prevProject}
                            className="size-7 rounded-full border border-border/40 hover:bg-background/80"
                            aria-label="Previous Project"
                          >
                            <ChevronLeft className="size-4" />
                          </Button>
                          {featuredProjects.map((_, index) => (
                            <button
                              key={index}
                              onClick={() => setCurrentProject(index)}
                              className={`w-2 h-2 rounded-full transition-all duration-300 hover:scale-125 ${
                                index === currentProject 
                                  ? 'bg-primary shadow-lg shadow-primary/50' 
                                  : 'bg-muted hover:bg-muted-foreground/50'
                              }`}
                              aria-label={`Go to project ${index + 1}`}
                            />
                          ))}
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={nextProject}
                            className="size-7 rounded-full border border-border/40 hover:bg-background/80"
                            aria-label="Next Project"
                          >
                            <ChevronRight className="size-4" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* All Projects Section */}
          <div className="w-full bg-background/60 backdrop-blur-xl rounded-2xl border border-border/60 shadow-xl shadow-black/5 overflow-hidden">
            <div className="p-6 md:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
                <div className="space-y-2">
                  <h3 className="text-xl md:text-2xl font-bold">All Projects</h3>
                  <p className="text-sm text-muted-foreground">Explore my complete portfolio</p>
                </div>
                
                {/* Category Filter */}
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category)}
                      className={`text-xs h-9 px-4 rounded-xl transition-all duration-200 ${
                        selectedCategory === category 
                          ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25' 
                          : 'border-border/50 hover:border-border bg-background/50 hover:bg-background backdrop-blur-sm hover:scale-105'
                      }`}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Projects Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {filteredProjects.map((project, index) => (
                  <div
                    key={project.id}
                    className="group relative h-full"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {/* Card Glow Effect */}
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                    
                    <div className="relative bg-background/80 backdrop-blur-xl hover:bg-background/90 rounded-2xl border border-border/50 hover:border-border/80 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-black/10 hover:-translate-y-1 h-full flex flex-col">
                      {/* Project Screenshot */}
                      <div className="relative w-full aspect-[4/3] overflow-hidden flex-shrink-0">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                        {/* Overlay gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        
                        {/* Category Badge */}
                        <div className="absolute top-3 left-3">
                          <span className="text-xs font-medium text-white bg-black/50 backdrop-blur-sm px-2 py-1 rounded-full">
                            {project.category}
                          </span>
                        </div>

                        {/* Quick Action Buttons */}
                        <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                          {project.links.live && (
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="size-8 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border-white/20" 
                              asChild
                            >
                              <a href={project.links.live} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="size-4" />
                              </a>
                            </Button>
                          )}
                          {project.links.github && (
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="size-8 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border-white/20" 
                              asChild
                            >
                              <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                                <Github className="size-4" />
                              </a>
                            </Button>
                          )}
                        </div>
                      </div>

                      {/* Project Info */}
                      <div className="p-5 md:p-6 space-y-4 flex-1 flex flex-col">
                        <div className="space-y-2 flex-shrink-0">
                          <h4 className="text-base md:text-lg font-bold group-hover:text-primary transition-colors line-clamp-1">
                            {project.title}
                          </h4>
                          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                            {project.description}
                          </p>
                        </div>

                        {/* Tech Stack Preview */}
                        <div className="flex flex-wrap gap-1 flex-shrink-0">
                          {project.technologies.slice(0, 3).map((tech) => (
                            <span
                              key={tech}
                              className="text-xs px-2 py-1 bg-secondary/50 text-muted-foreground rounded border border-border/50"
                            >
                              {tech}
                            </span>
                          ))}
                          {project.technologies.length > 3 && (
                            <span className="text-xs px-2 py-1 bg-secondary/30 text-muted-foreground rounded">
                              +{project.technologies.length - 3}
                            </span>
                          )}
                        </div>

                        {/* Features Preview */}
                        <div className="space-y-1 flex-1">
                          <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
                            <Star className="size-3" />
                            Key Features
                          </div>
                          <div className="space-y-1">
                            {project.features.slice(0, 2).map((feature) => (
                              <div key={feature} className="flex items-center gap-2 text-xs text-muted-foreground">
                                <div className="w-1 h-1 rounded-full bg-primary"></div>
                                <span className="line-clamp-1">{feature}</span>
                              </div>
                            ))}
                            {project.features.length > 2 && (
                              <div className="text-xs text-muted-foreground/70">
                                +{project.features.length - 2} more
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2 pt-2 flex-shrink-0">
                          {project.links.live && (
                            <Button 
                              variant="default"
                              size="sm"
                              className="flex-1 h-8 text-xs"
                              asChild
                            >
                              <a href={project.links.live} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="size-3 mr-1" />
                                View Live
                              </a>
                            </Button>
                          )}
                          {project.links.github && (
                            <Button 
                              variant="outline"
                              size="sm"
                              className="flex-1 h-8 text-xs"
                              asChild
                            >
                              <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                                <Github className="size-3 mr-1" />
                                Code
                              </a>
                            </Button>
                          )}
                          {project.links.download && (
                            <Button 
                              variant="outline"
                              size="sm"
                              className="flex-1 h-8 text-xs"
                              asChild
                            >
                              <Link href={project.links.download}>
                                <Code className="size-3 mr-1" />
                                Get
                              </Link>
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </PageContainer>
    </div>
  );
} 