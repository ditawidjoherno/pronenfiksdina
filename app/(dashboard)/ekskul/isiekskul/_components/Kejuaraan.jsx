import React, { useState } from "react";
import { FaTrophy, FaPlus, FaTimes } from "react-icons/fa";
import InputKejuaraan from "./InputKejuaraan";

const AchievementBox = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const achievements = [
    {
      title: "Juara 1 Lomba Debat Bahasa Indonesia",
      event: "Kompetisi Debat OSIS Nasional 2024",
      date: "15 Februari 2024",
    },
    {
      title: "Juara 2 Lomba Kepemimpinan",
      event: "Leadership Camp OSIS Se-Provinsi",
      date: "8 Januari 2024",
    },
    {
      title: "Juara 3 Lomba Pidato Kebangsaan",
      event: "Festival Orasi OSIS 2023",
      date: "12 November 2023",
    },
  ];

  return (
    <div className="p-4 bg-white shadow-lg rounded-2xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <FaTrophy className="text-yellow-500" /> Capaian Prestasi
        </h2>
        <button 
          className="bg-[#344CB7] text-white p-2 rounded-lg flex items-center gap-2 hover:bg-blue-600"
          onClick={() => setIsModalOpen(true)}
        >
          <FaPlus /> Tambah Prestasi
        </button>
      </div>
      <div className="grid gap-4">
        {achievements.map((achieve, index) => (
          <div key={index} className="border border-yellow-500 shadow-md rounded-lg p-4 bg-white">
            <h3 className="text-lg font-semibold">{achieve.title}</h3>
            <p className="text-gray-600">{achieve.event}</p>
            <p className="text-sm text-gray-500">{achieve.date}</p>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-red-500"
              onClick={() => setIsModalOpen(false)}
            >
              <FaTimes size={20} />
            </button>
            <InputKejuaraan onClose={() => setIsModalOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default AchievementBox;
