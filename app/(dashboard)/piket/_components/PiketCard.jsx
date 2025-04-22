import { FaBullhorn } from "react-icons/fa";

export default function PiketCard() {
  return (
    <div className="bg-[#869ddd] p-6 rounded-2xl shadow-lg w-full max-w-7xl h-[220px] mt-5 flex justify-between items-start">
      <div className="flex-1 flex flex-col justify-center">
        <div className="flex items-center gap-3">
          <FaBullhorn className="text-white text-2xl" />
          <h2 className="text-white font-semibold text-2xl">Petugas Piket Harian Siswa</h2>
        </div>
        <p className="text-white font-medium text-xl mt-1">01 Jan, 2025</p>
        <div className="flex justify-center items-center ml-28 mt-2">
          <p className="text-6xl font-bold text-blue-950">X-A</p>
        </div>
      </div>
      <div className="w-24 h-24 mr-8 overflow-hidden flex-shrink-0 mt-10">
        <img 
          src="/images/piketcard.png" 
          alt="Foto Petugas Piket" 
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
