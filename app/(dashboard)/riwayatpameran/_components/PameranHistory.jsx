'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function PameranCards() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/perjalanan-sebelumnya')
      .then((res) => res.json())
      .then((data) => {
        // Urutkan berdasarkan tanggal (terbaru di atas)
        const sortedData = [...data].sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal));
        setEvents(sortedData);
      })
      .catch((error) => console.error('Error fetching events:', error));
  }, []);

  const formatSlug = (jenis, id) => {
    // Pastikan jenis tidak pakai spasi
    const cleanJenis = jenis.replace(/\s+/g, '');
    return `${cleanJenis}-${id}`;
  };

  return (
    <div className="flex flex-col gap-4 p-6 w-full">
      {events.map((event) => (
        <Link
          key={event.id}
          href={`/detailevent/${encodeURIComponent(formatSlug(event.jenis || "Pameran", event.id))}`}
        >
          <div
            className="bg-[#ffffff] text-black rounded-xl p-6 w-full shadow-md flex justify-between items-center h-36 border-2 border-blue-500 cursor-pointer hover:shadow-lg transition-all"
          >
            <div>
              <h2 className="font-bold text-xl">{event.title}</h2>
              <p className="text-sm font-medium opacity-80">{event.tanggal}</p>
            </div>
            <div className="flex-1 flex justify-center">
              <p className="text-[#0f285a] font-bold text-2xl text-center">{event.location || "-"}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
