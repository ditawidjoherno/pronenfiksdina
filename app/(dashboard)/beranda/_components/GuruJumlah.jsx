'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { IoClose } from 'react-icons/io5';

export default function TeacherPopup({ onClose }) { 
  const students = [
    { id: 1, name: 'Olivia Carter Sophia', nip: '2039918290', gender: 'Perempuan', class: 'XI-B' },
    { id: 2, name: 'Amelia Johnson', nip: '2039918291', gender: 'Perempuan', class: 'Kesiswaan' },
    { id: 3, name: 'Noah William', nip: '2039918292', gender: 'Laki-laki', class: 'XI-C' },
    { id: 4, name: 'Liam Anderson', nip: '2039918293', gender: 'Laki-laki', class: 'XI-D' },
    { id: 5, name: 'Emma Brown', nip: '2039918294', gender: 'Perempuan', class: 'Kesiswaan' }
  ];

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md z-40" onClick={onClose}>
      <motion.div 
        initial={{ opacity: 0, y: 50 }} 
        animate={{ opacity: 1, y: 0 }} 
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="bg-white rounded-2xl shadow-xl max-w-lg w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Modal */}
        <div className="bg-gradient-to-r from-pink-500 to-red-300 text-white p-5 rounded-t-2xl flex justify-between items-center">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold">Daftar Guru</h2>
            <span className="bg-white text-pink-600 text-xs font-bold px-3 py-1 rounded-full">
              {students.length} Guru
            </span>
          </div>
          <button onClick={onClose} className="bg-white p-1 rounded-full text-pink-600 hover:bg-gray-200 transition">
            <IoClose className="text-2xl" />
          </button>
        </div>

        {/* Konten Table */}
        <div className="p-5 overflow-y-auto max-h-80">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="p-3 text-left">No</th>
                <th className="p-3 text-left">Nama</th>
                <th className="p-3 text-left">NIP</th>
                <th className="p-3 text-left">Gender</th>
                <th className="p-3 text-left">Kelas</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr key={student.id} className="border-b hover:bg-gray-50 transition">
                  <td className="p-3">{index + 1}.</td>
                  <td className="p-3 flex items-center gap-2">
                    <Image src="/images/profilsiswa.jpg" alt="Avatar" width={28} height={28} className="rounded-full border" />
                    {student.name}
                  </td>
                  <td className="p-3">{student.nip}</td>
                  <td className="p-3">{student.gender}</td>
                  <td className="p-3">{student.class}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer Modal */}
        <div className="bg-gray-100 p-4 rounded-b-2xl flex justify-center">
          <button onClick={onClose} className="px-5 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition">
            Tutup
          </button>
        </div>
      </motion.div>
    </div>
  );
}
