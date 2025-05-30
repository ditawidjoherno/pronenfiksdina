"use client";

import { useEffect, useState } from "react";
import { FaBullhorn } from "react-icons/fa";

function formatDateToText(dateStr) {
  const months = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];
  if (!dateStr) return "-";
  const [year, month, day] = dateStr.split("-");
  const monthName = months[parseInt(month, 10) - 1];
  return `${day} ${monthName} ${year}`;
}

export default function KegiatanEksCard() {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const namaEkskul = JSON.parse(localStorage.getItem("selectedEkskul"))?.name || "-";
  const ekskulId = JSON.parse(localStorage.getItem("selectedEkskul"))?.id;

  useEffect(() => {
    if (!ekskulId) return;
    fetch(`http://localhost:8000/api/ekskul/${ekskulId}/kegiatan`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setTitle(data[0].title);
          setDate(data[0].date);
        }
      })
      .catch((err) => console.error("❌ Gagal fetch kegiatan:", err));
  }, [ekskulId]);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-7xl h-[220px] mt-1 flex justify-between items-start cursor-default">
      <div className="flex-1 flex flex-col justify-center">
        <div className="flex items-center gap-3">
          <FaBullhorn className="text-black text-2xl" />
          <h2 className="text-black font-semibold text-2xl">{namaEkskul}</h2>
        </div>

        <p className="text-black font-medium text-xl mt-1">
          {formatDateToText(date)}
        </p>

        <div className="flex justify-center items-center ml-28 mt-2">
          <p className="text-3xl font-bold text-blue-950">{title}</p>
        </div>
      </div>

      <div className="w-32 h-28 mr-8 overflow-hidden flex-shrink-0 mt-10">
        <img
          src="/images/Ekskul.png"
          alt="logo"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
