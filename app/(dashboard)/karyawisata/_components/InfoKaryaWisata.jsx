"use client";

import { FaBullhorn } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";

export default function InfoKaryaWisata() {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("-");
  const [date, setDate] = useState("-");
  const [hasData, setHasData] = useState(false);
  const [eventType] = useState("Karya Wisata");

  const fetchCurrentInfo = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/karya-wisata-info/current-title");
      const data = res.data?.data;
      if (data) {
        setTitle(data.title || "-");
        setDate(data.tanggal || "-");
        setHasData(!!data.title && !!data.tanggal);
      }
    } catch (err) {
      console.error("❌ Gagal mengambil data info:", err);
    }
  };

  useEffect(() => {
    fetchCurrentInfo();
  }, []);

const handleClick = () => {
  if (!isEditing && title && date) {
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');

    const encodedJudul = encodeURIComponent(title);
    const encodedTanggal = encodeURIComponent(date);

    router.push(`/detailkaryawisata/${slug}?judul=${encodedJudul}&tanggal=${encodedTanggal}`);
  }
};



  const handleEditClick = async (e) => {
    e.stopPropagation();

    if (isEditing) {
      try {
        const formattedDate = new Date(date).toISOString().split("T")[0];
        await axios.post("http://localhost:8000/api/karya-wisata-info", {
          title: title,
          tanggal: formattedDate,
        });

        await fetchCurrentInfo(); // ✅ panggil ulang info agar update langsung terlihat
        setHasData(true);
      } catch (error) {
        console.error("❌ Gagal menyimpan data:", error);
      }
    }

    setIsEditing(!isEditing);
  };

  const handleCancel = (e) => {
    e.stopPropagation();
    setIsEditing(false);
  };

  const handleAddNew = (e) => {
    e.stopPropagation();
    setTitle("");
    setDate("");
    setIsEditing(true);
  };

  return (
    <div
      className="bg-[#869ddd] p-6 rounded-2xl shadow-lg w-full max-w-7xl sm:h-[220px] h-[235px] mt-5 flex justify-between items-start cursor-pointer hover:opacity-90 relative"
      onClick={handleClick}
    >
      <div className="flex-1 flex flex-col justify-center">
        <div className="flex items-center gap-3">
          <FaBullhorn className="text-white text-2xl" />
          <h2 className="text-white font-semibold sm:text-2xl text-xl">{eventType}</h2>
        </div>

        {isEditing ? (
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="text-black font-medium sm:text-xl text-base mt-1 p-1 rounded"
          />
        ) : (
          <p className="text-white font-medium sm:text-xl text-base mt-1">
            {date !== "-" && date
              ? new Date(date).toLocaleDateString("id-ID", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })
              : "-"}
          </p>
        )}

        <div className="flex justify-center items-center sm:ml-28 ml-20 mt-2 ">
          {isEditing ? (
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-black sm:text-3xl text-2xl font-bold p-1 rounded "
              placeholder="Masukkan judul"
            />
          ) : (
            <p
              className="sm:text-3xl text-2xl font-bold text-blue-950"
              onClick={() => router.push("/studytourdetail")}
            >
              {title || "-"}
            </p>
          )}
        </div>
      </div>

      <div className="sm:w-24 w-16 sm:h-24 h-16 sm:mr-8 mr-2 overflow-hidden flex-shrink-0 sm:mt-10 mt-2">
        <img
          src="/images/tour.png"
          alt="Foto Petugas Piket"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Tombol utama */}
      <div className="absolute bottom-2 sm:bottom-4 sm:left-4 left-0 flex sm:gap-2 gap-3">
        <button
          onClick={handleEditClick}
          className="bg-white text-blue-600 font-semibold sm:px-4 px-1 py-2 rounded-lg shadow sm:h-auto h-[60px] sm:w-auto w-[110px] sm:ml-0 ml-6"
        >
          {isEditing ? "Simpan" : "Update Perjalanan"}
        </button>

        {isEditing && (
          <button
            onClick={handleCancel}
            className="bg-gray-200 text-gray-800 font-semibold px-4 py-2 rounded-lg shadow sm:h-auto h-[60px] sm:w-auto w-[110px]"
          >
            Batal
          </button>
        )}

        {hasData && !isEditing && (
          <button
            onClick={handleAddNew}
            className="bg-yellow-300 text-black font-semibold px-4 py-2 rounded-lg shadow sm:h-auto h-[60px] sm:w-auto w-[110px]"
          >
            Tambah Baru
          </button>
        )}
      </div>
    </div>
  );
}
