import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FaUsers, FaChartPie } from "react-icons/fa";
import StudentPopup from "./SiswaJumlah";
import TeacherPopup from "./GuruJumlah";
import TotalPopup from "./TotalJumlah";

const BoxTiga = () => {
  const router = useRouter();
  const [popupType, setPopupType] = useState(null);

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5 w-full">
        {/* Box Siswa */}
        <div
          className="bg-purple-700 text-white rounded-lg p-8 flex items-center shadow-lg cursor-pointer hover:bg-purple-800"
          onClick={() => setPopupType("student")}
        >
          <div className="bg-[#b09ec0] p-7 rounded-full">
            <FaUsers className="text-black text-4xl" />
          </div>
          <div className="ml-6">
            <h2 className="text-xl font-semibold">Siswa</h2>
            <p className="text-md font-bold">300</p>
          </div>
        </div>

        {/* Box Guru */}
        <div
          className="bg-pink-500 text-white rounded-lg p-8 flex items-center shadow-lg cursor-pointer hover:bg-pink-600"
          onClick={() => setPopupType("teacher")}
        >
          <div className="bg-pink-300 p-7 rounded-full">
            <FaUsers className="text-black text-4xl" />
          </div>
          <div className="ml-6">
            <h2 className="text-xl font-semibold">Guru</h2>
            <p className="text-md font-bold">20</p>
          </div>
        </div>

        {/* Box Total */}
        <div
          className="bg-yellow-400 text-white rounded-lg p-8 flex items-center shadow-lg cursor-pointer hover:bg-yellow-500"
          onClick={() => setPopupType("total")}
        >
          <div className="bg-[#f7e09c] p-7 rounded-full">
            <FaChartPie className="text-black text-4xl" />
          </div>
          <div className="ml-6">
            <h2 className="text-xl font-semibold">Total</h2>
            <p className="text-md font-bold">320</p>
          </div>
        </div>
      </div>

      {/* Tampilkan Popup sesuai pilihan */}
      {popupType === "student" && <StudentPopup onClose={() => setPopupType(null)} />}
      {popupType === "teacher" && <TeacherPopup onClose={() => setPopupType(null)} />}
      {popupType === "total" && <TotalPopup onClose={() => setPopupType(null)} />}
    </div>
  );
};

export default BoxTiga;
