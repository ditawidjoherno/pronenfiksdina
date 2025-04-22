"use client";
import React from "react";
import { RiLogoutCircleRLine } from "react-icons/ri";

const Header = () => {
  return (
    <header className="w-full bg-[#98abe2] shadow-md p-6 fixed top-0 left-0 z-50 flex justify-between items-center">
      <div className="bg-[#ffffff] p-3 rounded-3xl shadow-md flex items-center space-x-3 h-10 absolute right-6 top-1">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
            <img
              src="/images/profil.jpg"
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover"
            />
          </div>
          <div>
            <p className="text-black text-sm font-medium">Nama Anda</p>
            <p className="text-black text-xs">NIP</p>
          </div>
        </div>
        <button className="text-red-500 hover:text-red-600 transition text-xl ml-2">
        <RiLogoutCircleRLine />
        </button>
      </div>
    </header>
  );
};

export default Header;