"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import Sidebar from "@/app/_components/Sidebar";
import Header from "@/app/_components/Header";
import { FaArrowLeft } from "react-icons/fa";
import ListForm from "./_components/ListTour";
import StudentList from "./_components/ListSiswa";


export default function InputTour() {
  const searchParams = useSearchParams();
  const kelas = searchParams.get("kelas") || "Tidak Diketahui";

  return (
    <div className="flex h-screen overflow-hidden">
      <Header className="fixed top-0 left-0 w-full bg-white z-50 shadow-md" />
      <Sidebar />
      
      <main className="flex-1 p-4 bg-gray-200 overflow-y-auto">
        {/* Gunakan flex agar teks dan tombol sejajar */}
        <div className="flex items-center justify-between mt-14 mb-4 max-w-6xl">
          <h1 className="sm:text-3xl text-2xl sm:mr-0 mr-10 text-black font-bold">
            List Ikut Serta Siswa {kelas}
          </h1>
          <button 
            onClick={() => window.history.back()} 
            className="text-gray-700 hover:text-gray-900 sm:mr-auto  mr-10 transition duration-300"
          >
            <FaArrowLeft className="text-2xl " />
          </button>
        </div>
        
        <ListForm/>

        <div className="mt-5">
        <StudentList/> 
        </div>
        </main>
    </div>
  );
}