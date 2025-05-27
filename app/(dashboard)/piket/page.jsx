"use client";
import { useState } from "react";
import React from "react";
import Sidebar from "@/app/_components/Sidebar";
import Header from "@/app/_components/Header";
import ButtonJadwalPiket from "./_components/TombolJadwal";
import PiketCard from "./_components/PiketCard";
import ButtonTambahKelas from "./_components/TambahKelas";
import ClassGrid from "./_components/Kelas";

export default function Piket() {
  // ✅ useState & function harus di sini
  const [refreshKey, setRefreshKey] = useState(0);

  const handleJadwalTersimpan = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Header className="fixed top-0 left-0 w-full bg-white z-50 shadow-md" />
      <Sidebar />

      <main className="flex-1 p-4 bg-gray-200 overflow-y-auto">
        <h1 className="text-3xl text-black font-bold w-full max-w-6xl mt-14 -mb-4">
          Piket Harian Siswa
        </h1>

        <div className="flex justify-center mt-5">
          <PiketCard key={refreshKey} />
        </div>

        <div className="bg-white p-4 rounded-2xl shadow-md mt-5 min-h-fit">
          <div className="flex gap-4 items-center ml-4">
            <ButtonJadwalPiket onSimpan={handleJadwalTersimpan} />
          </div>
          <ClassGrid />
        </div>
      </main>
    </div>
  );
}
