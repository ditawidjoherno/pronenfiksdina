'use client';

import { useState, useEffect } from 'react';

export default function PopupForm() {
  const [isOpen, setIsOpen] = useState(true);
  const [admins, setAdmins] = useState([]);
  const [selectedAdmin, setSelectedAdmin] = useState('');

  useEffect(() => {
    // Simulasi fetch data admin, bisa diganti dengan API call
    setAdmins([
      { id: 1, name: 'Admin A' },
      { id: 2, name: 'Admin B' },
      { id: 3, name: 'Admin C' }
    ]);
  }, []);

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-80 relative">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-3 right-3 text-red-500 text-xl font-bold"
          >
            ✖
          </button>
          <h2 className="text-lg font-bold text-center mb-4">Tambah Ekskul</h2>
          <div>
            <label className="block font-semibold">Ekstra Kulikuler</label>
            <input
              type="text"
              className="w-full p-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="mt-3">
            <label className="block font-semibold">Mentor (Admin)</label>
            <select
              className="w-full p-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={selectedAdmin}
              onChange={(e) => setSelectedAdmin(e.target.value)}
            >
              <option value="">Pilih Mentor</option>
              {admins.map((admin) => (
                <option key={admin.id} value={admin.id}>{admin.name}</option>
              ))}
            </select>
          </div>
          <button
            className="w-full mt-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Buat
          </button>
        </div>
      </div>
    )
  );
}