"use client";
import React from "react";
import Sidebar from "@/app/_components/Sidebar";
import Header from "@/app/_components/Header";
import InfoKaryaWisata from "./_components/InfoSIswaKarya";
import ClassGrid from "./_components/SeluruhKelas";

useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));

    if (userData?.role === "siswa") {
      setIsAllowed(true);
    } else {
      setIsAllowed(false);
      router.push("/unauthorized");
    }
  }, []);

  if (isAllowed === null) {
    return <p className="text-center p-4">Memuat halaman absensi...</p>;
  }

  if (!isAllowed) {
    return null;
  }
  
export default function karyawisata() {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Header */}
      <Header className="fixed top-0 left-0 w-full bg-white z-50 shadow-md" />

      {/* Sidebar */}
      <Sidebar />

      {/* Konten Utama */}
      <main className="flex-1 p-4 bg-gray-200 overflow-y-auto">
        <h1 className="sm:text-3xl text-2xl text-black font-bold w-full max-w-6xl mt-14 -mb-4">
          Perjalanan Karya Wisata
        </h1>

        <div className="flex justify-center mt-5">
            <InfoKaryaWisata/>
          </div>


        <div className="bg-white p-4 rounded-2xl shadow-md mt-5 min-h-fit">

          <div className="flex gap-4 items-center ml-4">
  
        </div>

        <ClassGrid/>
        </div>
      </main>
    </div>
  );
}
