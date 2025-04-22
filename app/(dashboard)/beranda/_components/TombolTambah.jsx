import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import PopupForm from "./FormInfo"; // Pastikan path sesuai
import { IoMdCloseCircle } from "react-icons/io";

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
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-40">
          <div className="bg-white p-2 rounded-lg relative z-50 mt-8">
            {/* Tombol close pakai ikon */}
            <button
              className="absolute top-2 right-2 text-red-500 hover:text-red-600"
              onClick={() => setIsOpen(false)}
            >
              <IoMdCloseCircle size={30} />
            </button>
            <PopupForm />
          </div>
        </div>
      )}
    </div>
  );
};

export default GreenButton;
