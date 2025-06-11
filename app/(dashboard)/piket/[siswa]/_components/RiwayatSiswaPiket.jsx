'use client';

import { useEffect, useState } from 'react';
import { FaClipboardList } from 'react-icons/fa';

export default function AttendanceTable() {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [data, setData] = useState([]);
  const [user, setUser] = useState({
    name: '-',
    kelas: '-',
    photo: '/images/profil.png',
  });

  const monthNames = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'berkontribusi': return 'bg-green-500';
      case 'tidak berkontribusi': return 'bg-red-500';
      default: return 'bg-gray-400';
    }
  };

  useEffect(() => {
    const fetchUserAndData = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const resUser = await fetch('http://localhost:8000/api/user', {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        });
        const resultUser = await resUser.json();
        const kelas = resultUser.user.kelas;

        setUser({
          name: resultUser.user.nama,
          kelas: kelas ?? '-',
          photo: resultUser.user.foto_profil
            ? `http://localhost:8000/storage/${resultUser.user.foto_profil}`
            : '/images/profil.png',
        });

        const resData = await fetch(`http://localhost:8000/api/piket-saya?bulan=${selectedMonth}&tahun=${selectedYear}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const resultData = await resData.json();
        setData(resultData ?? []);
      } catch (err) {
        console.error('❌ Gagal ambil data:', err.message);
      }
    };

    fetchUserAndData();
  }, [selectedMonth, selectedYear]);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg w-full mt-5">
      {/* Header */}
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

      {/* User Info */}
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

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-blue-100 text-black">
              <th className="p-4 text-center font-medium border-b border-gray-300 w-[25%]">Hari / Tanggal</th>
              <th className="p-4 text-center font-medium border-b border-gray-300 w-[20%]">Berkontribusi</th>
              <th className="p-4 text-center font-medium border-b border-gray-300 w-[20%]">Tidak Berkontribusi</th>
              <th className="p-4 text-center font-medium border-b border-gray-300 w-[20%]">Waktu</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-400">Belum ada data piket</td>
              </tr>
            ) : (
              data.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="p-4 border-b border-gray-200 text-gray-700 text-center">{item.tanggal}</td>
                  <td className="p-4 border-b border-gray-200">
                    <div className={`w-6 h-6 rounded-full mx-auto ${item.status === 'berkontribusi' ? getStatusColor('berkontribusi') : 'bg-gray-300'}`} />
                  </td>
                  <td className="p-4 border-b border-gray-200">
                    <div className={`w-6 h-6 rounded-full mx-auto ${item.status === 'tidak berkontribusi' ? getStatusColor('tidak berkontribusi') : 'bg-gray-300'}`} />
                  </td>
                  <td className="p-4 border-b border-gray-200 text-gray-700 text-center">{item.waktu || '-'}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
