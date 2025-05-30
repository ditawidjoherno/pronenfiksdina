'use client';

import { useState, useEffect } from "react";
import Image from "next/image";
import { AiFillPicture } from "react-icons/ai";
import { FaUserTie } from "react-icons/fa";
import UploadPhotoModal from "./GaleriEkskul";

export default function ImageBox() {
  const [imageSrc, setImageSrc] = useState("/images/osis.png");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ekskulName, setEkskulName] = useState("Ekskul");
  const [mentor, setMentor] = useState("Mentor");

  const buildImageURL = (rawImage) => {
    if (!rawImage) return "/images/default-image.jpg";
    return rawImage.startsWith("http")
      ? rawImage
      : `http://localhost:8000/${rawImage.replace(/^\/+/, "")}`;
  };

  useEffect(() => {
    const storedEkskul = localStorage.getItem("selectedEkskul");
    if (storedEkskul) {
      try {
        const parsed = JSON.parse(storedEkskul);
        setImageSrc(buildImageURL(parsed.image));
        setEkskulName(parsed.name || "Ekskul");
        setMentor(parsed.mentor || "Tidak Diketahui");
      } catch (e) {
        console.error("❌ Gagal parsing selectedEkskul:", e.message);
      }
    }
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        const stored = localStorage.getItem("selectedEkskul");
        if (stored) {
          try {
            const parsed = JSON.parse(stored);
            setImageSrc(buildImageURL(parsed.image));
            setEkskulName(parsed.name || "Ekskul");
            setMentor(parsed.mentor || "Tidak Diketahui");
          } catch (e) {
            console.error("❌ Gagal parsing selectedEkskul:", e.message);
          }
        }
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <div className="w-full flex justify-center items-center p-4 relative">
      <div className="w-full max-w-screen-xl overflow-hidden relative">
        <Image
          src={imageSrc}
          alt="Group Photo"
          width={1920}
          height={500}
          sizes="100vw"
          style={{ width: "100%", height: "auto" }}
          className="rounded-2xl"
          priority
        />

        <div className="absolute inset-0 bg-indigo-500/50 rounded-2xl"></div>

        <div className="absolute inset-0 flex flex-col justify-center items-center z-10">
          <h2 className="text-3xl text-[#121e42] font-extrabold -mt-10">{ekskulName}</h2>
          <div className="flex items-center gap-2 text-white mt-2">
            <FaUserTie size={24} />
            <span className="text-lg font-medium">{mentor}</span>
          </div>
          <button
            className="mt-4 flex items-center gap-2 bg-[#121e42] text-white py-2 px-6 rounded-lg shadow-lg hover:bg-yellow-500 transition duration-300"
            onClick={() => setIsModalOpen(true)}
          >
            <AiFillPicture size={24} />
            Lihat Galeri Ekskul
          </button>
        </div>
      </div>

      {isModalOpen && <UploadPhotoModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}
