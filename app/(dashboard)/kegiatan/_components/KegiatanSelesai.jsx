'use client';

import { motion } from 'framer-motion';
import { IoClose } from 'react-icons/io5';
import { FaEye } from 'react-icons/fa';

export default function ActivityEndPopup({ onClose }) { 
  const activities = [
    { name: "PMR", category: "Ekstrakulikuler", start: "23-Jan-2025", end: "23-Jan-2025", type: "Tidak Wajib" },
    { name: "Maengket", category: "Ekstrakulikuler", start: "01-Jan-2025", end: "02-Dec-2025", type: "Tidak Wajib"},
    { name: "Tour Bunaken", category: "Study Tour", start: "10-Feb-2025", end: "10-Feb-2025", type: "Tidak Wajib"},
    { name: "Pameran HUT Minahasa", category: "Pameran", start: "05-Feb-2025", end: "05-Feb-2025", type: "Tidak Wajib"},
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
        <div className="bg-gradient-to-r from-gray-400 to-gray-800 text-white p-5 rounded-t-2xl flex justify-between items-center">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold">Kegiatan Selesai</h2>
            <span className="bg-white text-gray-400 text-xs font-bold px-3 py-1 rounded-full">
              {activities.length} Jumlah
            </span>
          </div>
          <button onClick={onClose} className="bg-white p-1 rounded-full text-gray-400 hover:bg-gray-200 transition">
            <IoClose className="text-2xl" />
          </button>
        </div>

        {/* Konten Table */}
        <div className="p-5 overflow-y-auto max-h-80">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="p-3 text-left">Nama Kegiatan</th>
                <th className="p-3 text-left">Kategori</th>
                <th className="p-3 text-left">Start</th>
                <th className="p-3 text-left">End</th>
                <th className="p-3 text-left">Type</th>
                <th className="p-3 text-left">Detail</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity, index) => (
                <tr key={index} className="border-b hover:bg-gray-50 transition">
                  <td className="p-3">{activity.name}</td>
                  <td className="p-3">{activity.category}</td>
                  <td className="p-3">{activity.start}</td>
                  <td className="p-3">{activity.end}</td>
                  <td className="p-3">{activity.type}</td>
                  <td className="px-4 py-2 border">
                    <button className="text-black hover:text-blue-500">
                        <FaEye />
                    </button>
                 </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer Modal */}
        <div className="bg-gray-100 p-4 rounded-b-2xl flex justify-center">
          <button onClick={onClose} className="px-5 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition">
            Tutup
          </button>
        </div>
      </motion.div>
    </div>
  );
}
