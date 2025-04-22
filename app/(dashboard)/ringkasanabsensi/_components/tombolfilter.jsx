import React, { useState } from "react";
import { FaHourglassHalf } from "react-icons/fa";

const classes = ["Semua Kelas", "X-A", "X-B", "X-C", "XI-A", "XI-B", "XI-C", "XII-A", "XII-B", "XII-C"];

const FilterButton = ({ onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg shadow-md hover:bg-gray-300 transition"
      >
        <FaHourglassHalf className="text-sm" />
        <span className="text-sm font-medium">Filter</span>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute left-0 mt-2 w-40 bg-white border border-gray-300 rounded-lg shadow-md z-10">
          {classes.map((kelas) => (
            <button
              key={kelas}
              onClick={() => {
                onSelect(kelas); // Kirim nilai kelas yang dipilih
                setIsOpen(false); // Tutup dropdown setelah memilih
              }}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              {kelas}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterButton;
