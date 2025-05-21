"use client";
import { useState } from "react";
import Image from "next/image";
import { AiFillPicture } from "react-icons/ai";
import { MdEdit } from "react-icons/md";
import { FaUserTie } from "react-icons/fa"; 
import UploadPhotoModal from "./GaleriEkskul"; // Pastikan path sesuai dengan struktur proyek

export default function ImageBox() {
  const [imageSrc, setImageSrc] = useState("/images/osis.png");
  const [isModalOpen, setIsModalOpen] = useState(false); // State untuk modal

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImageSrc(imageUrl);
    }
  };

  return (
    <div className="w-full flex justify-center items-center p-4 relative">
      <div className="w-full max-w-screen-xl overflow-hidden relative">
        {/* Gambar */}
        <Image
  src={imageSrc}
  alt="Group Photo"
  width={1920}
  height={500}
  layout="responsive"
  className="rounded-2xl"
  priority // ✅ fix warning LCP
/>

        {/* Overlay putih dengan blur */}
        <div className="absolute inset-0 bg-indigo-500/50 rounded-2xl"></div>

        {/* Tombol Edit (Kanan Atas) */}
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

        {/* Title, Mentor Info, dan Button di tengah-tengah di atas image */}
        <div className="absolute inset-0 flex flex-col justify-center items-center z-10">
          <h2 className="text-3xl text-[#121e42] font-extrabold -mt-10">OSIS</h2>

          {/* Mentor Info (Di bawah "OSIS") */}
          <div className="flex items-center gap-2 text-white mt-2">
            <FaUserTie size={24} />
            <span className="text-lg font-medium">Andi Saputra</span>
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

      {/* Modal Popup */}
      {isModalOpen && <UploadPhotoModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}
