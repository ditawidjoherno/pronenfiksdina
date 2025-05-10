'use client';
import React, { useState } from 'react';
import { FiEdit, FiSave } from 'react-icons/fi';

const EkskulCard = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState(
    "Tari Maengket adalah tarian tradisional suku Minahasa, Sulawesi Utara, yang diwariskan secara turun-temurun. Di ekskul ini, tarian ini dipelajari sebagai bentuk pelestarian budaya, sekaligus menggambarkan kebersamaan, gotong royong, dan kehidupan sosial masyarakat Minahasa"
  );

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  return (
    <div className="border-[#94a6d8] border-4 bg-white text-black p-4 rounded-xl max-w-7xl mx-auto">
      <h1 className="flex justify-start text-[#121e42] text-2xl font-bold mb-3">Deskripsi</h1>
      {isEditing ? (
        <textarea
          className="w-full p-2 border border-gray-400 rounded-md"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      ) : (
        <p className="text-lg text-black leading-relaxed">{description}</p>
      )}
      <button
        onClick={isEditing ? handleSave : handleEdit}
        className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2"
      >
        {isEditing ? <FiSave size={20} /> : <FiEdit size={20} />}
      </button>
    </div>
  );
};

export default EkskulCard;