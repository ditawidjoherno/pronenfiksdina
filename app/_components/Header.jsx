'use client';

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { RiLogoutCircleRLine } from "react-icons/ri";
import useUser from "@/hooks/use-user";

const Header = () => {
  const router = useRouter();
  const { data, loading, error, getUserData } = useUser();

  useEffect(() => {
    getUserData();
  }, []);

  const handleLogout = () => {
    router.push("/");
  };

  return (
    <header className="w-full bg-[#98abe2] shadow-md p-6 fixed top-0 left-0 z-50 flex justify-between items-center">
      {/* Mobile: hanya foto + tombol logout */}
      <div className="flex sm:hidden bg-[#f9fafd] p-2 rounded-full shadow-md items-center space-x-2 absolute sm:right-4 right-2 sm:top-2 top-1">
        <img
          src={
            data?.foto_profil
              ? `http://localhost:8000/storage/${data.foto_profil}?t=${Date.now()}`
              : "/images/profil.png"
          }
          alt="Profile"
          className="sm:w-8 w-6 sm:h-8 h-6 rounded-full object-cover"
        />
        <button
          onClick={handleLogout}
          className="text-red-500 hover:text-red-600 transition text-xl"
        >
          <RiLogoutCircleRLine />
        </button>
      </div>

      {/* Desktop: lengkap */}
      <div className="hidden sm:flex bg-[#f9fafd] p-3 rounded-3xl shadow-md items-center space-x-3 h-10 absolute right-6 top-1">
        <div className="w-8 h-8 bg-gray-300 rounded-full overflow-hidden">
          <img
            src={
              data?.foto_profil
                ? `http://localhost:8000/storage/${data.foto_profil}?t=${Date.now()}`
                : "/images/profil.png"
            }
            alt="Profile"
            className="w-8 h-8 rounded-full object-cover"
          />
        </div>
        <div className="text-left leading-tight">
          {loading ? (
            <p className="text-black text-sm font-medium">Memuat...</p>
          ) : error ? (
            <p className="text-red-600 text-sm font-medium">Gagal memuat data</p>
          ) : data ? (
            <>
              <p className="text-black text-sm font-medium">{data.nama}</p>
              <p className="text-black text-xs capitalize">{data.role}</p>
            </>
          ) : (
            <p className="text-black text-sm font-medium">Tidak ada data</p>
          )}
        </div>
        <button
          onClick={handleLogout}
          className="text-red-500 hover:text-red-600 transition text-xl ml-2"
        >
          <RiLogoutCircleRLine />
        </button>
      </div>
    </header>
  );
};

export default Header;
