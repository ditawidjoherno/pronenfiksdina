"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "@/app/_components/Sidebar";
import Header from "@/app/_components/Header";
import WelcomeBox from "./_components/WelcomeBox";
import BoxWelcome from "./siswa/_components/BoxWelcome";
import BoxTiga from "./_components/BoxTiga";
import RecentActivity from "./_components/AktivitasTerkini";
import InformasiListGuru from "./_components/Informasidata";
import ListInformsiswa from "./siswa/_components/InformasiUmum";
import HarianAbsensi from "./siswa/_components/SekilasAbsen";
import EventCalendarGuru from "./_components/Kalender";
import EventCalendar from "./siswa/_components/KalenderSiswa";
import DaftarEkskul from "./siswa/_components/SekilasEkskul";
import WelcomeBoxortu from "./_components/OrtuBox";
import dynamic from "next/dynamic";

// Load grafik kehadiran hanya di client
const KehadiranChartGuru = dynamic(() => import("./_components/KehadiranChart"), {
  ssr: false,
});

export default function Beranda() {
  const [role, setRole] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData?.role) {
      setRole(userData.role);
    }
  }, []);

  return (
    <div className="flex h-screen">
      <Header className="fixed top-0 left-0 w-full bg-white z-50 shadow-md" />
      <Sidebar />

      <main className="flex-1 p-4 bg-gray-200 overflow-y-auto">
        <h1 className="sm:text-3xl text-2xl text-black font-bold w-full max-w-6xl sm:mt-14 mt-10 sm:-mb-4 -mb-8">
          Dashboard
        </h1>

        {role === "guru" ? (
          <>
            {/* Dashboard GURU */}
            <WelcomeBox />
            <BoxTiga />
            <div className="flex flex-col md:flex-row max-w-6xl mx-auto gap-4 mt-4">
              <div className="w-full md:w-1/2"><InformasiListGuru /></div>
              <div className="w-full md:w-1/2"><EventCalendarGuru /></div>
            </div>
          </>
        ) : role === "siswa" ? (
          <>
            {/* Dashboard SISWA */}
            <BoxWelcome />
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div><ListInformsiswa /></div>
              <div className="mt-4 md:mt-2"><HarianAbsensi /></div>
            </div>

            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div><DaftarEkskul /></div>
              <div className="md:-mt-4"><EventCalendar /></div>
            </div>
          </>
        ) : role === "orangtua" ? (
          <>
            {/* Dashboard ORANG TUA */}
            <WelcomeBoxortu />
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <HarianAbsensi/>
              <DaftarEkskul/>
            </div>
          </>
        ) : role === "admin" ? (
          <>
            {/* Dashboard ADMIN */}
            <WelcomeBox />
            <BoxTiga />
            <div className="w-full max-w-6xl mx-auto">
              <RecentActivity />
            </div>
            <div className="flex flex-col md:flex-row max-w-6xl mx-auto gap-4 mt-4">
              <div className="w-full md:w-1/2"><InformasiListGuru /></div>
              <div className="w-full md:w-1/2"><EventCalendarGuru /></div>
            </div>
            <KehadiranChartGuru />
          </>
        ) : (
          <p className="text-center mt-10 text-red-500">Memuat data pengguna...</p>
        )}
      </main>
    </div>
  );
}
