'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { FaPlus, FaUser } from 'react-icons/fa';
import { IoMdLogIn } from 'react-icons/io';
import PopupForm from './EkskulForm';
import axios from 'axios';

export default function EkskulList() {
  const router = useRouter();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [ekskulData, setEkskulData] = useState([]);

  const API_URL = 'http://localhost:8000/api/ekskul';

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.warn('❌ Token tidak ditemukan.');
        return;
      }

      try {
        const res = await axios.get(API_URL, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const rawData = Array.isArray(res.data) ? res.data : [];
const ekskulOnly = rawData.filter(item =>
  typeof item === 'object' &&
  !Array.isArray(item) &&
  item.name !== undefined
);


        // ✅ Filter hanya item yang valid: punya `id`, `name`, dan `mentor`
        const validEkskul = rawData.filter(
          (item) =>
            typeof item === 'object' &&
            !Array.isArray(item) &&
            'name' in item &&
            'mentor' in item
        );

        console.log('✅ Ekskul valid:', validEkskul);
        setEkskulData(validEkskul);
      } catch (error) {
        console.error(
          '❌ Gagal ambil ekskul:',
          error.response?.status,
          error.response?.data || error.message
        );
      }
    };

    fetchData();
  }, []);

  const handleMasukClick = (ekskulName) => {
    router.push('/ekskul/isiekskul');
  };

  const handleAddEkskul = (newEkskul) => {
    setEkskulData((prevData) => [...prevData, newEkskul]);
    setIsPopupOpen(false);
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
      {isPopupOpen && (
        <PopupForm
          onAddEkskul={handleAddEkskul}
          onClose={() => setIsPopupOpen(false)}
        />
      )}

      {/* Kartu Ekskul */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {ekskulData.length === 0 ? (
          <p className="text-center text-gray-500 col-span-2">
            Belum ada data ekskul.
          </p>
        ) : (
          ekskulData.map((ekskul, index) => {
          const namaEkskul = ekskul.name || 'Tanpa Nama';
          const mentor = ekskul.mentor || 'Tidak Diketahui';
            const imageSrc = ekskul.image || '/images/default-image.jpg';

            console.log(`🧾 Ekskul ke-${index + 1}`, ekskul);

            return (
              <div
                key={`ekskul-${index}-${namaEkskul}`}
                className="bg-blue-100 rounded-xl shadow-lg overflow-hidden"
              >
                <img
                  src={imageSrc}
                  alt={namaEkskul}
                  className="w-full h-40 object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/images/default-image.jpg';
                  }}
                />
                <div className="p-4">
                  <h3 className="text-xl font-bold text-blue-800">{namaEkskul}</h3>
                  <div className="flex items-center text-gray-600 text-sm mt-2">
                    <FaUser className="w-4 h-4 mr-2" />
                    <div>
                      <p>{mentor}</p>
                      <p className="text-xs">Mentor</p>
                    </div>
                  </div>
                  <div className="flex justify-center mt-4">
                    <button
                      onClick={() => handleMasukClick(namaEkskul)}
                      className="w-450 flex items-center justify-center px-4 py-2 bg-blue-200 text-blue-700 rounded-lg hover:bg-green-300"
                    >
                      <IoMdLogIn className="w-5 h-5 mr-2" /> Masuk
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
