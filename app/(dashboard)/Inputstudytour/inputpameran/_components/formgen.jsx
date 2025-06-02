import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";

const GenerateForm = ({ isOpen, onClose, onSave }) => {
  const [date, setDate] = useState("");
  const [cost, setCost] = useState("");
  const [endDate, setEndDate] = useState("");

  if (!isOpen) return null;

  const handleSave = () => {
    // Ubah endDate menjadi nama hari
    const dayName = new Date(endDate).toLocaleDateString("id-ID", { weekday: "long" });

    onSave({
      date,
      cost,
      end: dayName, // hanya kirim nama hari
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-center w-full">Generate Form</h2>
          <button
            onClick={onClose}
            className="text-white bg-red-500 rounded-full w-6 h-6 flex items-center justify-center"
          >
            <FaTimes />
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium">Hari / Tanggal Kegiatan</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-2 bg-gray-200 rounded-md mb-3"
          />

          <label className="block text-sm font-medium">Biaya</label>
          <input
            type="text"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            className="w-full p-2 bg-gray-200 rounded-md mb-3"
          />

          <label className="block text-sm font-medium">Batas Pengumpulan</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full p-2 bg-gray-200 rounded-md mb-4"
          />

          <button
            onClick={handleSave}
            className="bg-green-500 text-white py-2 px-4 w-full rounded-md hover:bg-green-600"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default GenerateForm;
