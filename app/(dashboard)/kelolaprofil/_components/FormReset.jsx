'use client';

import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { TbEdit } from "react-icons/tb";

export default function ResetPasswordPopup({ isOpen, onClose }) {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-center font-bold text-xl">Kelola Password</h2>
        <div className="space-y-4 mt-4">
          <div>
            <label className="block text-md font-semibold">Password Lama</label>
            <div className="relative">
              <input 
                type={showOldPassword ? "text" : "password"} 
                value={oldPassword} 
                onChange={(e) => setOldPassword(e.target.value)}
                className="w-full p-2 border rounded pr-10 bg-[#d9d9d9]"
              />
              <button 
                type="button" 
                className="absolute right-3 top-3 text-gray-500"
                onClick={() => setShowOldPassword(!showOldPassword)}
              >
                {showOldPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-md font-semibold ">Password Baru</label>
            <div className="relative">
              <input 
                type={showNewPassword ? "text" : "password"} 
                value={newPassword} 
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full p-2 border rounded pr-10 bg-[#d9d9d9]"
              />
              <button 
                type="button" 
                className="absolute right-3 top-3 text-gray-500"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
              </button>
            </div>
          </div>
          <p className="text-xs text-red-600">
            *Untuk menjaga keamanan akun Anda, buatlah password yang kuat dan unik. Gunakan kombinasi huruf besar, huruf kecil, angka, dan simbol. Hindari menggunakan informasi pribadi seperti nama atau tanggal lahir.
          </p>
          <div className="flex justify-center">
          <button className="flex items-center justify-center gap-2 w-40 bg-[#E6A800] hover:bg-amber-700 text-white font-semibold py-2 rounded-md">
  <TbEdit />
  <span>Perbaharui</span>
</button>

          </div>
        </div>
        <button onClick={onClose} className="mt-4 w-full font-bold text-center text-black hover:text-red-800">Tutup</button>
      </div>
    </div>
  );
}
