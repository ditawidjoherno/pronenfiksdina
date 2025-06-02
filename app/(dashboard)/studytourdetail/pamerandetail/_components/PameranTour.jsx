'use client';

import { useState } from 'react';
import { FiUploadCloud, FiTrash2 } from 'react-icons/fi';
import Image from 'next/image';

export default function UploadGallery() {
  const [images, setImages] = useState([]);

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const newImages = files.map((file) => URL.createObjectURL(file));
    setImages((prev) => [...prev, ...newImages]);
  };

  const removeImage = (index) => {
    const confirmDelete = window.confirm("Apakah Anda yakin ingin menghapus gambar ini?");
    if (confirmDelete) {
      setImages(images.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="p-4 bg-gray-100 rounded-xl shadow-md w-full mx-auto">
      <label className="cursor-pointer flex items-center justify-center p-3 bg-gray-200 rounded-md hover:bg-gray-300 transition mb-4">
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
