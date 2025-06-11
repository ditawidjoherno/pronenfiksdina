'use client';

import { useState } from 'react';
import { FiUploadCloud, FiTrash2 } from 'react-icons/fi';
import Image from 'next/image';
import axios from 'axios';

export default function UploadGalleryTour({ studyTourId }) {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetchFoto = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/study-tour/${studyTourId}`);
        setImage(res.data.foto_perjalanan); // ⬅️ pastikan backend mengirim ini
      } catch (err) {
        console.error("Gagal mengambil foto perjalanan:", err);
      }
    };

    fetchFoto();
  }, [studyTourId]);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0]; // hanya satu gambar
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file); // field name disesuaikan di backend
    formData.append("study_tour_id", studyTourId); // id kegiatan

    try {
      setUploading(true);
      const response = await axios.post("http://localhost:8000/api/upload-foto-perjalanan", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setImage(response.data.url); // simpan URL hasil upload
    } catch (error) {
      console.error("Upload gagal:", error);
      alert("Gagal mengunggah gambar.");
    } finally {
      setUploading(false);
    }
  };

  const removeImage = async () => {
    if (!image) return;
    const confirmDelete = window.confirm("Yakin ingin hapus gambar ini?");
    if (!confirmDelete) return;

    try {
      await axios.post("http://localhost:8000/api/delete-foto-perjalanan", {
        image_url: image,
        study_tour_id: studyTourId,
      });

      setImage(null);
    } catch (error) {
      console.error("Gagal hapus:", error);
      alert("Gagal menghapus gambar.");
    }
  };

  return (
    <div className="p-4 bg-gray-100 rounded-xl shadow-md w-full mx-auto">
      <label className="cursor-pointer flex items-center justify-center p-3 bg-gray-200 rounded-md hover:bg-gray-300 transition mb-4">
        <FiUploadCloud className="mr-2" />
        <span className="font-medium text-gray-700">
          {uploading ? "Mengunggah..." : image ? "Ganti Gambar" : "Upload Gambar"}
        </span>
        <input
          type="file"
          className="hidden"
          onChange={handleImageUpload}
          accept="image/*"
        />
      </label>

      {image && (
        <div className="relative group w-fit">
          <Image
            src={image}
            alt="Foto Perjalanan"
            width={300}
            height={200}
            className="rounded-md shadow-md object-cover"
          />
          <button
            onClick={removeImage}
            className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
          >
            <FiTrash2 size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
