"use client";
import React from "react";
import Sidebar from "@/app/_components/Sidebar";
import Header from "@/app/_components/Header";
import KegiatanSummary from "./_components/kegiatansummary";
import ActivityTable from "./_components/tabelaktivitas";



export default function Aktivitas() {
  return (
    <div className="flex h-screen overflow-hidden"> {/* Background diatur di sini */}
      <Header />

      <Sidebar />

      {/* Tambahkan area konten utama jika diperlukan */}
      <main className="flex-1 p-4 bg-gray-200 overflow-y-auto">
        <h1 className="text-3xl text-black font-bold w-full max-w-6xl mt-14 -mb-4">Aktivitas</h1>

        <KegiatanSummary/>

        <ActivityTable/>

      </main>
    </div>
  );
}
