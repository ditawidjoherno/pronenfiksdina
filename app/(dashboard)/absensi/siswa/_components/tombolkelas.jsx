import React from "react";

const AddClassButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all duration-200 shadow-md"
    >
      + Tambah Kelas
    </button>
  );
};

export default AddClassButton;
