'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Header from '@/app/_components/Header';
import Sidebar from '@/app/_components/Sidebar';
import { FaArrowLeft } from "react-icons/fa";
import ImageBox from './_components/Ekskulcard';
import EkskulCard from './_components/Ekscard';
import EkskulChart from './_components/Ekskulchart';
import AnggotaEkskul from './_components/AnggotaEkskul';
import InformasiEkskul from './_components/Informasieks';
import AchievementBox from './_components/Kejuaraan';
import KegiatanEksCard from './_components/EkskulKegiatan';
import KehadiranEkskul from './_components/FormKehadiran';

export default function EkskulDetail() {
  const router = useRouter();
  const { name } = useParams(); // dari URL
  const [ekskulId, setEkskulId] = useState(null);
  const [ekskulName, setEkskulName] = useState('');

    useEffect(() => {
    const fetchEkskul = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/ekskul/by-name/${name}`);
        const data = await res.json();
        setEkskulId(data.id);        // simpan ID
        setEkskulName(data.name);    // simpan nama ekskul asli dari database
      } catch (err) {
        console.error("❌ Gagal ambil ekskul:", err);
      }
    };

    if (name) fetchEkskul();
  }, [name]);


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

<div className="mb-2">
            <KegiatanEksCard />
          </div>

          <div className="mt-4">
            <EkskulCard />
          </div>

          {/* Anggota dan Pengumuman Ekskul dalam satu baris */}
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex-1">
              <AnggotaEkskul />
            </div>
            <div className="flex-1">
              <InformasiEkskul />
            </div>
          </div>

          {/* Statistik dan Prestasi dalam satu baris */}
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex-1">
              <EkskulChart />
            </div>
            <div className="flex-1">
              {ekskulId && <AchievementBox ekskulId={ekskulId} />}
            </div>
          </div>
 <div className="relative w-full flex flex-col items-center mt-4">
  <KehadiranEkskul ekskulId={ekskulId} ekskulName={ekskulName} />
</div>
        </main>
      </div>
    </div>
  );
}
