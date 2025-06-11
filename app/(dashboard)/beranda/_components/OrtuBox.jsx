"use client";
import React from "react";

const WelcomeBoxortu = () => {
  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto mt-10 px-4">
      {/* Box utama */}
      <div className="bg-white sm:rounded-lg rounded-xl shadow-lg w-full py-3 px-4 sm:px-6 md:px-10">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-8">
          {/* Teks - tampil duluan di mobile */}
          <div className="text-center md:text-left md:order-1 mt-1 md:mt-6">
  <h2 className="sm:text-2xl text-xl font-semibold text-[#070841]">Hai, Parents!</h2>
  <h1 className="sm:text-xl text-md font-poppins">
    Selamat datang di SEVH!
  </h1>
  <p className="sm:text-xl text-md">
   Bersama kita pantau perkembangan non akademik putra/putri Anda 
  </p>
</div>
          {/* Gambar - tampil di bawah di HP, tetap di kiri di desktop */}
          <img
  src="/images/ortu.png"
  alt="orangtua"
  className="sm:w-[220px] w-[100px] sm:h-[220px] h-[100px] object-contain order-last md:ml-auto"
/>
        </div>
      </div>
    </div>
  );
};

export default WelcomeBoxortu;
