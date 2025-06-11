"use client";
import React, { useState } from "react";
import Sidebar from "@/app/_components/Sidebar";
import Header from "@/app/_components/Header";
import { FaArrowLeft } from "react-icons/fa";
import AttendanceChart from "./_components/chartbulanan";
import AttendanceMonthTable from "./_components/tabelbulanan";

export default function HalamanRingkasan() {
  // ⬅️ Tambahkan state tanggal global
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div className="flex h-screen">
      {/* Header */}
      <Header className="fixed top-0 left-0 w-full bg-white z-50 shadow-md" />

      {/* Sidebar */}
      <Sidebar />

      {/* Konten Utama */}
      <main className="flex-1 bg-gray-200 p-4 flex flex-col items-center justify-start w-full overflow-y-auto">
        <div className="w-full max-w-6xl sm:mt-14 mt-10 -mb-3 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <h1 className="sm:text-3xl text-2xl text-black font-bold">
            Ringkasan Absensi Bulanan
          </h1>
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition duration-300 mr-auto ml-2"
          >
            <FaArrowLeft className="sm:text-3xl text-1xl" />
          </button>
        </div>

        {/* Kirim selectedDate dan onDateChange ke chart */}
        <AttendanceChart
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
        />

        {/* Kirim selectedDate ke tabel */}
        <AttendanceMonthTable selectedDate={selectedDate} />
      </main>
    </div>
  );
}
