'use client';

import { FaCalendarAlt, FaClock, FaThumbtack } from 'react-icons/fa';

function convertToAmPm(timeStr) {
  const [time] = timeStr.split(' ');
  let [hour, minute] = time.split(':').map(Number);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  hour = hour % 12 || 12;
  return `${hour}:${minute.toString().padStart(2, '0')} ${ampm}`;
}

export default function Reminder() {
  const reminders = [
    {
      kategori: 'Ekstrakulikuler',
      judul: 'Osis',
      deskripsi: 'Update rapat osis.',
      waktu: {
        hari: 'Senin',
        tanggal: '07 April 2025',
        jam: '14:00 WITA'
      }
    },
    {
      kategori: 'Study Tour',
      judul: 'Persiapan',
      deskripsi: 'Berkas harus dikumpul paling lambat minggu ini.',
      waktu: {
        hari: 'Selasa',
        tanggal: '08 April 2025',
        jam: '09:00 WITA'
      }
    },
    {
      kategori: 'Piket Harian',
      judul: 'Jadwal Baru',
      deskripsi: 'Jadwal piket telah diperbarui di papan pengumuman.',
      waktu: {
        hari: 'Rabu',
        tanggal: '09 April 2025',
        jam: '07:00 WITA'
      }
    }
  ];

  return (
    <div className="max-w-7xl mx-auto mt-2 p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-left text-xl font-semibold mb-6 flex items-center gap-2">
        <FaThumbtack className="text-red-600 rotate-45" />
        Reminder
      </h2>

      <div className="space-y-4">
        {reminders.map((item, index) => (
          <div
            key={index}
            className="bg-[#d9e0f3] rounded-lg px-5 py-4 text-black"
          >
            {/* Header waktu */}
            <div className="flex justify-between items-center text-sm text-gray-700 mb-3">
              <div className="flex items-center">
                <FaCalendarAlt className="mr-1 text-gray-600" />
                {item.waktu.hari}, {item.waktu.tanggal}
              </div>
              <div className="flex items-center">
                <FaClock className="mr-1 text-gray-600" />
                {convertToAmPm(item.waktu.jam)}
              </div>
            </div>

            {/* Konten */}
            <div className="space-y-2">
              <p className="font-bold text-gray-700">{item.kategori}</p>
              <h3 className="text-md font-bold text-blue-900">{item.judul}</h3>
              <p className="text-sm">{item.deskripsi}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
