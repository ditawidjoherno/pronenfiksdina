"use client";
import React, { useEffect, useState } from "react";
import { FaUsers, FaChartPie } from "react-icons/fa";
import StudentPopup from "./SiswaJumlah";
import TeacherPopup from "./GuruJumlah";
import TotalPopup from "./TotalJumlah";
import useJumlah from "@/hooks/use-jumlah";

const BoxTiga = () => {
  const [popupType, setPopupType] = useState(null);
  const { loading, error, data, getUserJumlah } = useJumlah();

  useEffect(() => {
    getUserJumlah();
  }, []);

  if (loading) return <p className="text-center mt-5">Memuat data...</p>;
  if (error) return <p className="text-center text-red-500 mt-5">{error}</p>;

  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 sm:gap-4 gap-2 sm:mt-5 mt-3 w-full">
        {/* Box Siswa */}
        <div
          className="bg-purple-700 text-white rounded-xl p-5 sm:p-6 lg:p-8 flex items-center shadow-lg cursor-pointer hover:bg-purple-800 transition-all duration-200"
          onClick={() => setPopupType("student")}
        >
          <div className="bg-[#b09ec0] p-5 sm:p-6 rounded-full flex-shrink-0">
            <FaUsers className="text-black text-2xl sm:text-3xl lg:text-4xl" />
          </div>
          <div className="ml-4 sm:ml-6">
            <h2 className="text-lg sm:text-xl font-semibold">Siswa</h2>
            <p className="text-base sm:text-lg font-bold">{data?.siswa}</p>
          </div>
        </div>

        {/* Box Guru */}
        <div
          className="bg-pink-500 text-white rounded-xl p-5 sm:p-6 lg:p-8 flex items-center shadow-lg cursor-pointer hover:bg-pink-600 transition-all duration-200"
          onClick={() => setPopupType("teacher")}
        >
          <div className="bg-pink-300 p-5 sm:p-6 rounded-full flex-shrink-0">
            <FaUsers className="text-black text-2xl sm:text-3xl lg:text-4xl" />
          </div>
          <div className="ml-4 sm:ml-6">
            <h2 className="text-lg sm:text-xl font-semibold">Guru</h2>
            <p className="text-base sm:text-lg font-bold">{data?.guru}</p>
          </div>
        </div>

        {/* Box Total */}
        <div
          className="bg-yellow-400 text-white rounded-xl p-5 sm:p-6 lg:p-8 flex items-center shadow-lg cursor-pointer hover:bg-yellow-500 transition-all duration-200"
          onClick={() => setPopupType("total")}
        >
          <div className="bg-[#f7e09c] p-5 sm:p-6 rounded-full flex-shrink-0">
            <FaChartPie className="text-black text-2xl sm:text-3xl lg:text-4xl" />
          </div>
          <div className="ml-4 sm:ml-6">
            <h2 className="text-lg sm:text-xl font-semibold">Total</h2>
            <p className="text-base sm:text-lg font-bold">{(data?.siswa || 0) + (data?.guru || 0)}</p>
          </div>
        </div>
      </div>

      {/* Popup */}
      {popupType === "student" && <StudentPopup onClose={() => setPopupType(null)} />}
      {popupType === "teacher" && <TeacherPopup onClose={() => setPopupType(null)} />}
      {popupType === "total" && <TotalPopup onClose={() => setPopupType(null)} />}
    </div>
  );
};

export default BoxTiga;
