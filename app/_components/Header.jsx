"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { RiLogoutCircleRLine } from "react-icons/ri";
import useUser from "@/hooks/use-user";

const Header = () => {
  const router = useRouter();
  const { loading, error, data, getUserData } = useUser();

  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
  getUserData().then(() => {
    console.log("📦 Data dari useUser:", data);
  });
}, []);


  const handleLogout = () => {
    router.push("/");
  };

  return (
    <header className="w-full bg-[#98abe2] shadow-md p-6 fixed top-0 left-0 z-50 flex justify-between items-center">
      <div className="bg-[#f9fafd] p-3 rounded-3xl shadow-md flex items-center space-x-3 h-10 absolute right-6 top-1">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
            <img
 src={
  data?.foto_profil
    ? `http://localhost:8000/storage/${data.foto_profil}?t=${Date.now()}`
    : "/images/profil.jpg"
}
  alt="Profile"
  className="w-8 h-8 rounded-full object-cover"
/>
          </div>

          {data ? (
            <div className="text-left leading-tight">
              <p className="text-black text-sm font-medium">{data.nama}</p>
              <p className="text-black text-xs capitalize">{data.role}</p>
            </div>
          ) : (
            <div>
              <p className="text-black text-sm font-medium">Memuat...</p>
            </div>
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
