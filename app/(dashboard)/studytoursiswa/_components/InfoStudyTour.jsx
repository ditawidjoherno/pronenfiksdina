'use client';

import { useEffect, useState } from "react";
import { FaBullhorn } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { format, parseISO } from "date-fns";
import { id as localeID } from "date-fns/locale";

export default function TourCardSiswa() {
  const router = useRouter();
  const [title, setTitle] = useState("-");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [isLoading, setIsLoading] = useState(true);

  const formattedDate = format(parseISO(date), "EEEE, dd MMMM yyyy", {
    locale: localeID,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/studytour-info");
        const data = await res.json();

        if (res.ok && data) {
          setTitle(data.title || "-");
          setDate(data.tanggal || date);
        }
      } catch (err) {
        console.error("Gagal fetch data awal:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleClick = () => {
    router.push("/studytourdetail");
  };

  return (
    <div
      className="bg-[#869ddd] p-6 rounded-2xl shadow-lg w-full max-w-7xl h-[220px] mt-5 flex justify-between items-start cursor-pointer hover:opacity-90 relative"
      onClick={handleClick}
    >
      <div className="flex-1 flex flex-col justify-center">
        <div className="flex items-center gap-3">
          <FaBullhorn className="text-white text-2xl" />
          <h2 className="text-white font-semibold sm:text-2xl text-xl">Study Tour</h2>
        </div>

        <p className="text-white font-medium sm:text-xl text-md mt-1">
          {formattedDate}
        </p>

        <div className="flex justify-center items-center sm:ml-28 ml-0 sm:mt-2 mt-4">
          <p className="sm:text-3xl text-2xl font-bold text-blue-950">
            {title}
          </p>
        </div>
      </div>

      <div className="sm:w-24 w-20 sm:h-24 h-20 sm:mr-8 mr2 overflow-hidden flex-shrink-0 mt-10">
        <img
          src="/images/tour.png"
          alt="Foto Study Tour"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
