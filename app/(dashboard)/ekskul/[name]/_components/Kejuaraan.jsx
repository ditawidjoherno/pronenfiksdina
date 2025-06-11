import React, { useState, useEffect } from "react";
import { FaTrophy } from "react-icons/fa";

const AchievementBox = ({ ekskulId }) => {
  const [achievements, setAchievements] = useState([]);

  const fetchAchievements = async () => {
    try {
      const res = await fetch(`http://localhost:8000/api/ekskul/${ekskulId}/achievements`);
      if (!res.ok) throw new Error("Gagal fetch data prestasi");
      const data = await res.json();
      setAchievements(data);
    } catch (err) {
      console.error("❌ Gagal ambil prestasi:", err);
    }
  };

  useEffect(() => {
    if (!ekskulId) return;
    fetchAchievements();
  }, [ekskulId]);

  return (
    <div className="p-4 bg-white shadow-lg rounded-2xl h-[440px] max-sm:p-3">
      {/* Header */}
      <div className="flex justify-between items-center mb-4 max-sm:flex-col max-sm:items-start max-sm:gap-3">
        <h2 className="text-xl font-bold flex items-center gap-2 max-sm:text-lg">
          <FaTrophy className="text-yellow-500" /> Capaian Prestasi
        </h2>
      </div>

      {/* List Prestasi */}
      <div className="grid gap-4 max-h-[350px] overflow-y-auto pr-2">
        {Array.isArray(achievements) && achievements.length > 0 ? (
          achievements.map((achieve, index) => (
            <div
              key={index}
              className="border border-yellow-500 shadow-md rounded-lg p-4 bg-white max-sm:p-3"
            >
              <h3 className="text-lg font-semibold max-sm:text-base">{achieve.championship}</h3>
              <p className="text-gray-600 max-sm:text-sm">{achieve.event}</p>
              <p className="text-sm text-gray-500 mt-1">
                {new Date(achieve.date).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center py-10">Belum ada data prestasi</p>
        )}
      </div>
    </div>
  );
};

export default AchievementBox;