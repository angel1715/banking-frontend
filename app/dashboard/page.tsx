"use client";

import { useEffect, useState } from "react";
import API from "@/lib/api";
import Navbar from "@/components/Navbar";
import ProtectedRoute from "@/components/ProtectedRoute";

type AccountResponse = {
  balance: number;
};

export default function DashboardPage() {
  const [balance, setBalance] = useState<number>(0);

  const fetchAccount = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get<AccountResponse>("/account", {
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

  return (
    <ProtectedRoute>
      <Navbar />

      <div className="p-6">
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <p className="mt-4 text-lg">
          Balance: <span className="font-bold">${balance}</span>
        </p>
      </div>
    </ProtectedRoute>
  );
}
