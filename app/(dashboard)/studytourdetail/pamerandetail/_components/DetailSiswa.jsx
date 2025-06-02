import React from "react";

const studentData = [
  { id: 1, nisn: "1234567890", name: "Olivia Carter Sophia", class: "X-A", time: "08:00 AM", date: "01, Jan 2025" },
  { id: 2, nisn: "0987654321", name: "Akio apa saja", class: "X-A", time: "08:05 AM", date: "01, Jan 2025" },
  { id: 3, nisn: "1122334455", name: "Olivia Carter Sophia", class: "X-A", time: "08:10 AM", date: "01, Jan 2025" },
  { id: 4, nisn: "2233445566", name: "Olivia Carter Sophia", class: "X-A", time: "08:15 AM", date: "01, Jan 2025" },
  { id: 5, nisn: "3344556677", name: "Olivia Carter Sophia", class: "X-A", time: "08:20 AM", date: "01, Jan 2025" },
  { id: 6, nisn: "4455667788", name: "Olivia Carter Sophia", class: "X-A", time: "08:25 AM", date: "01, Jan 2025" },
  { id: 7, nisn: "5566778899", name: "Olivia Carter Sophia", class: "X-A", time: "08:30 AM", date: "01, Jan 2025" },
];

const StudentParticipation = () => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Daftar Keikutsertaan Siswa</h2>
        <div className="bg-yellow-500 text-white px-4 py-1.5 rounded-full font-semibold text-sm shadow-md mr-auto ml-2">
          {studentData.length}
        </div>
      </div>
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
            {studentData.map((student, index) => (
              <tr key={student.id} className="border-b hover:bg-gray-50 transition-all">
                <td className="p-3 text-gray-700 text-sm text-center w-16">{index + 1}.</td>
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
                <td className="p-1 text-left pr-16">
                  <span className="bg-white text-blue-500 px-4 py-1.5 rounded-full text-xs font-semibold border border-blue-600 shadow-md">
                    {student.class}
                  </span>
                </td>
                <td className="p-3 text-left">
                  <span className="bg-green-200 text-green-900 px-4 py-1.5 rounded-full text-xs font-medium shadow-md">
                    Daftar
                  </span>
                </td>
                <td className="p-3 text-gray-700 text-sm text-center">{student.time}</td>
                <td className="p-3 text-gray-600 text-sm text-center">{student.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentParticipation;
