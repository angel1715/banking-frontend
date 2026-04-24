"use client";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
export default function Navbar() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logout Successfully");
    router.push("/login");
  };

  return (
    <div className="bg-black text-white p-4 flex justify-between">
      <h1 className="font-bold">Banking App</h1>

      <div className="flex gap-4">
        <button onClick={() => router.push("/dashboard")}>Dashboard</button>
        <button onClick={() => router.push("/transactions")}>
          Transactions
        </button>
        <button onClick={handleLogout} className="text-red-400">
          Logout
        </button>
      </div>
    </div>
  );
}
