"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "@/app/_components/Sidebar";
import Header from "@/app/_components/Header";
import { FaArrowLeft } from "react-icons/fa";
import IkutSertaSiswa from "./_components/DetailSiswa";
import UploadGallery from "./_components/GaleriFoto";

export default function TourDetail() {
  const [studyTourId, setStudyTourId] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const id = params.get("study_tour_info_id");
      setStudyTourId(id);
    }
  }, []);


  return (
    <div className="flex h-screen overflow-hidden">
      <Header className="fixed top-0 left-0 w-full bg-white z-50 shadow-md" />
      <Sidebar />

      <main className="flex-1 p-4 bg-gray-200 overflow-y-auto">
        <div className="flex items-center justify-between mt-14 mb-4 max-w-6xl">
          <h1 className="sm:text-3xl text-xl sm:mr-0 mr-14 text-black font-bold">
            Study Tour
          </h1>
          <button
            onClick={() => window.history.back()}
            className="text-gray-700 hover:text-gray-900 sm:mr-auto mr-10 transition duration-300"
          >
            <FaArrowLeft className="text-2xl" />
          </button>
        </div>

        {/* ✅ Gunakan ID yang sudah didefinisikan */}
        <IkutSertaSiswa infoId={studyTourId} />

        <div className="mt-5">
          {studyTourId ? (
            <UploadGallery studyTourId={studyTourId} />
          ) : (
            <p className="text-red-500">❌ ID Study Tour tidak ditemukan di URL</p>
          )}
        </div>
      </main>
    </div>
  );
}
