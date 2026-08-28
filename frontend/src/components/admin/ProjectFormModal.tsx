"use client";

import { useState } from "react";
import { adminFetch } from "@/lib/adminApi";
import { Project } from "@/types";

interface Props {
  project: Project | null;
  onSaved: (p: Project) => void;
  onClose: () => void;
}

const EMPTY: Omit<Project, "id" | "createdAt" | "updatedAt"> = {
  title: "",
  description: "",
  techStack: [],
  liveUrl: "",
  githubUrl: "",
  thumbnailUrl: "",
  isFeatured: false,
  sortOrder: 0,
  highlights: [],
};

export default function ProjectFormModal({ project, onSaved, onClose }: Props) {
  const isEdit = !!project;

  // State quản lý các field cơ bản
  const [form, setForm] = useState(
    project
      ? {
          id: project.id,
          title: project.title,
          description: project.description,
          liveUrl: project.liveUrl ?? "",
          githubUrl: project.githubUrl ?? "",
          thumbnailUrl: project.thumbnailUrl ?? "",
          isFeatured: project.isFeatured,
          sortOrder: project.sortOrder,
        }
      : EMPTY
  );

  // Tách riêng State dạng Text cho các ô nhập chuỗi có dấu phẩy
  const [techStackText, setTechStackText] = useState(
    project?.techStack?.join(", ") ?? ""
  );
  const [highlightsText, setHighlightsText] = useState(
    project?.highlights?.join(", ") ?? ""
  );

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSave() {
    setSaving(true);
    setError("");
    try {
      // Ép kiểu chuỗi thành mảng ngay trước khi gửi API
      const parsedTechStack = techStackText
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

      const parsedHighlights = highlightsText
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

      const body = {
        ...form,
        techStack: parsedTechStack,
        highlights: parsedHighlights,
        liveUrl: form.liveUrl || null,
        githubUrl: form.githubUrl || null,
        thumbnailUrl: form.thumbnailUrl || null,
      };

      const saved = isEdit
        ? await adminFetch<Project>(`/projects/${project?.id}`, {
            method: "PUT",
            body: JSON.stringify(body),
          })
        : await adminFetch<Project>("/projects", {
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
      <div className="glass-card w-full max-w-2xl p-8 space-y-5 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">
            {isEdit ? "Edit Project" : "New Project"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl leading-none"
          >
            &times;
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className={labelClass}>Title *</label>
            <input
              className={inputClass}
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
          </div>

          <div className="md:col-span-2">
            <label className={labelClass}>Description *</label>
            <textarea
              rows={3}
              className={inputClass}
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
          </div>

          {/* Sửa lại input Tech Stack để dùng state Text */}
          <div className="md:col-span-2">
            <label className={labelClass}>Tech Stack (comma-separated)</label>
            <input
              className={inputClass}
              value={techStackText}
              onChange={(e) => setTechStackText(e.target.value)}
            />
          </div>

          {/* Sửa lại input Highlights để dùng state Text */}
          <div className="md:col-span-2">
            <label className={labelClass}>Highlights (comma-separated)</label>
            <input
              className={inputClass}
              value={highlightsText}
              onChange={(e) => setHighlightsText(e.target.value)}
            />
          </div>

          <div>
            <label className={labelClass}>GitHub URL</label>
            <input
              className={inputClass}
              value={form.githubUrl}
              onChange={(e) => setForm({ ...form, githubUrl: e.target.value })}
            />
          </div>

          <div>
            <label className={labelClass}>Live URL</label>
            <input
              className={inputClass}
              value={form.liveUrl}
              onChange={(e) => setForm({ ...form, liveUrl: e.target.value })}
            />
          </div>

          <div>
            <label className={labelClass}>Thumbnail URL</label>
            <input
              className={inputClass}
              value={form.thumbnailUrl}
              onChange={(e) =>
                setForm({ ...form, thumbnailUrl: e.target.value })
              }
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

          <div className="md:col-span-2 flex items-center gap-3">
            <input
              type="checkbox"
              id="featured"
              checked={form.isFeatured}
              onChange={(e) =>
                setForm({ ...form, isFeatured: e.target.checked })
              }
              className="w-4 h-4 accent-[#a855f7]"
            />
            <label htmlFor="featured" className="text-sm text-gray-300">
              Featured Project
            </label>
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
