import { useState } from "react";
import { AiFillPicture } from "react-icons/ai";
import { FaCloudUploadAlt, FaTrashAlt } from "react-icons/fa";

const GalleryButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");

  const openModal = () => {
    console.log("Tombol diklik! Membuka modal...");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    console.log("Menutup modal...");
    setIsModalOpen(false);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result);
      reader.readAsDataURL(file);
    } else {
      alert("Silakan unggah file gambar yang valid.");
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setCaption("");
  };

  const handleUpload = () => {
    if (!image) {
      alert("Harap unggah foto terlebih dahulu.");
      return;
    }
    console.log("Foto:", image);
    console.log("Keterangan:", caption);
    closeModal();
  };

  return (
    <>
      <button
        onClick={openModal}
        className="flex items-center gap-2 bg-[#121e42] text-white py-2 px-6 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300"
      >
        <AiFillPicture size={24} />
        Lihat Galeri Ekskul
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md animate-fade-in">
            <h2 className="text-xl font-semibold mb-4">Unggah Foto</h2>

            {image ? (
              <div className="relative">
                <img
                  src={image}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded-lg mb-2"
                />
                <button
                  onClick={handleRemoveImage}
                  className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition"
                >
                  <FaTrashAlt size={16} />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100 transition">
                <FaCloudUploadAlt size={30} className="text-gray-500 mb-2" />
                <span className="text-gray-500">Pilih Foto</span>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleImageUpload}
                  accept="image/*"
                />
              </label>
            )}

            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Tambahkan keterangan foto..."
              className="mt-4 w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
              >
                Batal
              </button>
              <button
                onClick={handleUpload}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
                Unggah
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GalleryButton;
