"use client";
import React, { useState } from "react";
import { FaUserPlus, FaDownload } from "react-icons/fa";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import TambahAkunForm from "./InputManual";
import { IoMdCloseCircle } from "react-icons/io";
import ProfileDetail from "./DetailProfil";

const UserTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [file, setFile] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [showAddAccountPopup, setShowAddAccountPopup] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const formatName = (fullName) => {
    const nameParts = fullName.split(" ");
    if (nameParts.length <= 3) return fullName;
    return `${nameParts[0]} ${nameParts[1][0]}. ${nameParts[2][0]}. ${nameParts[nameParts.length - 1]}`;
  };

  const users = [
    { id: "10XXXXX", name: "Martin Anisa Abigail Watson", dob: "DD/MM/YYYY", gender: "Perempuan", religion: "Kristen", phone: "081234567890", email: "martin@gmail.com", major: "X-A", password: "1234" },
    { id: "10XXXXX", name: "Taka Teke Rumba", dob: "DD/MM/YYYY", gender: "Perempuan", religion: "Islam", phone: "082345678901", email: "taka@gmail.com", major: "XI-A", password: "1234" },
    { id: "10XXXXX", name: "Akio Anak Baiq", dob: "DD/MM/YYYY", gender: "Laki-laki", religion: "Hindu", phone: "083456789012", email: "akio@gmail.com", major: "XII-B", password: "1234" },
  ];

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFileUpload = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const fileType = selectedFile.name.split(".").pop().toLowerCase();
      if (fileType !== "xls" && fileType !== "xlsx") {
        alert("❌ Hanya file Excel (.xls, .xlsx) yang diperbolehkan!");
        return;
      }
      setFile(selectedFile);
      setShowPopup(true);
    }
  };

  const handleConfirmUpload = () => {
    alert("✅ File berhasil disiapkan untuk upload: " + file.name);
    setShowPopup(false);
  };

  const handleCloseAddAccountPopup = () => {
    setShowAddAccountPopup(false);
  };

  const handleOpenProfile = (user) => {
    setSelectedUser(user);
  };

  const handleCloseProfilePopup = () => {
    setSelectedUser(null);
  };

  return (
    <div className="p-4 mt-10 bg-white rounded-xl shadow-md w-full">
      {/* ✅ Header */}
      <div className="flex justify-between items-center mb-4">
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="flex gap-2">
          {/* ✅ Upload file */}
          <input
            type="file"
            id="fileUpload"
            accept=".xls,.xlsx"
            style={{ display: "none" }}
            onChange={handleFileUpload}
          />
          <Button
            variant="text"
            color="primary"
            onClick={() => document.getElementById("fileUpload").click()}
          >
            Upload Data Siswa
          </Button>

          {/* ✅ Tombol Tambah Akun */}
          <Button
            variant="contained"
            color="primary"
            className="flex items-center gap-2 rounded-xl"
            onClick={() => setShowAddAccountPopup(true)}
          >
            <FaUserPlus size={16} />
          </Button>

          {/* ✅ Tombol Download */}
          <Button
            variant="contained"
            color="success"
            className="flex items-center gap-2 rounded-xl"
          >
            <FaDownload size={16} />
          </Button>
        </div>
      </div>

      {/* ✅ Tabel Data User */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 p-2">NISN</th>
              <th className="border border-gray-300 p-2">Nama</th>
              <th className="border border-gray-300 p-2">Kelas</th>
              <th className="border border-gray-300 p-2">Tanggal Lahir</th>
              <th className="border border-gray-300 p-2">Jenis Kelamin</th>
              <th className="border border-gray-300 p-2">Agama</th>
              <th className="border border-gray-300 p-2">Phone</th>
              <th className="border border-gray-300 p-2">Email</th>
              <th className="border border-gray-300 p-2">Password</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr key={index} className="text-center">
                <td className="border border-gray-300 p-2">{user.id}</td>
                <td className="border border-gray-300 p-2">
  <a
    href="#"
    className="text-blue-500 underline hover:text-blue-700"
    onClick={() => handleOpenProfile(user)}
  >
    {formatName(user.name)}
  </a>
</td>
                <td className="border border-gray-300 p-2">{user.major}</td>
                <td className="border border-gray-300 p-2">{user.dob}</td>
                <td className="border border-gray-300 p-2">{user.gender}</td>
                <td className="border border-gray-300 p-2">{user.religion}</td>
                <td className="border border-gray-300 p-2">{user.phone}</td>
                <td className="border border-gray-300 p-2">{user.email}</td>
                <td className="border border-gray-300 p-2">{user.password}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {selectedUser && (
  <ProfileDetail user={selectedUser} onClose={handleCloseProfilePopup} />
)}

      {/* ✅ Popup Tambah Akun */}
      {showAddAccountPopup && (
        <div className="fixed mt-10 inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-2xl shadow-lg max-w-4xl relative">
            <button
              className="absolute top-2 right-2 text-gray-600 text-xl"
              onClick={handleCloseAddAccountPopup}
            >
              <IoMdCloseCircle className="h-8 w-8 text-red-800" />
            </button>
            <TambahAkunForm onClose={handleCloseAddAccountPopup} />
          </div>
        </div>
      )}

      {/* ✅ Popup Konfirmasi Upload */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-2 rounded-2xl shadow-lg max-w-lg relative">
            <button
              className="absolute top-2 right-2 text-gray-600 text-xl"
              onClick={() => setShowPopup(false)}
            >
              ✖
            </button>
            <p className="text-center text-gray-700">
              Pastikan informasi sudah sesuai <br /> lanjutkan proses 'Submit'?
            </p>
            <div className="flex justify-center mt-4">
              <Button
                variant="contained"
                style={{ backgroundColor: "#3f51b5", color: "white" }}
                onClick={handleConfirmUpload}
              >
                YA
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserTable;
