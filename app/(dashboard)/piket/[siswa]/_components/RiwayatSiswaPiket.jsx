'use client';

import { useState } from 'react';
import { FaClipboardList } from 'react-icons/fa';

const AttendanceTable = () => {
  const [selectedMonth, setSelectedMonth] = useState(3); // Maret
  const [selectedYear, setSelectedYear] = useState(2025);

  // Dummy user data
  const user = {
    name: "Akio",
    kelas: "X-A",
    photo: "/images/profil.png", // Ganti sesuai path gambar profil siswa
  };

  const [data] = useState([
    { date: 'Senin, 12 Maret 2025', status: 'hadir', waktu: '07.20 am' },
    { date: 'Selasa, 13 Maret 2025', status: 'tidak-hadir', waktu: '07.20 am' },
    { date: 'Rabu, 14 Maret 2025', status: 'terlambat', waktu: '07.30 am' },
  ]);

  const monthNames = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'hadir': return 'bg-green-500';
      case 'tidak-hadir': return 'bg-red-500';
      case 'terlambat': return 'bg-yellow-500';
      default: return 'bg-gray-400';
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg w-full mt-5">

      {/* Header + filter bulan/tahun */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <FaClipboardList className="text-blue-700 text-2xl" />
          <h2 className="font-semibold text-xl text-black">Riwayat Piket Kelas</h2>
        </div>
        <div className="flex space-x-4">
          <select
            className="border border-gray-300 rounded px-2 py-1"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
          >
            {monthNames.map((bulan, i) => (
              <option key={i} value={i + 1}>{bulan}</option>
            ))}
          </select>
          <select
            className="border border-gray-300 rounded px-2 py-1"
            value={selectedYear}
            onChange={(e) => setSelectedYear(parseInt(e.target.value))}
          >
            {[2024, 2025, 2026].map((tahun) => (
              <option key={tahun} value={tahun}>{tahun}</option>
            ))}
          </select>
        </div>
      </div>
            <div className="flex items-center mb-6">
        <img
          src={user.photo}
          alt="Foto Profil"
          className="w-16 h-16 rounded-full mr-4 border-2 border-blue-300"
        />
        <div>
          <h2 className="text-xl font-semibold text-gray-800">{user.name}</h2>
          <p className="text-gray-500">{user.kelas}</p>
        </div>
      </div>

      {/* Tabel */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-blue-100 text-black">
              <th className="p-4 text-center font-medium border-b border-gray-300 w-[25%]">Hari / Tanggal</th>
              <th className="p-4 text-center font-medium border-b border-gray-300 w-[15%]">Hadir</th>
              <th className="p-4 text-center font-medium border-b border-gray-300 w-[15%]">Tidak Hadir</th>
              <th className="p-4 text-center font-medium border-b border-gray-300 w-[15%]">Terlambat</th>
              <th className="p-4 text-center font-medium border-b border-gray-300 w-[20%]">Waktu</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-colors duration-200">
                <td className="p-4 border-b border-gray-200 text-gray-700 text-center">{item.date}</td>
                <td className="p-4 border-b border-gray-200">
                  <div className={`w-6 h-6 rounded-full mx-auto ${item.status === 'hadir' ? getStatusColor('hadir') : 'bg-gray-300'}`} />
                </td>
                <td className="p-4 border-b border-gray-200">
                  <div className={`w-6 h-6 rounded-full mx-auto ${item.status === 'tidak-hadir' ? getStatusColor('tidak-hadir') : 'bg-gray-300'}`} />
                </td>
                <td className="p-4 border-b border-gray-200">
                  <div className={`w-6 h-6 rounded-full mx-auto ${item.status === 'terlambat' ? getStatusColor('terlambat') : 'bg-gray-300'}`} />
                </td>
                <td className="p-4 border-b border-gray-200 text-gray-700 text-center">{item.waktu}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendanceTable;
