"use client";

import { motion } from "motion/react";
import { About } from "@/src/types";
import { UserCircle, Image as ImageIcon, MapPin, Calendar, Briefcase, Sparkles } from "lucide-react";

interface AboutSectionProps {
  about: About;
}

export function AboutSection({ about }: AboutSectionProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 100, damping: 15 },
    },
  };

  const highlightIcons: Record<string, typeof Calendar> = {
    Age: Calendar,
    Location: MapPin,
    Role: Briefcase,
    Currently: Sparkles,
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-10 py-4 relative z-10"
      id="about-section-container"
    >
      {/* Section Header */}
      <motion.div variants={itemVariants} className="space-y-2 text-left" id="about-header-block">
        <h2 className="text-2xl font-bold font-sans tracking-tight text-neutral-950 dark:text-neutral-50 flex items-center gap-2">
          {about.heading}
        </h2>
      </motion.div>

      {/* Content Grid: Image + Paragraphs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10" id="about-content-grid">
        {/* Left Column: Profile Image */}
        <motion.div variants={itemVariants} className="lg:col-span-1" id="about-left-column">
          {about.image && (
            <div className="rounded-2xl overflow-hidden border border-zinc-200/60 dark:border-zinc-800/60 bg-white/70 dark:bg-zinc-950/60 backdrop-blur-sm shadow-sm">
              <div className="aspect-square relative overflow-hidden">
                <img
                  src={about.image.url}
                  alt={about.image.alt}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}
        </motion.div>

        {/* Right Column: Paragraphs + Quick Facts */}
        <motion.div
          variants={itemVariants}
          className="space-y-6 lg:col-span-2"
          id="about-right-column"
        >
          {/* More about me paragraphs */}
          <div className="space-y-5" id="about-paragraphs-block">
            {about.paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className="text-sm sm:text-base text-neutral-700 dark:text-neutral-300 leading-relaxed font-sans"
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* Quick Facts (below paragraphs) */}
          <div className="rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60 bg-white/70 dark:bg-zinc-950/60 backdrop-blur-sm shadow-sm p-5 space-y-3">
            <h3 className="text-xs font-semibold font-mono tracking-widest text-zinc-400 dark:text-zinc-500 uppercase">
              Quick Facts
            </h3>
            <div className="divide-y divide-zinc-100 dark:divide-zinc-900/50">
              {about.highlights.map((h) => {
                const Icon = highlightIcons[h.label] || UserCircle;
                return (
                  <div
                    key={h.label}
                    className="flex items-center justify-between py-2.5 first:pt-0 last:pb-0"
                  >
                    <span className="flex items-center gap-2 text-xs font-mono text-zinc-500 dark:text-zinc-400">
                      <Icon className="w-3.5 h-3.5 text-red-500 dark:text-red-400" />
                      {h.label}
                    </span>
                    <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100 text-right">
                      {h.value}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Built with credit */}
          <div className="rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60 bg-white/70 dark:bg-zinc-950/60 backdrop-blur-sm shadow-sm p-5">
            <p className="text-xs font-mono text-zinc-500 dark:text-zinc-400 leading-relaxed">
              This site is built using Next.js, TailwindCSS, shadcn/UI with Framer Motion and{" "}
              <a
                href="https://irvanma.eu.org"
                target="_blank"
                rel="noreferrer"
                className="text-red-500 dark:text-red-400 hover:underline"
              >
                lapp's realm
              </a>
              . It is hosted on{" "}
              <a
                href="https://vercel.com"
                target="_blank"
                rel="noreferrer"
                className="text-red-500 dark:text-red-400 hover:underline"
              >
                Vercel
              </a>
              . The source code is available on{" "}
              <a
                href="https://github.com/thescapeplayground/shenanigans"
                target="_blank"
                rel="noreferrer"
                className="text-red-500 dark:text-red-400 hover:underline"
              >
                isaiahscape/shenanigans
              </a>
              .
            </p>
          </div>

          {/* Decorative footnote */}
          <div className="pt-4 border-t border-zinc-100 dark:border-zinc-900/50">
            <p className="text-xs font-mono text-zinc-400 dark:text-zinc-500 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500/60" />
              Thanks for reading.
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}