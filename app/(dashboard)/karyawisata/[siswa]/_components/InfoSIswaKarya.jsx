"use client";

import { FaBullhorn } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";

export default function InfoKaryaWisata() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [hasData, setHasData] = useState(false);
  const [eventType] = useState("Karya Wisata");

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/karya-wisata-info")
      .then((res) => {
        const data = res.data.data;
        if (data) {
          const today = new Date().toISOString().split("T")[0];
          if (data.tanggal < today) {
            setTitle("");
            setDate("");
            setHasData(false);
            return;
          }

          const currentData = {
            title: data.title,
            tanggal: data.tanggal,
          };

          // Ambil cache sebelumnya dari localStorage
          const existing = JSON.parse(localStorage.getItem("karya_wisata_history")) || [];

          // Cek apakah data baru ini belum ada di cache (berdasarkan title + tanggal)
          const alreadyExists = existing.some(
            (item) =>
              item.title === currentData.title && item.tanggal === currentData.tanggal
          );

          if (!alreadyExists) {
            const updated = [...existing, currentData];
            localStorage.setItem("karya_wisata_history", JSON.stringify(updated));
          }

          setTitle(currentData.title);
          setDate(currentData.tanggal);
          setHasData(true);
        }
      })
      .catch((err) => {
        console.error("Gagal ambil data:", err);
      });
  }, []);

  const handleClick = () => {
    if (hasData) {
      router.push("/karyawisatadetail");
    }
  };

  return (
    <div
      className="bg-[#869ddd] p-4 sm:p-6 rounded-2xl shadow-lg w-full max-w-7xl mt-5 flex flex-col sm:flex-row justify-between items-start sm:items-center cursor-pointer hover:opacity-90 relative"
      onClick={handleClick}
    >
      <div className="flex-1 flex flex-col justify-center">
        <div className="flex items-center gap-2 sm:gap-3">
          <FaBullhorn className="text-white text-xl sm:text-2xl" />
          <h2 className="text-white font-semibold text-lg sm:text-2xl">
            {eventType}
          </h2>
        </div>

        <p className="text-white font-medium text-sm sm:text-xl mt-1">
          {date
            ? new Date(date).toLocaleDateString("id-ID", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })
            : "-"}
        </p>

        <div className="mt-2">
          <p
            className="text-xl sm:text-3xl font-bold text-blue-950"
            onClick={() => router.push("/studytourdetail")}
          >
            {title || "-"}
          </p>
        </div>
      </div>

      <div className="w-16 h-16 sm:w-24 sm:h-24 mt-3 sm:mt-0 sm:mr-4 flex-shrink-0">
        <img
          src="/images/tour.png"
          alt="Gambar Tour"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
    </div>
  );
}
