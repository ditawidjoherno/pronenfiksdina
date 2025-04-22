"use client";

import { useState } from "react";
import Image from "next/image";
import { FaEdit, FaKey } from "react-icons/fa";
import ProfileEditPopup from "./FormEdit";
import ResetPasswordPopup from "./FormReset";

export default function ProfileCard() {
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [isResetPopupOpen, setIsResetPopupOpen] = useState(false);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-7xl mx-auto h-[485px] flex flex-col mt-10 px-10">
      <div className="flex items-center gap-8">
        <div className="pl-10 -mt-8">
          <Image
            src="/images/profil.jpg"
            alt="Profile Picture"
            width={220}
            height={220}
            className="rounded-xl object-cover mr-24"
          />
        </div>
        <div className="grid grid-cols-2 gap-x-10 gap-y-6 w-full pl-14 mt-10">
          <div>
            <p className="font-bold text-lg">Nama</p>
            <p className="text-gray-700 font-medium text-lg">Treasure Arsinta</p>
          </div>
          <div>
            <p className="font-bold text-lg">Jabatan</p>
            <p className="text-gray-700 font-medium text-lg">Guru</p>
          </div>
          <div>
            <p className="font-bold text-lg">NIP</p>
            <p className="text-gray-700 font-medium text-lg">12345678</p>
          </div>
          <div>
            <p className="font-bold text-lg">Status</p>
            <p className="text-gray-700 font-medium text-lg">Admin</p>
          </div>
          <div>
            <p className="font-semibold text-lg">Jenis Kelamin</p>
            <p className="text-gray-700 font-medium text-lg">Perempuan</p>
          </div>
          <div>
            <p className="font-semibold text-lg">Agama</p>
            <p className="text-gray-700 font-medium text-lg">Kristen</p>
          </div>
          <div>
            <p className="font-semibold text-lg">No HP</p>
            <p className="text-gray-700 font-medium text-lg">+62xxxxxxxxxx</p>
          </div>
          <div>
            <p className="font-semibold text-lg">Email</p>
            <p className="text-gray-700 font-medium text-lg">Example@gmail.com</p>
          </div>
        </div>
      </div>

      {/* Tombol Edit Profil & Reset Password */}
      <div className="flex justify-end gap-4 mt-auto pr-2 -pb-2">
        <button 
          onClick={() => setIsEditPopupOpen(true)}
          className="flex items-center gap-2 bg-[#144A8F] hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md transition">
          <FaEdit />
          Edit Profil
        </button>
        <button 
          onClick={() => setIsResetPopupOpen(true)}
          className="flex items-center gap-2 bg-[#1F245D] hover:bg-purple-900 text-white px-4 py-2 rounded-lg shadow-md transition">
          <FaKey />
          Reset Password
        </button>
      </div>

      {/* Popup Edit Profil */}
      <ProfileEditPopup isOpen={isEditPopupOpen} onClose={() => setIsEditPopupOpen(false)} />
      
      {/* Popup Reset Password */}
      <ResetPasswordPopup isOpen={isResetPopupOpen} onClose={() => setIsResetPopupOpen(false)} />
    </div>
  );
}
