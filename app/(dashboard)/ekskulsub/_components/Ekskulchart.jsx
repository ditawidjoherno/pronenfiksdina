import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { AiOutlineBarChart } from 'react-icons/ai';

const data = [
  { name: 'X-A', Anggota: 12, Siswa: 30 },
  { name: 'X-B', Anggota: 15, Siswa: 28 },
  { name: 'X-C', Anggota: 18, Siswa: 32 },
  { name: 'X-D', Anggota: 10, Siswa: 25 },
  { name: 'X-E', Anggota: 14, Siswa: 29 },
  { name: 'XI-A', Anggota: 16, Siswa: 27 },
  { name: 'XI-B', Anggota: 11, Siswa: 26 },
  { name: 'XI-C', Anggota: 19, Siswa: 30 },
  { name: 'XI-D', Anggota: 13, Siswa: 28 },
  { name: 'XI-E', Anggota: 17, Siswa: 31 },
  { name: 'XII-A', Anggota: 9, Siswa: 24 },
  { name: 'XII-B', Anggota: 12, Siswa: 27 },
  { name: 'XII-C', Anggota: 15, Siswa: 29 },
  { name: 'XII-D', Anggota: 8, Siswa: 22 },
  { name: 'XII-E', Anggota: 10, Siswa: 23 },
];

export default function EkskulChart() {
  return (
    <div className="p-4 bg-white rounded-2xl shadow-md h-[440px]">
      <div className="flex items-center gap-2 mb-4">
        <AiOutlineBarChart className="text-2xl text-black mt-2" />
        <h2 className="text-xl font-bold text-black mt-2">Statistik Anggota Ekskul & Jumlah Siswa</h2>
      </div>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data} margin={{ top: 20, right: 40, left: 0, bottom: 5 }}>
          <XAxis dataKey="name" className="text-gray-600" />
          <YAxis className="text-gray-600" />
          <Tooltip />
          <Legend />
          <Bar dataKey="Anggota" fill="#4F46E5" radius={[5, 5, 0, 0]} />
          <Bar dataKey="Siswa" fill="#10B981" radius={[5, 5, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
