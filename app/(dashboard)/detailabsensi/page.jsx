"use client"; // ✅ Tambahkan ini

import { useSearchParams } from "next/navigation";
import Sidebar from "@/app/_components/Sidebar";
import Header from "@/app/_components/Header";
import { FaArrowLeft } from "react-icons/fa";
import StudentCard from "./_components/DetailSiswa";
import AttendanceTable from "./_components/RiwayatBulanan";

const DetailAbsensi = () => {
  const searchParams = useSearchParams(); // ✅ Ambil query dari URL
    return (
      
      <div className="flex h-screen">
        {/* Header */}
        <Header className="fixed top-0 left-0 w-full bg-white z-50 shadow-md" />
  
        {/* Sidebar */}
        <Sidebar />
  
  
        {/* Konten Utama */}
        <main className="flex-1 bg-gray-200 p-4 flex flex-col items-center justify-start w-full overflow-y-auto ">
        <h1 className="sm:text-3xl text-2xl text-black font-bold w-full max-w-6xl sm:mt-14 mt-10 -mb-3 flex items-center justify-between">
    Detail Kehadiran Siswa
    <button 
      onClick={() => window.history.back()} 
      className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition duration-300 mr-auto ml-2"
    >
      <FaArrowLeft className="text-1xl " />
    </button>
  </h1>

  <StudentCard/>

  <AttendanceTable/>
        </main>
      </div>
    );
  }
  
export default DetailAbsensi;
