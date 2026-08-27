"use client";

import { useRouter } from "next/navigation";
import { removeTokenCookie } from "@/lib/auth";
import Link from "next/link";

const MENU_ITEMS = [
  {
    href: "/admin/projects",
    label: "Projects",
    desc: "Manage portfolio projects",
    icon: "📁",
  },
  {
    href: "/admin/skills",
    label: "Skills",
    desc: "Manage tech skills",
    icon: "⚡",
  },
  {
    href: "/admin/messages",
    label: "Messages",
    desc: "View contact messages",
    icon: "✉️",
  },
];

export default function AdminDashboard() {
  const router = useRouter();

  function handleLogout() {
    removeTokenCookie();
    router.push("/admin/login");
  }

  return (
    <div className="min-h-screen bg-[#0b0716] flex flex-col">
      <header className="border-b border-white/5 px-8 py-4 flex justify-between items-center">
        <div className="text-xl font-bold text-white">
          Khôi<span className="text-[#a855f7]">&lt;/&gt;</span>
          <span className="text-gray-400 text-sm font-normal ml-3">Admin</span>
        </div>
        <button
          onClick={handleLogout}
          className="text-sm text-gray-400 hover:text-white transition-colors border border-gray-700 px-4 py-2 rounded-lg hover:border-gray-500"
        >
          Logout
        </button>
      </header>

      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-8">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MENU_ITEMS.map((item) => (
            <Link key={item.href} href={item.href}>
              <div className="glass-card p-6 hover:border-[#a855f7]/40 hover:bg-white/5 transition-all cursor-pointer">
                <div className="text-3xl mb-3">{item.icon}</div>
                <h2 className="text-lg font-semibold text-white mb-1">
                  {item.label}
                </h2>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
