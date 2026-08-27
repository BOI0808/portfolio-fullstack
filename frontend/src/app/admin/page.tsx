"use client";

import { useRouter } from "next/navigation";
import { removeTokenCookie } from "@/lib/auth";

export default function AdminDashboard() {
  const router = useRouter();

  function handleLogout() {
    removeTokenCookie();
    router.push("/admin/login");
  }

  return (
    <div className="min-h-screen bg-[#0b0716] flex flex-col">
      {/* Admin Navbar */}
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

      {/* Dashboard content */}
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-8">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {["Projects", "Skills", "Messages"].map((item) => (
            <div key={item} className="glass-card p-6">
              <h2 className="text-lg font-semibold text-white mb-1">{item}</h2>
              <p className="text-gray-400 text-sm">
                Manage {item.toLowerCase()}
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
