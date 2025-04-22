"use client";
import React from "react";

const GenderChart = ({ malePercentage, femalePercentage }) => {
  return (
    <div className="w-full max-w-lg space-y-4 mt-10">
      {/* Female Bar */}
      <div className="relative flex items-center">
        <div className="flex-1 bg-pink-300 rounded-full h-10 flex items-center px-4 relative">
          <div
            className="bg-pink-500 h-10 rounded-full absolute left-0 top-0 transition-all duration-300"
            style={{ width: `${femalePercentage}%` }}
          ></div>
          <span className="text-white font-semibold relative">Perempuan</span>
          <span className="absolute right-4 text-white font-bold text-lg">
            {femalePercentage}%
          </span>
        </div>
      </div>

      {/* Male Bar */}
      <div className="relative flex items-center">
        <div className="flex-1 bg-purple-300 rounded-full h-10 flex items-center px-4 relative">
          <div
            className="bg-purple-500 h-10 rounded-full absolute left-0 top-0 transition-all duration-300"
            style={{ width: `${malePercentage}%` }}
          ></div>
          <span className="text-white font-semibold relative ">Laki-laki</span>
          <span className="absolute right-4 text-white font-bold text-lg">
            {malePercentage}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default GenderChart;
