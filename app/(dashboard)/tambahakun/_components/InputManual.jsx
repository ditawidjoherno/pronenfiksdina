// components/TambahAkunForm.jsx
import { FaTimes, FaCalendarAlt } from "react-icons/fa";

export default function TambahAkunForm() {
  return (
    <div className="relative ">
      {/* Tombol Close */}

      {/* Judul */}
      <h2 className="text-center text-xl font-bold mb-4">Tambah Akun</h2>

      {/* Form */}
      <form className="grid grid-cols-2 gap-6">
        {/* NISN */}
        <div>
          <label className="block font-medium mb-1">NISN</label>
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
          <label className="block font-medium mb-1">Kelas</label>
          <select className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-blue-400 bg-gray-100">
            <option value="">Pilih Kelas</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
          </select>
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
