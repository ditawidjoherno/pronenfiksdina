"use client";
import React from "react";
import Sidebar from "@/app/_components/Sidebar";
import Header from "@/app/_components/Header";
import AttendanceStats from "./_components/kehadiranstatis";
import ClassCards from "./_components/Allkelas";

export default function Aktivitas() {
  return (
    <div className="flex h-screen overflow-hidden"> {/* Background diatur di sini */}
      <Header className="fixed top-0 left-0 w-full bg-white z-50 shadow-md" />

      <Sidebar />

      {/* Tambahkan area konten utama jika diperlukan */}
      <main className="flex-1 p-4 bg-gray-200 overflow-y-auto ">
        <h1 className="text-3xl text-black font-bold w-full max-w-6xl mb-4 mt-14">Absensi Apel Pagi</h1>

        <div className="bg-white py-3 rounded-lg shadow-md mt-2">
          <AttendanceStats/>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mt-6">
          <ClassCards/>
        </div>
      </main>
    </div>
  );
}
