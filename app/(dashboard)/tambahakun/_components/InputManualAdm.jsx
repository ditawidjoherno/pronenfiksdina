'use client';

import { useState, useEffect } from "react";
import { FaTimes, FaCalendarAlt } from "react-icons/fa";
import addUser from "@/hooks/use-register";

export default function TambahAkunForm() {
  const { user, loading } = addUser();

  const [kelas, setKelas] = useState("");
  const [kelasList, setKelasList] = useState([
    "X-A", "X-B", "X-C", "XI-A", "XI-B", "XI-C", "XII-A", "XII-B", "XII-C", "Non-Kelas"
  ]);
  const [newKelas, setNewKelas] = useState("");
  const [showInput, setShowInput] = useState(false);

  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    nip: "",
    nama: "",
    kelas: "",
    tanggal_lahir: "",
    nomor_hp: "",
    jenis_kelamin: "",
    agama: "",
    email: "",
    password: "",
  });

  // sinkronisasi kelas → formData.kelas
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      kelas: kelas,
    }));
  }, [kelas]);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isFormValid = () => {
    return Object.values(formData).every((val) => val.trim() !== "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid()) {
      setErrorMessage("❌ Semua kolom wajib diisi.");
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return;
    }

    const payload = {
      ...formData,
      role: "guru",
      nisn: "",
    };

    try {
      const res = await user(payload);
      if (res) {
        setShowSuccess(true);
        setFormData({
          nip: "",
          nama: "",
          kelas: "",
          tanggal_lahir: "",
          nomor_hp: "",
          jenis_kelamin: "",
          agama: "",
          email: "",
          password: "",
        });
        setKelas("");
        setTimeout(() => setShowSuccess(false), 3000);
      } else {
        throw new Error("Terjadi kesalahan saat membuat akun.");
      }
    } catch (err) {
      setErrorMessage("❌ Gagal membuat akun.");
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
    }
  };

  return (
    <div className="relative">
      {/* ✅ POPUP BERHASIL */}
      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white text-green-700 px-6 py-3 rounded-lg shadow-xl border border-green-500">
            ✅ Akun guru berhasil dibuat!
          </div>
        </div>
      )}

      {/* ❌ POPUP GAGAL */}
      {showError && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white text-red-700 px-6 py-3 rounded-lg shadow-xl border border-red-500">
            {errorMessage}
          </div>
        </div>
      )}

      {/* Judul */}
      <h2 className="text-center text-xl font-bold mb-4">Tambah Akun Guru</h2>

      {/* Form */}
      <form className="grid grid-cols-2 gap-6" onSubmit={handleSubmit}>
        <InputField name="nip" label="NIP" value={formData.nip} onChange={handleChange} />
        <SelectField name="agama" label="Agama" value={formData.agama} onChange={handleChange} options={["Islam", "Kristen", "Katolik", "Hindu", "Buddha", "Konghucu"]} />

        <InputField name="nama" label="Nama" value={formData.nama} onChange={handleChange} />

        {/* Kelas / Jabatan */}
        <div>
          <label className="block font-medium mb-1">Jabatan</label>
          <select
            value={formData.kelas}
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
                placeholder="Masukkan nama kelas/jabatan"
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

        <InputField type="date" name="tanggal_lahir" label="Tanggal Lahir" value={formData.tanggal_lahir} onChange={handleChange} />
        <InputField name="nomor_hp" label="No HP" value={formData.nomor_hp} onChange={handleChange} />

        <SelectField name="jenis_kelamin" label="Jenis Kelamin" value={formData.jenis_kelamin} onChange={handleChange} options={["L", "P"]} labels={["Laki-laki", "Perempuan"]} />
        <InputField type="email" name="email" label="Email" value={formData.email} onChange={handleChange} />
        <InputField type="password" name="password" label="Password" value={formData.password} onChange={handleChange} />
      </form>

      {/* Tombol Buat Akun */}
      <div className="mt-6 text-center">
        <button
          type="submit"
          disabled={loading}
          onClick={handleSubmit}
          className="bg-blue-500 text-white font-medium py-2 px-6 rounded-md hover:bg-blue-600 transition"
        >
          {loading ? "Menyimpan..." : "Buat Akun"}
        </button>
      </div>
    </div>
  );
}

// 🔹 Komponen InputField
function InputField({ name, label, value, onChange, type = "text" }) {
  return (
    <div>
      <label className="block font-medium mb-1">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full border border-gray-300 rounded-md px-3 py-1 bg-gray-100 focus:outline-blue-400"
      />
    </div>
  );
}

// 🔹 Komponen SelectField
function SelectField({ name, label, value, onChange, options = [], labels }) {
  return (
    <div>
      <label className="block font-medium mb-1">{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full border border-gray-300 rounded-md px-3 py-1 bg-gray-100 focus:outline-blue-400"
      >
        <option value="">Pilih {label}</option>
        {options.map((opt, i) => (
          <option key={opt} value={opt}>
            {labels ? labels[i] : opt}
          </option>
        ))}
      </select>
    </div>
  );
}
