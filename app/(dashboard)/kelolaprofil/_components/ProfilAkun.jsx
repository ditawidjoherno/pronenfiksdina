"use client";

import { useState, useEffect } from "react";
import useProfile from "@/hooks/useProfile";
import ProfileEditPopup from "./FormEdit";
import ResetPasswordPopup from "./FormReset";
import { FaEdit, FaKey } from "react-icons/fa";

export default function ProfileCard() {
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [isResetPopupOpen, setIsResetPopupOpen] = useState(false);
  const { data, getProfileUser } = useProfile();
  const [profile, setProfile] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(Date.now()); // trigger refresh gambar

  useEffect(() => {
    getProfileUser();
  }, [getProfileUser]);

  useEffect(() => {
    if (data) {
      setProfile(data);
    }
  }, [data]);

  // Dapat menerima timestamp dari FormEdit
  const refreshProfile = async (newTimestamp = Date.now()) => {
    const updated = await getProfileUser();
    if (updated) {
      setProfile(updated);
      setLastUpdate(newTimestamp); // paksa ganti gambar
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-7xl mx-auto h-[485px] flex flex-col mt-10 px-10">
      <div className="flex items-center gap-8">
        <div className="pl-10 -mt-8">
<img
  key={lastUpdate}
  src={
    profile?.foto_profil
      ? `http://localhost:8000/storage/${profile.foto_profil}?t=${lastUpdate}`
      : "/images/profil.jpg"
  }
  alt="Profile"
  width={220}
  height={220}
  className="rounded-xl object-cover"
/>

        </div>

        <div className="grid grid-cols-2 gap-x-10 gap-y-6 w-full pl-14 mt-10">
          <div>
            <p className="font-bold text-lg">Nama</p>
            <p className="text-gray-700 font-medium text-lg">{profile?.nama}</p>
          </div>
          <div>
            <p className="font-bold text-lg">Jabatan</p>
            <p className="text-gray-700 font-medium text-lg">{profile?.role}</p>
          </div>
          <div>
            <p className="font-bold text-lg">{profile?.role === "guru" ? "NIP" : "NISN"}</p>
            <p className="text-gray-700 font-medium text-lg">
              {profile?.role === "guru" ? profile?.nip : profile?.nisn}
            </p>
          </div>
          <div>
            <p className="font-bold text-lg">Status</p>
            <p className="text-gray-700 font-medium text-lg">{profile?.kelas ?? "Non-Kelas"}</p>
          </div>
          <div>
            <p className="font-semibold text-lg">Jenis Kelamin</p>
            <p className="text-gray-700 font-medium text-lg">
              {profile?.jenis_kelamin === "L"
                ? "Laki-laki"
                : profile?.jenis_kelamin === "P"
                ? "Perempuan"
                : "-"}
            </p>
          </div>
          <div>
            <p className="font-semibold text-lg">Agama</p>
            <p className="text-gray-700 font-medium text-lg">{profile?.agama}</p>
          </div>
          <div>
            <p className="font-semibold text-lg">No HP</p>
            <p className="text-gray-700 font-medium text-lg">{profile?.nomor_hp || "-"}</p>
          </div>
          <div>
            <p className="font-semibold text-lg">Email</p>
            <p className="text-gray-700 font-medium text-lg">{profile?.email}</p>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4 mt-auto pr-2 -pb-2">
        <button
          onClick={() => setIsEditPopupOpen(true)}
          className="flex items-center gap-2 bg-[#144A8F] hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md transition"
        >
          <FaEdit /> Edit Profil
        </button>
        <button
          onClick={() => setIsResetPopupOpen(true)}
          className="flex items-center gap-2 bg-[#1F245D] hover:bg-purple-900 text-white px-4 py-2 rounded-lg shadow-md transition"
        >
          <FaKey /> Reset Password
        </button>
      </div>

      <ProfileEditPopup
        isOpen={isEditPopupOpen}
        onClose={() => setIsEditPopupOpen(false)}
        onUpdated={refreshProfile} // PENTING
      />
      <ResetPasswordPopup
        isOpen={isResetPopupOpen}
        onClose={() => setIsResetPopupOpen(false)}
      />
    </div>
  );
}
