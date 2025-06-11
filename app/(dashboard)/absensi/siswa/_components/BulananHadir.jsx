'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { IoPeople } from "react-icons/io5";

export default function KehadiranBulanan({ selectedDate, setSelectedDate }) {
  const [hadir, setHadir] = useState(0);
  const [tidakHadir, setTidakHadir] = useState(0);
  const [terlambat, setTerlambat] = useState(0);
  const [user, setUser] = useState(null);
  const [waliKelas, setWaliKelas] = useState('-');
  const [dataAnak, setDataAnak] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');

      try {
        const res = await fetch("http://localhost:8000/api/user", {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });

        const result = await res.json();
        const userData = result.user;

        setUser({
          id: userData.id,
          nama: userData.nama,
          kelas: userData.kelas ?? '-',
          foto_profil: userData.foto_profil
            ? `http://localhost:8000/storage/${userData.foto_profil}`
            : '/images/profil.png',
          role: userData.role,
        });

        if (userData.role === 'orangtua') {
          const anakId = localStorage.getItem("anakId");
          if (!anakId) {
            console.error("anakId tidak ditemukan");
            return;
          }

          const anakRes = await fetch(`http://localhost:8000/api/siswa/${anakId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          });

          const anakData = await anakRes.json();

          setDataAnak({
            nama: anakData.nama,
            kelas: anakData.kelas,
            foto_profil: anakData.foto_profil
              ? `http://localhost:8000/storage/${anakData.foto_profil}`
              : '/images/profil.png',
          });

          const resWali = await fetch(`http://localhost:8000/api/guru-wali?kelas=${encodeURIComponent(anakData.kelas)}`, {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          });

          const waliData = await resWali.json();
          setWaliKelas(waliData.nama ?? '-');
        } else if (userData.kelas) {
          const resWali = await fetch(`http://localhost:8000/api/guru-wali?kelas=${encodeURIComponent(userData.kelas)}`, {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          });

          const waliData = await resWali.json();
          setWaliKelas(waliData.nama ?? '-');
        }
      } catch (err) {
        console.error("❌ Gagal mengambil data user:", err.message);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (!selectedDate || !user) return;

    const fetchAbsensi = async () => {
      const token = localStorage.getItem('token');
      const bulan = selectedDate.getMonth() + 1;
      const tahun = selectedDate.getFullYear();

      try {
        let response;

        if (user.role === 'orangtua') {
          const anakId = localStorage.getItem("anakId");
          if (!anakId) {
            console.error("anakId tidak ditemukan di localStorage");
            return;
          }

          response = await fetch(`http://localhost:8000/api/absensi-anak-bulanan?bulan=${bulan}&tahun=${tahun}&anak_id=${anakId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          });
        } else {
          response = await fetch(`http://localhost:8000/api/absensi-saya-bulanan?bulan=${bulan}&tahun=${tahun}`, {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          });
        }

        const data = await response.json();
        setHadir(data.hadir || 0);
        setTidakHadir(data.tidak_hadir || 0);
        setTerlambat(data.terlambat || 0);
      } catch (error) {
        console.error("❌ Error saat fetch absensi:", error.message);
      }
    };

    fetchAbsensi();
  }, [selectedDate, user]);

  if (!user) {
    return <div className="text-center py-10 text-gray-500">Memuat data pengguna...</div>;
  }

  const displayFoto = user.role === 'orangtua' ? dataAnak?.foto_profil : user.foto_profil;
  const displayNama = user.role === 'orangtua' ? dataAnak?.nama : user.nama;
  const displayKelas = user.role === 'orangtua' ? dataAnak?.kelas : user.kelas;

  return (
    <div className="bg-white border shadow-md rounded-2xl p-6 max-w-7xl mx-auto text-center">
      <div className="flex items-center space-x-4 mb-6 ml-6">
        <p className="font-semibold">Pilih Bulan & Tahun:</p>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          dateFormat="MMMM yyyy"
          showMonthYearPicker
          className="border px-3 py-2 rounded-lg shadow-sm"
        />
      </div>

      <div className="w-36 h-36 relative rounded-full overflow-hidden mx-auto mb-6">
        <Image
          src={displayFoto}
          alt="Foto Siswa"
          width={144}
          height={144}
          style={{ objectFit: 'cover', borderRadius: '9999px' }}
        />
      </div>

      <h3 className="font-bold text-2xl text-gray-900">{displayNama}</h3>
      <p className="font-semibold text-lg text-black">{displayKelas}</p>

      {user.role === 'siswa' || user.role === 'orangtua' ? (
        <div className="flex justify-center items-center text-sm text-gray-600 mb-5">
          <IoPeople className="mr-2 text-lg text-gray-600" />
          <span>{waliKelas}</span>
        </div>
      ) : null}

      <div className="flex justify-center items-center mb-4">
        <div className="w-2/3 bg-gray-200 h-8 rounded-full overflow-hidden">
          <div className="bg-[#5CB338] h-8 rounded-l-full" style={{ width: `${hadir}%` }}></div>
        </div>
        <span className="ml-3 text-md font-medium">{hadir}%</span>
      </div>

      <div className="flex justify-center items-center mb-4">
        <div className="w-2/3 bg-gray-200 h-8 rounded-full overflow-hidden">
          <div className="bg-[#FB4141] h-8 rounded-l-full" style={{ width: `${tidakHadir}%` }}></div>
        </div>
        <span className="ml-3 text-md font-medium">{tidakHadir}%</span>
      </div>

      <div className="flex justify-center items-center mb-6">
        <div className="w-2/3 bg-gray-200 h-8 rounded-full overflow-hidden">
          <div className="bg-[#FFBB03] h-8 rounded-l-full" style={{ width: `${terlambat}%` }}></div>
        </div>
        <span className="ml-3 text-md font-medium">{terlambat}%</span>
      </div>
    </div>
  );
}
