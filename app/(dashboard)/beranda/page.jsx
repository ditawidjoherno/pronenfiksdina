"use client";
import React from "react";
import Sidebar from "@/app/_components/Sidebar";
import WelcomeBox from "./_components/WelcomeBox";
import Header from "@/app/_components/Header";
import BoxTiga from "./_components/BoxTiga";
import KehadiranChart from "./_components/KehadiranChart";

export default function Beranda() {
  return (
    
    <div className="flex h-screen">
      {/* Header */}
      <Header className="fixed top-0 left-0 w-full bg-white z-50 shadow-md" />

      {/* Sidebar */}
      <Sidebar />


      {/* Konten Utama */}
      <main className="flex-1 bg-gray-200 p-4 flex flex-col items-center justify-start w-full overflow-y-auto ">
      <h1 className="text-3xl text-black font-bold w-full max-w-6xl mt-14 -mb-3">Dashboard</h1>

        <WelcomeBox />

        <BoxTiga />

        <KehadiranChart />
      </main>
    </div>
  );
}
