'use client';
import { IoPersonSharp } from "react-icons/io5";

const students = [
  {
    id: 1,
    name: 'Akio Anak Baik Sekali',
    status: 'Berkontribusi',
    time: '07:30 AM',
    photo: '/images/siswa1.jpg',
  },
  {
    id: 2,
    name: 'Budi Santoso',
    status: 'Tidak Berkontribusi',
    time: '-',
    photo: '/images/siswa2.jpg',
  },
  {
    id: 3,
    name: 'Cici Marlina',
    status: 'Berkontribusi',
    time: '07:50 AM',
    photo: '/images/siswa3.jpg',
  },
  {
    id: 4,
    name: 'Dede Permana',
    status: 'Berkontribusi',
    time: '07:32 AM',
    photo: '/images/siswa4.jpg',
  },
  {
    id: 5,
    name: 'Eka Rahmawati',
    status: 'Berkontribusi',
    time: '07:29 AM',
    photo: '/images/siswa5.jpg',
  },
];

export default function AttendanceForm() {
  const day = 'Senin, 07-04-2025';
  const startTime = '07:30 AM';
  const endTime = '08:00 AM';
  const lastEdit = 'Senin, 07 April 2025 - 08:05 AM';

  const getAccentColor = (status) => {
    switch (status) {
      case 'Berkontribusi':
        return '#5CB338';
      case 'Tidak Berkontribusi':
        return '#FB4141';
      default:
        return '#000000';
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-5 border rounded-2xl shadow-md bg-white">
      {/* Informasi Kelas */}
      <div className="mb-4 ml-5 gap-4">
        <div className="flex"><strong className="w-28">Kelas</strong> <span>: X-A</span></div>
        <div className="flex"><strong className="w-28">Hari</strong> <span>: {day}</span></div>
        <div className="flex"><strong className="w-28">Mulai</strong> <span>: {startTime}</span></div>
        <div className="flex"><strong className="w-28">Selesai</strong> <span>: {endTime}</span></div>
      </div>

      {/* Nama Penginput */}
      <div className="mt-2 text-sm text-gray-700 flex justify-end mr-3">
        <p className="flex items-center gap-2">
          <IoPersonSharp />
          Stevanie Mawuntu
        </p>
      </div>

      {/* Tabel Absensi */}
      <table className="w-full border-t border-gray-300 mt-6 text-center">
        <thead>
          <tr className="border-b border-gray-300">
            <th className="py-2">No</th>
            <th className="py-2">Nama</th>
            <th className="py-2">Berkontribusi</th>
            <th className="py-2">Tidak Berkontribusi</th>
            <th className="py-2">Waktu</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={student.id} className="border-b border-gray-300">
              <td className="py-4 align-middle">{index + 1}.</td>

              <td className="py-4 px-3">
                <div className="flex items-center justify-center gap-3">
                  <img
                    src={student.photo}
                    alt={`Foto ${student.name}`}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <span>{student.name}</span>
                </div>
              </td>

              {['Berkontribusi', 'Tidak Berkontribusi'].map((status) => {
                const isChecked = student.status === status;
                return (
                  <td key={status} className="py-4">
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

              <td className="py-4 align-middle">{student.time}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Waktu Edit */}
      <div className="mt-6 text-sm text-gray-600 ml-2">
        <p><strong>Terakhir Diedit:</strong> {lastEdit}</p>
      </div>
    </div>
  );
}
