'use client';

import { useState } from 'react';
import { FaBell, FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import Modal from 'react-modal';
import GreenButton from './TombolTambah';

// Menambahkan setAppElement untuk menghindari peringatan
Modal.setAppElement(typeof document !== 'undefined' ? document.body : null);

const initialInformasiEkskulData = [
  {
    id: 1,
    date: '03 Jan, 2025',
    ekskul: 'OSIS',
    text: 'Latihan ekskul basket diundur menjadi pukul 16.00 WIB.',
    author: 'Shelly Shaut',
    time: '17.30 pm',
    color: 'bg-yellow-400'
  },
  {
    id: 2,
    date: '02 Jan, 2025',
    ekskul: 'OSIS',
    text: 'Ekskul tari akan tampil di acara sekolah, harap hadir tepat waktu.',
    author: 'Jessica Dean',
    time: '17.30 pm',
    color: 'bg-blue-600'
  },
  {
    id: 3,
    date: '01 Jan, 2025',
    ekskul: 'OSIS',
    text: 'Ekskul pramuka mengadakan pertemuan wajib pada hari Jumat.',
    author: 'Priska',
    time: '17.30 pm',
    color: 'bg-blue-600'
  }
];

export default function InformasiEkskul() {
  const [informasiData, setInformasiData] = useState(initialInformasiEkskulData);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedInfo, setSelectedInfo] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState('');

  const openModal = (info) => {
    setSelectedInfo(info);
    setEditedText(info.text);
    setModalIsOpen(true);
    setIsEditing(false);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedInfo(null);
  };

  const handleDelete = () => {
    setInformasiData(informasiData.filter((item) => item.id !== selectedInfo.id));
    closeModal();
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    setInformasiData(
      informasiData.map((item) =>
        item.id === selectedInfo.id ? { ...item, text: editedText } : item
      )
    );
    setIsEditing(false);
  };

  return (
    <div className="max-w-2xl mx-auto mt-2 p-4 bg-white rounded-2xl shadow-md">
      <div className="flex justify-between items-center border-b pb-2">
        <h2 className="text-lg font-semibold flex items-center">
          <FaBell className="mr-2" /> Informasi Ekskul
        </h2>
        <GreenButton/>
      </div>
      <div className="mt-4 space-y-3">
        {informasiData.map((info) => (
          <div 
            key={info.id} 
            className="p-4 border rounded-lg shadow-sm cursor-pointer hover:bg-gray-100"
            onClick={() => openModal(info)}
          >
            <div className={`inline-block px-3 py-1 text-sm font-semibold text-white rounded-md ${info.color}`}>
              {info.date}
            </div>
            <p className="mt-2 text-lg text-blue-900 font-semibold">{info.ekskul}</p>
            <p className="text-gray-700 font-medium">{info.text}</p>
            <div className="mt-2 text-gray-500 text-sm flex items-center">
              <img src="/images/profil.jpg" alt="User" className="w-5 h-5 rounded-full mr-2" />
              {info.author} / {info.time}
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Informasi Detail"
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
        overlayClassName="fixed inset-0"
      >
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
          {selectedInfo && (
            <>
              <h2 className="text-lg font-bold mb-2">{selectedInfo.date}</h2>
              <p className="text-gray-600 font-semibold">{selectedInfo.ekskul}</p>
              {isEditing ? (
                <textarea
                  className="w-full border p-2 rounded-lg"
                  value={editedText}
                  onChange={(e) => setEditedText(e.target.value)}
                />
              ) : (
                <p className="text-gray-700 mb-4">{selectedInfo.text}</p>
              )}
              <div className="text-sm text-gray-500 flex items-center">
                <img src="images/profil.jpg" alt="User" className="w-6 h-6 rounded-full mr-2" />
                {selectedInfo.author} / {selectedInfo.time}
              </div>
              <div className="mt-4 flex justify-end space-x-2">
                {isEditing ? (
                  <button
                    onClick={handleSaveEdit}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg"
                  >
                    Simpan
                  </button>
                ) : (
                  <button
                    onClick={handleEdit}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded-lg flex items-center"
                  >
                    <FaEdit className="mr-1" /> Edit
                  </button>
                )}
                <button
                  onClick={handleDelete}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg flex items-center"
                >
                  <FaTrash className="mr-1" /> Hapus
                </button>
                <button
                  onClick={closeModal}
                  className="bg-gray-400 hover:bg-gray-500 text-white px-3 py-2 rounded-lg"
                >
                  Tutup
                </button>
              </div>
            </>
          )}
        </div>
      </Modal>
    </div>
  );
}
