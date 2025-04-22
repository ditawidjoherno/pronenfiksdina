"use client";
import React from "react";
import { FaPlayCircle, FaCheckCircle, FaUsers, FaUserTie } from "react-icons/fa";

const KegiatanSummary = () => {
  const data = [
    { label: "Kegiatan Berlangsung", value: 12, icon: <FaPlayCircle />, color: "bg-blue-200" },
    { label: "Kegiatan Selesai", value: 25, icon: <FaCheckCircle />, color: "bg-white" },
    { label: "Jumlah Partisipan", value: 348, icon: <FaUsers />, color: "bg-green-200" },
    { label: "Penanggung Jawab", value: 15, icon: <FaUserTie />, color: "bg-yellow-200" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-5 p-4">
      {data.map((item, index) => (
        <div
          key={index}
          className={`flex items-center p-4 rounded-lg shadow-md ${item.color}`}
        >
          <div className="text-4xl text-gray-700 mr-4">{item.icon}</div>
          <div>
            <p className="text-sm text-gray-600 font-semibold">{item.label}</p>
            <p className="text-2xl font-bold text-gray-800">{item.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default KegiatanSummary;
