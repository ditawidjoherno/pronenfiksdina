import { FaSearch, FaFilter, FaUserPlus, FaUsers } from "react-icons/fa";

const anggotaEkskul = [
  { id: 1, nama: "Olivia Carter Sophia", nisn: "1234567890", kelas: "X - A", status: "green" },
  { id: 2, nama: "James Anderson", nisn: "0987654321", kelas: "X - B", status: "green" },
  { id: 3, nama: "Sophia Martinez", nisn: "1122334455", kelas: "X - C", status: "green" },
  { id: 4, nama: "Liam Johnson", nisn: "5566778899", kelas: "X - D", status: "orange" },
  { id: 5, nama: "Emma Williams", nisn: "6677889900", kelas: "X - E", status: "orange" },
  { id: 6, nama: "Akio Koceng", nisn: "6677889900", kelas: "X - E", status: "orange" },
];

export default function AnggotaEkskul() {
  return (
    <div className="max-w-4xl mx-auto mt-2 bg-white rounded-2xl shadow-lg p-3">
      {/* Header */}
      <div className="flex items-center justify-between border-b pb-3 mb-1">
        <div className="flex items-center gap-3 font-semibold text-xl">
          <FaUsers className="text-gray-700" />
          <span>Anggota Ekskul</span>
        </div>
        <div className="flex gap-4 text-gray-700 text-lg">
          <FaSearch className="cursor-pointer" />
          <FaFilter className="cursor-pointer" />
        </div>
      </div>

      {/* Tabel */}
      <table className="w-full text-left text-sm ">
        <thead>
          <tr className="text-gray-700 border-b mt-10">
            <th className="py-3 w-12 pl-4">No</th>
            <th className="text-center w-40">Nama</th>
            <th className="text-center w-32">NISN</th>
            <th className="text-center w-20">Kelas</th>
            <th className="w-6"></th>
          </tr>
        </thead>
        <tbody>
          {anggotaEkskul.map((anggota, index) => (
            <tr key={anggota.id} className="border-b">
              <td className="py-4 text-center">{index + 1}.</td>
              <td className="py-4 flex items-center gap-3">
                <img
                  src="/images/profilsiswa.jpg"
                  alt="avatar"
                  className="w-8 h-8 rounded-full"
                />
                <span>{anggota.nama}</span>
              </td>
              <td className="py-4 text-center">{anggota.nisn}</td>
              <td className="py-4 text-center">{anggota.kelas}</td>
              <td className="py-4 text-center">
                <span
                  className={`w-4 h-4 rounded-full inline-block ${
                    anggota.status === "green" ? "bg-green-500" : "bg-orange-500"
                  }`}
                ></span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Tombol Tambah */}
      <div className="flex justify-center mt-5">
        <button className="w-[250px] h-[40px] bg-blue-600 text-white flex items-center justify-center gap-3 py-3 rounded-lg text-lg hover:bg-blue-700 transition">
          <FaUserPlus />
          Tambah Anggota
        </button>
      </div>
    </div>
  );
}
