import { Experience } from "@/types";

const SPECIALTIES = [
  {
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </svg>
    ),
    label: "Fullstack Web Development",
  },
  {
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        ></path>
      </svg>
    ),
    label: "Problem Solving",
  },
];

export default function AboutSection({
  experiences,
}: {
  experiences: Experience[];
}) {
  return (
    <section
      id="about"
      className="scroll-mt-30 flex flex-col items-center gap-16"
    >
      <h2 className="text-4xl font-bold text-center">About Me</h2>
      <div className="flex flex-col md:flex-row items-center gap-12 w-full">
        {/* Avatar */}
        <div className="flex-1 flex justify-center">
          <div
            className="w-64 h-64 md:w-80 md:h-80 rounded-full p-[3px]"
            style={{ background: "linear-gradient(135deg, #ec4899, #a855f7)" }}
          >
            <div className="w-full h-full rounded-full overflow-hidden border-4 border-[#0b0716] bg-[#151023] flex items-center justify-center">
              {/* Thay bằng ảnh thật: <img src="/avatar.jpg" className="w-full h-full object-cover" /> */}
              <img
                src="/AboutMeSection.jpg"
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 space-y-6">
          <h3 className="text-2xl font-semibold text-gradient">
            I&apos;m Dinh Nhat Khoi
          </h3>
          <p className="text-gray-300 leading-relaxed">
            Third-year Software Engineering student dedicated to building
            practical, full-stack web applications with{" "}
            <span className="text-white font-medium">ASP.NET Core</span> and{" "}
            <span className="text-white font-medium">Next.js</span>.
          </p>

          <div className="space-y-4 pt-4">
            {SPECIALTIES.map((s) => (
              <div
                key={s.label}
                className="btn-outline-gradient p-4 px-6 flex items-center gap-4 hover:bg-white/5 transition-colors"
                style={{ borderRadius: "0.5rem" }}
              >
                <span className="text-[#a855f7]">{s.icon}</span>
                <span className="font-medium text-pink-400">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
