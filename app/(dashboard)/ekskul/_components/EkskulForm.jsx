'use client';

import { useState, useEffect } from 'react';

export default function PopupForm({ onAddEkskul, onClose }) {
  const [isOpen, setIsOpen] = useState(true);
  const [admins, setAdmins] = useState([]);
  const [selectedAdmin, setSelectedAdmin] = useState('');
  const [ekskulName, setEkskulName] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    // Simulasi fetch data admin, bisa diganti dengan API call
    setAdmins([
      { id: 1, name: 'Akio' },
      { id: 2, name: 'Barbie' },
      { id: 3, name: 'Cerelac' }
    ]);
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    }
  };

  const handleCreateEkskul = () => {
    if (!ekskulName || !selectedAdmin) {
      alert('Nama ekskul dan penanggung jawab harus diisi');
      return;
    }

    const mentorName = admins.find(admin => admin.id === parseInt(selectedAdmin))?.name || '';
    const newEkskul = {
      id: Date.now(),
      name: ekskulName,
      mentor: mentorName,
      image: imagePreview || 'https://via.placeholder.com/400x200' // pakai default jika belum pilih gambar
    };

    onAddEkskul(newEkskul);
    onClose();
  };

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-80 relative">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-red-500 text-xl font-bold"
          >
            ✖
          </button>
          <h2 className="text-lg font-bold text-center mb-4">Tambah Ekskul</h2>

          {/* Input Nama Ekskul */}
          <div className="mb-3">
            <label className="block font-semibold">Ekstra Kulikuler</label>
            <input
              type="text"
              value={ekskulName}
              onChange={(e) => setEkskulName(e.target.value)}
              className="w-full p-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Input Guru Penanggung Jawab */}
          <div className="mb-3">
            <label className="block font-semibold">Penanggung Jawab (Guru)</label>
            <select
              className="w-full p-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={selectedAdmin}
              onChange={(e) => setSelectedAdmin(e.target.value)}
            >
              <option value="">Pilih Guru</option>
              {admins.map((admin) => (
                <option key={admin.id} value={admin.id}>{admin.name}</option>
              ))}
            </select>
          </div>

          {/* Input Gambar Sampul */}
          <div className="mb-3">
            <label className="block font-semibold">Sampul Ekskul (Gambar)</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-1"
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="mt-2 w-full h-32 object-cover rounded-md border"
              />
            )}
          </div>

          <button
            onClick={handleCreateEkskul}
            className="w-full mt-2 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Buat
          </button>
        </div>
      </div>
    )
  );
}
