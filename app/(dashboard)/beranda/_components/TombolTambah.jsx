// TombolTambah.jsx
'use client';

import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import FormInformasi from "./FormInfo"; // alias untuk PopupForm
import { IoMdCloseCircle } from "react-icons/io";

const GreenButton = ({ onAddInfo }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        className="bg-green-500 hover:bg-green-600 text-white rounded-lg p-2"
        onClick={() => setIsOpen(true)}
      >
        <FaPlus />
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-40">
          <div className="bg-white p-2 rounded-lg relative z-50 mt-8">
            <button
              className="absolute top-2 right-2 text-red-500 hover:text-red-600"
              onClick={() => setIsOpen(false)}
            >
              <IoMdCloseCircle size={30} />
            </button>

            {/* ⛳ Pastikan onAddInfo dikirim ke FormInformasi */}
            <FormInformasi
  onAddInfo={onAddInfo}
  onClose={() => setIsOpen(false)}
/>
          </div>
        </div>
      )}
    </div>
  );
};

export default GreenButton;
