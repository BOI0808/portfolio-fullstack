"use client";

import { useState } from "react";
import { Project } from "@/types";

const GITHUB_ICON = (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const DEMO_ICON = (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
      clipRule="evenodd"
    />
  </svg>
);

export default function ProjectsSection({
  projects = [],
}: {
  projects: Project[];
}) {
  const [filter, setFilter] = useState<"all" | "featured">("all");
  const filtered =
    filter === "featured" ? projects.filter((p) => p.isFeatured) : projects;

  return (
    <section
      id="projects"
      className="scroll-mt-30 flex flex-col items-center gap-12 w-full"
    >
      <h2 className="text-4xl font-bold text-center">My Projects</h2>

      <div className="flex gap-4">
        <button
          onClick={() => setFilter("all")}
          className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
            filter === "all"
              ? "btn-gradient text-white"
              : "btn-outline-gradient text-gray-300"
          }`}
        >
          All Projects
        </button>
        <button
          onClick={() => setFilter("featured")}
          className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
            filter === "featured"
              ? "btn-gradient text-white"
              : "btn-outline-gradient text-gray-300"
          }`}
        >
          Featured
        </button>
      </div>

      {filtered.length === 0 ? (
        <p className="text-gray-400 text-base">
          Chưa có dự án nào được cập nhật.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          {filtered.map((project) => (
            <div
              key={project.id}
              className="glass-card p-4 flex flex-col gap-4"
            >
              {/* Thumbnail */}
              <div className="rounded-lg overflow-hidden h-48 bg-[#151023] flex items-center justify-center">
                {project.thumbnailUrl ? (
                  <img
                    src={project.thumbnailUrl}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-5xl font-bold text-gradient">
                    {project.title.slice(0, 2).toUpperCase()}
                  </span>
                )}
              </div>

              {/* Description */}
              <h3 className="text-lg font-semibold text-white">
                {project.title}
              </h3>
              <p className="text-sm text-gray-400 flex-grow">
                {project.description}
              </p>

              {/* Tech stack */}
              {project.techStack?.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((t) => (
                    <span
                      key={t}
                      className="text-xs px-2 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}

              {/* Highlights */}
              {project.highlights?.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {project.highlights.map((h) => (
                    <span
                      key={h}
                      className="text-xs px-2 py-1 rounded-full border border-purple-500/40 text-purple-300"
                    >
                      ✦ {h}
                    </span>
                  ))}
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-4 mt-auto">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline-gradient flex-1 py-2 text-sm text-gray-300 flex items-center justify-center gap-2"
                  >
                    Repository {GITHUB_ICON}
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-gradient flex-1 py-2 rounded-full text-sm text-white flex items-center justify-center gap-2"
                  >
                    Demo {DEMO_ICON}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
