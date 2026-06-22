"use client";

import { Wrench, Hammer, Paintbrush, Cpu, WrenchIcon } from "lucide-react";
import { motion } from "motion/react";

const services = [
  {
    title: "Maintenance",
    description: "Routine upkeep and care to keep your systems, devices, and gear running smoothly over time.",
    icon: Wrench,
    color: "text-emerald-500",
    image: "/assets/tangiblestuff/TV - 5, Pt. IV.png",
  },
  {
    title: "Installation",
    description: "Targeted software installations, depends on whatever device you have.",
    icon: Cpu,
    color: "text-red-500",
    image: "/assets/tangiblestuff/TV - 5, Pt. III.png",
  },
  {
    title: "Repair",
    description: "Diagnostic and hands-on fixes for broken, slow, or malfunctioning tech and equipment.",
    icon: WrenchIcon,
    color: "text-amber-500",
    image: "/assets/tangiblestuff/TV - 5, Pt. II.png",
  },
  {
    title: "Building",
    description: "Custom setups, configurations, and assemblies tailored to specific workflows or use cases.",
    icon: Hammer,
    color: "text-rose-500",
    image: "/assets/tangiblestuff/TV - 5, Pt. V.png",
  },
  {
    title: "Designing",
    description: "Visual, UI, and layout design work for interfaces, branding, and creative assets.",
    icon: Paintbrush,
    color: "text-pink-500",
    image: "/assets/tangiblestuff/TV - 5, Pt. VI.png",
  },
];

export function ServicesSection() {
  return (
    <div className="space-y-8 py-4" id="services-section">
      <div className="space-y-2" id="services-header">
        <h2 className="text-2xl font-bold tracking-tight text-neutral-950 dark:text-neutral-50 font-sans">
          Services
        </h2>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 max-w-xl font-sans">
          A quick overview of the services I can help with.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" id="services-grid">
        {services.map((service, index) => {
          const Icon = service.icon;
          return (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex flex-col rounded-xl border border-zinc-200/60 dark:border-zinc-800/50 bg-zinc-50/50 dark:bg-zinc-900/10 hover:border-zinc-400 dark:hover:border-zinc-600 transition-all overflow-hidden"
            >
              <div className="aspect-video w-full bg-zinc-100 dark:bg-zinc-900 border-b border-zinc-200/50 dark:border-zinc-800/40">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex items-start gap-4 p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/40">
                  <Icon className={`w-5 h-5 ${service.color}`} />
                </div>
                <div className="text-left">
                  <h3 className="text-sm font-bold text-zinc-800 dark:text-zinc-200">{service.title}</h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}