"use client";

import { motion } from "motion/react";
import { About } from "@/src/types";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { LastFmSection } from "@/components/about/LastFmSection";
import { GamesGrid } from "@/components/about/GamesGrid";

interface AboutSectionProps {
  about: About;
}

export function AboutSection({ about }: AboutSectionProps) {
  const highlightIcons: Record<string, string> = {
    Age: "calendar_today",
    Location: "location_on",
    Role: "work",
    Currently: "auto_awesome",
  };

  return (
    <div className="space-y-12 py-4 relative z-10" id="about-section-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="space-y-2 text-left"
        id="about-header-block"
      >
        <h2 className="text-2xl font-bold font-sans tracking-tight text-neutral-950 dark:text-neutral-50 flex items-center gap-2">
          {about.heading}
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10" id="about-content-grid">
        <motion.div
          initial={{ opacity: 0, y: 25, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-1"
          id="about-left-column"
        >
          {about.image && (
            <div className="rounded-2xl overflow-hidden border border-zinc-200/60 dark:border-zinc-800/60 bg-white/70 dark:bg-zinc-950/60 backdrop-blur-sm shadow-sm sticky top-24">
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

        <div className="space-y-6 lg:col-span-2" id="about-right-column">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-5"
            id="about-paragraphs-block"
          >
            {about.paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className="text-sm sm:text-base text-neutral-700 dark:text-neutral-300 leading-relaxed font-sans"
              >
                {paragraph}
              </p>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.99 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "0px 0px -40px 0px" }}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60 bg-white/70 dark:bg-zinc-950/60 backdrop-blur-sm shadow-sm p-5 space-y-3"
          >
            <h3 className="text-xs font-semibold font-mono tracking-widest text-zinc-400 dark:text-zinc-500 uppercase">
              Quick Facts
            </h3>
            <div className="divide-y divide-zinc-100 dark:divide-zinc-900/50">
              {about.highlights.map((h) => {
                const iconName = highlightIcons[h.label] || "person";
                return (
                  <div
                    key={h.label}
                    className="flex items-center justify-between py-2.5 first:pt-0 last:pb-0"
                  >
                    <span className="flex items-center gap-2 text-xs font-mono text-zinc-500 dark:text-zinc-400">
                      <MaterialIcon icon={iconName} className="text-purple-600 dark:text-purple-400" size="1.1rem" />
                      {h.label}
                    </span>
                    <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100 text-right">
                      {h.value}
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -40px 0px" }}
            transition={{ duration: 0.55, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60 bg-white/70 dark:bg-zinc-950/60 backdrop-blur-sm shadow-sm p-5"
          >
            <p className="text-xs font-mono text-zinc-500 dark:text-zinc-400 leading-relaxed">
              This site is built using Next.js, TailwindCSS, shadcn/UI with Framer Motion and{" "}
              <a
                href="https://irvanma.eu.org"
                target="_blank"
                rel="noreferrer"
                className="text-purple-600 dark:text-purple-400 hover:underline"
              >
                lapp's realm
              </a>
              . It is hosted on{" "}
              <a
                href="https://vercel.com"
                target="_blank"
                rel="noreferrer"
                className="text-purple-600 dark:text-purple-400 hover:underline"
              >
                Vercel
              </a>
              . The source code is available on{" "}
              <a
                href="https://github.com/thescapeplayground/shenanigans"
                target="_blank"
                rel="noreferrer"
                className="text-purple-600 dark:text-purple-400 hover:underline"
              >
                isaiahscape/shenanigans
              </a>
              .
            </p>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -40px 0px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="pt-6 border-t border-zinc-200/60 dark:border-zinc-800/60 space-y-8"
        id="about-extra-sections"
      >
        <LastFmSection username={about.lastFmUsername || "isaiahthings"} />

        {about.games && about.games.length > 0 && (
          <GamesGrid games={about.games} />
        )}

        <div className="pt-2 border-t border-zinc-100 dark:border-zinc-900/50">
          <p className="text-xs font-mono text-zinc-400 dark:text-zinc-500 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-500/60" />
            Thanks for reading.
          </p>
        </div>
      </motion.div>
    </div>
  );
}