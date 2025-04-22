"use client";
import React from "react";
import { FaUsers, FaChartPie } from "react-icons/fa";

const BoxTiga = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 justify-center mt-5 w-full px-4 md:px-0 z-5">
      {/* Box Siswa */}
      <div className="bg-purple-700 text-white rounded-lg p-8 flex items-center w-80 max-w-xs md:max-w-sm lg:max-w-md mx-auto shadow-lg">
        <div className="bg-[#b09ec0] p-7 rounded-full">
          <FaUsers className="text-black text-4xl" />
        </div>
        <div className="ml-6">
          <h2 className="text-xl font-semibold">Siswa</h2>
          <p className="text-md font-bold">300</p>
        </div>
      </div>
      
      {/* Box Guru */}
      <div className="bg-pink-500 text-white rounded-lg p-8 flex items-center w-80 max-w-xs md:max-w-sm lg:max-w-md mx-auto shadow-lg">
        <div className="bg-pink-300 p-7 rounded-full">
          <FaUsers className="text-black text-4xl" />
        </div>
        <div className="ml-6">
          <h2 className="text-xl font-semibold">Guru</h2>
          <p className="text-md font-bold">20</p>
        </div>
      </div>
      
      {/* Box Total */}
      <div className="bg-yellow-400 text-white rounded-lg p-8 flex items-center w-80 max-w-xs md:max-w-sm lg:max-w-md mx-auto shadow-lg">
        <div className="bg-[#f7e09c] p-7 rounded-full">
          <FaChartPie className="text-black text-4xl" />
        </div>
        <div className="ml-6">
          <h2 className="text-xl font-semibold">Total</h2>
          <p className="text-md font-bold">320</p>
        </div>
      </div>
    </div>
  );
};

export default BoxTiga;
