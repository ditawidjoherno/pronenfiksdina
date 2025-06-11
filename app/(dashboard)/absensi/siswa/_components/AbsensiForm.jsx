'use client';

import { useEffect, useState } from "react";
import { IoPersonSharp } from "react-icons/io5";

export default function AbsensiViewer() {
  const [students, setStudents] = useState([]);
  const [kelas, setKelas] = useState("-");
  const [lastEdit, setLastEdit] = useState(null);
  const [day, setDay] = useState("-");
  const [startTime, setStartTime] = useState("-");
  const [endTime, setEndTime] = useState("-");

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');

      try {
        // Ambil data user
        const resUser = await fetch("http://localhost:8000/api/user", {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });
        const resultUser = await resUser.json();
        const kelasUser = resultUser.user.kelas;
        setKelas(kelasUser);

        // Ambil data absensi hari ini
        const resAbsensi = await fetch(`http://localhost:8000/api/absensi-hari-ini-kelas?kelas=${kelasUser}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });
        const resultAbsensi = await resAbsensi.json();
        console.log("✅ Absensi hari ini:", resultAbsensi);
        console.log("🎯 resultAbsensi:", resultAbsensi);

        setStudents(resultAbsensi.data || []);
        setDay(resultAbsensi.hari || "-");
        setStartTime(resultAbsensi.mulai || "-");
        setEndTime(resultAbsensi.selesai || "-");
        setLastEdit(resultAbsensi.last_edit);
      } catch (err) {
        console.error("❌ Gagal ambil data:", err.message);
      }
    };

    fetchData();
  }, []);

  const getAccentColor = (status) => {
    switch (status) {
      case 'Hadir': return '#5CB338';
      case 'Tidak Hadir': return '#FB4141';
      case 'Terlambat': return '#FFBB03';
      default: return '#ccc';
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-5 border rounded-2xl shadow-md bg-white">
      {/* Info Kelas */}
      <div className="mb-4 ml-5 gap-4">
        <div className="flex"><strong className="w-28">Kelas</strong> <span>: {kelas}</span></div>
        <div className="flex"><strong className="w-28">Hari</strong> <span>: {day}</span></div>
        <div className="flex"><strong className="w-28">Mulai</strong> <span>: {startTime}</span></div>
        <div className="flex"><strong className="w-28">Selesai</strong> <span>: {endTime}</span></div>
      </div>

      {/* Tabel Siswa */}
      <table className="w-full border-t border-gray-300 mt-5">
        <thead>
          <tr className="border-b border-gray-300">
            <th className="py-2">No</th>
            <th className="py-2">Nama</th>
            <th className="py-2">Hadir</th>
            <th className="py-2">Tidak Hadir</th>
            <th className="py-2">Terlambat</th>
            <th className="py-2">Waktu</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={student.id} className="border-b border-gray-300 text-center">
              <td className="py-2">{index + 1}.</td>
              <td className="py-6 pl-3">{student.nama}</td>
              {["Hadir", "Tidak Hadir", "Terlambat"].map((status) => {
                const isChecked = student.status === status;
                return (
                  <td key={status} className="py-2 px-10">
                    <input
                      type="radio"
                      name={`attendance-${student.id}`}
                      checked={isChecked}
                      disabled
                      style={{
                        accentColor: isChecked ? getAccentColor(status) : '#ccc',
                        cursor: 'not-allowed',
                      }}
                    />
                  </td>
                );
              })}
              <td className="py-2">{student.waktu || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Last Edit */}
      {lastEdit && (
        <div className="mt-6 text-sm text-gray-600 ml-2">
          <p><strong>Terakhir Diedit:</strong> {lastEdit}</p>
        </div>
      )}
    </div>
  );
}
