"use client";

import { useState } from "react";
import Link from "next/link";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { ServiceCategory, ServiceFaq } from "@/src/types";
import { DEFAULT_SERVICES, DEFAULT_SERVICE_FAQS } from "@/src/data";

interface ServicesSectionProps {
  services?: ServiceCategory[];
  faqs?: ServiceFaq[];
}

export function ServicesSection({
  services = DEFAULT_SERVICES,
  faqs = DEFAULT_SERVICE_FAQS,
}: ServicesSectionProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100, damping: 15 } },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-10 py-4 font-sans text-left"
      id="services-section-container"
    >
      {/* Header Block */}
      <motion.div variants={itemVariants} className="space-y-3" id="services-header">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-2.5 py-1 rounded-full bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20 text-xs font-mono font-medium">
            Leonardo's Tangible Stuff
          </span>
          <span className="text-xs font-mono text-zinc-400 dark:text-zinc-500">
            2026 Updated Price List
          </span>
        </div>

        <h2 className="text-3xl font-bold tracking-tight text-neutral-950 dark:text-neutral-50">
          Services & Hardware Pricing
        </h2>

        <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-2xl leading-relaxed">
          From hardware diagnostics and thermal overhauls to software installations and custom web development. Transparent pricing with free diagnosis.
        </p>

        {/* Scope badges */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {["maintenance", "building", "upgrades", "repairing", "designing"].map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-0.5 text-[11px] font-mono rounded-md bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border border-zinc-200/60 dark:border-zinc-800/50 uppercase tracking-wider"
            >
              • {tag}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Services List Grid */}
      <motion.div variants={itemVariants} className="space-y-4" id="services-list-group">
        <h3 className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest font-mono flex items-center gap-1.5">
          <MaterialIcon icon="list_alt" className="text-red-500" size="1rem" /> Available Services
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-5" id="services-cards-grid">
          {services.map((service) => (
            <div
              key={service.id}
              className="flex flex-col justify-between p-5 rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60 bg-white/70 dark:bg-zinc-950/60 backdrop-blur-sm shadow-xs hover:border-zinc-300 dark:hover:border-zinc-700 transition-all space-y-4"
              id={`service-card-${service.id}`}
            >
              <div className="space-y-3">
                {/* Header row: title, icon & price badge */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/40 shrink-0">
                      <MaterialIcon icon={service.icon} className={service.color} size="1.25rem" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-neutral-900 dark:text-neutral-100 leading-tight">
                        {service.title}
                      </h4>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                        {service.tagline}
                      </p>
                    </div>
                  </div>
                  <span className="shrink-0 px-2.5 py-1 text-xs font-mono font-bold rounded-lg bg-zinc-900 text-zinc-100 dark:bg-zinc-100 dark:text-zinc-950 shadow-xs">
                    {service.price}
                  </span>
                </div>

                {/* Service items checklist */}
                <ul className="space-y-2 pt-2 border-t border-zinc-100 dark:border-zinc-900/50">
                  {service.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-normal">
                      <MaterialIcon icon="check_circle" className="text-red-500 shrink-0 mt-0.5" size="1rem" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Note pill */}
              {service.note && (
                <div className="pt-2 border-t border-zinc-100 dark:border-zinc-900/50">
                  <p className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400 leading-relaxed flex items-start gap-1.5 bg-zinc-50 dark:bg-zinc-900/40 p-2.5 rounded-xl border border-zinc-200/40 dark:border-zinc-800/40">
                    <MaterialIcon icon="info" className="text-red-500 dark:text-red-400 shrink-0 mt-0.5" size="0.875rem" />
                    <span>{service.note}</span>
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </motion.div>

      {/* FAQ Section */}
      <motion.div variants={itemVariants} className="space-y-4 pt-4 border-t border-zinc-200/50 dark:border-zinc-800/50" id="services-faq-group">
        <div className="space-y-1">
          <h3 className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest font-mono flex items-center gap-1.5">
            <MaterialIcon icon="help_outline" className="text-red-500" size="1rem" /> Frequently Asked Questions
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Got questions about diagnosis, payment, or turnarounds?
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3" id="faq-accordion-grid">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-zinc-200/60 dark:border-zinc-800/60 rounded-xl bg-white/70 dark:bg-zinc-950/60 overflow-hidden shadow-xs transition-all hover:border-zinc-300 dark:hover:border-zinc-700"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full flex items-center justify-between p-4 text-left focus:outline-none cursor-pointer gap-3"
              >
                <div className="flex items-center gap-2.5">
                  <MaterialIcon icon={faq.icon} className="text-red-500 dark:text-red-400 shrink-0" size="1.1rem" />
                  <span className="text-xs sm:text-sm font-bold text-zinc-800 dark:text-zinc-200 font-sans">
                    {faq.question}
                  </span>
                </div>
                <MaterialIcon
                  icon={openFaq === index ? "expand_less" : "expand_more"}
                  className="text-zinc-400 shrink-0"
                  size="1rem"
                />
              </button>

              <AnimatePresence>
                {openFaq === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    className="border-t border-zinc-100 dark:border-zinc-900/50 bg-zinc-50/40 dark:bg-zinc-900/20"
                  >
                    <div className="p-4 pt-3 text-xs text-zinc-600 dark:text-zinc-300 whitespace-pre-line leading-relaxed font-sans">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Bottom CTA Block */}
      <motion.div
        variants={itemVariants}
        className="p-6 rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60 bg-white/70 dark:bg-zinc-950/60 backdrop-blur-sm shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4"
        id="services-cta-banner"
      >
        <div className="space-y-1 text-center sm:text-left">
          <h4 className="text-sm font-bold text-neutral-900 dark:text-neutral-100 font-sans">
            Ready to fix, clean, or build your device?
          </h4>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 font-sans">
            Ask questions directly or submit a collaboration note. Free diagnostic checks included.
          </p>
        </div>

        <Button
          render={<Link href="/contact" className="gap-2" />}
          className="bg-zinc-900 hover:bg-zinc-800 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-zinc-200 h-9 rounded-lg font-mono text-xs shrink-0"
        >
          <MaterialIcon icon="mail" size="0.875rem" /> Get in Touch
        </Button>
      </motion.div>
    </motion.div>
  );
}

export default ServicesSection;