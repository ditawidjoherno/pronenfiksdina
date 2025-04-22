'use client';

import Link from 'next/link';

export default function StudyTourCards() {
  const events = [
    { title: 'Study Tour', date: '01, Mar, 2025', location: 'Benteng Moraya Tondano' },
    { title: 'Pameran', date: '01, Mar, 2025', location: 'HUT Minahasa ke 578' },
    { title: 'Study Tour', date: '01, Mar, 2025', location: 'Taman Budaya' },
  ];

  const formatTitleForURL = (title) => {
    return title
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join('-');
  };

  return (
    <div className="flex flex-col gap-4 p-6 w-full">
      {events.map((event, index) => (
        <Link key={index} href={`/detailevent/${encodeURIComponent(formatTitleForURL(event.title))}`}>
          <div
            className="bg-[#ffffff] text-black rounded-xl p-6 w-full shadow-md flex justify-between items-center h-36 border-2 border-blue-500 cursor-pointer hover:shadow-lg transition-all"
          >
            <div>
              <h2 className="font-bold text-xl">{event.title}</h2>
              <p className="text-sm font-medium opacity-80">{event.date}</p>
            </div>
            <div className="flex-1 flex justify-center">
              <p className="text-[#0f285a] font-bold text-2xl text-center">{event.location}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}