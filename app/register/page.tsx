"use client";

import { useState } from "react";
import API from "@/lib/api";
import Input from "@/components/Input";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
export default function RegisterPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      await API.post("/auth/register", {
        email,
        password,
      });
      toast.success("Registered successfully")
      router.push("/login");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-md w-96">
        <h2 className="text-gray-600 text-2xl font-bold mb-6 text-center">Register</h2>

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
          onClick={handleRegister}
          className="w-full mt-6 bg-green-600 text-white p-3 rounded-xl hover:bg-green-700"
        >
          Register
        </button>
      </div>
    </div>
  );
}
