"use client";
import React from "react";
import Sidebar from "@/app/_components/Sidebar";
import WelcomeBox from "./_components/WelcomeBox";
import Header from "@/app/_components/Header";
import BoxTiga from "./_components/BoxTiga";
import KehadiranChart from "./_components/KehadiranChart";
import RecentActivity from "./_components/AktivitasTerkini";
import EventCalendar from "./_components/Kalender";
import InformasiList from "./_components/Informasidata";


export default function Beranda() {
  return (
    <div className="flex h-screen">
      {/* Header */}
      <Header className="fixed top-0 left-0 w-full bg-white z-50 shadow-md" />

      {/* Sidebar */}
      <Sidebar />

      {/* Konten Utama */}
      <main className="flex-1 p-4 bg-gray-200 overflow-y-auto">
        <h1 className="text-3xl text-black font-bold w-full max-w-6xl mt-14 -mb-4">
          Dashboard
        </h1>

        <WelcomeBox />

        <BoxTiga />

        {/* RecentActivity lebih lebar */}
        <div className="w-full max-w-6xl mx-auto">
          <RecentActivity />
        </div>

        {/* <div className="flex max-w-6xl mx-auto ml-auto">
          <InformasiCard />
        </div> */}
         <div className="flex max-w-6xl mx-auto gap-4 mt-4">
          <div className="w-1/2">
            <InformasiList />
          </div>
          <div className="w-1/2">
            <EventCalendar />
          </div>
        </div>
        
        <KehadiranChart />
      </main>
    </div>
  );
}
