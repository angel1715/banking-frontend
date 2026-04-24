"use client";

import { useState } from "react";
import API from "@/lib/api";
import Input from "@/components/Input";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
export default function LoginPage() {
  type LoginResponse = {
    token: string;
  };

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await API.post<LoginResponse>("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      toast.success("Login Successfully");
      router.push("/dashboard");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-md w-96">
        <h2 className="text-gray-600 text-2xl font-bold mb-6 text-center">
          Login
        </h2>

        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="mt-4" />

        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full mt-6 bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700"
        >
          Login
        </button>
      </div>
    </div>
  );
}
