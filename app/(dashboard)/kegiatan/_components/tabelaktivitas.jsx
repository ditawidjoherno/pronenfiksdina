"use client";
import React, { useState } from "react";
import { FaEye, FaPlusCircle } from "react-icons/fa";

const initialActivities = [
  { name: "Pramuka", category: "Ekstrakulikuler", start: "01-Jan-2025", end: "30-Jun-2025", type: "Wajib", totalDays: 181 },
  { name: "Maengket", category: "Ekstrakulikuler", start: "01-Jan-2025", end: "31-Dec-2025", type: "Tidak Wajib", totalDays: 365 },
  { name: "Bali Tour", category: "Study Tour", start: "10-Mar-2025", end: "20-Mar-2025", type: "Wajib", totalDays: 10 },
  { name: "Pameran Seni", category: "Pameran", start: "05-May-2025", end: "07-May-2025", type: "Tidak Wajib", totalDays: 3 },
];

const ActivityTable = () => {
  const [activities, setActivities] = useState(initialActivities);
  const [selectedCategory, setSelectedCategory] = useState("Ekstrakulikuler");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    start: "",
    end: "",
    isMandatory: false,
  });

  const filteredActivities = activities.filter(
    (activity) => activity.category === selectedCategory
  );

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleFormSubmit = () => {
    const totalDays =
      (new Date(formData.end) - new Date(formData.start)) / (1000 * 60 * 60 * 24) + 1;

    const newActivity = {
      name: formData.name,
      category: formData.category,
      start: formData.start,
      end: formData.end,
      type: formData.isMandatory ? "Wajib" : "Tidak Wajib",
      totalDays,
    };

    setActivities([...activities, newActivity]);
    setIsModalOpen(false);
    setIsConfirmOpen(false);
    setFormData({ name: "", category: "", start: "", end: "", isMandatory: false });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsConfirmOpen(true);
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Daftar Kegiatan</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          <FaPlusCircle />
          <span>Input Kegiatan</span>
        </button>
      </div>

      <div className="flex space-x-6 mb-4">
        {["Ekstrakulikuler", "Study Tour", "Pameran"].map((category) => (
          <label key={category} className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="category"
              value={category}
              checked={selectedCategory === category}
              onChange={() => setSelectedCategory(category)}
              className="accent-black"
            />
            <span>{category}</span>
          </label>
        ))}
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-center border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">Nama Kegiatan</th>
              <th className="px-4 py-2 border">Kategori</th>
              <th className="px-4 py-2 border">Start</th>
              <th className="px-4 py-2 border">End</th>
              <th className="px-4 py-2 border">Tipe</th>
              <th className="px-4 py-2 border">Total Days (Left)</th>
              <th className="px-4 py-2 border">Detail Pelaksanaan</th>
            </tr>
          </thead>
          <tbody>
            {filteredActivities.length > 0 ? (
              filteredActivities.map((activity, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border">{activity.name}</td>
                  <td className="px-4 py-2 border">{activity.category}</td>
                  <td className="px-4 py-2 border">{activity.start}</td>
                  <td className="px-4 py-2 border">{activity.end}</td>
                  <td className="px-4 py-2 border">{activity.type}</td>
                  <td className="px-4 py-2 border">{activity.totalDays}</td>
                  <td className="px-4 py-2 border">
                    <button className="text-black hover:text-blue-500">
                      <FaEye />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="px-4 py-4 border text-gray-500">
                  Tidak ada kegiatan untuk kategori ini.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-96 shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Input Kegiatan Baru</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label>Nama Kegiatan:</label>
                <select
                  name="activty"
                  value={formData.activity}
                  onChange={handleInputChange}
                  className="w-full border px-2 py-1 rounded"
                  required
                >
                  <option value="">Pilih Kegiatan</option>
                  <option value="Pramuka">Pramuka</option>
                  <option value="Maengket">Maengket</option>
                  <option value="OSIS">OSIS</option>
                  <option value="PMR">PMR</option>
                  <option value="Pameran">Pameran</option>
                </select>
              </div>
              <div>
                <label>Kategori:</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full border px-2 py-1 rounded"
                  required
                >
                  <option value="">Pilih Kategori</option>
                  <option value="Ekstrakulikuler">Ekstrakulikuler</option>
                  <option value="Study Tour">Study Tour</option>
                  <option value="Pameran">Pameran</option>
                </select>
              </div>

              <div className="flex space-x-2">
                <div className="w-1/2">
                  <label>Start:</label>
                  <input
                    type="date"
                    name="start"
                    value={formData.start}
                    onChange={handleInputChange}
                    className="w-full border px-2 py-1 rounded"
                    required
                  />
                </div>
                <div className="w-1/2">
                  <label>End:</label>
                  <input
                    type="date"
                    name="end"
                    value={formData.end}
                    onChange={handleInputChange}
                    className="w-full border px-2 py-1 rounded"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="isMandatory"
                  checked={formData.isMandatory}
                  onChange={handleInputChange}
                  className="accent-black"
                />
                <label>Wajib diikuti oleh semua siswa</label>
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                >
                  SUBMIT
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isConfirmOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-xl shadow-md text-center">
            <p className="mb-4">Pastikan informasi sudah sesuai, lanjutkan proses 'Submit'?</p>
            <button
              onClick={handleFormSubmit}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
              YA
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActivityTable;
