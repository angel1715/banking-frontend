"use client";

import { useEffect, useState } from "react";
import API from "../../lib/api";
import Navbar from "../../components/Navbar";
import ProtectedRoute from "../../components/ProtectedRoute";
import { getUserFromToken } from "../../lib/getUser";

type Transaction = {
  _id: string;
  from: { _id: string; email: string };
  to: { _id: string; email: string };
  amount: number;
  createdAt: string;
};

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  // 🔥 obtener usuario correctamente
  useEffect(() => {
    const user = getUserFromToken();
    setUserId(user?.id || null);
  }, []);

  const fetchTransactions = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/transactions", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTransactions(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <ProtectedRoute>
      <Navbar />

      <div className="p-6 bg-gray-100 min-h-screen">
        <h2 className="text-gray-500 text-2xl font-bold mb-6">Transactions</h2>

        {/* 🔥 Loading */}
        {loading && <p>Loading transactions...</p>}

        {/* 🔥 Lista */}
        <div className="space-y-4">
          {transactions.map((tx) => {
            const isSent = tx.from._id === userId;

            return (
              <div
                key={tx._id}
                className="bg-white p-4 rounded-xl shadow-md flex justify-between items-center"
              >
                <div>
                  <p className="text-sm text-gray-500">
                    {isSent ? "Sent to" : "Received from"}
                  </p>

                  <p className="font-bold text-gray-700">
                    {isSent ? tx.to.email : tx.from.email}
                  </p>

                  <p className="text-xs text-gray-400">
                    {new Date(tx.createdAt).toLocaleString()}
                  </p>
                </div>

                <div
                  className={`text-lg font-bold ${
                    isSent ? "text-red-500" : "text-green-600"
                  }`}
                >
                  {isSent ? "-" : "+"}${tx.amount}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </ProtectedRoute>
  );
}
