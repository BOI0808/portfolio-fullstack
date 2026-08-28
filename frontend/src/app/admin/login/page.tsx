"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { setTokenCookie } from "@/lib/auth";

export default function AdminLoginPage() {
  const router = useRouter();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      if (!res.ok) {
        setError("Invalid username or password.");
        return;
      }

      const data = await res.json();
      setTokenCookie(data.token);
      router.push("/admin");
    } catch {
      setError("Cannot connect to server.");
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "w-full bg-[#0b0716] border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:border-[#a855f7] focus:ring-1 focus:ring-[#a855f7] transition-colors";

  return (
    <div className="min-h-screen bg-[#0b0716] flex items-center justify-center px-4">
      <div className="glass-card w-full max-w-md p-8 space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white">
            Khôi<span className="text-[#a855f7]">&lt;/&gt;</span>
          </h1>
          <p className="text-gray-400 text-sm mt-2">Admin Dashboard</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Username
            </label>
            <input
              type="text"
              className={inputClass}
              value={credentials.username}
              onChange={(e) =>
                setCredentials({ ...credentials, username: e.target.value })
              }
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
            <input
              type="password"
              className={inputClass}
              value={credentials.password}
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            />
          </div>
        </div>

        {error && <p className="text-red-400 text-sm text-center">{error}</p>}

        <button
          onClick={handleLogin}
          disabled={loading}
          className="btn-gradient w-full py-3 rounded-xl font-medium text-white disabled:opacity-50"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </div>
    </div>
  );
}
