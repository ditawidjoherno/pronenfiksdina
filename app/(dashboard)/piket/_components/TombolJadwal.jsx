import { useState } from "react";
import JadwalPiketPopup from "./JadwalPiket";
import { AiFillBell } from "react-icons/ai";

export default function ButtonJadwalPiket({ onSimpan }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
  onClick={() => setIsOpen(true)}
  className="flex items-center gap-2 bg-[#2D336B] text-white font-bold py-2 px-4 sm:rounded-xl rounded-lg shadow-md hover:bg-blue-700 transition 
             max-sm:py-1 max-sm:px-3 max-sm:text-sm"
>
  <AiFillBell size={24} className="max-sm:w-4 max-sm:h-4" />
  Atur Jadwal Piket
</button>


      {isOpen && (
        <JadwalPiketPopup
          onClose={() => setIsOpen(false)} // ✅ ini penting!
          onSimpan={onSimpan}              // ✅ kirim juga ke bawah
        />
      )}
    </>
  );
}
