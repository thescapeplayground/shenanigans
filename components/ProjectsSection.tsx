"use client";

import { useState } from "react";
import { Project } from "@/src/types";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { motion, AnimatePresence } from "motion/react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ProjectsSectionProps {
  projects: Project[];
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories = ["All", "Development", "Design", "Experiment"];

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory =
      selectedCategory === "All" || project.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const getStatusColor = (status?: string) => {
    switch (status) {
      case "active":
        return "bg-emerald-500 ring-emerald-500/30";
      case "building":
        return "bg-purple-600 ring-purple-500/30";
      case "completed":
        return "bg-sky-500 ring-sky-500/30";
      case "archived":
        return "bg-zinc-400 ring-zinc-400/30";
      default:
        return "bg-zinc-400 ring-zinc-400/30";
    }
  };

  return (
    <div className="space-y-8 py-4" id="projects-section-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="text-left space-y-2"
        id="projects-header-block"
      >
        <h2 className="text-2xl font-bold font-sans tracking-tight text-neutral-950 dark:text-neutral-50 flex items-center gap-2">
          Projects Grid
        </h2>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 max-w-xl font-sans">
          A living directory of open-source frameworks, aesthetic design concepts, micro-utilities, and interactive tools.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center"
        id="projects-controls-row"
      >
        <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0" id="cat-filter-pills">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? "default" : "outline"}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-full px-4 h-8 text-xs font-mono active:scale-95 transition-all ${
                selectedCategory === cat
                  ? "bg-zinc-900 hover:bg-zinc-800 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-950"
                  : "bg-transparent text-zinc-500 dark:hover:bg-zinc-900 border-zinc-200 dark:border-zinc-800/80"
              }`}
              id={`cat-filter-btn-${cat}`}
            >
              {cat}
            </Button>
          ))}
        </div>

        <div className="relative w-full sm:w-64 shrink-0" id="search-input-wrapper">
          <MaterialIcon icon="search" className="absolute left-3 top-2.5 text-purple-600 dark:text-purple-400" size="1rem" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects or tags..."
            className="pl-9 h-9 text-xs rounded-full bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800/80 font-mono text-zinc-800 dark:text-zinc-200"
            id="search-input-field"
          />
        </div>
      </motion.div>

      {filteredProjects.length > 0 ? (
        <div
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6"
          id="bento-projects-grid"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 25, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "0px 0px -30px 0px" }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.45, delay: Math.min(index * 0.05, 0.25), ease: [0.16, 1, 0.3, 1] }}
                onClick={() => setSelectedProject(project)}
                className="group relative cursor-pointer flex flex-col justify-between p-6 rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60 bg-white/70 dark:bg-zinc-950/60 backdrop-blur-sm hover:border-zinc-400 dark:hover:border-zinc-600 transition-all shadow-[0_2px_8px_rgba(0,0,0,0.01)] hover:shadow-md min-h-[210px] md:h-[210px] text-left"
                id={`project-card-${project.id}`}
              >
                <div className="space-y-3" id={`project-upper-${project.id}`}>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-semibold font-mono tracking-widest text-zinc-400 dark:text-zinc-500 uppercase">
                      {project.category}
                    </span>

                    <div className="flex items-center gap-1.5 font-mono text-[10px] text-zinc-400">
                      <span className={`h-2 w-2 rounded-full ring-4 ${getStatusColor(project.status)}`} />
                      <span className="capitalize">{project.status}</span>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100 font-sans tracking-tight group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-150 inline-flex items-center gap-1">
                    {project.title.toLowerCase()}
                    <MaterialIcon icon="north_east" className="text-zinc-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" size="1rem" />
                  </h3>

                  <p className="text-zinc-500 dark:text-zinc-400 text-xs sm:text-[13px] leading-relaxed font-sans line-clamp-2 pr-2">
                    {project.description}
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-zinc-100 dark:border-zinc-900/50 pt-3" id={`project-lower-${project.id}`}>
                  <div className="flex flex-wrap gap-1 max-w-[70%]">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 text-[9px] font-mono rounded bg-zinc-100 dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400 border border-zinc-200/50 dark:border-zinc-800/40"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {project.stats && (
                    <span className="text-[10px] font-mono text-zinc-400 font-semibold uppercase bg-zinc-50 dark:bg-zinc-900 px-2 py-0.5 rounded border border-zinc-200/40 dark:border-zinc-800/40">
                      {project.stats}
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <div className="py-20 text-center text-zinc-500" id="projects-empty-state">
          <MaterialIcon icon="folder" className="mx-auto text-purple-600 dark:text-purple-400 mb-3 animate-pulse" size="3rem" />
          <p className="text-sm font-mono mt-2">No projects matched your criteria.</p>
          <Button
            variant="ghost"
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("All");
            }}
            className="text-xs text-purple-600 dark:text-purple-400 hover:text-purple-500 mt-2 gap-1.5 h-8 font-mono rounded-lg"
          >
            <MaterialIcon icon="refresh" size="0.875rem" /> Clear Filters
          </Button>
        </div>
      )}

      <Dialog open={selectedProject !== null} onOpenChange={(open) => { if (!open) setSelectedProject(null); }}>
        {selectedProject && (
          <DialogContent showCloseButton={false} className="w-full sm:max-w-xl mx-auto text-left border-zinc-200 dark:border-zinc-800 rounded-2xl bg-white dark:bg-black/95 backdrop-blur-lg font-sans p-4 sm:p-6 max-h-[90vh] overflow-y-auto">
            <DialogHeader className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold font-mono tracking-widest text-zinc-400 dark:text-zinc-500 uppercase">
                  {selectedProject.category}
                </span>

                <div className="flex items-center gap-1.5 font-mono text-[11px] text-zinc-500">
                  <span className={`h-2.5 w-2.5 rounded-full ring-4 ${getStatusColor(selectedProject.status)}`} />
                  <span className="capitalize">{selectedProject.status}</span>
                </div>
              </div>

              <DialogTitle className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 font-mono tracking-tight mt-1">
                {selectedProject.title.toLowerCase()}
              </DialogTitle>
              
              <DialogDescription className="hidden">
                {selectedProject.description}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6 my-4 pr-1">
              <div className="space-y-2">
                <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-widest font-mono">Overview</h4>
                <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed font-sans mt-1">
                  {selectedProject.longDescription || selectedProject.description}
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-widest font-mono">Environment & Stack</h4>
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  {selectedProject.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="text-xs font-sans rounded bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-neutral-300 border border-zinc-200/50 dark:border-zinc-800/40 font-medium px-2.5 py-0.5"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-6 text-sm text-zinc-500 font-mono border-t border-zinc-100 dark:border-zinc-900/50 pt-4">
                <div className="flex items-center gap-1.5">
                  <MaterialIcon icon="calendar_today" className="text-purple-600 dark:text-purple-400" size="1rem" />
                  <span>Release: {selectedProject.date}</span>
                </div>
                {selectedProject.stats && (
                  <div className="flex items-center gap-1.5">
                    <MaterialIcon icon="fork_right" className="text-purple-600 dark:text-purple-400" size="1rem" />
                    <span>Scale: {selectedProject.stats}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-row items-center justify-between pt-2 border-t border-zinc-100 dark:border-zinc-900/50">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setSelectedProject(null)}
                className="rounded-lg h-9 font-mono text-xs text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100"
              >
                Close
              </Button>

              <div className="flex flex-row items-center gap-2">
                {selectedProject.github && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    render={<a href={selectedProject.github} target="_blank" rel="noreferrer" referrerPolicy="no-referrer" className="gap-1.5" />} 
                    className="rounded-lg h-9 font-mono text-xs text-zinc-600 dark:text-zinc-300"
                  >
                    <MaterialIcon icon="code" size="1rem" /> Source <MaterialIcon icon="open_in_new" size="0.75rem" />
                  </Button>
                )}
                {selectedProject.link && selectedProject.link !== "#" && (
                  <Button 
                    size="sm" 
                    render={<a href={selectedProject.link} target="_blank" rel="noreferrer" referrerPolicy="no-referrer" className="gap-1.5" />} 
                    className="rounded-lg h-9 font-mono text-xs bg-zinc-900 hover:bg-zinc-800 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-zinc-200"
                  >
                    Live Site <MaterialIcon icon="open_in_new" size="0.75rem" />
                  </Button>
                )}
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}

export default ProjectsSection;
