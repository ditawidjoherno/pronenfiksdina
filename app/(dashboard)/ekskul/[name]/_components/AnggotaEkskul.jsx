'use client';

import { useState, useEffect } from "react";
import { FaSearch, FaFilter, FaUserPlus, FaUsers, FaTrash } from "react-icons/fa";
import TambahAnggotaForm from "./FormTambahAnggota";

export default function AnggotaEkskul() {
  const [anggotaEkskul, setAnggotaEkskul] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [anggotaToDelete, setAnggotaToDelete] = useState(null);

  const fetchAnggotaEkskul = async () => {
  const ekskul = JSON.parse(localStorage.getItem("selectedEkskul"));
  const ekskulId = ekskul?.id;

  if (!ekskulId) return;

  try {
    const res = await fetch(`http://localhost:8000/api/ekskul/${ekskulId}/anggota`, {
      headers: { Accept: "application/json" },
    });
    const data = await res.json();
    setAnggotaEkskul(data);
  } catch (err) {
    console.error("❌ Gagal fetch anggota ekskul:", err);
  }
};

  useEffect(() => {
  fetchAnggotaEkskul();
}, []);

  const handleAddAnggota = async (anggotaBaru) => {
  const ekskulId = JSON.parse(localStorage.getItem("selectedEkskul"))?.id;
  if (!ekskulId) return;

  try {
    const res = await fetch(`http://localhost:8000/api/ekskul/${ekskulId}/anggota`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(anggotaBaru),
    });

    if (!res.ok) throw new Error("Gagal menambahkan anggota");
    await fetchAnggotaEkskul();
  } catch (err) {
    console.error("❌ Error saat tambah anggota:", err);
    alert("Gagal menambahkan anggota. Cek konsol.");
  }
};


  const confirmDeleteAnggota = (anggota) => {
    setAnggotaToDelete(anggota);
    setShowDeleteConfirm(true);
  };

  const handleDeleteAnggota = async () => {
    if (!anggotaToDelete) return;

    try {
      const res = await fetch(`http://localhost:8000/api/ekskul/anggota/${anggotaToDelete.id}`, {
        method: "DELETE",
        headers: { Accept: "application/json" },
      });

      if (!res.ok) throw new Error("Gagal menghapus anggota");

      setShowDeleteConfirm(false);
      setAnggotaToDelete(null);
      await fetchAnggotaEkskul();
    } catch (err) {
      console.error("❌ Error saat hapus anggota:", err);
      alert("Gagal menghapus anggota.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-2 bg-white rounded-2xl shadow-lg p-3 relative">
      {/* Header */}
      <div className="flex items-center justify-between border-b pb-3 mb-1">
        <div className="flex items-center gap-3 font-semibold text-xl">
          <FaUsers className="text-gray-700" />
          <span>Anggota Ekskul</span>
        </div>
        <div className="flex gap-4 text-gray-700 text-lg">
          <FaSearch className="cursor-pointer" />
          <FaFilter className="cursor-pointer" />
        </div>
      </div>

      {/* Tabel Anggota */}
      <div className="max-h-[400px] overflow-y-auto">
        <table className="w-full text-left text-sm">
          <thead className="sticky top-0 bg-white">
            <tr className="text-gray-700 border-b mt-10">
              <th className="py-3 w-12 pl-4">No</th>
              <th className="text-center w-40">Nama</th>
              <th className="text-center w-32">NISN</th>
              <th className="text-center w-20">Kelas</th>
              <th className="w-6"></th>
            </tr>
          </thead>
          <tbody>
            {anggotaEkskul.map((anggota, index) => (
              <tr key={anggota.id} className="border-b">
                <td className="py-4 text-center">{index + 1}.</td>
                <td className="py-4 text-left">
  <div className="flex items-center gap-3">
                    <img
                      src="/images/profilsiswa.jpg"
                      alt="avatar"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="font-medium">{anggota.nama}</span>
                  </div>
                </td>
                <td className="py-4 text-center">{anggota.nisn || '-'}</td>
                <td className="py-4 text-center">{anggota.kelas}</td>
                <td className="py-4 text-center">
                  <div className="flex justify-center items-center gap-2">
                    <span
                      className={`w-4 h-4 rounded-full inline-block ${
                        anggota.status === "green" ? "bg-green-500" : "bg-orange-500"
                      }`}
                    ></span>
                    <button onClick={() => confirmDeleteAnggota(anggota)}>
                      <FaTrash className="text-red-500 hover:text-red-700" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Tombol Tambah */}
      <div className="flex justify-center mt-5">
        <button
          onClick={() => setIsPopupOpen(true)}
          className="w-[250px] h-[40px] bg-blue-600 text-white flex items-center justify-center gap-3 py-3 rounded-lg text-lg hover:bg-blue-700 transition"
        >
          <FaUserPlus />
          Tambah Anggota
        </button>
      </div>

      {/* Modal Tambah Anggota */}
      {isPopupOpen && (
        <TambahAnggotaForm
          onAddAnggota={handleAddAnggota}
          onClose={() => setIsPopupOpen(false)}
        />
      )}

      {/* Modal Konfirmasi Hapus */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg w-72 text-center">
            <p className="mb-4 font-semibold">Yakin ingin menghapus anggota ini?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleDeleteAnggota}
                className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
              >
                Ya
              </button>
              <button
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setAnggotaToDelete(null);
                }}
                className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
              >
                Tidak
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
