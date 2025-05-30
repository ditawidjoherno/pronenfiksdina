'use client';

import { useState } from 'react';

const AttendanceTable = () => {
  const [data] = useState([
    {
      date: 'Senin, 12 Maret 2025',
      status: 'hadir',
      waktu: '07.20 am',
    },
    {
      date: 'Selasa, 13 Maret 2025',
      status: 'tidak-hadir',
      waktu: '07.20 am',
    },
    {
      date: 'Rabu, 14 Maret 2025',
      status: 'terlambat',
      waktu: '07.30 am',
    },
  ]);

  // Fungsi untuk menentukan warna berdasarkan status
  const getStatusColor = (status) => {
    switch (status) {
      case 'hadir':
        return 'bg-green-500';
      case 'tidak-hadir':
        return 'bg-red-500';
      case 'terlambat':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-400';
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg w-full mt-5">
      <h2 className="text-center font-semibold text-xl text-blue-900 mb-6">
        Maret 2025
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-blue-100 text-black">
              <th className="p-4 text-center font-medium border-b border-gray-300 w-[25%]">
                Hari / Tanggal
              </th>
              <th className="p-4 text-center font-medium border-b border-gray-300 w-[15%]">
                Hadir
              </th>
              <th className="p-4 text-center font-medium border-b border-gray-300 w-[15%]">
                Tidak Hadir
              </th>
              <th className="p-4 text-center font-medium border-b border-gray-300 w-[15%]">
                Terlambat
              </th>
              <th className="p-4 text-center font-medium border-b border-gray-300 w-[20%]">
                Waktu
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr
                key={index}
                className="hover:bg-gray-50 transition-colors duration-200"
              >
                <td className="p-4 border-b border-gray-200 text-gray-700 text-center">
                  {item.date}
                </td>

                {/* Indikator untuk Hadir */}
                <td className="p-4 border-b border-gray-200">
                  <div
                    className={`w-6 h-6 rounded-full mx-auto ${
                      item.status === 'hadir'
                        ? getStatusColor('hadir')
                        : 'bg-gray-300'
                    }`}
                  ></div>
                </td>

                {/* Indikator untuk Tidak Hadir */}
                <td className="p-4 border-b border-gray-200">
                  <div
                    className={`w-6 h-6 rounded-full mx-auto ${
                      item.status === 'tidak-hadir'
                        ? getStatusColor('tidak-hadir')
                        : 'bg-gray-300'
                    }`}
                  ></div>
                </td>

                {/* Indikator untuk Terlambat */}
                <td className="p-4 border-b border-gray-200">
                  <div
                    className={`w-6 h-6 rounded-full mx-auto ${
                      item.status === 'terlambat'
                        ? getStatusColor('terlambat')
                        : 'bg-gray-300'
                    }`}
                  ></div>
                </td>

                <td className="p-4 border-b border-gray-200 text-gray-700 text-center">
                  {item.waktu}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendanceTable;
