'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function StudentParticipation({ judul, tanggal }) {
  const [students, setStudents] = useState([]);

  const formatDateWithDay = (dateStr) => {
    if (!dateStr) return "-";
    const d = new Date(dateStr);
    return d.toLocaleDateString("id-ID", {
      weekday: "long",
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  useEffect(() => {
    if (!judul || !tanggal || judul === '-' || tanggal === '-') return;

    axios.get("http://localhost:8000/api/karya-wisata/partisipasi", {
      params: { judul, tanggal },
    })
    .then((res) => {
      setStudents(res.data?.data || []);
    })
    .catch((err) => {
      console.error("Gagal mengambil data partisipasi:", err);
    });
  }, [judul, tanggal]);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="sm:text-xl text-base font-semibold text-gray-800">
          Daftar Siswa yang Hadir – {judul} ({formatDateWithDay(tanggal)})
        </h2>
        <div className="bg-yellow-500 text-white px-4 py-1.5 rounded-full font-semibold text-sm shadow-md mr-auto ml-2">
          {students.length}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b bg-gray-50 text-gray-600">
              <th className="p-3 text-sm font-medium text-center w-16">No</th>
              <th className="p-3 text-sm font-medium text-center">Nama</th>
              <th className="p-3 text-sm font-medium text-center">Kelas</th>
              <th className="p-3 text-sm font-medium text-center">Status</th>
              <th className="p-3 text-sm font-medium text-center">Waktu</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s, i) => (
              <tr key={i} className="border-b hover:bg-gray-50 transition-all">
                <td className="p-3 text-center">{i + 1}</td>
                <td className="p-3 text-center">{s.nama || '-'}</td>
                <td className="p-3 text-center">{s.kelas || '-'}</td>
                <td className="p-3 text-center">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold shadow ${
                    s.status?.toLowerCase() === 'hadir'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {s.status}
                  </span>
                </td>
                <td className="p-3 text-center">{s.waktu}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
