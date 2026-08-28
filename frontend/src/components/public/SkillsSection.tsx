import { Skill } from "@/types";

const DOT_COLORS = ["bg-[#ec4899]", "bg-[#a855f7]"];

function SkillRow({ skill, index }: { skill: Skill; index: number }) {
  const dotColor = DOT_COLORS[index % 2];
  const totalDots = 5;

  return (
    <div className="flex items-center justify-between glass-card p-4">
      <div className="flex items-center gap-4">
        {skill.iconUrl ? (
          <img src={skill.iconUrl} alt={skill.name} className="w-6 h-6" />
        ) : (
          <span className="w-6 h-6 rounded-full bg-[#a855f7]/30 flex items-center justify-center text-xs text-[#a855f7] font-bold">
            {skill.name[0]}
          </span>
        )}
        <span className="font-medium text-white">{skill.name}</span>
      </div>
      <div className="flex gap-2">
        {Array.from({ length: totalDots }).map((_, i) => (
          <span
            key={i}
            className={`skill-dot ${
              i < skill.proficiencyLevel ? dotColor : "bg-white/10"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default function SkillsSection({ skills = [] }: { skills: Skill[] }) {
  return (
    <section
      id="skills"
      className="scroll-mt-30 flex flex-col items-center gap-12"
    >
      <h2 className="text-4xl font-bold text-center">My Skills</h2>

      {skills.length === 0 ? (
        <p className="text-gray-400 text-sm">
          Chưa có kỹ năng nào được cập nhật.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-4 w-full max-w-4xl mx-auto">
          {skills
            .sort((a, b) => a.sortOrder - b.sortOrder)
            .map((skill, i) => (
              <SkillRow key={skill.id} skill={skill} index={i} />
            ))}
        </div>
      )}
    </section>
  );
}
