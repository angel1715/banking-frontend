"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomePage() {
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("token");
    
    if (token) {
      router.push("/dashboard");
    }
  }, []);
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
      <div className="bg-white p-10 rounded-3xl shadow-xl text-center max-w-md w-full">
        {/* 🔥 Título */}
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Banking App 💳
        </h1>

        {/* 🔥 Subtítulo */}
        <p className="text-gray-500 mb-8">
          Manage your money, transfer funds, and track your transactions easily.
        </p>

        {/* 🔥 Botones */}
        <div className="flex flex-col gap-4">
          <button
            onClick={() => router.push("/login")}
            className="bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 transition"
          >
            Login
          </button>

          <button
            onClick={() => router.push("/register")}
            className="bg-green-600 text-white p-3 rounded-xl hover:bg-green-700 transition"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}
