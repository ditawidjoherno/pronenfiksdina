import React, { useState, useEffect } from "react";
import { FaTrophy, FaPlus, FaTimes, FaTrash, FaEdit } from "react-icons/fa";
import InputKejuaraan from "./InputKejuaraan";

const AchievementBox = ({ ekskulId }) => {
  const [achievements, setAchievements] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);

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

  const handleDelete = async (achievementId) => {
    if (!confirm("Yakin ingin menghapus prestasi ini?")) return;

    try {
      const res = await fetch(`http://localhost:8000/api/achievements/${achievementId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        fetchAchievements();
      } else {
        alert("Gagal menghapus prestasi.");
      }
    } catch (err) {
      console.error("❌ Gagal hapus prestasi:", err);
    }
  };

  const handleEdit = (achievement) => {
    setEditData(achievement);
    setIsModalOpen(true);
  };

  const handleSuccessSubmit = () => {
    setIsModalOpen(false);
    setEditData(null);
    fetchAchievements();
  };

  return (
    <div className="p-4 bg-white shadow-lg rounded-2xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <FaTrophy className="text-yellow-500" /> Capaian Prestasi
        </h2>
        <button
          className="bg-[#344CB7] text-white p-2 rounded-lg flex items-center gap-2 hover:bg-blue-600"
          onClick={() => {
            setEditData(null);
            setIsModalOpen(true);
          }}
        >
          <FaPlus /> Tambah Prestasi
        </button>
      </div>
      <div className="grid gap-4 max-h-[350px] overflow-y-auto pr-2">
        {Array.isArray(achievements) &&
          achievements.map((achieve, index) => (
            <div key={index} className="border border-yellow-500 shadow-md rounded-lg p-4 bg-white relative">
              <h3 className="text-lg font-semibold">{achieve.championship}</h3>
              <p className="text-gray-600">{achieve.event}</p>
              <p className="text-sm text-gray-500">
                {new Date(achieve.date).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
              <div className="absolute top-2 right-2 flex gap-2">
                <button onClick={() => handleEdit(achieve)}>
                  <FaEdit className="text-blue-500 hover:text-blue-700" />
                </button>
                <button onClick={() => handleDelete(achieve.id)}>
                  <FaTrash className="text-red-500 hover:text-red-700" />
                </button>
              </div>
            </div>
          ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-red-500"
              onClick={() => {
                setIsModalOpen(false);
                setEditData(null);
              }}
            >
              <FaTimes size={20} />
            </button>
            <InputKejuaraan
              ekskulId={ekskulId}
              onSuccess={handleSuccessSubmit}
              initialData={editData} // kirim data jika mode edit
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AchievementBox;
