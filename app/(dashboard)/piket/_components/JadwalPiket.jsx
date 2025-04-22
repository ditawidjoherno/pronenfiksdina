import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

export default function JadwalPiketPopup({ onClose }) {
  const [tanggal, setTanggal] = useState("");
  const [kelas, setKelas] = useState("");
  const [kirimInfo, setKirimInfo] = useState(false);

  const kelasOptions = ["X-A", "X-B", "X-C", "XI-A", "XI-B"];

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-80 relative">
        <button
          className="absolute top-2 right-2 text-red-500"
          onClick={onClose}
        >
          <AiOutlineClose size={24} />
        </button>
        <h2 className="text-lg font-bold text-center mb-4">Atur Jadwal Piket</h2>
        <div>
          <label className="block font-semibold">Hari/Tanggal</label>
          <input
            type="date"
            value={tanggal}
            onChange={(e) => setTanggal(e.target.value)}
            className="w-full p-2 mt-1 border rounded bg-gray-200"
          />
        </div>
        <div className="mt-4">
          <label className="block font-semibold">Kelas</label>
          <select
            value={kelas}
            onChange={(e) => setKelas(e.target.value)}
            className="w-full p-2 mt-1 border rounded bg-gray-200"
          >
            <option value="">Pilih Kelas</option>
            {kelasOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
        <div className="mt-4 flex items-center">
          <input
            type="checkbox"
            checked={kirimInfo}
            onChange={() => setKirimInfo(!kirimInfo)}
            className="mr-2"
          />
          <label>Kirim Informasi kepada siswa</label>
        </div>
        <button
          className="mt-4 w-full bg-green-600 text-white p-2 rounded"
        >
          Selesai
        </button>
      </div>
    </div>
  );
}
