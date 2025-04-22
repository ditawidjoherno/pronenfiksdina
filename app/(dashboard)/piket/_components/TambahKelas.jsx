import { useState } from "react";
import { IoIosAdd } from "react-icons/io";
import JadwalPiketPopup from "./JadwalPiket";

export default function ButtonTambahKelas() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 bg-[#1a3b97] text-white font-bold py-2 px-4 rounded-xl shadow-md hover:bg-blue-700 transition "
      >
        <IoIosAdd size={24} />
        Tambah Kelas
      </button>
    </>
  );
}
