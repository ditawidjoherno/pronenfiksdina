'use client';

import { useState } from 'react';
import { FaPencilAlt } from 'react-icons/fa';
import { AiOutlineUpload } from "react-icons/ai";

export default function FormInformasi() {
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async () => {
  const ekskulId = JSON.parse(localStorage.getItem("selectedEkskul"))?.id;
  if (!ekskulId) return;

  const payload = {
    date,
    description,
    author: "Admin",
    time: "17:00",
    color: "bg-blue-600"
  };

  try {
    const res = await fetch(`http://localhost:8000/api/ekskul/${ekskulId}/informasi`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    console.log("✅ Berhasil tambah:", data);
    window.location.reload(); // atau panggil callback jika kamu mau tanpa reload

  } catch (err) {
    console.error("❌ Gagal menambah informasi:", err);
  }
};


  return (
    <div className="p-6 w-96 rounded-lg ">
      <h2 className="text-lg font-bold">Tambah Informasi</h2>

      <div className="mt-4">
        <label className="block font-medium">Hari / Tanggal</label>
        <div className="relative">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-200"
            placeholder="Pilih tanggal"
          />
        </div>
      </div>
      
      <div className="mt-4">
        <label className="block font-medium">Deskripsi</label>
        <div className="relative">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 mt-1 h-24 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-200"
            placeholder="Tulis deskripsi di sini..."
          />
          <FaPencilAlt className="absolute right-3 top-3 w-4 h-4 text-black" />
        </div>
      </div>

      <p className="mt-2 text-sm text-red-500">
        *Isi deskripsi dapat disesuaikan dengan informasi yang diberikan. Anda dapat memperbarui atau mengeditnya sesuai kebutuhan jika terjadi kekeliruan.
      </p>

      <button onClick={handleSubmit} className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg flex justify-center items-center">
  <AiOutlineUpload className='h-6 w-6 mr-2' />
  Unggah
</button>

    </div>
  );
}
