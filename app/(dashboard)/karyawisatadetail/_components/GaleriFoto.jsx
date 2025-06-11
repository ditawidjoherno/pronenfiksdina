"use client";

import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { FiUploadCloud, FiTrash2 } from 'react-icons/fi';

export default function UploadGallery({ judul, tanggal }) {
  const [uploadedImages, setUploadedImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);

  // Ambil foto tersimpan berdasarkan judul & tanggal
  useEffect(() => {
    if (judul && tanggal && judul !== "-" && tanggal !== "-") {
      fetchUploadedImages();
    }
  }, [judul, tanggal]);

  const fetchUploadedImages = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/karya-wisata/galeri`, {
        params: {
          judul,
          tanggal
        }
      });
      setUploadedImages(res.data?.data || []);
    } catch (error) {
      console.error("Gagal fetch gallery:", error);
    }
  };

  const handleImageUpload = (event) => {
    const selectedFiles = Array.from(event.target.files);
    const previews = selectedFiles.map(file => URL.createObjectURL(file));
    setPreviewImages(prev => [...prev, ...previews]);
    setFiles(prev => [...prev, ...selectedFiles]);
  };

  const removeImage = (index) => {
    const newPreview = [...previewImages];
    const newFiles = [...files];
    newPreview.splice(index, 1);
    newFiles.splice(index, 1);
    setPreviewImages(newPreview);
    setFiles(newFiles);
  };

  const handleUpload = async () => {
    if (!judul || !tanggal || files.length === 0) {
      alert("Judul, tanggal, dan gambar tidak boleh kosong.");
      return;
    }

    const formData = new FormData();
    formData.append('judul', judul);
    formData.append('tanggal', tanggal);
    files.forEach(file => formData.append('files[]', file));

    try {
      const res = await fetch('http://localhost:8000/api/karya-wisata/upload-gallery', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (data.status === 'success') {
        alert('✅ Berhasil upload!');
        setPreviewImages([]);
        setFiles([]);
        fileInputRef.current.value = null;
        fetchUploadedImages();
      } else {
        alert('❌ Gagal upload!');
      }
    } catch (error) {
      console.error("Upload gagal:", error);
      alert('Terjadi kesalahan saat upload.');
    }
  };

  const handleDeleteImage = async (id) => {
    const confirmDelete = window.confirm("Yakin hapus gambar ini?");
    if (!confirmDelete) return;

    try {
      const res = await axios.delete(`http://localhost:8000/api/karya-wisata/gallery/${id}`);
      if (res.data?.status === 'success') {
        fetchUploadedImages();
      } else {
        alert("❌ Gagal menghapus gambar.");
      }
    } catch (error) {
      console.error("Gagal hapus gambar:", error);
    }
  };

  return (
    <div className="bg-white p-4 rounded-2xl shadow-md w-full mx-auto">
      <p className="text-gray-700">📌 Judul: <strong>{judul || '-'}</strong></p>
      <p className="text-gray-700 mb-4">📅 Tanggal: <strong>{tanggal || '-'}</strong></p>

      <label className="cursor-pointer flex items-center justify-center p-3 bg-blue-200 rounded-md hover:bg-blue-300 transition mb-4">
        <FiUploadCloud className="mr-2" />
        <span className="font-medium text-gray-700">Upload Gambar</span>
        <input
          type="file"
          multiple
          className="hidden"
          onChange={handleImageUpload}
          ref={fileInputRef}
          accept="image/*"
        />
      </label>

      {previewImages.length > 0 && (
        <div className="mb-4">
          <p className="text-gray-600 font-semibold mb-2">Preview (belum diupload)</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {previewImages.map((src, index) => (
              <div key={index} className="relative group">
                <img src={src} alt={`Preview ${index}`} className="w-full h-auto rounded-md shadow-sm" />
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
      )}

      {uploadedImages.length > 0 && (
        <div className="mb-4">
          <p className="text-gray-600 font-semibold mb-2">Foto Tersimpan</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {uploadedImages.map((img, index) => (
              <div key={img.id} className="relative group">
                <img
                  src={`http://localhost:8000${img.url}`}
                  alt={`Uploaded ${index}`}
                  className="w-full h-auto rounded-md shadow-sm"
                />
                <button
                  onClick={() => handleDeleteImage(img.id)}
                  className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
                  title="Hapus Foto"
                >
                  <FiTrash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-4">
        <button
          onClick={handleUpload}
          className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition"
        >
          Upload ke Server
        </button>
      </div>
    </div>
  );
}
