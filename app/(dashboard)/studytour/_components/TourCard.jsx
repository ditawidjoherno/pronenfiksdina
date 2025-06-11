"use client";

import { useEffect, useState } from "react";
import { FaBullhorn } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { format, parseISO } from "date-fns";
import { id as localeID } from "date-fns/locale";

export default function TourCard() {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("-");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [isLoading, setIsLoading] = useState(true);
  const [studyTourId, setStudyTourId] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [originalTitle, setOriginalTitle] = useState("");
  const [originalDate, setOriginalDate] = useState("");

  const isPast = new Date(date) < new Date().setHours(0, 0, 0, 0);
  const formattedDate = !isPast ? format(parseISO(date), "EEEE, dd MMMM yyyy", { locale: localeID }) : "-";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/studytour-info");
        const data = await res.json();

        if (res.ok && data) {
          setTitle(data.title || "-");
          setDate(data.tanggal || date);
          setStudyTourId(data.id);
          setOriginalTitle(data.title || "-");
          setOriginalDate(data.tanggal || date);
        }
      } catch (err) {
        console.error("Gagal fetch data awal:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleClick = () => {
    if (!isEditing && studyTourId && !isPast) {
      router.push(`/detailevent/StudyTour-${studyTourId}`);
    }
  };

  const handleEditClick = (e) => {
    e.stopPropagation();
    if (isEditing) {
      setShowConfirm(true);
    } else {
      setIsEditing(true);
    }
  };

  const handleCancelEdit = () => {
    setTitle(originalTitle);
    setDate(originalDate);
    setIsEditing(false);
  };

  const handleSave = async () => {
    const hari = format(parseISO(date), "EEEE", { locale: localeID });

    const payload = {
      kelas: "7A",
      tanggal: date,
      hari: hari,
      mulai: "08:00",
      selesai: "15:00",
      tujuan: "Museum Nasional",
      biaya: 50000,
      title: title,
    };

    try {
      const response = await fetch("http://localhost:8000/api/Input-info-tour", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (response.ok) {
        alert("Data berhasil disimpan!");
        setOriginalTitle(title);
        setOriginalDate(date);
        setIsEditing(false);
      } else {
        alert("Gagal menyimpan: " + result.message);
      }
    } catch (error) {
      console.error("Gagal simpan:", error);
      alert("Terjadi kesalahan saat menyimpan data.");
    }
  };

  return (
    <div
      className="bg-[#869ddd] p-6 rounded-2xl shadow-lg w-full max-w-7xl h-[220px] mt-5 flex justify-between items-start cursor-pointer hover:opacity-90 relative"
      onClick={handleClick}
    >
      <div className="flex-1 flex flex-col justify-center">
        <div className="flex items-center gap-3">
          <FaBullhorn className="text-white text-2xl" />
          <h2 className="text-white font-semibold sm:text-2xl text-xl">Karya Wisata</h2>
        </div>

        {isEditing ? (
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="text-black font-medium text-xl mt-1 p-1 rounded w-fit"
          />
        ) : (
          <p className="text-white font-medium sm:text-xl text-md mt-1">
            {formattedDate}
          </p>
        )}

        <div className="flex justify-center items-center sm:ml-28 ml-0 sm:mt-2 mt-4">
          {isEditing ? (
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-black sm:text-3xl text-2xl font-bold p-1 rounded"
            />
          ) : (
            <p
              className="sm:text-3xl text-2xl font-bold text-blue-950"
              onClick={(e) => {
                e.stopPropagation();
                if (studyTourId && !isPast) {
                  router.push(`/detailevent/StudyTour-${studyTourId}`);
                }
              }}
            >
              {isPast ? "-" : title}
            </p>
          )}
        </div>
      </div>

      <div className="sm:w-24 w-20 sm:h-24 h-20 sm:mr-8 mr-2 overflow-hidden flex-shrink-0 mt-10">
        <img
          src="/images/tour.png"
          alt="Foto Study Tour"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="absolute bottom-4 left-4 flex gap-3">
        <button
          onClick={handleEditClick}
          className="bg-white text-blue-600 font-semibold px-4 py-2 rounded-lg shadow"
        >
          {isEditing ? "Simpan" : "Update Perjalanan"}
        </button>

        {isEditing && (
          <button
            onClick={handleCancelEdit}
            className="bg-gray-300 text-black font-semibold px-4 py-2 rounded-lg shadow hover:bg-gray-400"
          >
            Batal
          </button>
        )}
      </div>

      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg w-80 text-center">
            <p className="mb-4 font-semibold text-gray-800">
              Anda yakin ingin mengupdate kegiatan ini?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => {
                  handleSave();
                  setShowConfirm(false);
                }}
                className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
              >
                Ya
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
              >
                Tidak
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
