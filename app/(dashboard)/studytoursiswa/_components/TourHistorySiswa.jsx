'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function StudyTourCards() {
  const [events, setEvents] = useState([]);

useEffect(() => {
  fetch('http://localhost:8000/api/perjalanan-sebelumnya')
    .then((res) => res.json())
    .then((data) => {
      // ⬇️ Urutkan data berdasarkan tanggal DESC (terbaru di atas)
      const sorted = [...data].sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal));
      setEvents(sorted);
    })
    .catch((error) => console.error('Error fetching events:', error));
}, []);


  const formatTitleForURL = (title) => {
    return title
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join('-');
  };

  return (
    <div className="p-6 w-full">
      {/* Kontainer utama putih */}
      <div className="bg-white rounded-2xl shadow-md p-4">
        {/* Judul di luar scroll */}
        <h2 className="text-2xl font-bold text-[#0f285a] mb-4">Riwayat Perjalanan</h2>

        {/* Scrollable content */}
        <div className="max-h-[500px] overflow-y-auto pr-1">
          <div className="flex flex-col gap-4">
            {events.map((event, index) => (
              <Link key={index} href={`/detailevent/${encodeURIComponent(formatTitleForURL(event.title))}`}>
                <div className="bg-[#ffffff] text-black rounded-xl p-6 w-full shadow-md flex justify-between items-center h-36 border-2 border-blue-500 cursor-pointer hover:shadow-lg transition-all">
                  <div>
                    <h2 className="font-bold text-xl">{event.title}</h2>
                    <p className="text-sm font-medium opacity-80">{event.tanggal}</p>
                  </div>
                  <div className="flex-1 flex justify-center">
                    <p className="text-[#0f285a] font-bold text-2xl text-center">{event.location}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
