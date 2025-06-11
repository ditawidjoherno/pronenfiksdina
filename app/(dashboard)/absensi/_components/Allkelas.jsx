"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation"; 
import { FaBook } from "react-icons/fa";
import AddClassButton from "./tombolkelas";

const initialClasses = [
  "X-A", "X-B", "X-C",
  "XI-A", "XI-B", "XI-C",
  "XII-A", "XII-B", "XII-C" // Tambahkan kelas sesuai kebutuhan
];

const ClassCards = () => {
  const [classes, setClasses] = useState(initialClasses);
  const router = useRouter();

  const addClass = (newClass) => {
    setClasses([...classes, newClass]);
  };

  const handleClassClick = (className) => {
    router.push(`/Inputabsensi?kelas=${encodeURIComponent(className)}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-8 w-full mt-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mt-6">
        {classes.map((className, index) => (
          <button
            key={index}
            className="flex items-center bg-[#9ba2b9] p-6 rounded-xl w-full h-24 shadow-md cursor-pointer hover:bg-[#7f869e] transition"
            onClick={() => handleClassClick(className)}
          >
            <FaBook className="text-black mr-4 text-3xl" />
            <p className="font-bold text-black text-xl">{className}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ClassCards;
