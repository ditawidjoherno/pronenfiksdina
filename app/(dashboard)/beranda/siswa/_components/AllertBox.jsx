'use client';

import { FaCheck } from 'react-icons/fa';

export default function AbsensiAlert() {
  return (
    <div className="bg-green-400 text-black rounded-md p-4 max-w-xl mx-auto shadow-md">
      <div className="flex items-center gap-2 mb-1">
        <p className="font-semibold">Absensi Telah Di isi</p>
        <FaCheck className="text-green-900 w-4 h-4" />
      </div>
      <p className="text-sm">
        Tetap pantau dan tingkatkan kehadiran anda setiap hari. Jika terjadi
        kesalahan pengisian absensi, silahkan hubungi wali kelas anda.
      </p>
    </div>
  );
}
