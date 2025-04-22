"use client";
import React from "react";
import Sidebar from "@/app/_components/Sidebar";
import Header from "@/app/_components/Header";
import { useParams } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
import StudentParticipation from "../../studytourdetail/_components/DetailSiswa";
import UploadGallery from "../../studytourdetail/_components/GaleriFoto";

export default function EventDetail() {
  const params = useParams(); // Ambil params dari Next.js
  const event = decodeURIComponent(params.event); // Dekode URL

    return (
      <div className="flex h-screen overflow-hidden">
      {/* Header */}
      <Header className="fixed top-0 left-0 w-full bg-white z-50 shadow-md" />

      {/* Sidebar */}
      <Sidebar />


        <main className="flex-1 p-4 bg-gray-200 overflow-y-auto">
                <div className="flex items-center justify-between mt-14 mb-4 max-w-6xl">
                          <h1 className="text-3xl text-black font-bold">
                          Detail Riwayat Kegiatan {decodeURIComponent(params.event)}
                          </h1>
                          <button 
                            onClick={() => window.history.back()} 
                            className="text-gray-700 hover:text-gray-900 mr-auto ml-2 transition duration-300"
                          >
                            <FaArrowLeft className="text-2xl " />
                          </button>
                        </div>
               <StudentParticipation/>
               <div className="mt-5">
               <UploadGallery/>
               </div>
               
              
              </main>
      </div>
    );
  }
  