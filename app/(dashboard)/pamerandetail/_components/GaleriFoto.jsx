'use client';

import { useState, useEffect } from 'react';
import { FiUploadCloud, FiTrash2 } from 'react-icons/fi';
import Image from 'next/image';

export default function UploadGalleryPameran({ pameranId }) {
  const [images, setImages] = useState([]);
  console.log("✅ pameranId diterima:", pameranId);

  if (!pameranId) return <p>Memuat...</p>;

  useEffect(() => {
    fetch(`http://localhost:8000/api/pameran/${pameranId}/gallery`)
      .then(res => res.json())
      .then(data => setImages(data.images || []));
  }, [pameranId]);

  const handleImageUpload = async (event) => {
  const files = Array.from(event.target.files);
  const formData = new FormData();
  files.forEach((file) => formData.append('images[]', file));

  try {
    const response = await fetch(`http://localhost:8000/api/pameran/${pameranId}/gallery`, {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      // ✅ Ambil ulang data dari server setelah upload berhasil
      const res = await fetch(`http://localhost:8000/api/pameran/${pameranId}/gallery`);
      const data = await res.json();
      setImages(data.images || []);
    } else {
      console.error("Upload gagal");
    }
  } catch (err) {
    console.error("Upload error:", err);
  }
};

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <div className="p-4 bg-white rounded-2xl shadow-md w-full mx-auto">
      <label className="cursor-pointer flex items-center justify-center p-3 bg-blue-200 rounded-md hover:bg-blue-300 transition mb-4">
        <FiUploadCloud className="mr-2" />
        <span className="font-medium text-gray-700">Upload Gambar</span>
        <input type="file" multiple className="hidden" onChange={handleImageUpload} accept="image/*" />
      </label>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {images.map((src, index) => (
          <div key={index} className="relative group">
            <Image src={src} alt="Uploaded" width={200} height={150} className="w-full h-auto rounded-md shadow-sm" />
            <button onClick={() => removeImage(index)} className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition">
              <FiTrash2 size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
