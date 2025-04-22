"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // ✅ Pakai next/navigation
import { TextField, Button } from "@mui/material";
import { FaDownload } from "react-icons/fa";
import FilterButton from "./tombolfilter";

const attendanceData = [
  { id: 1, nisn: "1234567890", name: "Olivia Carter Sophia", class: "X-A", hadir: 12, terlambat: 4, tidakHadir: 2 },
  { id: 2, nisn: "1234567891", name: "Olivia Carter Sophia", class: "X-B", hadir: 8, terlambat: 6, tidakHadir: 6 },
  { id: 3, nisn: "1234567892", name: "Olivia Carter Sophia", class: "XI-A", hadir: 12, terlambat: 6, tidakHadir: 6 },
  { id: 4, nisn: "1234567893", name: "Olivia Carter Sophia", class: "XI-C", hadir: 12, terlambat: 6, tidakHadir: 6 },
  { id: 5, nisn: "1234567894", name: "Olivia Carter Sophia", class: "XII-A", hadir: 12, terlambat: 6, tidakHadir: 6 },
];

const formatName = (fullName) => {
  const nameParts = fullName.split(" ");
  return nameParts.length <= 3
    ? fullName
    : `${nameParts[0]} ${nameParts[1][0]}. ${nameParts[2][0]}. ${nameParts[nameParts.length - 1]}`;
};

const AttendanceMonthTable = () => {
  const router = useRouter(); // ✅ Pakai useRouter dari next/navigation
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClass, setSelectedClass] = useState("Semua Kelas");

  const filteredData = attendanceData.filter((student) => {
    const matchName = student.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchClass = selectedClass === "Semua Kelas" || student.class === selectedClass;
    return matchName && matchClass;
  });

  const handleDownload = () => {
    const csvContent = [
      ["No", "NISN", "Nama", "Kelas", "Hadir", "Terlambat", "Tidak Hadir"].join(","),
      ...filteredData.map((student, index) => [
        index + 1,
        student.nisn,
        student.name,
        student.class,
        student.hadir,
        student.terlambat,
        student.tidakHadir
      ].join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "kehadiran_siswa.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleDetailClick = (nisn) => {
    router.push(`/detailabsensi?nisn=${nisn}`); // ✅ Navigasi ke halaman detail absensi
  };

  return (
    <div className="w-full p-8 bg-white rounded-xl shadow-md mt-5">
      {/* Search & Filter */}
      <div className="flex justify-between items-center mb-5">
        <div className="flex items-center gap-4">
          <TextField
            label="Search Nama"
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FilterButton onSelect={setSelectedClass} />
        </div>
        <Button variant="contained" color="success" onClick={handleDownload}>
          <FaDownload size={20} />
        </Button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b-2 border-black text-center bg-gray-100 text-sm">
              <th className="px-6 py-5">No</th>
              <th className="px-6 py-5">NISN</th>
              <th className="px-6 py-5">Nama</th>
              <th className="px-6 py-5 text-left pl-8">Kelas</th>
              <th className="px-6 py-5">Hadir</th>
              <th className="px-6 py-5">Tidak Hadir</th>
              <th className="px-6 py-5">Terlambat</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((student, index) => (
              <tr key={student.id} className="border-b border-gray-300 text-center text-sm">
                <td className="px-6 py-5">{index + 1}.</td>
                <td className="px-6 py-5">{student.nisn}</td>
                <td className="px-4 py-5">
                  <a
                    href="#"
                    className="text-blue-500 hover:underline cursor-pointer"
                    onClick={() => handleDetailClick(student.nisn)} // ✅ Navigasi saat nama ditekan
                  >
                    {formatName(student.name)}
                  </a>
                </td>
                <td className="px-6 py-5 text-left pl-8">{student.class}</td>

                {/* ✅ Hadir */}
                <td className="px-6 py-5">
                  <div className="flex justify-center">
                    <div className="w-8 h-8 flex items-center justify-center rounded-full bg-green-500 text-white font-medium">
                      {student.hadir}
                    </div>
                  </div>
                </td>

                {/* ✅ Tidak Hadir */}
                <td className="px-6 py-5">
                  <div className="flex justify-center">
                    <div className="w-8 h-8 flex items-center justify-center rounded-full bg-red-500 text-white font-medium">
                      {student.tidakHadir}
                    </div>
                  </div>
                </td>

                {/* ✅ Terlambat */}
                <td className="px-6 py-5">
                  <div className="flex justify-center">
                    <div className="w-8 h-8 flex items-center justify-center rounded-full bg-yellow-500 text-white font-medium">
                      {student.terlambat}
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendanceMonthTable;
