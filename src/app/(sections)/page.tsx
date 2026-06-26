"use client";

import { motion, AnimatePresence } from "motion/react";

import { DEFAULT_PROFILE, DEFAULT_PROJECTS, DEFAULT_EXPERIENCES, DEFAULT_STACK } from "../../data";

import { HomeSection } from "@/components/HomeSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { StackSection } from "@/components/StackSection";
import { ContactSection } from "@/components/ContactSection";
import { GallerySection } from "@/components/GallerySection";
import { ServicesSection } from "@/components/ServicesSection";
import { BlogSection } from "@/components/BlogSection";
import { MasonryBackground } from "@/components/MasonryBackground";
import { useNavigation } from "@/components/NavigationContext";

const profile = DEFAULT_PROFILE;
const projects = DEFAULT_PROJECTS;

function renderSection(tab: string) {
  switch (tab) {
    case "home":
      return <HomeSection profile={profile} experiences={DEFAULT_EXPERIENCES} />;
    case "projects":
      return <ProjectsSection projects={projects} />;
    case "stack":
      return <StackSection stack={DEFAULT_STACK} />;
    case "gallery":
      return <GallerySection />;
    case "services":
      return <ServicesSection />;
    case "contact":
      return <ContactSection />;
    case "blog":
      return <BlogSection />;
    default:
      return null;
  }
}

export default function HomePage() {
  const { homeTab } = useNavigation();

  return (
    <>
      {homeTab === "home" && <MasonryBackground />}
      <AnimatePresence mode="wait">
        <motion.div
          key={homeTab}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.22, ease: "easeInOut" }}
          id={`tab-content-panel-${homeTab}`}
        >
          {renderSection(homeTab)}
        </motion.div>
      </AnimatePresence>
    </>
  );
}
