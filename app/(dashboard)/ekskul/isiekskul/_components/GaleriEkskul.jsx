"use client";
import { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdPhotoLibrary } from "react-icons/md";
import { IoIosSave } from "react-icons/io";
import { IoClose } from "react-icons/io5";

export default function UploadPhotoModal({ onClose }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [description, setDescription] = useState("");
  const [uploadDate, setUploadDate] = useState(null);
  const [gallery, setGallery] = useState([]);

  // Load gallery from localStorage on mount
  useEffect(() => {
    const savedGallery = JSON.parse(localStorage.getItem("gallery")) || [];
    setGallery(savedGallery);
  }, []);

  // Fungsi untuk menangani unggahan foto
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      setUploadDate(new Date().toLocaleString());
    }
  };

  // Fungsi untuk menyimpan foto ke gallery
  const handleSave = () => {
    if (!selectedImage || !description) return;
    
    const newEntry = { imageUrl: selectedImage, description, uploadDate };
    const updatedGallery = [...gallery, newEntry];
    setGallery(updatedGallery);
    localStorage.setItem("gallery", JSON.stringify(updatedGallery));
    
    setSelectedImage(null);
    setDescription("");
    setUploadDate(null);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[9999] overflow-auto">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] md:w-[800px] max-h-[90vh] overflow-y-auto relative">
        {/* Tombol Close */}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500 transition"
          onClick={onClose}
        >
          <IoClose size={24} />
        </button>

        {/* Judul Modal */}
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <MdPhotoLibrary size={24} /> Galeri Dokumentasi Ekskul
        </h2>

        {/* Tombol untuk memilih file */}
        <div className="mb-4 flex justify-center">
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
          <label
            htmlFor="fileInput"
            className="cursor-pointer flex items-center gap-2 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition w-fit"
          >
            <FaCloudUploadAlt size={20} />
            Unggah Foto
          </label>
        </div>

        {/* Jika ada foto yang dipilih, tampilkan */}
        {selectedImage && (
          <div className="mt-4 flex flex-col items-center w-full">
            <div className="w-full flex flex-col items-center">
              <div className="w-[300px] h-[200px] md:w-[400px] md:h-[250px] overflow-hidden rounded-lg border shadow-lg">
                <img
                  src={selectedImage}
                  alt="Unggahan"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-sm text-gray-500 mt-2">📅 {uploadDate}</p>
            </div>
            <textarea
              className="w-full mt-2 p-2 border rounded-lg shadow-sm"
              placeholder="Tambahkan keterangan..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <button
              className="w-full mt-2 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition flex items-center justify-center gap-2"
              onClick={handleSave}
            >
              <IoIosSave size={20} /> Simpan
            </button>
          </div>
        )}

        {/* Galeri Foto */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">📸 Foto Terunggah</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {gallery.map((item, index) => (
              <div key={index} className="border rounded-lg p-2 shadow-sm flex flex-col items-center">
                <img src={item.imageUrl} alt="Unggahan" className="w-full h-40 object-cover rounded" />
                <p className="text-sm text-gray-500 mt-2">📅 {item.uploadDate}</p>
                <p className="mt-1">📝 {item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tombol Tutup */}
        <button
          className="w-full mt-4 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition flex items-center justify-center gap-2"
          onClick={onClose}
        >
          <IoClose size={20} /> Tutup
        </button>
      </div>
    </div>
  );
}
