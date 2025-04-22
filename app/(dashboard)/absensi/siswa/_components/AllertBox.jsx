'use client';

import { FaCheck } from 'react-icons/fa';

export default function AbsensiAlert() {
  return (
    <div className="bg-[#7CD877] text-black rounded-2xl p-4 max-w-7xl mx-auto shadow-md mt-5">
      <div className="flex items-center gap-2 mb-1">
        <p className="font-semibold text-xl">Absensi Hari Ini Telah Di isi</p>
        <FaCheck className="text-green-900 w-4 h-4" />
      </div>
      <p className="text-md">
        Tetap pantau dan tingkatkan kehadiran anda setiap hari. Jika terjadi
        kesalahan pengisian absensi, silahkan hubungi wali kelas anda.
      </p>
    </div>
  );
}