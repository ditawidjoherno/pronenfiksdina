'use client';

import { motion } from 'framer-motion';
import { IoClose } from 'react-icons/io5';

export default function AmountPopup({ onClose }) { 
  const participants = [
    { id: 1, name: 'Olivia Carter Sophia', nisn: '2039918290', class: 'XI-B' },
    { id: 2, name: 'Amelia Johnson', nisn: '2039918291', class: 'XI-A' },
    { id: 3, name: 'Noah William', nisn: '2039918292', class: 'XI-C' },
    { id: 4, name: 'Liam Anderson', nisn: '2039918293',  class: 'XI-D' },
    { id: 5, name: 'Emma Brown', nisn: '2039918294',  class: 'XI-E' }
  ];

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md z-40" onClick={onClose}>
      <motion.div 
        initial={{ opacity: 0, y: 50 }} 
        animate={{ opacity: 1, y: 0 }} 
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="bg-white rounded-3xl shadow-xl max-w-3xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Modal */}
        <div className="bg-gradient-to-r from-blue-400 to-indigo-500 text-white p-5 rounded-t-2xl flex justify-between items-center">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold">Kegiatan Berlangsung</h2>
            <span className="bg-white text-blue-400 text-xs font-bold px-3 py-1 rounded-full">
              {participants.length} Jumlah
            </span>
          </div>
          <button onClick={onClose} className="bg-white p-1 rounded-full text-blue-400 hover:bg-gray-200 transition">
            <IoClose className="text-2xl" />
          </button>
        </div>

        {/* Konten Table */}
        <div className="p-5 overflow-y-auto max-h-80">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="p-3 text-left">Nomor</th>
                <th className="p-3 text-left">Nama</th>
                <th className="p-3 text-left">NISN</th>
                <th className="p-3 text-left">Kelas</th>
              </tr>
            </thead>
            <tbody>
              {participants.map((participants, index) => (
                <tr key={index} className="border-b hover:bg-gray-50 transition">
                  <td className="p-3">{participants.id}</td>
                  <td className="p-3">{participants.name}</td>
                  <td className="p-3">{participants.nisn}</td>
                  <td className="p-3">{participants.class}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer Modal */}
        <div className="bg-gray-100 p-4 rounded-b-2xl flex justify-center">
          <button onClick={onClose} className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            Tutup
          </button>
        </div>
      </motion.div>
    </div>
  );
}
