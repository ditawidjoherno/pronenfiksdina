'use client';
import { FaListAlt } from "react-icons/fa";
import { useState, useEffect } from "react";

export default function HarianAbsensi() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [statusKehadiran, setStatusKehadiran] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStatus(selectedDate);
  }, [selectedDate]);

  const fetchStatus = async (date) => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');

      const response = await fetch(`http://localhost:8000/api/absensi-hari-ini?tanggal=${date}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      console.log('✅ Respon dari API:', data);

      if (!data.status) {
        setStatusKehadiran('belum_absen');
      } else {
        setStatusKehadiran(data.status.toLowerCase());
      }

    } catch (error) {
      console.error('❌ Gagal ambil absensi:', error.message);
      setStatusKehadiran('belum_absen');
    } finally {
      setLoading(false);
    }
  };

  const renderStatus = () => {
    switch (statusKehadiran) {
      case 'hadir':
        return {
          text: 'Mantap! Kamu hadir hari ini',
          image: '/images/Mantap.png',
          color: '#50bb2c',
          textColor: '#154306',
        };
      case 'tidak_hadir':
        return {
          text: 'Yah, kamu tidak hadir hari ini',
          image: '/images/Yah.png',
          color: '#e53e3e',
          textColor: '#7b1212',
        };
      case 'terlambat':
        return {
          text: 'Wah, kamu hari ini terlambat',
          image: '/images/Wah.png',
          color: '#f6ad55',
          textColor: '#7a3e03',
        };
      case 'belum_absen':
        return {
          text: 'Halo, jangan lupa hadir tepat waktu ya!',
          image: '/images/Halo.png',
          color: '#cbd5e1',
          textColor: '#1e293b',
        };
      default:
        return {
          text: 'Status kehadiran tidak diketahui',
          image: '/images/default.png',
          color: '#d1d5db',
          textColor: '#1f2937',
        };
    }
  };

  const { text, image, color, textColor } = renderStatus();

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 bg-white rounded-2xl shadow-md space-y-4 text-sm sm:text-base">
      <div>
        <h2 className="text-base sm:text-lg font-semibold flex items-center mb-2">
          <FaListAlt className="mr-2" /> Absensi Kehadiran Apel Pagi
        </h2>
        <p className="text-gray-600 text-sm">{selectedDate}</p>
      </div>

      <div className="flex justify-start">
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="border border-gray-300 rounded px-2 py-1 text-sm w-full sm:w-auto"
        />
      </div>

      {loading ? (
        <div className="text-center text-gray-500 mt-10">Memuat status kehadiran...</div>
      ) : (
        <>
          <div className="flex justify-center">
            <img
              src={image}
              alt="status"
              className="w-[120px] h-[120px] sm:w-[160px] sm:h-[160px] object-contain mt-5 mb-8"
            />
          </div>

          <div className="py-3 px-4 rounded text-center" style={{ backgroundColor: color }}>
            <h3 className="font-semibold text-sm sm:text-base" style={{ color: textColor }}>
              {text}
            </h3>
          </div>
        </>
      )}
    </div>
  );
}
