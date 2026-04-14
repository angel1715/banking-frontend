"use client";

import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <div className="flex justify-between items-center p-4 bg-blue-600 text-white">
      <h1 className="font-bold text-lg">Banking App</h1>

      <button
        onClick={logout}
        className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600"
      >
        Logout
      </button>

      <button
        onClick={() => router.push("/transactions")}
        className="bg-white text-blue-600 px-4 py-2 rounded-lg"
      >
        Transactions
      </button>
    </div>
  );
}
