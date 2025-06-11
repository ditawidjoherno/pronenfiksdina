"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

const IkutSertaSiswa = ({ studyTourId }) => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("-");
  const [date, setDate] = useState("-");

  useEffect(() => {
    if (!studyTourId) return;

    setLoading(true);

    // Ambil informasi Study Tour berdasarkan ID
    axios.get(`http://localhost:8000/api/studytour-info/${studyTourId}`)
      .then(res => {
        const data = res.data;
        setTitle(data.title || "-");
        setDate(data.tanggal || "-");
      })
      .catch(err => {
        console.error("Gagal ambil info Study Tour:", err);
      });

    // Ambil daftar peserta berdasarkan study_tour_info_id
    axios.get(`http://localhost:8000/api/peserta-studytour?id=${studyTourId}`)
      .then(response => {
        setStudents(response.data.data || []);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching peserta:", error);
        setLoading(false);
      });

  }, [studyTourId]);

  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    const date = new Date(dateStr);
    return date.toLocaleDateString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md max-w-7xl mx-auto">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Daftar Keikutsertaan Siswa</h2>
          <p className="text-gray-600 text-sm mt-1">{title}</p>
          <p className="text-gray-500 text-sm">{formatDate(date)}</p>
        </div>
        <div className="bg-yellow-500 text-white px-4 py-1.5 rounded-full font-semibold text-sm shadow-md h-fit">
          {students.length}
        </div>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Memuat data...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b bg-gray-50 text-gray-600">
                <th className="p-3 text-sm font-medium text-center w-16">No</th>
                <th className="p-3 text-sm font-medium text-center">NISN</th>
                <th className="p-3 text-sm font-medium text-center">Nama</th>
                <th className="p-3 text-sm font-medium text-left">Kelas</th>
                <th className="p-3 text-sm font-medium text-left">Kegiatan</th>
                <th className="p-3 text-sm font-medium text-center">Waktu</th>
                <th className="p-3 text-sm font-medium text-center">Hari/Tanggal</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr key={student.id} className="border-b hover:bg-gray-50 transition-all">
                  <td className="p-3 text-gray-700 text-sm text-center">{index + 1}.</td>
                  <td className="p-3 text-gray-700 text-sm text-center">{student.nisn}</td>
                  <td className="p-3 text-gray-800 text-sm text-center pl-10">
                    <div className="flex items-center justify-center gap-3" style={{ width: "200px" }}>
                      <img
                        src="/default-profile.png"
                        alt="Profile"
                        className="w-8 h-8 rounded-full border border-gray-300 shadow-sm flex-shrink-0"
                      />
                      <span className="whitespace-nowrap flex-1 text-left">{student.name}</span>
                    </div>
                  </td>
                  <td className="p-1 text-left sm:pr-16 pr-0">
                    <span className="bg-white text-blue-500 px-4 py-1.5 rounded-full sm:text-xs text-[10px] font-semibold border border-blue-600 shadow-md">
                      {student.class}
                    </span>
                  </td>
                  <td className="p-3 text-left">
                    <span className="bg-green-200 text-green-900 px-4 py-1.5 rounded-full text-xs font-medium shadow-md">
                      Daftar
                    </span>
                  </td>
                  <td className="p-3 text-gray-700 sm:text-sm text-xs text-center">{student.time}</td>
                  <td className="p-3 text-gray-600 text-sm text-center">{student.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default IkutSertaSiswa;
