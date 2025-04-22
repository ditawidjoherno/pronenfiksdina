import React, { useState } from "react";
import { FaTimes, FaCalendarAlt, FaClock } from "react-icons/fa";

const GenerateForm = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold text-center w-full">GENERATE FORM</h2>
          <button onClick={onClose} className="text-white bg-red-500 rounded-full w-6 h-6 flex items-center justify-center">
            <FaTimes />
          </button>
        </div>

        {/* Form */}
        <div className="mt-4">
          {/* Hari/Tanggal */}
          <div className="mb-3">
            <label className="block text-sm font-medium">Hari/Tanggal</label>
            <div className="relative">
              <input type="date" className="w-full p-2 bg-gray-200 rounded-md pr-10" />
              <FaCalendarAlt className="absolute right-3 top-3 text-gray-600" />
            </div>
          </div>

          {/* Mulai */}
          <div className="mb-3">
            <label className="block text-sm font-medium">Mulai</label>
            <div className="relative">
              <input type="time" className="w-full p-2 bg-gray-200 rounded-md pr-10" />
              <FaClock className="absolute right-3 top-3 text-gray-600" />
            </div>
          </div>

          {/* Selesai */}
          <div className="mb-4">
            <label className="block text-sm font-medium">Selesai</label>
            <div className="relative">
              <input type="time" className="w-full p-2 bg-gray-200 rounded-md pr-10" />
              <FaClock className="absolute right-3 top-3 text-gray-600" />
            </div>
          </div>

          {/* Tombol Save */}
          <button className="bg-green-500 text-white py-2 px-4 w-full rounded-md hover:bg-green-600">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default GenerateForm;
