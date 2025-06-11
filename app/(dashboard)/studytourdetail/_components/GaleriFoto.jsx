'use client';

import { useEffect, useState } from 'react';
import { FiUploadCloud, FiTrash2 } from 'react-icons/fi';
import axios from 'axios';

export default function UploadGallery({ studyTourId }) {
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);

  // ✅ Ambil galeri dari database saat komponen dimuat
  useEffect(() => {
    if (!studyTourId) return;

    const fetchGallery = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/study-tour/${studyTourId}/gallery`);
        setImages(res.data.images || []);
      } catch (err) {
        console.error("❌ Gagal ambil galeri:", err);
      }
    };

    fetchGallery();
  }, [studyTourId]);

  // ✅ Upload gambar baru
  const handleImageUpload = async (event) => {
    console.log("Uploading to tour ID:", studyTourId);

    const files = Array.from(event.target.files);
    if (files.length === 0) return;

    if (!studyTourId) {
      console.error("❌ studyTourId belum tersedia saat upload");
      alert("ID Study Tour belum tersedia. Coba refresh halaman.");
      return;
    }

    const formData = new FormData();
    formData.append("study_tour_info_id", studyTourId);
    files.forEach(file => formData.append("images[]", file));

    try {
      setUploading(true);
      const res = await axios.post(
        `http://localhost:8000/api/study-tour/${studyTourId}/gallery`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (res.data.urls) {
        setImages((prev) => [...prev, ...res.data.urls]);
      }
    } catch (err) {
      console.error("❌ Upload gagal:", err);
      alert("Gagal mengunggah gambar.");
    } finally {
      setUploading(false);
    }
  };

  // ✅ Hapus gambar dari galeri
  const removeImage = async (index) => {
    const confirmDelete = confirm("Yakin ingin menghapus gambar ini?");
    if (!confirmDelete) return;

    const imageUrl = images[index];

    try {
      await axios.post(`http://localhost:8000/api/study-tour/${studyTourId}/gallery/delete`, {
        image_url: imageUrl,
      });

      // Hapus dari state lokal
      setImages(images.filter((_, i) => i !== index));
    } catch (err) {
      console.error("❌ Gagal hapus gambar:", err);
      alert("Gagal menghapus gambar.");
    }
  };

  return (
    <div className="p-4 bg-white rounded-2xl shadow-md w-full mx-auto">
      <label className="cursor-pointer flex items-center justify-center p-3 bg-blue-200 rounded-md hover:bg-blue-300 transition mb-4">
        <FiUploadCloud className="mr-2" />
        <span className="font-medium text-gray-700">
          {uploading ? "Mengunggah..." : "Upload Gambar"}
        </span>
        <input
          type="file"
          multiple
          className="hidden"
          onChange={handleImageUpload}
          accept="image/*"
        />
      </label>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {images.map((src, index) => (
          <div key={index} className="relative group">
            <img
              src={`http://localhost:8000${src}`}
              alt={`Foto ${index}`}
              className="w-full h-auto rounded-md shadow-sm object-cover"
            />
            <button
              onClick={() => removeImage(index)}
              className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
            >
              <FiTrash2 size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
