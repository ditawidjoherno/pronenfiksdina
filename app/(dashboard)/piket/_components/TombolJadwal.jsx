import { useState } from "react";
import { AiFillBell } from "react-icons/ai";
import JadwalPiketPopup from "./JadwalPiket";

export default function ButtonJadwalPiket() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 bg-[#2D336B] text-white font-bold py-2 px-4 rounded-xl shadow-md hover:bg-blue-700 transition "
      >
        <AiFillBell size={24} />
        Atur Jadwal Piket
      </button>
      {isOpen && <JadwalPiketPopup onClose={() => setIsOpen(false)} />}
    </>
  );
}
