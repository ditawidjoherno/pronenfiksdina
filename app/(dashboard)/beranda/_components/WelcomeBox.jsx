"use client";
import React from "react";

const WelcomeBox = () => {
  return (
    <div className="flex flex-col w-full max-w-6xl mx-auto mt-10">
      {/* Judul "Dashboard" */}
      {/* <h1 className="text-3xl text-black font-bold mb-2 mt-2">Dashboard</h1> */}

      {/* Box utama */}
      <div className="bg-white rounded-lg py-0 px-auto flex items-center text-black shadow-lg w-full">
        {/* Left Content (Illustration) */}
        <div className="flex items-center space-x-8 ">
          <img
            src="/images/boxwelcome.png" // Ganti dengan path gambar yang sesuai
            alt="guru"
            className="w-[220px] h-[220px] object-contain ml-8" // Ukuran diperbesar
          />

          {/* Right Content (Text) */}
          <div>
            <h2 className="text-2xl font-semibold text-[#070841]">Hai, Teacher!</h2>
            <h1 className="text-xl font-poppins">
            Selamat datang di SEVH!  
            </h1>
            <p className="text-xl">
            Buat semuanya lebih mudah dan praktis untuk siswa dan guru
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeBox;
