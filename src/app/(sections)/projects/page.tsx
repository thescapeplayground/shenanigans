import { DEFAULT_PROJECTS } from "../../../data";
import { ProjectsSection } from "@/components/ProjectsSection";

export default function ProjectsPage() {
  return <ProjectsSection projects={DEFAULT_PROJECTS} />;
}
