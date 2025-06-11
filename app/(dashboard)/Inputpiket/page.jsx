"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import Sidebar from "@/app/_components/Sidebar";
import Header from "@/app/_components/Header";
import { FaArrowLeft } from "react-icons/fa";
import AttendanceForm from "./_components/AbsensiPiket";
import AttendanceChart from "./_components/DiagramBulan";
import StudentList from "./_components/ListSIswa";

export default function InputPiket() {
  const searchParams = useSearchParams();
  const kelas = searchParams.get("kelas") || "Tidak Diketahui";

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar & Header */}
      <Header className="fixed top-0 left-0 w-full bg-white z-50 shadow-md" />
      <Sidebar />

      {/* Konten utama */}
      <main className="flex-1 pt-20 pb-10 px-4 overflow-y-auto bg-gray-200">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Judul & Tombol Kembali */}
         <div className="flex items-center gap-3">
  <h1 className="sm:text-3xl text-2xl text-black font-bold">
    Input Kehadiran Piket {kelas}
  </h1>
  <button
    onClick={() => window.history.back()}
    className="text-gray-700 hover:text-gray-900 transition duration-300"
  >
    <FaArrowLeft className="text-2xl" />
  </button>
</div>
          {/* Form Absensi */}
          <AttendanceForm />

          {/* Daftar Siswa */}
          <StudentList />

          {/* Grafik Kontribusi */}
          <div className="bg-white rounded-2xl shadow p-4">
            <AttendanceChart />
          </div>
        </div>
      </main>
    </div>
  );
}
