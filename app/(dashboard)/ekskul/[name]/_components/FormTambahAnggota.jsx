'use client';

import { useState, useEffect } from 'react';

export default function TambahAnggotaForm({ onAddAnggota, onClose }) {
  const [isOpen, setIsOpen] = useState(true);
  const [kelasList, setKelasList] = useState([]);
  const [namaList, setNamaList] = useState([]);
  const [selectedKelas, setSelectedKelas] = useState('');
  const [selectedNama, setSelectedNama] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    // Simulasi fetch data
    setKelasList(['X IPA 1', 'X IPA 2', 'XI IPS 1']);
    setNamaList(['Ari', 'Budi', 'Citra', 'Dewi']);
  }, []);

  const handleTambahkan = () => {
    if (!selectedKelas || !selectedNama) {
      alert('Kelas dan Nama harus dipilih');
      return;
    }
    setShowConfirm(true);
  };

  const handleConfirmYes = () => {
    const newAnggota = {
      id: Date.now(),
      nama: selectedNama,
      kelas: selectedKelas
    };

    onAddAnggota(newAnggota);
    setShowConfirm(false);
    onClose();
  };

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-80 relative">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-red-500 text-xl font-bold"
          >
            ✖
          </button>
          <h2 className="text-lg font-bold text-center mb-4">Tambah Anggota</h2>

          {/* Input Kelas */}
          <div className="mb-3">
            <label className="block font-semibold">Pilih Kelas</label>
            <select
              className="w-full p-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={selectedKelas}
              onChange={(e) => setSelectedKelas(e.target.value)}
            >
              <option value="">Pilih Kelas</option>
              {kelasList.map((kelas, index) => (
                <option key={index} value={kelas}>{kelas}</option>
              ))}
            </select>
          </div>

          {/* Input Nama */}
          <div className="mb-3">
            <label className="block font-semibold">Pilih Nama Siswa</label>
            <select
              className="w-full p-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={selectedNama}
              onChange={(e) => setSelectedNama(e.target.value)}
            >
              <option value="">Pilih Nama</option>
              {namaList.map((nama, index) => (
                <option key={index} value={nama}>{nama}</option>
              ))}
            </select>
          </div>

          {/* Tombol Tambahkan */}
          <button
            onClick={handleTambahkan}
            className="w-full mt-2 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Tambahkan
          </button>
        </div>

        {/* Pop-up Konfirmasi */}
        {showConfirm && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-4 rounded-lg shadow-lg w-72 text-center">
              <p className="mb-4 font-semibold">Anda yakin ingin menambahkan siswa tersebut?</p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={handleConfirmYes}
                  className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
                >
                  Ya
                </button>
                <button
                  onClick={() => setShowConfirm(false)}
                  className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                >
                  Tidak
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  );
}
