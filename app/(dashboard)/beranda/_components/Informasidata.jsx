'use client';

import { useState, useEffect } from 'react';
import { FaBell, FaEdit, FaTrash } from 'react-icons/fa';
import Modal from 'react-modal';
import GreenButton from './TombolTambah';
import { useSession } from 'next-auth/react'; // ✅ DITAMBAHKAN
import { parseISO, format } from 'date-fns';
import { id as localeID } from 'date-fns/locale';

Modal.setAppElement(typeof document !== 'undefined' ? document.body : null);

export default function listInform() {
  const [informasiData, setInformasiData] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedInfo, setSelectedInfo] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState('');
  const { data: session } = useSession(); // ✅ DITAMBAHKAN

  const API_BASE = 'http://localhost:8000/api/informasi';

  useEffect(() => {
    fetch(API_BASE)
      .then((res) => res.json())
      .then((data) => {
        setInformasiData(data);
      });
  }, []);

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
    fetch(`${API_BASE}/${selectedInfo.id}`, { method: 'DELETE' })
      .then(() => {
        setInformasiData((prev) => prev.filter((i) => i.id !== selectedInfo.id));
        closeModal();
      });
  };

  const handleEdit = () => setIsEditing(true);

  const handleSaveEdit = () => {
    fetch(`${API_BASE}/${selectedInfo.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ text: editedText }),
    })
      .then((res) => res.json())
      .then((updated) => {
        setInformasiData((prev) =>
          prev.map((i) => (i.id === updated.id ? { ...i, text: updated.text } : i))
        );
        setIsEditing(false);
      });
  };

  const handleAddInfo = async (newInfo) => {
    console.log("📦 session.user:", session?.user); // ✅ DEBUG
    const finalInfo = {
      ...newInfo,
      author: session?.user?.name?.trim() || 'Admin Sistem', // ✅ PERBAIKAN
    };

    console.log("📦 finalInfo dikirim:", finalInfo); // ✅ DEBUG

    const res = await fetch(API_BASE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(finalInfo),
    });

    const created = await res.json();
    setInformasiData((prev) => [created, ...prev]);
  };

  // 👇 bagian lain tidak diubah


  const getShortText = (text) => {
    if (typeof text !== 'string') return '-';
    const words = text.split(' ');
    return words.length > 8 ? words.slice(0, 8).join(' ') + '...' : text;
  };

  const formatTanggal = (dateString) => {
    try {
      return format(parseISO(dateString), 'dd MMMM yyyy', { locale: localeID });
    } catch {
      return 'Tanggal tidak tersedia';
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-2 p-4 bg-white rounded-2xl shadow-md">
      <div className="flex justify-between items-center border-b pb-2">
        <h2 className="text-lg font-semibold flex items-center">
          <FaBell className="mr-2" /> Informasi Umum
        </h2>
        <GreenButton onAddInfo={handleAddInfo} />
      </div>

      <div className={`mt-4 space-y-3 ${
    informasiData.length > 2 ? 'max-h-[350px] overflow-y-auto pr-1' : ''
  }`}
>
  {informasiData.map((info) => (
          <div
            key={info.id || index}
            className="p-4 border rounded-lg shadow-sm cursor-pointer hover:bg-gray-100"
            onClick={() => openModal(info)}
          >
            <div className={`inline-block px-3 py-1 text-sm font-semibold text-white rounded-md ${info.color?.trim() || 'bg-gray-500'}`}>
              {info?.date ? formatTanggal(info.date) : 'Tanggal tidak tersedia'}
            </div>
            <h3 className="text-gray-800 font-bold mt-2">{info?.title?.trim() || 'Tanpa Judul'}</h3>
            <p className="mt-2 text-gray-700 font-medium">{getShortText(info?.text?.trim() || '-')}</p>
            <div className="mt-2 text-gray-500 text-sm flex items-center">
              <img src="/images/profil.jpg" alt="User" className="w-5 h-5 rounded-full mr-2" />
              {info?.author?.trim() || 'Anonim'} / {info?.time?.trim() || '-'}
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Informasi Detail"
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
        overlayClassName="fixed inset-0"
      >
        <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
          {selectedInfo && (
            <>
              <h2 className="text-lg font-bold mb-2">{selectedInfo?.date ? formatTanggal(selectedInfo.date) : '-'}</h2>
              <h3 className="text-gray-800 font-semibold mb-2">{selectedInfo?.title?.trim() || '-'}</h3>
              {isEditing ? (
                <textarea
                  className="w-full border p-2 rounded-lg"
                  value={editedText}
                  onChange={(e) => setEditedText(e.target.value)}
                />
              ) : (
                <p className="text-gray-700 mb-4">{selectedInfo?.text?.trim() || '-'}</p>
              )}
              <div className="text-sm text-gray-500 flex items-center">
                <img src="/images/profil.jpg" alt="User" className="w-6 h-6 rounded-full mr-2" />
                {selectedInfo?.author?.trim() || '-'} / {selectedInfo?.time?.trim() || '-'}
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
