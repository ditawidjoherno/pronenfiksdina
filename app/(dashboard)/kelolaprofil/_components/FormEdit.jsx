"use client";
import Image from "next/image";
import { FaEdit, FaCamera, FaRegCheckCircle } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";
import { useState, useEffect, useRef } from "react";
import useProfile from "@/hooks/useProfile";
import UpdateProfile from "@/hooks/update-profile";

export default function ProfileEditPopup({ isOpen, onClose, onUpdated }) {
  const { data, getProfileUser } = useProfile();
  const { loading, updateData, updateProfileImage } = UpdateProfile();
  const [updatedNama, setUpdatedNama] = useState('');
  const [updatedEmail, setUpdatedEmail] = useState('');
  const [updatedAgama, setUpdatedAgama] = useState('');
  const [updatedNomorHp, setUpdatedNomorHp] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const fileInputRef = useRef(null);
  const [lastUpdate, setLastUpdate] = useState(Date.now());

  useEffect(() => {
    getProfileUser();
  }, []);

  useEffect(() => {
    if (data) {
      setUpdatedNama(data.nama || '');
      setUpdatedEmail(data.email || '');
      setUpdatedAgama(data.agama || '');
      setUpdatedNomorHp(data.nomor_hp || '');
    }
  }, [data]);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  if (!isOpen) return null;

  const handleImageUpload = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
  if (!updatedNama.trim()) {
    alert("Nama tidak boleh kosong!");
    return;
  }

  let newFotoProfil = null;

  // ⬇️ Upload image dulu jika ada
  if (imageFile) {
    const updatedData = await updateProfileImage(imageFile);
    newFotoProfil = updatedData?.foto_profil; // simpan path-nya
  }

  const profileData = {
    nama: updatedNama,
    email: updatedEmail,
    agama: updatedAgama,
    nomor_hp: updatedNomorHp
  };

  await updateData(profileData);
  setImageFile(null);

  // ⬇️ Kirim timestamp baru ke parent agar gambar bisa reload
  if (onUpdated) await onUpdated(Date.now());

  onClose();
};


  return (
    <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg w-[90%] max-w-[600px]">
        <h2 className="text-2xl font-bold text-center mb-6">Kelola Profil</h2>
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="relative mt-3">
            <Image
              key={(previewUrl || data?.foto_profil) + lastUpdate}
              src={
                previewUrl
                  ? previewUrl
                  : data?.foto_profil
                  ? `http://localhost:8000/storage/${data.foto_profil}?t=${lastUpdate}`
                  : "/images/profil.jpg"
              }
              alt="Foto Profil"
              width={210}
              height={210}
              className="rounded-xl object-cover"
              priority
              unoptimized
            />
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileChange}
            />
            <button
              className="absolute -bottom-3 -right-1 bg-yellow-500 text-white p-2 rounded-full shadow-md"
              onClick={handleImageUpload}
            >
              <FaCamera />
            </button>
          </div>

          <div className="grid grid-cols-1 gap-2 w-full">
            <div>
              <p className="font-semibold text-lg">Nama</p>
              <div className="flex items-center border p-2 rounded-md">
                <input
                  type="text"
                  value={updatedNama}
                  onChange={(e) => setUpdatedNama(e.target.value)}
                  className="w-full focus:outline-none"
                />
                <FaEdit className="text-gray-500" />
              </div>
            </div>

            <div>
              <p className="font-semibold text-lg">Agama</p>
              <select
                value={updatedAgama}
                onChange={(e) => setUpdatedAgama(e.target.value)}
                className="w-full border p-2 rounded-md"
              >
                <option value="">-- Pilih Agama --</option>
                <option value="Kristen">Kristen</option>
                <option value="Islam">Islam</option>
                <option value="Hindu">Hindu</option>
                <option value="Buddha">Buddha</option>
                <option value="Konghucu">Konghucu</option>
              </select>
            </div>

            <div>
              <p className="font-semibold text-lg">No HP</p>
              <div className="flex items-center border p-2 rounded-md">
                <input
                  type="text"
                  value={updatedNomorHp}
                  onChange={(e) => setUpdatedNomorHp(e.target.value)}
                  className="w-full focus:outline-none"
                />
                <FaEdit className="text-gray-500" />
              </div>
            </div>

            <div>
              <p className="font-semibold text-lg">Email</p>
              <div className="flex items-center border p-2 rounded-md">
                <input
                  type="email"
                  value={updatedEmail}
                  onChange={(e) => setUpdatedEmail(e.target.value)}
                  className="w-full focus:outline-none"
                />
                <FaEdit className="text-gray-500" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-10">
          <button
            className="bg-green-600 text-white px-6 py-2 rounded-lg shadow-md flex items-center gap-2"
            onClick={handleSave}
            disabled={loading}
          >
            <FaRegCheckCircle /> {loading ? "Saving..." : "Simpan"}
          </button>
          <button
            className="bg-red-600 text-white px-6 py-2 rounded-lg shadow-md flex items-center gap-2"
            onClick={onClose}
          >
            <MdOutlineCancel /> Batalkan
          </button>
        </div>
      </div>
    </div>
  );
}
