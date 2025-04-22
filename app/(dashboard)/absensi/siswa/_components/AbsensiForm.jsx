'use client';
import { IoPersonSharp } from "react-icons/io5";

const students = [
  { id: 1, name: 'Akio Anak Baik Sekali', status: 'Hadir', time: '07:30 AM' },
  { id: 2, name: 'Akio Anak Baik Sekali', status: 'Tidak Hadir', time: '-' },
  { id: 3, name: 'Akio Anak Baik Sekali', status: 'Terlambat', time: '07:50 AM' },
  { id: 4, name: 'Akio Anak Baik Sekali', status: 'Hadir', time: '07:32 AM' },
  { id: 5, name: 'Akio Anak Baik Sekali', status: 'Hadir', time: '07:29 AM' },
];

export default function AbsensiViewer() {
  const day = 'Senin, 07-04-2025';
  const startTime = '07:30 AM';
  const endTime = '08:00 AM';
  const lastEdit = 'Senin, 07 April 2025 - 08:05 AM';

  const getAccentColor = (status) => {
    switch (status) {
      case 'Hadir':
        return '#5CB338';
      case 'Tidak Hadir':
        return '#FB4141';
      case 'Terlambat':
        return '#FFBB03';
      default:
        return '#000000';
    }
  };

  const totalHadir = students.filter((s) => s.status === 'Hadir').length;
  const totalTidakHadir = students.filter((s) => s.status === 'Tidak Hadir').length;
  const totalTerlambat = students.filter((s) => s.status === 'Terlambat').length;

  return (
    <div className="max-w-7xl mx-auto p-5 border rounded-2xl shadow-md bg-white">
      {/* Info */}
      <div className="mb-4 ml-5 gap-4">
        <div className="flex"><strong className="w-28">Kelas</strong> <span>: X-A</span></div>
        <div className="flex"><strong className="w-28">Hari</strong> <span>: {day}</span></div>
        <div className="flex"><strong className="w-28">Mulai</strong> <span>: {startTime}</span></div>
        <div className="flex"><strong className="w-28">Selesai</strong> <span>: {endTime}</span></div>
      </div>
      <div className="mt-2 text-sm text-gray-700 flex justify-end">
        <p className="flex items-center gap-2">
        <IoPersonSharp />
          Stevanie Mawuntu
        </p>
      </div>

      {/* Tabel */}
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
              <td className="py-6 pl-3">{student.name}</td>
              {['Hadir', 'Tidak Hadir', 'Terlambat'].map((status) => {
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
              <td className="py-2">{student.time}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Box Jumlah */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#5CB338] text-white p-4 rounded-xl text-center shadow-md">
          <h4 className="text-md font-semibold">Jumlah Hadir</h4>
          <p className="text-2xl">{totalHadir}</p>
        </div>
        <div className="bg-[#FB4141] text-white p-4 rounded-xl text-center shadow-md">
          <h4 className="text-md font-semibold">Jumlah Tidak Hadir</h4>
          <p className="text-2xl">{totalTidakHadir}</p>
        </div>
        <div className="bg-[#FFBB03] text-white p-4 rounded-xl text-center shadow-md">
          <h4 className="text-md font-semibold">Jumlah Terlambat</h4>
          <p className="text-2xl">{totalTerlambat}</p>
        </div>
      </div>

      {/* Last Edit */}
      <div className="mt-6 text-sm text-gray-600 ml-2">
        <p><strong>Terakhir Diedit:</strong> {lastEdit}</p>
      </div>
    </div>
  );
}
