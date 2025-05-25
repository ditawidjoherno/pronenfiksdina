"use client";
import React, { useState } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import GenerateForm from "./formgen"; // Pastikan file GenerateForm sudah dibuat

const GenerateButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex flex-col items-center">
      {/* Tombol untuk membuka form */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="flex items-center bg-blue-600 text-white font-bold px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
      >
        <FaExternalLinkAlt className="mr-2" />
        Generate Form
      </button>

      {/* Modal Form */}
      <GenerateForm isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default GenerateButton;
