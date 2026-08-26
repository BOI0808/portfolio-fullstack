import { Experience } from "@/types";
export default function ExperienceSection({
  experiences,
}: {
  experiences: Experience[];
}) {
  return (
    <section id="experience" className="flex flex-col items-center gap-12">
      <h2 className="text-4xl font-bold text-center">Experience</h2>
      <p className="text-gray-400">({experiences.length} entries loaded)</p>
    </section>
  );
}
