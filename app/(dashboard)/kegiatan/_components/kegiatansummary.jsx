"use client";

import React, { useState, useEffect } from "react";
import { FaPlayCircle, FaCheckCircle } from "react-icons/fa"; // hanya ikon yang dipakai
import ActivityNowPopup from "./KegiatanBerlangsung";
import ActivityEndPopup from "./KegiatanSelesai";
// import AmountPopup from "./JumlahPartisipan";
// import ResponsiblePopup from "./Penanggungjawab";

const KegiatanSummary = () => {
  const [popupType, setPopupType] = useState(null);
  const [summary, setSummary] = useState({
    berlangsung: 0,
    selesai: 0,
    // peserta: 0,
    // penanggung_jawab: 0,
  });

  useEffect(() => {
    fetch("http://localhost:8000/api/jumlah-kegiatan")
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setSummary(data.data);
        }
      })
      .catch((error) => {
        console.error("Gagal memuat data summary:", error);
      });
  }, []);

  const data = [
    {
      label: "Kegiatan Berlangsung",
      value: summary.berlangsung,
      icon: <FaPlayCircle />,
      color: "border-blue-400",
      popup: "KegiatanBerlangsung",
    },
    {
      label: "Kegiatan Selesai",
      value: summary.selesai,
      icon: <FaCheckCircle />,
      color: "border-gray-400",
      popup: "KegiatanSelesai",
    },
    // {
    //   label: "Jumlah Partisipan",
    //   value: summary.peserta,
    //   icon: <FaUsers />,
    //   color: "border-green-400",
    //   popup: "JumlahPartisipan",
    // },
    // {
    //   label: "Penanggung Jawab",
    //   value: summary.penanggung_jawab,
    //   icon: <FaUserTie />,
    //   color: "border-yellow-400",
    //   popup: "Penanggungjawab",
    // },
  ];

  const handleClick = (popup) => {
    setPopupType(popup);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-5 p-4 justify-center">
      {data.map((item, index) => (
        <button
          key={index}
          className={`flex flex-col items-center p-6 border-2 rounded-xl shadow-md ${item.color} bg-white cursor-pointer hover:bg-gray-100 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500 active:scale-95`}
          onClick={() => handleClick(item.popup)}
        >
          <div className="text-5xl text-gray-700 mb-4">{item.icon}</div>
          <p className="text-lg font-semibold text-gray-600">{item.label}</p>
          <p className="text-3xl font-bold text-gray-800 mt-2">{item.value}</p>
        </button>
      ))}

      {popupType === "KegiatanBerlangsung" && (
        <ActivityNowPopup onClose={() => setPopupType(null)} />
      )}
      {popupType === "KegiatanSelesai" && (
        <ActivityEndPopup onClose={() => setPopupType(null)} />
      )}
      {/* {popupType === "JumlahPartisipan" && (
        <AmountPopup onClose={() => setPopupType(null)} />
      )}
      {popupType === "Penanggungjawab" && (
        <ResponsiblePopup onClose={() => setPopupType(null)} />
      )} */}
    </div>
  );
};

export default KegiatanSummary;
