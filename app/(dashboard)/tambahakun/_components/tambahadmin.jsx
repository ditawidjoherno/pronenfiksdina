"use client";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const AdminTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [file, setFile] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const formatName = (fullName) => {
    const nameParts = fullName.split(" ");
    if (nameParts.length <= 3) return fullName;
    return `${nameParts[0]} ${nameParts[1][0]}. ${nameParts[2][0]}. ${nameParts[nameParts.length - 1]}`;
  };

  const users = [
    { id: "10XXXXX", name: "Martin Anisa Abigail Uhuy", dob: "DD/MM/YYYY", gender: "Wanita", phone: "+62xxxxxxxx",  major: "IPA", year: 2018, status: "Active", password: "1234" },
    { id: "10XXXXX", name: "Taka Teke Rumba", dob: "DD/MM/YYYY", gender: "Wanita", phone: "+62xxxxxxxx",  major: "IPS", year: 2018, status: "Active", password: "1234" },
    { id: "10XXXXX", name: "Akio Anak Baiq", dob: "DD/MM/YYYY", gender: "Pria", phone: "+62xxxxxxxx", major: "Non", year: 2019, status: "Active", password: "1234" },
  ];

  const filteredUsers = users.filter((user) => user.name.toLowerCase().includes(searchTerm.toLowerCase()));

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

  return (
    <div className="p-4 mt-10 bg-white rounded-xl shadow-md w-full overflow-x-auto">
      <div className="flex justify-between items-center mb-4">
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="flex gap-2">
          <input
            type="file"
            id="fileUpload"
            accept=".xls,.xlsx"
            style={{ display: "none" }}
            onChange={handleFileUpload}
          />
          <Button variant="text" color="primary" onClick={() => document.getElementById("fileUpload").click()}>
            Upload Data User
          </Button>
          <Button variant="contained" color="success">Download</Button>
        </div>
      </div>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 p-2">NISN</th>
            <th className="border border-gray-300 p-2">Nama</th>
            <th className="border border-gray-300 p-2">Tanggal Lahir</th>
            <th className="border border-gray-300 p-2">Jenis Kelamin</th>
            <th className="border border-gray-300 p-2">Phone</th>
            <th className="border border-gray-300 p-2">Jurusan</th>
            <th className="border border-gray-300 p-2">Tahun Ajaran</th>
            <th className="border border-gray-300 p-2">Status</th>
            <th className="border border-gray-300 p-2">Password</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user, index) => (
            <tr key={index} className="text-center">
              <td className="border border-gray-300 p-2">{user.id}</td>
              <td className="border border-gray-300 p-2">
                <a href="#" className="text-blue-500 underline" onClick={() => alert(`NISN: ${user.id}`)}>
                  {formatName(user.name)}
                </a>
              </td>
              <td className="border border-gray-300 p-2">{user.dob}</td>
              <td className="border border-gray-300 p-2">{user.gender}</td>
              <td className="border border-gray-300 p-2">{user.phone}</td>
              <td className="border border-gray-300 p-2">{user.major}</td>
              <td className="border border-gray-300 p-2">{user.year}</td>
              <td className="border border-gray-300 p-2">{user.status}</td>
              <td className="border border-gray-300 p-2">{user.password}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-80 relative">
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

export default AdminTable;