'use client';

import { useState, useEffect } from "react";
import Image from "next/image";
import { AiFillPicture } from "react-icons/ai";
import { MdEdit } from "react-icons/md";
import { FaUserTie } from "react-icons/fa";
import UploadPhotoModal from "./GaleriEkskul";

export default function ImageBox() {
  const [imageSrc, setImageSrc] = useState("/images/osis.png");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ekskulName, setEkskulName] = useState("Ekskul");
  const [mentor, setMentor] = useState("Mentor");
  const [ekskulId, setEkskulId] = useState(null);

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
        setEkskulId(parsed.id || null);
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
            setEkskulId(parsed.id || null);
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

const handleImageChange = async (event) => {
  const file = event.target.files[0];
  const token = localStorage.getItem("token");

  if (!file || !token || !ekskulId) {
    console.error("❌ File, token, atau ID ekskul tidak tersedia.");
    return;
  }

  // 🔍 Tambahkan log ini di sini
  console.log("🔥 Debug Upload:", {
    ekskulId,
    file,
    token,
  });

  const formData = new FormData();
  formData.append("image", file);
  formData.append("id", ekskulId);

  try {
    const response = await fetch("http://localhost:8000/api/ekskul/upload-photo", {
      method: "POST",
 headers: {
  Authorization: `Bearer ${token}`,
  Accept: "application/json", // 🟢 WAJIB supaya Laravel tahu ini permintaan API
},
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP ${response.status} - ${errorText}`);
    }

    const result = await response.json();
    console.log("✅ Upload berhasil:", result);

    const updatedImage = result.ekskul.image?.startsWith("http")
      ? result.ekskul.image
      : `http://localhost:8000/${result.ekskul.image}`;

    setImageSrc(updatedImage);
    setEkskulName(result.ekskul.name);
    setMentor(result.ekskul.mentor);
    localStorage.setItem("selectedEkskul", JSON.stringify(result.ekskul));
  } catch (error) {
    console.error("❌ Upload gagal:", error.message);
  }
};



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

        <div className="absolute top-4 right-4 z-20">
          <label htmlFor="imageUpload" className="cursor-pointer">
            <MdEdit size={28} className="text-white hover:scale-110 transition-transform duration-200" />
          </label>
          <input
            id="imageUpload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </div>

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
