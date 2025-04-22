'use client';

import { FaEdit } from 'react-icons/fa';
import { MdOutlineLockReset } from 'react-icons/md';

const ProfileDetail = ({ user, onClose }) => {
  if (!user) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="max-w-4xl bg-white p-8 rounded-2xl shadow-xl relative w-full">
        {/* Tombol Close */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition duration-200"
          onClick={onClose}
        >
          ✖
        </button>

        <h2 className="text-center text-2xl font-semibold mb-6 text-gray-800">
          Detail Profil
        </h2>

        <div className="grid grid-cols-3 gap-6">
          {/* Profile Picture */}
          <div className="col-span-1 flex justify-center mr-12">
            <div className="w-28 h-28 bg-gray-100 rounded-2xl overflow-hidden shadow-md">
              <img
                src={user.image || '/images/default-profile.png'}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Profile Data */}
          <div className="col-span-2 grid grid-cols-2 gap-x-16 gap-y-6 -ml-12"> {/* Geser ke kiri */}
            {/* NISN */}
            <div className="min-w-[150px]">
              <p className="text-lg font-semibold text-black">NISN</p>
              <p className="text-gray-800 truncate w-full">{user.id}</p>
            </div>

            {/* Kelas */}
            <div className="min-w-[150px]">
              <p className="text-lg font-semibold text-black">Kelas</p>
              <p className="text-gray-800 truncate w-full">{user.major}</p>
            </div>

            {/* Nama */}
            <div className="min-w-[150px]">
              <p className="text-lg font-semibold text-black">Nama</p>
              <p className="text-gray-800 truncate w-full">{user.name}</p>
            </div>

            {/* No HP */}
            <div className="min-w-[150px]">
              <p className="text-lg font-semibold text-black">No HP</p>
              <p className="text-gray-800 truncate w-full">{user.phone}</p>
            </div>

            {/* Tanggal Lahir */}
            <div className="min-w-[150px]">
              <p className="text-lg font-semibold text-black">Tanggal Lahir</p>
              <p className="text-gray-800 truncate w-full">{user.dob}</p>
            </div>

            {/* Email */}
            <div className="min-w-[150px]">
              <p className="text-lg font-semibold text-black">Email</p>
              <p className="text-gray-800 truncate w-full">{user.email}</p>
            </div>

            {/* Jenis Kelamin */}
            <div className="min-w-[150px]">
              <p className="text-lg font-semibold text-black">Jenis Kelamin</p>
              <p className="text-gray-800 truncate w-full">{user.gender}</p>
            </div>

            {/* Password */}
            <div className="min-w-[150px]">
              <p className="text-lg font-semibold text-black">Password</p>
              <p className="text-gray-800 truncate w-full">{user.password}</p>
            </div>

            {/* Agama */}
            <div className="min-w-[150px]">
              <p className="text-lg font-semibold text-black">Agama</p>
              <p className="text-gray-800 truncate w-full">{user.religion}</p>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-4 mt-8">
          <button className="flex items-center gap-2 bg-green-700 text-white px-5 py-2 rounded-2xl shadow-md hover:bg-blue-600 transition">
            <FaEdit />
            Edit
          </button>
          <button className="flex items-center gap-2 bg-blue-700 text-white px-5 py-2 rounded-2xl shadow-md hover:bg-orange-500 transition">
            <MdOutlineLockReset />
            Reset Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetail;
