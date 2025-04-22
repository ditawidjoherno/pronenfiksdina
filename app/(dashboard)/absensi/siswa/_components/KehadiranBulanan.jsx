'use client';

import { useState } from 'react';
import Image from 'next/image';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function StudentCard() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const hadir = 70;
  const tidakHadir = 10;
  const terlambat = 2;

  return (
    <div className="bg-white border shadow-md rounded-2xl p-6 max-w-7xl mx-auto text-center">
      
      {/* Date Picker */}
      <div className="flex items-center space-x-4 mb-6 ml-6">
        <p className="font-semibold">Pilih Bulan & Tahun:</p>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          dateFormat="MMMM yyyy"
          showMonthYearPicker
          className="border px-3 py-2 rounded-lg shadow-sm"
        />
      </div>

      {/* Foto Profil */}
      <div className="w-36 h-36 relative rounded-full overflow-hidden mx-auto mb-6">
        <Image
          src="/images/profilsiswa.jpg"
          alt="Foto Siswa"
          layout="fill"
          objectFit="cover"
        />
      </div>

      {/* Info Siswa */}
      <h3 className="font-bold text-2xl text-gray-900">Clarissa Laurensius</h3>
      <p className="font-semibold text-lg text-black mb-5">X-A</p>

      {/* Bar Hadir */}
      <div className="flex justify-center items-center mb-4">
        <div className="w-2/3 bg-gray-200 h-8 rounded-full overflow-hidden">
          <div
            className="bg-[#5CB338] h-8 rounded-l-full"
            style={{ width: `${hadir}%` }}
          ></div>
        </div>
        <span className="ml-3 text-md font-medium">{hadir}%</span>
      </div>

      {/* Bar Tidak Hadir */}
      <div className="flex justify-center items-center mb-4">
        <div className="w-2/3 bg-gray-200 h-8 rounded-full overflow-hidden">
          <div
            className="bg-[#FB4141] h-8 rounded-l-full"
            style={{ width: `${tidakHadir}%` }}
          ></div>
        </div>
        <span className="ml-3 text-md font-medium">{tidakHadir}%</span>
      </div>

      {/* Bar Terlambat */}
      <div className="flex justify-center items-center mb-6">
        <div className="w-2/3 bg-gray-200 h-8 rounded-full overflow-hidden">
          <div
            className="bg-[#FFBB03] h-8 rounded-l-full"
            style={{ width: `${terlambat}%` }}
          ></div>
        </div>
        <span className="ml-3 text-md font-medium">{terlambat}%</span>
      </div>

      {/* Tombol Tampilkan Detail */}
      <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition duration-200">
        Tampilkan Detail
      </button>
    </div>
  );
}
