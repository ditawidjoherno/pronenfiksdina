"use client";
import React from "react";
import Sidebar from "@/app/_components/Sidebar";
import Header from "@/app/_components/Header";
import ProfileCard from "./_components/ProfilAkun";


export default function Profil() {
  return (
    <div className="flex h-screen overflow-hidden"> 
      {/* Header */}
      <Header className="fixed top-0 left-0 w-full bg-white z-50 shadow-md" />

      {/* Sidebar */}
      <Sidebar />

      {/* Konten Utama */}
      <main className="flex-1 p-4 bg-gray-200 overflow-y-auto">
        <h1 className="text-3xl text-black font-bold w-full max-w-6xl mt-14 -mb-4">
          Profil
        </h1>

    <ProfileCard/>

      </main>
    </div>
  );
}
