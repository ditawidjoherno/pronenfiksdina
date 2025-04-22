"use client";
import React, { useState } from "react";
import { FaDownload } from "react-icons/fa";

const initialActivities = [
  { name: "Pramuka", category: "Ekstrakulikuler", start: "01-Jan-2025", end: "30-Jun-2025", type: "Wajib", totalDays: 181 },
  { name: "Maengket", category: "Ekstrakulikuler", start: "01-Jan-2025", end: "31-Dec-2025", type: "Tidak Wajib", totalDays: 365 },
  { name: "Bali Tour", category: "Study Tour", start: "10-Mar-2025", end: "20-Mar-2025", type: "Wajib", totalDays: 10 },
  { name: "Pameran Seni", category: "Pameran", start: "05-May-2025", end: "07-May-2025", type: "Tidak Wajib", totalDays: 3 },
];

const ActivityTable = () => {
  const [activities, setActivities] = useState(initialActivities);
  const [selectedCategory, setSelectedCategory] = useState("Ekstrakulikuler");

  const filteredActivities = selectedCategory === "Semua Kegiatan"
    ? activities
    : activities.filter((activity) => activity.category === selectedCategory);

  const handleDownload = () => {
    const csvContent = [
      ["Nama Kegiatan", "Kategori", "Start", "End", "Tipe", "Total Days (Left)"]
        .join(","),
      ...filteredActivities.map(activity => [
        activity.name,
        activity.category,
        activity.start,
        activity.end,
        activity.type,
        activity.totalDays
      ].join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "daftar_kegiatan.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Daftar Kegiatan</h2>
        <button
          onClick={handleDownload}
          className="flex items-center space-x-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300"
        >
          <FaDownload />
          <span>Download</span>
        </button>
      </div>

      <div className="flex space-x-6 mb-4">
        {["Semua Kegiatan", "Ekstrakulikuler", "Study Tour", "Pameran"].map((category) => (
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
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-4 py-4 border text-gray-500">
                  Tidak ada kegiatan untuk kategori ini.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ActivityTable;
