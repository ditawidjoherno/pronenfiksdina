'use client';
import React from 'react';
import Sidebar from '@/app/_components/Sidebar';
import Header from '@/app/_components/Header';
import { useParams } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa';
import StudentParticipation from '../../studytourdetail/_components/DetailSiswa';
import UploadGallery from '../../studytourdetail/_components/GaleriFoto';

export default function EventDetail() {
  const params = useParams();
  const rawParam = decodeURIComponent(params.event || '');

  // Pecah berdasarkan tanda "-", misalnya "Study-Tour-5"
  // ambil bagian terakhir
const parts = rawParam.split('-');
const studyTourId = parseInt(parts[parts.length - 1]);
const titlePart = parts.slice(0, parts.length - 1).join(' ');



  if (isNaN(studyTourId)) {
    return <p className="text-red-600 text-center font-bold mt-10">ID Study Tour tidak valid</p>;
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Header className="fixed top-0 left-0 w-full bg-white z-50 shadow-md" />
      <Sidebar />

      <main className="flex-1 p-4 bg-gray-200 overflow-y-auto">
        <div className="flex items-center justify-between mt-14 mb-4 max-w-6xl">
          <h1 className="sm:text-3xl text-xl text-black font-bold">
            Detail Kegiatan Karya Wisata
          </h1>
          <button
            onClick={() => window.history.back()}
            className="text-gray-700 hover:text-gray-900 sm:mr-auto mr-10 ml-2 transition duration-300"
          >
            <FaArrowLeft className="text-2xl" />
          </button>
        </div>

        <StudentParticipation studyTourId={studyTourId} />
        <div className="mt-5">
          <UploadGallery studyTourId={studyTourId} />
        </div>
      </main>
    </div>
  );
}
