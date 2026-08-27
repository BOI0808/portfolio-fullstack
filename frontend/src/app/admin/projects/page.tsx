"use client";

import { useEffect, useState } from "react";
import { adminFetch } from "@/lib/adminApi";
import { Project } from "@/types";
import AdminNav from "@/components/admin/AdminNav";
import ProjectFormModal from "@/components/admin/ProjectFormModal";

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);

  async function fetchProjects() {
    try {
      const data = await adminFetch<Project[]>("/projects");
      setProjects(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProjects();
  }, []);

  async function handleDelete(id: string) {
    if (!confirm("Delete this project?")) return;
    try {
      await adminFetch(`/projects/${id}`, { method: "DELETE" });
      setProjects((prev) => prev.filter((p) => p.id !== id));
    } catch (e) {
      console.error(e);
    }
  }

  function openCreate() {
    setEditing(null);
    setModalOpen(true);
  }
  function openEdit(p: Project) {
    setEditing(p);
    setModalOpen(true);
  }

  function onSaved(saved: Project) {
    setProjects((prev) =>
      editing
        ? prev.map((p) => (p.id === saved.id ? saved : p))
        : [saved, ...prev]
    );
    setModalOpen(false);
  }

  return (
    <div className="min-h-screen bg-[#0b0716] flex flex-col">
      <AdminNav title="Projects" />

      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Projects</h1>
          <button
            onClick={openCreate}
            className="btn-gradient px-6 py-2 rounded-lg text-white text-sm font-medium"
          >
            + New Project
          </button>
        </div>

        {loading ? (
          <p className="text-gray-400">Loading...</p>
        ) : (
          <div className="grid gap-4">
            {projects.map((p) => (
              <div
                key={p.id}
                className="glass-card p-5 flex items-start justify-between gap-4"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h2 className="text-white font-semibold">{p.title}</h2>
                    {p.isFeatured && (
                      <span className="text-xs px-2 py-0.5 rounded-full border border-purple-500/40 text-purple-300">
                        Featured
                      </span>
                    )}
                  </div>
                  <p className="text-gray-400 text-sm line-clamp-2 mb-2">
                    {p.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {p.techStack.map((t) => (
                      <span
                        key={t}
                        className="text-xs px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-gray-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() => openEdit(p)}
                    className="text-sm px-4 py-2 border border-gray-700 rounded-lg text-gray-300 hover:border-[#a855f7] hover:text-[#a855f7] transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="text-sm px-4 py-2 border border-gray-700 rounded-lg text-gray-300 hover:border-red-500 hover:text-red-400 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
            {projects.length === 0 && (
              <p className="text-gray-500 text-center py-16">
                No projects yet. Create your first one!
              </p>
            )}
          </div>
        )}
      </main>

      {modalOpen && (
        <ProjectFormModal
          project={editing}
          onSaved={onSaved}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
}
