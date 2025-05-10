'use client';

import { useParams, useRouter } from 'next/navigation';
import Header from '@/app/_components/Header';
import Sidebar from '@/app/_components/Sidebar';
import { FaArrowLeft } from "react-icons/fa";
import ImageBox from './_components/Ekskulcard';
import EkskulCard from './_components/Ekscard';
import EkskulChart from './_components/Ekskulchart';
import AnggotaEkskul from './_components/AnggotaEkskul';
import InformasiEkskul from './_components/Informasieks';
import AchievementBox from './_components/Kejuaraan';


export default function EkskulDetail() {
  const { name } = useParams();
  const router = useRouter();

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <Header className="fixed top-0 left-0 w-full bg-white z-50 shadow-md" />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar />

        {/* Konten Utama */}
        <main className="flex-1 p-4 bg-gray-200 overflow-y-auto">
          <div className="flex items-center justify-between w-full max-w-6xl mt-14 -mb-4">
            <h1 className="text-3xl text-black font-bold">Ekstra Kulikuler</h1>

            {/* Tombol Back di Sebelah Kanan */}
            <FaArrowLeft
              className="text-3xl text-gray-700 hover:text-gray-900 mr-auto ml-2 transition duration-300"
              onClick={() => router.back()}
            />
          </div>

          <div className="p-6 mt-2 max-w-7xl rounded-2xl min-h-[400px] flex flex-col items-center">
            <div className="relative w-full flex flex-col items-center">
              <ImageBox />
            </div>
          </div>

          <div className="mt-2">
            <EkskulCard />
          </div>

          {/* Anggota dan Pengumuman Ekskul dalam satu baris */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex-1">
              <AnggotaEkskul />
            </div>
            <div className="flex-1">
              <InformasiEkskul />
            </div>
          </div>

          {/* Statistik dan Prestasi dalam satu baris */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex-1">
              <EkskulChart />
            </div>
            <div className="flex-1">
              <AchievementBox />
            </div>
          </div>
          
        </main>
      </div>
    </div>
  );
}
