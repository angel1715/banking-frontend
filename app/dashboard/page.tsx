"use client";

import { useEffect, useState } from "react";
import API from "@/lib/api";
import Navbar from "@/components/Navbar";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function Dashboard() {
  const [balance, setBalance] = useState<number | null>(null);
  const [action, setAction] = useState<
    "deposit" | "withdraw" | "transfer" | null
  >(null);
  const [amount, setAmount] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchAccount = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/account", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBalance(res.data.balance);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAccount();
  }, []);

  const handleAction = async () => {
    try {
      const token = localStorage.getItem("token");

      if (action === "deposit") {
        await API.post(
          "/account/deposit",
          { amount: Number(amount) },
          { headers: { Authorization: `Bearer ${token}` } },
        );
      }

      if (action === "withdraw") {
        await API.post(
          "/account/withdraw",
          { amount: Number(amount) },
          { headers: { Authorization: `Bearer ${token}` } },
        );
      }

      if (action === "transfer") {
        await API.post(
          "/account/transfer",
          { email, amount: Number(amount) },
          { headers: { Authorization: `Bearer ${token}` } },
        );
      }

      alert("Success ✅");

      setAmount("");
      setEmail("");
      setAction(null);

      fetchAccount(); // 🔥 refrescar balance
    } catch (error: any) {
      alert(error.response?.data?.message || "Error ❌");
    }
  };

  return (
    <ProtectedRoute>
      <Navbar />

      <div className="p-6 bg-gray-100 min-h-screen">
        <h2 className="text-gray-600 text-2xl font-bold mb-6">Dashboard</h2>

        {/* 💰 Balance Card */}
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h3 className="text-gray-500">Current Balance</h3>
          <p className="text-3xl font-bold text-green-600 mt-2">
            ${balance !== null ? balance : "Loading..."}
          </p>
        </div>

        {/* ⚡ Actions */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          <button
            onClick={() => setAction("deposit")}
            className="bg-blue-600 text-white p-4 rounded-xl"
          >
            Deposit
          </button>

          <button
            onClick={() => setAction("withdraw")}
            className="bg-yellow-500 text-white p-4 rounded-xl"
          >
            Withdraw
          </button>

          <button
            onClick={() => setAction("transfer")}
            className="bg-purple-600 text-white p-4 rounded-xl"
          >
            Transfer
          </button>

          {action && (
            <div className="bg-white p-6 rounded-2xl shadow-md mt-6">
              <h3 className="text-gray-600 text-lg font-bold mb-4 capitalize">
                {action}
              </h3>

              {action === "transfer" && (
                <input
                  type="email"
                  placeholder="Receiver email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="place-holder-gray-600 text-gray-600 w-full p-3 border rounded-xl mb-4"
                />
              )}

              <input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="place-holder-gray-600 text-gray-600 w-full p-3 border rounded-xl mb-4"
              />

              <button
                onClick={handleAction}
                className="w-full bg-green-600 text-white p-3 rounded-xl"
              >
                Confirm
              </button>
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
