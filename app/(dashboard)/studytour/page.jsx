"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "@/app/_components/Sidebar";
import Header from "@/app/_components/Header";
import TourCard from "./_components/TourCard"; // Untuk admin/guru
import TourCardSiswa from "../studytoursiswa/_components/InfoStudyTour";
import ListFormSiswa from "../studytoursiswa/_components/FormSiswaTour";
import StudyTourCards from "../studytoursiswa/_components/TourHistorySiswa"; // ✅ Riwayat untuk siswa
import ClassGrid from "./_components/Kelas";

export default function studytour() {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserRole = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await fetch("http://localhost:8000/api/user", {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });
        const result = await res.json();
        setRole(result.user?.role || null);
      } catch (err) {
        console.error("Gagal mengambil role:", err);
      } finally {
        setLoading(false);
      }
    };

    getUserRole();
  }, []);

  if (loading) return <div className="p-6">Memuat...</div>;

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Header */}
      <Header className="fixed top-0 left-0 w-full bg-white z-50 shadow-md" />

      {/* Sidebar */}
      <Sidebar />

      {/* Konten Utama */}
      <main className="flex-1 p-4 bg-gray-200 overflow-y-auto">
        <h1 className="text-3xl text-black font-bold w-full max-w-6xl mt-14 -mb-4">
          Perjalanan Karya Wisata 
        </h1>

        <div className="flex justify-center mt-5">
          {role === "siswa" ? <TourCardSiswa /> : <TourCard />}
        </div>

        {/* Jika siswa, tampilkan form + riwayat study tour */}
        {role === "siswa" && (
          <>
            <div className="mt-5">
              <ListFormSiswa />
            </div>
            <div className="mt-5">
              <StudyTourCards />
            </div>
          </>
        )}

        {/* Jika bukan siswa, tampilkan daftar kelas */}
        {role !== "siswa" && (
          <div className="bg-white p-4 rounded-2xl shadow-md mt-5 min-h-fit">
            <div className="flex gap-4 items-center ml-4"></div>
            <ClassGrid />
          </div>
        )}
      </main>
    </div>
  );
}
