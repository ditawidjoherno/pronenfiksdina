'use client';

import { useState } from "react";
import addUser from "@/hooks/use-register";

export default function TambahAkunForm() {
  const { user } = addUser();

  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    nisn: "",
    nama: "",
    kelas: "",
    tanggal_lahir: "",
    nomor_hp: "",
    jenis_kelamin: "",
    agama: "",
    email: "",
    password: "",
  });

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

    setLoading(true);

    try {
      const payload = {
        ...formData,
        role: "siswa",
        nip: "",
      };

      const response = await user(payload);

      if (response) {
        setShowSuccess(true);
        setFormData({
          nisn: "",
          nama: "",
          kelas: "",
          tanggal_lahir: "",
          nomor_hp: "",
          jenis_kelamin: "",
          agama: "",
          email: "",
          password: "",
        });

        setTimeout(() => {
          setShowSuccess(false);
        }, 3000);
      } else {
        throw new Error("Terjadi kesalahan saat membuat akun.");
      }
    } catch (err) {
      setErrorMessage("❌ Gagal membuat akun.");
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
    } finally {
      setLoading(false); // Pastikan tombol aktif kembali
    }
  };

  return (
    <div className="relative">
      {/* ✅ Popup sukses */}
      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white text-green-700 px-6 py-3 rounded-lg shadow-xl border border-green-500">
            ✅ Akun siswa berhasil dibuat!
          </div>
        </div>
      )}

      {/* ❌ Popup error */}
      {showError && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white text-red-700 px-6 py-3 rounded-lg shadow-xl border border-red-500">
            {errorMessage}
          </div>
        </div>
      )}

      <h2 className="text-center text-xl font-bold mb-2">Tambah Akun</h2>

      <form className="grid grid-cols-2 gap-3" onSubmit={handleSubmit}>
        <InputField name="nisn" label="NISN" value={formData.nisn} onChange={handleChange} />
        <SelectField name="agama" label="Agama" value={formData.agama} onChange={handleChange} options={["Islam", "Kristen", "Katolik", "Hindu", "Buddha", "Konghucu"]} />

        <InputField name="nama" label="Nama" value={formData.nama} onChange={handleChange} />
        <SelectField name="kelas" label="Kelas" value={formData.kelas} onChange={handleChange} options={["X-A", "X-B", "X-C", "XI-A", "XI-B", "XI-C", "XII-A", "XII-B", "XII-C", "Non-Kelas"]} />

        <InputField type="date" name="tanggal_lahir" label="Tanggal Lahir" value={formData.tanggal_lahir} onChange={handleChange} />
        <InputField name="nomor_hp" label="No HP" value={formData.nomor_hp} onChange={handleChange} />
        <SelectField name="jenis_kelamin" label="Jenis Kelamin" value={formData.jenis_kelamin} onChange={handleChange} options={["L", "P"]} labels={["Laki-laki", "Perempuan"]} />

        <InputField type="email" name="email" label="Email" value={formData.email} onChange={handleChange} />
        <InputField type="password" name="password" label="Password" value={formData.password} onChange={handleChange} />
      </form>

      <div className="mt-6 text-center">
        <button
          type="submit"
          onClick={handleSubmit}
          disabled={loading}
          className="bg-blue-500 text-white font-medium py-2 px-6 rounded-md hover:bg-blue-600 transition"
        >
          {loading ? "Menyimpan..." : "Buat Akun"}
        </button>
      </div>
    </div>
  );
}

// 🔹 Komponen input field
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

// 🔹 Komponen select field
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
