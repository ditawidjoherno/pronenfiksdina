import { useState } from "react";
import { FaTimes, FaCalendarAlt } from "react-icons/fa";

export default function TambahAkunForm() {
  const [kelas, setKelas] = useState("");
  const [kelasList, setKelasList] = useState(["10", "11", "12", "Non-Kelas"]);
  const [newKelas, setNewKelas] = useState("");
  const [showInput, setShowInput] = useState(false);

  const handleKelasChange = (e) => {
    const value = e.target.value;
    if (value === "tambah-kelas") {
      setShowInput(true);
    } else {
      setKelas(value);
      setShowInput(false);
    }
  };

  const handleTambahKelas = () => {
    if (newKelas.trim() !== "" && !kelasList.includes(newKelas)) {
      setKelasList([...kelasList, newKelas]);
      setKelas(newKelas);
      setNewKelas("");
      setShowInput(false);
    }
  };

  return (
    <div className="relative">
      {/* Judul */}
      <h2 className="text-center text-xl font-bold mb-4">Tambah Akun</h2>

      {/* Form */}
      <form className="grid grid-cols-2 gap-6">
        {/* NISN */}
        <div>
          <label className="block font-medium mb-1">NIP</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-blue-400 bg-gray-100"
          />
        </div>

        {/* Agama */}
        <div>
          <label className="block font-medium mb-1">Agama</label>
          <select className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-blue-400 bg-gray-100">
            <option value="">Pilih Agama</option>
            <option value="islam">Islam</option>
            <option value="kristen">Kristen</option>
            <option value="katolik">Katolik</option>
            <option value="hindu">Hindu</option>
            <option value="buddha">Buddha</option>
            <option value="konghucu">Konghucu</option>
          </select>
        </div>

        {/* Nama */}
        <div>
          <label className="block font-medium mb-1">Nama</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-blue-400 bg-gray-100"
          />
        </div>

        {/* Kelas */}
        <div>
          <label className="block font-medium mb-1">Jabatan</label>
          <select
            value={kelas}
            onChange={handleKelasChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-blue-400 bg-gray-100"
          >
            <option value="">Pilih Opsi</option>
            {kelasList.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
            <option value="tambah-kelas">Tambah Kelas</option>
          </select>
          {showInput && (
            <div className="mt-2 flex items-center gap-2">
              <input
                type="text"
                value={newKelas}
                onChange={(e) => setNewKelas(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-blue-400 bg-gray-100"
                placeholder="Masukkan nama kelas"
              />
              <button
                type="button"
                onClick={handleTambahKelas}
                className="bg-green-500 text-white font-medium py-2 px-4 rounded-md hover:bg-green-600 transition"
              >
                Tambah
              </button>
            </div>
          )}
        </div>

        {/* Tanggal Lahir */}
        <div>
          <label className="block font-medium mb-1">Tanggal Lahir</label>
          <div className="relative">
            <input
              type="date"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-blue-400 bg-gray-100"
            />
          </div>
        </div>

        {/* No HP */}
        <div>
          <label className="block font-medium mb-1">No HP</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-blue-400 bg-gray-100"
          />
        </div>

        {/* Jenis Kelamin */}
        <div>
          <label className="block font-medium mb-1">Jenis Kelamin</label>
          <select className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-blue-400 bg-gray-100">
            <option value="">Pilih Jenis Kelamin</option>
            <option value="laki-laki">Laki-laki</option>
            <option value="perempuan">Perempuan</option>
          </select>
        </div>

        {/* Email */}
        <div>
          <label className="block font-medium mb-1">Email</label>
          <input
            type="email"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-blue-400 bg-gray-100"
          />
        </div>
      </form>

      {/* Tombol Buat Akun */}
      <div className="mt-6 text-center">
        <button className="bg-blue-500 text-white font-medium py-2 px-6 rounded-md hover:bg-blue-600 transition">
          Buat Akun
        </button>
      </div>
    </div>
  );
}
