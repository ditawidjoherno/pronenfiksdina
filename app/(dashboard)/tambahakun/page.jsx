"use client";
import React, { useState } from "react";
import Sidebar from "@/app/_components/Sidebar";
import Header from "@/app/_components/Header";
import AddUserForm from "./_components/tambahuser";
import AccountTabs from "./_components/Tombol2";
import AdminTable from "./_components/tambahadmin";
import GenderChart from "./_components/jeniskelamin";

export default function Beranda() {
  const [activeTab, setActiveTab] = useState("user");

  return (
    <div className="flex h-screen">
      {/* Header */}
      <Header className="fixed top-0 left-0 w-full bg-white z-50 shadow-md" />

      {/* Sidebar */}
      <Sidebar />

      {/* Konten Utama */}
      <main className="flex-1 bg-gray-200 p-4 flex flex-col items-center justify-start w-full overflow-y-auto">
        <h1 className="text-3xl text-black font-bold w-full max-w-6xl mt-14 -mb-8">Tambah Akun</h1>

        {/* Tabs */}
        <AccountTabs onTabChange={setActiveTab} />

        <GenderChart malePercentage={65} femalePercentage={80} />

        {/* Form Tambah User */}
        {activeTab === "user" && <AddUserForm />} 
        
        {/* Tabel Tambah Admin */}
        {activeTab === "admin" && <AdminTable />} 


      </main>
    </div>
  );
}
