"use client";

import { useState, useEffect } from "react";
import { MdPhotoLibrary } from "react-icons/md";
import { IoClose } from "react-icons/io5";

function formatDateTime(dateTimeStr) {
  const date = new Date(dateTimeStr);
  if (isNaN(date.getTime())) return "Tanggal tidak valid";

  return date.toLocaleString("id-ID", {
    timeZone: "Asia/Makassar",
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

export default function UploadPhotoModal({ onClose }) {
  const [gallery, setGallery] = useState([]);

  useEffect(() => {
    const ekskulId = JSON.parse(localStorage.getItem("selectedEkskul"))?.id;
    if (!ekskulId) return;

    fetch(`http://localhost:8000/api/ekskul/${ekskulId}/galeri`)
      .then((res) => res.json())
      .then((data) => setGallery(data))
      .catch((err) => console.error("❌ Gagal fetch galeri:", err));
  }, []);

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[9999] overflow-auto">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] md:w-[800px] max-h-[90vh] overflow-y-auto relative">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500 transition"
          onClick={onClose}
        >
          <IoClose size={24} />
        </button>

        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <MdPhotoLibrary size={24} /> Galeri Dokumentasi Ekskul
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {gallery.length === 0 ? (
            <p className="text-center text-gray-500 col-span-2">
              Belum ada dokumentasi tersedia.
            </p>
          ) : (
            gallery.map((item, index) => (
              <div
                key={index}
                className="border rounded-lg p-2 shadow-sm flex flex-col items-center"
              >
                <img
                  src={item.imageUrl}
                  alt="Dokumentasi"
                  className="w-full h-40 object-cover rounded"
                />
                <p className="text-sm text-gray-500 mt-2">
                  📅 {formatDateTime(item.uploaded_at)}
                </p>
                <p className="mt-1 text-center">📝 {item.description}</p>
              </div>
            ))
          )}
        </div>

        <button
          className="w-full mt-6 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition flex items-center justify-center gap-2"
          onClick={onClose}
        >
          <IoClose size={20} /> Tutup
        </button>
      </div>
    </div>
  );
}
