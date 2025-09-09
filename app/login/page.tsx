"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function page() {
  const router = useRouter();
  const [error, setError] = useState("");
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const username = formData.get("username");
    const password = formData.get("password");
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (!response.ok) {
        throw new Error((await response.json()).message);
      }
      const data = await response.json();
      if (data?.user?.role === "admin") {
        router.push("/admin");
      } else if (data?.user?.role === "employee") {
        router.push("/checkpoint");
      }
    } catch (error) {
      setError((error as Error).message);
    }
  };
  return (
    <main className="bg-linear-to-r from-slate-500 to-slate-900  h-screen flex justify-center items-center">
      <div className="max-w-md mx-auto mt-10 p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg">
        <h2 className="text-3xl font-light text-center text-white mb-4 tracking-wider">
          Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex justify-center items-center relative">
            <img
              src="/user.svg"
              alt="Logo"
              className="w-6 h-6 mx-auto mb-4 absolute top-1/4 left-3"
            />
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="w-full p-3 pl-12 rounded-lg bg-white/20 border border-white/30 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-(--secondary)"
            />
          </div>
          <div className="flex justify-center items-center relative">
            <img
              src="/lock.svg"
              alt="Logo"
              className="w-6 h-6 mx-auto mb-4 absolute top-1/4 left-3"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full p-3 pl-12 rounded-lg bg-white/20 border border-white/30 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-(--secondary)"
            />
          </div>
          <button
            type="submit"
            className="w-full cursor-pointer py-3 rounded-lg bg-(--secondary) hover:bg-(--primary) text-white font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-(--primary)"
          >
            Login
          </button>
          {error && (
            <p className="text-red-500 text-center  tracking-wider">{error}</p>
          )}
        </form>
      </div>
    </main>
  );
}
