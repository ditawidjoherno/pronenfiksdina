"use client";
import React from "react";
import { useRouter } from "next/navigation"; // Import useRouter
import Sidebar from "@/app/_components/Sidebar";
import Header from "@/app/_components/Header";
import Carousel from "./_components/Karauselmenu";
import { FaArrowLeft } from "react-icons/fa";
import EkskulCard from "./_components/Ekscard";
import Calendar from "./_components/memokalender";


export default function EkskulMenu() {
  const router = useRouter(); // Inisialisasi router

  return (
    <div className="flex h-screen">
      {/* Header */}
      <Header className="fixed top-0 left-0 w-full bg-white z-50 shadow-md" />

      {/* Sidebar */}
      <Sidebar />

      {/* Konten Utama */}
      <main className="flex-1 p-4 bg-gray-200 overflow-y-auto">
        <div className="flex items-center justify-between w-full max-w-6xl mt-14 -mb-4">
          <h1 className="text-3xl text-black font-bold">Ekstra Kulikuler</h1>

          {/* Tombol Back di Sebelah Kanan */}
          <FaArrowLeft
            className="text-3xl text-gray-700 hover:text-gray-900 mr-auto ml-2 transition duration-300"
            onClick={() => router.back()} // Fungsi kembali
          />
        </div>
        <div className="p-6 bg-gray-50 flex-1 mt-10 max-w-7xl h-[485px] rounded-md overflow-auto">
        <h2 className=" flex justify-center text-2xl text-black font-bold">Maengket</h2>
        <Carousel />

        <EkskulCard/>

    
        </div>
      </main>
    </div>
  );
}
