"use client";

import { useEffect, useState } from "react";
import { adminFetch } from "@/lib/adminApi";
import { ContactMessage } from "@/types";
import AdminNav from "@/components/admin/AdminNav";

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<ContactMessage | null>(null);

  async function fetchMessages() {
    try {
      const data = await adminFetch<ContactMessage[]>("/contactmessages");
      setMessages(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchMessages();

    const interval = setInterval(() => {
      fetchMessages();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  async function handleMarkRead(msg: ContactMessage) {
    if (msg.isRead) return;
    try {
      await adminFetch(`/contactmessages/${msg.id}/read`, {
        method: "PATCH",
        body: JSON.stringify({ ...msg, isRead: true }),
      });
      setMessages((prev) =>
        prev.map((m) => (m.id === msg.id ? { ...m, isRead: true } : m))
      );
      setSelected((prev) =>
        prev?.id === msg.id ? { ...prev, isRead: true } : prev
      );
    } catch (e) {
      console.error(e);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this message?")) return;
    try {
      await adminFetch(`/contactmessages/${id}`, { method: "DELETE" });
      setMessages((prev) => prev.filter((m) => m.id !== id));
      if (selected?.id === id) setSelected(null);
    } catch (e) {
      console.error(e);
    }
  }

  function openMessage(msg: ContactMessage) {
    setSelected(msg);
    handleMarkRead(msg);
  }

  const unreadCount = messages.filter((m) => !m.isRead).length;

  return (
    <div className="min-h-screen bg-[#0b0716] flex flex-col">
      <AdminNav title="Messages" />

      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold">Messages</h1>
            {unreadCount > 0 && (
              <span className="btn-gradient text-white text-xs px-2 py-1 rounded-full font-medium">
                {unreadCount} unread
              </span>
            )}
          </div>
        </div>

        {loading ? (
          <p className="text-gray-400">Loading...</p>
        ) : (
          <div className="flex gap-6 h-[calc(100vh-200px)]">
            {/* Message list */}
            <div className="w-full md:w-2/5 flex flex-col gap-3 overflow-y-auto pr-2">
              {messages.length === 0 && (
                <p className="text-gray-500 text-center py-16">
                  No messages yet.
                </p>
              )}
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  onClick={() => openMessage(msg)}
                  className={`glass-card p-4 cursor-pointer transition-all hover:border-[#a855f7]/40 ${
                    selected?.id === msg.id ? "border-[#a855f7]/60" : ""
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div className="flex items-center gap-2">
                      {!msg.isRead && (
                        <span className="w-2 h-2 rounded-full bg-[#a855f7] shrink-0 mt-1" />
                      )}
                      <span className="text-white font-medium text-sm truncate">
                        {msg.senderName}
                      </span>
                    </div>
                    <span className="text-gray-500 text-xs shrink-0">
                      {new Date(msg.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-400 text-xs truncate ml-4">
                    {msg.subject}
                  </p>
                  <p className="text-gray-500 text-xs truncate ml-4 mt-0.5">
                    {msg.body}
                  </p>
                </div>
              ))}
            </div>

            {/* Message detail */}
            <div className="hidden md:flex flex-1 flex-col">
              {selected ? (
                <div className="glass-card p-6 flex flex-col gap-4 h-full overflow-y-auto">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-lg font-semibold text-white">
                        {selected.subject}
                      </h2>
                      <p className="text-gray-400 text-sm mt-1">
                        From:{" "}
                        <span className="text-white">
                          {selected.senderName}
                        </span>
                        {" · "}
                        <a
                          href={`mailto:${selected.senderEmail}`}
                          className="text-[#a855f7] hover:underline"
                        >
                          {selected.senderEmail}
                        </a>
                      </p>
                      <p className="text-gray-500 text-xs mt-1">
                        {new Date(selected.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDelete(selected.id)}
                      className="text-sm px-4 py-2 border border-gray-700 rounded-lg text-gray-300 hover:border-red-500 hover:text-red-400 transition-colors shrink-0"
                    >
                      Delete
                    </button>
                  </div>

                  <div className="border-t border-white/5 pt-4">
                    <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                      {selected.body}
                    </p>
                  </div>

                  <div className="mt-auto pt-4 border-t border-white/5">
                    <a
                      href={`mailto:${selected.senderEmail}?subject=Re: ${selected.subject}`}
                      className="btn-gradient inline-flex items-center gap-2 px-6 py-2 rounded-lg text-white text-sm font-medium"
                    >
                      Reply via Email ↗
                    </a>
                  </div>
                </div>
              ) : (
                <div className="glass-card flex-1 flex items-center justify-center h-full">
                  <p className="text-gray-500">Select a message to read</p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
