"use client";

import { useState } from "react";
import { adminFetch } from "@/lib/adminApi";
import { Skill } from "@/types";

interface Props {
  skill: Skill | null;
  onSaved: (s: Skill) => void;
  onClose: () => void;
}

const CATEGORIES = ["Frontend", "Backend", "Database", "DevOps", "Other"];

export default function SkillFormModal({ skill, onSaved, onClose }: Props) {
  const isEdit = !!skill;
  const [form, setForm] = useState({
    id: skill?.id,
    name: skill?.name ?? "",
    category: skill?.category ?? "Frontend",
    proficiencyLevel: skill?.proficiencyLevel ?? 3,
    iconUrl: skill?.iconUrl ?? "",
    sortOrder: skill?.sortOrder ?? 0,
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSave() {
    setSaving(true);
    setError("");
    try {
      const body = {
        ...form,
        iconUrl: form.iconUrl || null,
      };

      const saved = isEdit
        ? await adminFetch<Skill>(`/skills/${skill.id}`, {
            method: "PUT",
            body: JSON.stringify(body),
          })
        : await adminFetch<Skill>("/skills", {
            method: "POST",
            body: JSON.stringify(body),
          });

      onSaved(saved);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setSaving(false);
    }
  }

  const inputClass =
    "w-full bg-[#0b0716] border border-gray-700 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-[#a855f7] transition-colors";
  const labelClass = "block text-sm font-medium text-gray-300 mb-1";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="glass-card w-full max-w-md p-8 space-y-5">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">
            {isEdit ? "Edit Skill" : "New Skill"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl leading-none"
          >
            &times;
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className={labelClass}>Name *</label>
            <input
              className={inputClass}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>

          <div>
            <label className={labelClass}>Category</label>
            <select
              className={inputClass}
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelClass}>Proficiency Level (1–5)</label>
            <input
              type="range"
              min={1}
              max={5}
              value={form.proficiencyLevel}
              onChange={(e) =>
                setForm({ ...form, proficiencyLevel: Number(e.target.value) })
              }
              className="w-full accent-[#a855f7]"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Beginner</span>
              <span className="text-[#a855f7] font-medium">
                {form.proficiencyLevel}/5
              </span>
              <span>Expert</span>
            </div>
          </div>

          <div>
            <label className={labelClass}>
              Icon URL (devicon hoặc để trống)
            </label>
            <input
              className={inputClass}
              value={form.iconUrl}
              onChange={(e) => setForm({ ...form, iconUrl: e.target.value })}
              placeholder="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/..."
            />
          </div>

          <div>
            <label className={labelClass}>Sort Order</label>
            <input
              type="number"
              className={inputClass}
              value={form.sortOrder}
              onChange={(e) =>
                setForm({ ...form, sortOrder: Number(e.target.value) })
              }
            />
          </div>
        </div>

        {error && <p className="text-red-400 text-sm">{error}</p>}

        <div className="flex justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-gray-700 rounded-lg text-gray-300 hover:border-gray-500 text-sm transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="btn-gradient px-6 py-2 rounded-lg text-white text-sm font-medium disabled:opacity-50"
          >
            {saving ? "Saving..." : isEdit ? "Save Changes" : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
}
