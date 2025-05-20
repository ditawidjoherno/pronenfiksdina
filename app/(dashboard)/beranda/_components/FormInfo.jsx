'use client';

import { useState } from 'react';
import { FaPencilAlt } from 'react-icons/fa';
import { AiOutlineUpload } from 'react-icons/ai';
import { format } from 'date-fns';

export default function FormInformasi({ onAddInfo, onClose }) {
  const [date, setDate] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedDate = date?.trim?.() || '';
    const trimmedTitle = title?.trim?.() || '';
    const trimmedDescription = description?.trim?.() || '';

    if (!trimmedDate || !trimmedTitle || !trimmedDescription) {
      setError('Semua field wajib diisi!');
      return;
    }

    // Kirim ke backend dalam format YYYY-MM-DD agar bisa disimpan rapi
    const formattedDate = format(new Date(trimmedDate), 'yyyy-MM-dd');
    const currentTime = format(new Date(), 'HH:mm a');

    const newInfo = {
      date: formattedDate, // backend akan simpan seperti '2025-05-22'
      title: trimmedTitle,
      text: trimmedDescription,
      time: currentTime,
      color: 'bg-blue-600',
    };

    onAddInfo(newInfo);
    onClose();

    // Reset form
    setDate('');
    setTitle('');
    setDescription('');
    setError('');
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 w-96 rounded-lg">
      <h2 className="text-lg font-bold">Tambah Informasi</h2>

      {error && <p className="text-red-600 text-sm mt-2">{error}</p>}

      <div className="mt-4">
        <label className="block font-medium">Hari / Tanggal</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-200"
        />
      </div>

      <div className="mt-4">
        <label className="block font-medium">Judul</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-200"
          placeholder="Masukkan judul"
        />
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

      <p className="mt-2 text-sm text-gray-500">
        *Isi deskripsi dapat disesuaikan. Anda dapat mengeditnya kembali jika terjadi kekeliruan.
      </p>

      <button
        type="submit"
        className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg flex justify-center items-center"
      >
        <AiOutlineUpload className="h-6 w-6 mr-2" />
        Unggah
      </button>
    </form>
  );
}
