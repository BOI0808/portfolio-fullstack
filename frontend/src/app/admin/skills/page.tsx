"use client";

import { useEffect, useState } from "react";
import { adminFetch } from "@/lib/adminApi";
import { Skill } from "@/types";
import AdminNav from "@/components/admin/AdminNav";
import SkillFormModal from "@/components/admin/SkillFormModal";

export default function AdminSkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Skill | null>(null);

  async function fetchSkills() {
    try {
      const data = await adminFetch<Skill[]>("/skills");
      setSkills(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchSkills();
  }, []);

  async function handleDelete(id: string) {
    if (!confirm("Delete this skill?")) return;
    try {
      await adminFetch(`/skills/${id}`, { method: "DELETE" });
      setSkills((prev) => prev.filter((s) => s.id !== id));
    } catch (e) {
      console.error(e);
    }
  }

  function openCreate() {
    setEditing(null);
    setModalOpen(true);
  }
  function openEdit(s: Skill) {
    setEditing(s);
    setModalOpen(true);
  }

  function onSaved(saved: Skill) {
    setSkills((prev) =>
      editing
        ? prev.map((s) => (s.id === saved.id ? saved : s))
        : [saved, ...prev]
    );
    setModalOpen(false);
  }

  const CATEGORY_COLORS: Record<string, string> = {
    Frontend: "border-blue-500/40 text-blue-300",
    Backend: "border-green-500/40 text-green-300",
    Database: "border-yellow-500/40 text-yellow-300",
    DevOps: "border-orange-500/40 text-orange-300",
  };

  return (
    <div className="min-h-screen bg-[#0b0716] flex flex-col">
      <AdminNav title="Skills" />

      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Skills</h1>
          <button
            onClick={openCreate}
            className="btn-gradient px-6 py-2 rounded-lg text-white text-sm font-medium"
          >
            + New Skill
          </button>
        </div>

        {loading ? (
          <p className="text-gray-400">Loading...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {skills.map((s) => (
              <div
                key={s.id}
                className="glass-card p-5 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4 flex-1">
                  {s.iconUrl ? (
                    <img src={s.iconUrl} alt={s.name} className="w-8 h-8" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-[#a855f7]/20 flex items-center justify-center text-[#a855f7] text-sm font-bold">
                      {s.name[0]}
                    </div>
                  )}
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-white font-medium">{s.name}</span>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full border ${
                          CATEGORY_COLORS[s.category] ??
                          "border-white/20 text-gray-300"
                        }`}
                      >
                        {s.category}
                      </span>
                    </div>
                    {/* Dot proficiency */}
                    <div className="flex gap-1 mt-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span
                          key={i}
                          className={`inline-block w-2 h-2 rounded-full ${
                            i < s.proficiencyLevel
                              ? "bg-[#a855f7]"
                              : "bg-white/10"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() => openEdit(s)}
                    className="text-sm px-4 py-2 border border-gray-700 rounded-lg text-gray-300 hover:border-[#a855f7] hover:text-[#a855f7] transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(s.id)}
                    className="text-sm px-4 py-2 border border-gray-700 rounded-lg text-gray-300 hover:border-red-500 hover:text-red-400 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
            {skills.length === 0 && (
              <p className="text-gray-500 text-center py-16 md:col-span-2">
                No skills yet.
              </p>
            )}
          </div>
        )}
      </main>

      {modalOpen && (
        <SkillFormModal
          skill={editing}
          onSaved={onSaved}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
}
