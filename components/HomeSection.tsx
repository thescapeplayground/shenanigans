"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Profile, Experience } from "@/src/types";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { motion } from "motion/react";

import { PresenceClock } from "./PresenceClock";
import { FolderCard } from "./ui/FolderCard";

interface HomeSectionProps {
  profile: Profile;
  experiences: Experience[];
}

export function HomeSection({ profile, experiences }: HomeSectionProps) {
  return (
    <div className="space-y-16 py-4 relative z-10" id="home-section-container">
      <motion.div 
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="-mx-4 sm:-mx-6 lg:-mx-8 -mt-8 px-4 sm:px-6 lg:px-8 min-h-[calc(100dvh-5.5rem)] flex flex-col justify-center space-y-6 sm:space-y-8 text-left relative overflow-hidden" 
        id="home-greeting-block"
      >
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7 xl:col-span-8 space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex items-center gap-3"
            >
              <BadgeAvailability />
              <span className="text-xs font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-widest flex items-center gap-1">
                Photographer, Graphic Designer
              </span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-neutral-950 dark:text-neutral-50 font-sans leading-[1.1] mt-2"
            >
              I'm <span className="text-purple-600 dark:text-purple-400">{profile.name}</span>.
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg sm:text-xl lg:text-2xl text-neutral-700 dark:text-neutral-300 leading-relaxed font-sans"
            >
              {profile.bio}
            </motion.p>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-base sm:text-lg text-neutral-500 dark:text-neutral-400 leading-relaxed font-sans"
            >
              {profile.secondaryBio}
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap items-center gap-3 pt-2"
            >
              <Link
                href="/gallery"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-zinc-900/80 hover:bg-zinc-800 text-zinc-100 border border-zinc-700/60 dark:bg-zinc-900/80 dark:hover:bg-zinc-800 dark:border-zinc-800 text-xs sm:text-sm font-medium backdrop-blur-sm active:scale-95 transition-all duration-200"
              >
                <MaterialIcon icon="photo_library" size="1.05rem" />
                <span>Gallery</span>
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-zinc-900/80 hover:bg-zinc-800 text-zinc-100 border border-zinc-700/60 dark:bg-zinc-900/80 dark:hover:bg-zinc-800 dark:border-zinc-800 text-xs sm:text-sm font-medium backdrop-blur-sm active:scale-95 transition-all duration-200"
              >
                <MaterialIcon icon="mail" size="1.05rem" />
                <span>Contact</span>
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 25, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 xl:col-span-4 flex justify-center lg:justify-end items-center pt-4 lg:pt-0"
          >
            <FolderCard href="/about" badgeText="About" />
          </motion.div>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 35, scale: 0.97 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "0px 0px -40px 0px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        id="interactive-clock-block"
      >
        <PresenceClock 
          location={profile.location} 
          statusText={profile.statusText || ""} 
          codename={profile.codename}
          instagramUsername={profile.instagram?.username}
          instagramFollowers={profile.instagram?.followers}
        />
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -40px 0px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="space-y-6 sm:space-y-8 text-left" 
        id="home-timeline-block"
      >
        <div className="rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/50 shadow-sm p-5 sm:p-6">
          <div className="flex items-center justify-between pb-5 mb-5 border-b border-zinc-100 dark:border-zinc-900/50">
            <h2 className="text-base font-semibold text-neutral-900 dark:text-neutral-100 uppercase tracking-wider font-mono flex items-center gap-2">
              <MaterialIcon icon="work" className="text-purple-600 dark:text-purple-400" size="1.25rem" /> Career Journey
            </h2>
            <span className="text-xs font-mono text-zinc-400">Archived Timeline</span>
          </div>

          <div className="relative border-l border-zinc-200/80 dark:border-zinc-800 lg:ml-2 pl-4 sm:pl-6 space-y-8 sm:space-y-10" id="experience-vertical-timeline">
            {experiences.map((exp, index) => (
              <motion.div 
                key={exp.id} 
                initial={{ opacity: 0, y: 25, x: -10 }}
                whileInView={{ opacity: 1, y: 0, x: 0 }}
                viewport={{ once: true, margin: "0px 0px -30px 0px" }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative group text-left" 
                id={`timeline-item-${exp.id}`}
              >
                <div className="absolute -left-[21px] sm:-left-[29px] top-1.5 bg-background border border-zinc-300 dark:border-zinc-700 w-3 h-3 rounded-full group-hover:bg-purple-600 transition-colors duration-300 ring-4 ring-background" />
                
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <h3 className="text-base font-bold text-neutral-950 dark:text-neutral-50 font-sans flex items-center gap-1.5 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-200">
                    {exp.role}
                  </h3>
                  <span className="text-xs font-mono text-neutral-400 dark:text-neutral-500 shrink-0">
                    {exp.period}
                  </span>
                </div>

                <div className="mt-0.5" id={`timeline-company-${exp.id}`}>
                  {exp.companyUrl && exp.companyUrl !== "#" ? (
                    <a 
                      href={exp.companyUrl}
                      target="_blank"
                      referrerPolicy="no-referrer"
                      rel="noreferrer"
                      className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-neutral-100 duration-150 inline-flex items-center gap-0.5 border-b border-dashed border-neutral-300 dark:border-neutral-700 pb-0.5 font-mono"
                    >
                      {exp.company} <MaterialIcon icon="north_east" className="text-neutral-400" size="0.75rem" />
                    </a>
                  ) : (
                    <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 font-mono">
                      {exp.company}
                    </span>
                  )}
                </div>

                <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed font-sans max-w-xl">
                  {exp.description}
                </p>

                {exp.tags && (
                  <div className="flex flex-wrap gap-1 mt-3" id={`timeline-tech-${exp.id}`}>
                    {exp.tags.map((tag) => (
                      <span 
                        key={tag} 
                        className="px-2 py-0.5 text-[10px] font-mono rounded bg-zinc-100 dark:bg-zinc-900 text-neutral-500 dark:text-neutral-400 border border-zinc-200/50 dark:border-zinc-800/40"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function getPHTNow() {
  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  const pht = new Date(utc + 8 * 3600000);
  return {
    hour: pht.getHours(),
    day: pht.getDay(),
  };
}

function computeAvailability(): { status: 'available' | 'busy' | 'away'; text: string } {
  const { hour, day } = getPHTNow();
  const isWeekend = day === 0 || day === 6;

  if (hour >= 21 || hour < 8) {
    return { status: 'away', text: 'Sleep' };
  }

  if (isWeekend) {
    return { status: 'busy', text: 'Busy (Weekend)' };
  }

  if ((hour >= 8 && hour < 12) || (hour >= 13 && hour < 16)) {
    return { status: 'available', text: 'Active now' };
  }

  return { status: 'away', text: 'Away' };
}

function BadgeAvailability() {
  const [avail, setAvail] = useState(() => computeAvailability());

  useEffect(() => {
    const update = () => setAvail(computeAvailability());
    update();
    const interval = setInterval(update, 60000);
    return () => clearInterval(interval);
  }, []);

  const configs: Record<string, { bg: string; indicator: string }> = {
    available: { bg: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 dark:bg-emerald-400/5 border-emerald-500/20", indicator: "bg-emerald-500" },
    busy: { bg: "bg-amber-500/10 text-amber-700 dark:text-amber-400 dark:bg-amber-400/5 border-amber-500/20", indicator: "bg-amber-500" },
    away: { bg: "bg-zinc-500/10 text-zinc-700 dark:text-zinc-400 dark:bg-zinc-400/5 border-zinc-500/20", indicator: "bg-zinc-500" }
  };

  const { bg, indicator } = configs[avail.status];

  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-mono font-medium border ${bg}`} id="badge-availability-tag">
      <span className={`h-1.5 w-1.5 rounded-full ${indicator}`} />
      {avail.text}
    </span>
  );
}
