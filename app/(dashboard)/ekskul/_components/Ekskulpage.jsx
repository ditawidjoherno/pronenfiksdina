'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaPlus, FaUser } from 'react-icons/fa';
import { IoMdLogIn } from "react-icons/io";
import PopupForm from './EkskulForm';

const ekskulData = [
  {
    id: 1,
    name: 'OSIS',
    mentor: 'Treasure Arsinta',
    image: 'images/osis.png',
  },
];

export default function EkskulList() {
  const router = useRouter();
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleMasukClick = (ekskulName) => {
    router.push(`/ekskul/${encodeURIComponent(ekskulName.toLowerCase())}`);
  };

  return (
    <div className="p-6 bg-gray-50 flex-1 mt-10 max-w-7xl h-[485px] rounded-md overflow-auto">
      {/* Tombol Tambah Ekskul */}
      <button
        onClick={() => setIsPopupOpen(true)}
        className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 mb-4"
      >
        <FaPlus className="w-5 h-5 mr-2" /> Tambah Ekskul
      </button>

      {/* Popup Form */}
      {isPopupOpen && <PopupForm onClose={() => setIsPopupOpen(false)} />}

      {/* Kartu Ekskul */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {ekskulData.map((ekskul) => (
          <div key={ekskul.id} className="bg-blue-100 rounded-xl shadow-lg overflow-hidden">
            <img src={ekskul.image} alt={ekskul.name} className="w-full h-40 object-cover" />
            <div className="p-4">
              <h3 className="text-xl font-bold">{ekskul.name}</h3>
              <div className="flex items-center text-gray-600 text-sm mt-2">
                <FaUser className="w-4 h-4 mr-2" />
                <div>
                  <p>{ekskul.mentor}</p>
                  <p className="text-xs">Mentor</p>
                </div>
              </div>
              {/* Tombol geser ke tengah */}
              <div className="flex justify-center mt-4">
                <button
                  onClick={() => handleMasukClick(ekskul.name)}
                  className="w-450 flex items-center justify-center px-4 py-2 bg-blue-200 text-blue-700 rounded-lg hover:bg-green-300"
                >
                  <IoMdLogIn className="w-5 h-5 mr-2" /> Masuk
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
