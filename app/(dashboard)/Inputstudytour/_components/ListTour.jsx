'use client';

import { useState, useEffect } from 'react';

const students = [
  { id: 1, name: 'Akio Anak Baik Sekali' },
  { id: 2, name: 'Akio Anak Baik Sekali' },
  { id: 3, name: 'Akio Anak Baik Sekali' },
  { id: 4, name: 'Akio Anak Baik Sekali' },
  { id: 5, name: 'Akio Anak Baik Sekali' },
];

export default function ListForm() {
  const [list, setList] = useState({});
  const [lastEdit, setLastEdit] = useState(null);
  const [isEditing, setIsEditing] = useState(true);
  const [startDate] = useState(new Date().toISOString().split('T')[0]);
  const [endDate] = useState(new Date().toISOString().split('T')[0]);
  const [destination] = useState("Museum Sejarah");
  const [cost] = useState("Rp 50.000");

  useEffect(() => {
    const now = new Date();
    const deadline = new Date(endDate);
    
    if (now > deadline) {
      setList((prevList) => {
        const updatedList = { ...prevList };
        students.forEach(student => {
          if (!updatedList[student.id]) {
            updatedList[student.id] = { status: 'Tidak Hadir', time: '-' };
          }
        });
        return updatedList;
      });
    }
  }, [endDate]);

  const handleListChange = (id, status) => {
    if (!isEditing) return;

    const currentDateTime = new Date();
    const formattedDate = currentDateTime.toLocaleDateString('id-ID');
    const formattedTime = currentDateTime.toLocaleTimeString('id-ID');
    const dayName = currentDateTime.toLocaleDateString('id-ID', { weekday: 'long' });
    
    setList((prev) => ({
      ...prev,
      [id]: { status, time: formattedTime, date: `${dayName}, ${formattedDate}` },
    }));
    setLastEdit(`${dayName}, ${formattedDate} ${formattedTime}`);
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  return (
    <div className="max-w-7xl mx-auto p-5 border rounded-2xl shadow-md bg-white">
      <style>
        {`
          input[type="radio"]:disabled {
            accent-color: black;
            cursor: not-allowed;
          }
        `}
      </style>

      <div className="mb-4 space-y-2 text-md">
        <div className="flex"><strong className="w-28">Kelas</strong> <span>: X-A</span></div>
        <div className="flex"><strong className="w-28">Hari</strong> <span>: Senin, 17-02-2025</span></div>
        <div className="flex"><strong className="w-28">Tujuan</strong> <span>: {destination}</span></div>
        <div className="flex"><strong className="w-28">Biaya</strong> <span>: {cost}</span></div>
        <div className="flex"><strong className="w-28">Mulai</strong> <span>: {startDate}</span></div>
        <div className="flex"><strong className="w-28">Selesai</strong> <span>: {endDate}</span></div>
      </div>

      <table className="w-full border-t border-gray-300">
        <thead>
          <tr className="border-b border-gray-300">
            <th className="py-2">No</th>
            <th className="py-2">Nama</th>
            <th className="py-2">Daftar</th>
            <th className="py-2">Tidak Daftar</th>
            <th className="py-2">Waktu</th>
            <th className="py-2">Hari/Tanggal</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={student.id} className="border-b border-gray-300 text-center">
              <td className="py-2">{index + 1}.</td>
              <td className="py-6 pl-3">{student.name}</td>
              {['Hadir', 'Tidak Hadir'].map((status) => (
                <td key={status} className="py-2 px-10">
                  <input
                    type="radio"
                    name={`list-${student.id}`}
                    checked={list[student.id]?.status === status}
                    onChange={() => handleListChange(student.id, status)}
                    disabled={!isEditing} // Disable saat tidak dalam mode edit
                  />
                </td>
              ))}
              <td className="py-2">{list[student.id]?.time || '-'}</td>
              <td className="py-2">{list[student.id]?.date || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4 flex space-x-2">
        {isEditing ? (
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
            onClick={handleSave}
          >
            Save
          </button>
        ) : (
          <button
            className="px-4 py-2 bg-green-500 text-white rounded-md"
            onClick={handleEdit}
          >
            Edit
          </button>
        )}
      </div>

      {lastEdit && <p className="mt-2 text-gray-600">Last Edit: {lastEdit}</p>}
    </div>
  );
}
