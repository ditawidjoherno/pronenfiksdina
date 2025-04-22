import React from "react";
import { FaBook } from "react-icons/fa";

const classes = [
  "X A", "X B", "X C", 
  "XI IPA 1", "XI IPA 2", "XI IPS 1", "XI IPS 2", "XI IBBU", 
  "XII IPA 1", "XII IPA 2", "XII IPS 1", "XII IPS 3", "XII IBBU"
];

const ClassCards = () => {
  return (
    <div className="grid grid-cols-3 gap-6 p-8 w-full h-screen">
      {classes.map((className, index) => (
        <div key={index} className="flex items-center bg-[#9ba2b9] p-6 rounded-xl w-full h-24 shadow-md">
          <FaBook className="text-black mr-4 text-3xl" />
          <p className="font-bold text-black text-xl">{className}</p>
        </div>
      ))}
    </div>
  );
};

export default ClassCards;
