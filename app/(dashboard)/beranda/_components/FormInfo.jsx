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

  const formattedDate = format(new Date(trimmedDate), 'yyyy-MM-dd');
  const currentTime = format(new Date(), 'hh:mm a'); // 12 jam dengan AM/PM

  const newInfo = {
    date: formattedDate,
    title: trimmedTitle,
    text: trimmedDescription,
    time: currentTime,
    color: 'bg-blue-600', // atau bisa variatif jika backend mendukung
  };

  onAddInfo(newInfo);  // Kirim ke parent yang handle fetch & token
  onClose();

  // Reset form
  setDate('');
  setTitle('');
  setDescription('');
  setError('');
};


  return (
    <div className="w-full px-4 sm:px-6 flex justify-center">
      <form
  onSubmit={handleSubmit}
  className="sm:max-w-md max-w-64 bg-white p-6 rounded-xl h-[410px] sm:h-auto"
>
        <h2 className="sm:text-lg text-md justify-center font-bold text-gray-800">Tambah Informasi</h2>

        {error && <p className="text-red-600 text-sm mt-2">{error}</p>}

        <div className="sm:mt-4 mt-2">
          <label className="block font-medium">Hari / Tanggal</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border rounded-lg sm:px-3 px-2 py-2 mt-1 bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="sm:mt-4 mt-2">
          <label className="block font-medium">Judul</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 mt-1 bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Masukkan judul"
          />
        </div>

        <div className="sm:mt-4 mt-2">
          <label className="block font-medium">Deskripsi</label>
          <div className="relative">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border sm:rounded-lg rounded-md px-3 py-2 mt-1 sm:h-24 h-10 bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Tulis deskripsi di sini..."
            />
            <FaPencilAlt className="absolute right-3 top-3 w-4 h-4 text-black" />
          </div>
        </div>

        <p className="mt-2 sm:text-sm text-xs text-gray-500">
          *Isi deskripsi dapat disesuaikan. Anda dapat mengeditnya kembali jika terjadi kekeliruan.
        </p>

        <button
          type="submit"
          className="sm:mt-4 mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg flex justify-center items-center"
        >
          <AiOutlineUpload className="h-6 w-6 mr-2" />
          Unggah
        </button>
      </form>
    </div>
  );
}
