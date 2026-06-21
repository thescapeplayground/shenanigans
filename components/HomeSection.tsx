"use client";

import { Profile, Experience } from "@/src/types";
import { Briefcase, ArrowUpRight, GraduationCap, MapPin, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { PresenceClock } from "./PresenceClock";

interface HomeSectionProps {
  profile: Profile;
  experiences: Experience[];
}

export function HomeSection({ profile, experiences }: HomeSectionProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100, damping: 15 } }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-12 py-4"
      id="home-section-container"
    >
      {/* Hero Greeting Copy */}
      <motion.div variants={itemVariants} className="space-y-6 text-left" id="home-greeting-block">
        <div className="flex items-center gap-3">
          <BadgeAvailability status={profile.availability} />
          <span className="text-xs font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-widest flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-500" />  Photographer, Graphic Designer
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-neutral-950 dark:text-neutral-50 font-sans leading-[1.1] mt-2">
          I'm <span className="font-mono text-indigo-600 dark:text-indigo-400">{profile.name}</span>. I design digital interfaces that feel invisible.
        </h1>
        
        <p className="text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed font-sans max-w-3xl">
          {profile.bio}
        </p>

        <p className="text-sm sm:text-base text-neutral-500 dark:text-neutral-400 leading-relaxed font-sans max-w-3xl">
          {profile.secondaryBio}
        </p>
      </motion.div>

      {/* Real-time Presence Clock Indicator */}
      <motion.div variants={itemVariants} id="interactive-clock-block">
        <PresenceClock 
          location={profile.location} 
          statusText={profile.statusText || ""} 
        />
      </motion.div>

      {/* Career Journey Timeline */}
      <motion.div variants={itemVariants} className="space-y-6 sm:space-y-8 text-left" id="home-timeline-block">
        <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-900/50 pb-3">
          <h2 className="text-base font-semibold text-neutral-900 dark:text-neutral-100 uppercase tracking-wider font-mono flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-zinc-500" /> Career Journey
          </h2>
          <span className="text-xs font-mono text-zinc-400">Archived Timeline</span>
        </div>

        <div className="relative border-l border-zinc-200/80 dark:border-zinc-800 lg:ml-2 pl-4 sm:pl-6 space-y-8 sm:space-y-10" id="experience-vertical-timeline">
          {experiences.map((exp, index) => (
            <div key={exp.id} className="relative group text-left" id={`timeline-item-${exp.id}`}>
              {/* Timeline bubble indicator */}
              <div className="absolute -left-[21px] sm:-left-[29px] top-1.5 bg-background border border-zinc-300 dark:border-zinc-700 w-3 h-3 rounded-full group-hover:bg-indigo-500 transition-colors duration-300 ring-4 ring-background" />
              
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                <h3 className="text-base font-bold text-neutral-950 dark:text-neutral-50 font-sans flex items-center gap-1.5 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200">
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
                    {exp.company} <ArrowUpRight className="w-3 h-3 text-neutral-400" />
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
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

function BadgeAvailability({ status }: { status: 'available' | 'busy' | 'away' }) {
  const configs = {
    available: { text: "Active now", bg: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 dark:bg-emerald-400/5 border-emerald-500/20", indicator: "bg-emerald-500" },
    busy: { text: "Busy", bg: "bg-amber-500/10 text-amber-700 dark:text-amber-400 dark:bg-amber-400/5 border-amber-500/20", indicator: "bg-amber-500" },
    away: { text: "Away", bg: "bg-zinc-500/10 text-zinc-700 dark:text-zinc-400 dark:bg-zinc-400/5 border-zinc-500/20", indicator: "bg-zinc-500" }
  };

  const { text, bg, indicator } = configs[status];

  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-mono font-medium border ${bg}`} id="badge-availability-tag">
      <span className={`h-1.5 w-1.5 rounded-full ${indicator}`} />
      {text}
    </span>
  );
}
