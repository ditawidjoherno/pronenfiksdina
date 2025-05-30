'use client';
import { FaListAlt } from "react-icons/fa";

export default function HarianAbsensi() {
  const today = new Date().toISOString().split('T')[0]; // Format: yyyy-mm-dd

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-xl shadow-md space-y-4">
      <div>
              <h2 className="text-lg font-semibold flex items-center mb-4">
                <FaListAlt className="mr-2" /> Abensi Kehadiran Apel Pagi 
              </h2>
        <p className="text-gray-600">Senin, 25-mei-2025</p>
      </div>

      <div className="flex justify-start">
        <input
          type="date"
          value={today}
          className="border border-gray-300 rounded px-2 py-1 text-sm"
          readOnly
        />
      </div>

      <div className="flex justify-center">
        <img
          src="/images/Mantap.png"
          alt="maskot"
          className="w-[220px] h-[220px] object-contain"
        />
      </div>

      <div className="bg-[#50bb2c] py-2 rounded">
        <h3 className="text-center font-semibold text-[#154306]">
          Mantap ! Kamu hadir hari ini
        </h3>
      </div>
    </div>
  );
}
