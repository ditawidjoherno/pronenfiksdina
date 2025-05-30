"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/app/_components/Sidebar";
import Header from "@/app/_components/Header";
import EkskulList from "./_components/Ekskulpage";

export default function Ekskul() {
  const [isAllowed, setIsAllowed] = useState(null); // null: loading
  const router = useRouter();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.role === "siswa") {
      setIsAllowed(true);
    } else {
      setIsAllowed(false);
      router.push("/unauthorized"); // atau "/beranda"
    }
  }, []);

  if (isAllowed === null) {
    return <p className="text-center p-4">Memuat halaman ekskul...</p>;
  }

  if (!isAllowed) {
    return null;
  }

  return (
    <div className="flex h-screen">
      {/* Header */}
      <Header className="fixed top-0 left-0 w-full bg-white z-50 shadow-md" />

      {/* Sidebar */}
      <Sidebar />

      {/* Konten Utama */}
      <main className="flex-1 p-4 bg-gray-200 overflow-y-auto">
        <h1 className="text-3xl text-black font-bold w-full max-w-6xl mt-14 -mb-4">
          Ekstra Kulikuler
        </h1>

        <EkskulList />
      </main>
    </div>
  );
}
