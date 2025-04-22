'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FaUsers, FaSearch } from 'react-icons/fa';
import { useState } from 'react';

const students = [
  { id: 1, name: 'Olivia Carter Sophia', nisn: '1029382983', gender: 'Perempuan', avatar: '/avatar.png' },
  { id: 2, name: 'Olivia Carter Sophia', nisn: '1029382983', gender: 'Laki-laki', avatar: '/avatar.png' },
  { id: 3, name: 'Olivia Carter Sophia', nisn: '1029382983', gender: 'Laki-laki', avatar: '/avatar.png' },
  { id: 4, name: 'Olivia Carter Sophia', nisn: '1029382983', gender: 'Laki-laki', avatar: '/avatar.png' },
  { id: 5, name: 'Olivia Carter Sophia', nisn: '1029382983', gender: 'Laki-laki', avatar: '/avatar.png' },
];

export default function StudentList() {
  const [search, setSearch] = useState('');

  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md mt-5">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <FaUsers /> Daftar Siswa
        </h2>
        <div className="relative">
          <input 
            type="text" 
            placeholder="Cari siswa..." 
            className="px-4 py-2 border rounded-lg pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr className="border-b">
              <th className="text-left p-4 pl-20">No</th>
              <th className="text-left p-4 pl-10">Nama</th>
              <th className="text-left p-4 pl-9">NISN</th>
              <th className="text-left p-4 pl-4">Jenis Kelamin</th>
              <th className="text-left p-4">Tanggal Lahir</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student, index) => (
              <tr key={index} className="border-b">
                <td className="p-4 pl-20">{index + 1}.</td>
                <td className="p-4 flex items-center gap-2">
                  <Image src={student.avatar} alt="Avatar" width={24} height={24} className="rounded-full" />
                  <Link 
                    href={`/detail-profil/${student.id}`}
                    className="text-blue-500 hover:underline"
                  >
                    {student.name}
                  </Link>
                </td>
                <td className="p-4 pr-7">{student.nisn}</td>
                <td className="p-4 pr-2">
  <span 
    className={`px-3 py-1 text-sm rounded-full text-white ${
      student.gender === 'Perempuan' ? 'bg-pink-400' : 'bg-purple-500 ml-2'
    }`} 
  >
    {student.gender === 'Perempuan' ? 'Perempuan' : 'Laki-laki'}
  </span>
</td>

                <td className="p-4">DD/MM/YYYY</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
