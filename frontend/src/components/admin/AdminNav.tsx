"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { removeTokenCookie } from "@/lib/auth";

export default function AdminNav({ title }: { title: string }) {
  const router = useRouter();

  function handleLogout() {
    removeTokenCookie();
    router.push("/admin/login");
  }

  return (
    <header className="border-b border-white/5 px-8 py-4 flex justify-between items-center">
      <div className="flex items-center gap-6">
        <Link href="/admin" className="text-xl font-bold text-white">
          Khôi<span className="text-[#a855f7]">&lt;/&gt;</span>
          <span className="text-gray-400 text-sm font-normal ml-3">Admin</span>
        </Link>
        <span className="text-gray-600">/</span>
        <span className="text-gray-300 text-sm">{title}</span>
      </div>
      <button
        onClick={handleLogout}
        className="text-sm text-gray-400 hover:text-white transition-colors border border-gray-700 px-4 py-2 rounded-lg hover:border-gray-500"
      >
        Logout
      </button>
    </header>
  );
}
