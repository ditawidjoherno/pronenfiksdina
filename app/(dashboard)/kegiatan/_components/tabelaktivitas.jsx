"use client";

import React, { useState, useEffect } from "react";
import { FaDownload } from "react-icons/fa";

const ActivityTable = () => {
  const [activities, setActivities] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Semua Kegiatan");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/api/semua-kegiatan")
      .then(res => res.json())
      .then(data => {
        if (data.status === "success") {
          const mapped = data.data.map(item => ({
            name: item.nama_kegiatan,
            category: item.category,
            start: new Date(item.start).toLocaleDateString("id-ID", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            }),
            end: new Date(item.end).toLocaleDateString("id-ID", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            }),
            totalDays: item.totalDays,
          }));
          setActivities(mapped);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filteredActivities =
    selectedCategory === "Semua Kegiatan"
      ? activities
      : activities.filter(activity => activity.category === selectedCategory);

  const handleDownload = () => {
    const csvContent = [
      ["Nama Kegiatan", "Kategori", "Start", "End", "Total Days (Left)"].join(","),
      ...filteredActivities.map(activity =>
        [activity.name, activity.category, activity.start, activity.end, activity.totalDays].join(",")
      ),
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

  if (loading) return <div>Loading...</div>;

  // Mapping internal value ke label tampil
  const categoryLabels = {
    "Semua Kegiatan": "Semua Kegiatan",
    "Ekstrakurikuler": "Ekstrakurikuler",
    "Karya Wisata": "Karya Wisata", // Label baru
    "Pameran": "Pameran"
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

      <div className="overflow-x-auto whitespace-nowrap mb-4">
        <div className="flex space-x-6">
          {["Semua Kegiatan", "Ekstrakurikuler", "Karya Wisata", "Pameran"].map(category => (
            <label key={category} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="category"
                value={category}
                checked={selectedCategory === category}
                onChange={() => setSelectedCategory(category)}
                className="accent-black"
              />
              <span>{categoryLabels[category]}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="overflow-y-auto max-h-[600px] border border-gray-300 rounded">
        <table className="min-w-full text-center">
          <thead className="bg-gray-100 sticky top-0">
            <tr>
              <th className="px-4 py-2 border">Nama Kegiatan</th>
              <th className="px-4 py-2 border">Kategori</th>
              <th className="px-4 py-2 border">Start</th>
              <th className="px-4 py-2 border">End</th>
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
                  <td className="px-4 py-2 border">
                    {activity.totalDays > 0 ? activity.totalDays : "Selesai"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-4 py-4 border text-gray-500">
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
