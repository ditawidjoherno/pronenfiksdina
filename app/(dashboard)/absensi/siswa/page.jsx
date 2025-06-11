"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/app/_components/Sidebar";
import Header from "@/app/_components/Header";
import AbsensiForm from "./_components/AbsensiForm";
import AbsensiAlert from "./_components/AllertBox";
import HalamanAbsensi from "./_components/HalamanAbsensi"; // ✅ Import ini

export default function AbsensiSiswaPage() {
  const router = useRouter();
  const [isAllowed, setIsAllowed] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));

    if (userData?.role === "siswa") {
      setIsAllowed(true);
    } else {
      setIsAllowed(false);
      router.push("/unauthorized");
    }
  }, []);

  if (isAllowed === null) {
    return <p className="text-center p-4">Memuat halaman absensi...</p>;
  }

  if (!isAllowed) {
    return null;
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Header className="fixed top-0 left-0 w-full bg-white z-50 shadow-md" />
      <Sidebar />

      <main className="flex-1 p-4 bg-gray-200 overflow-y-auto">
        <h1 className="text-3xl font-bold mt-14 mb-6 text-black">Absensi Apel Pagi</h1>

        <div className="mb-4">
          <HalamanAbsensi /> {/* ✅ Komponen sinkron */}
        </div>

        <div className="mb-4">
          <AbsensiAlert />
        </div>

        <div>
          <AbsensiForm />
        </div>
      </main>
    </div>
  );
}
