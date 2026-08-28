import HeroSection from "@/components/public/HeroSection";
import AboutSection from "@/components/public/AboutSection";
import SkillsSection from "@/components/public/SkillsSection";
import ProjectsSection from "@/components/public/ProjectsSection";
import ContactSection from "@/components/public/ContactSection";
import { apiFetch } from "@/lib/api";
import { Project, Skill, Experience } from "@/types";

export const revalidate = 3600;

async function getData() {
  try {
    const [projects, skills, experiences] = await Promise.all([
      apiFetch<Project[]>("/projects"),
      apiFetch<Skill[]>("/skills"),
      apiFetch<Experience[]>("/experiences"),
    ]);
    return { projects, skills, experiences };
  } catch {
    return { projects: [], skills: [], experiences: [] };
  }
}

export default async function HomePage() {
  const { projects, skills, experiences } = await getData();
  return (
    <>
      <HeroSection />
      <AboutSection experiences={experiences} />
      <SkillsSection skills={skills} />
      <ProjectsSection projects={projects} />
      <ContactSection />
    </>
  );
}
