import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import FormInformasi from "./FormInformasi";

const GreenButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {/* Tombol hijau */}
      <button
        className="bg-green-500 hover:bg-green-600 text-white rounded-lg p-2"
        onClick={() => setIsOpen(true)}
      >
        <FaPlus />
      </button>

      {/* Popup Form */}
{/* Popup Form */}
{isOpen && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-40">
    <div className="p-6 rounded-lg relative z-50">
      <button
        className="absolute w-10 h-10 sm:mt-2 mt-8 sm:right-8 right-10 bg-red-500 text-white rounded-full p-2"
        onClick={() => setIsOpen(false)}
      >
        ✕
      </button>
      <FormInformasi/>
    </div>
  </div>
)}

    </div>
  );
};

export default GreenButton;
