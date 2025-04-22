import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, LabelList } from 'recharts';

const data = [
  { name: 'Hadir', jumlah: 50, color: "#03CB11" }, // Hijau
  { name: 'Tidak Hadir', jumlah: 40, color: "#EF0808" }, // Merah
  { name: 'Ijin', jumlah: 10, color: "#FFA500" }, // Kuning
];

const maxValue = 100;

const AttendanceChart = () => {
  return (
    <div className="w-full h-64 p-4 bg-white rounded-2xl shadow-md mt-10">
      <h2 className="text-xl font-bold text-center mb-4">Statistik Kehadiran</h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart layout="vertical" data={data} margin={{ left: 20, right: 40 }}>
          <XAxis type="number" domain={[0, maxValue]} tick={false} axisLine={false} />
          <YAxis 
            dataKey="name" 
            type="category" 
            width={100} 
            axisLine={false} 
            tickLine={false} 
            tick={({ payload, x, y, width, height }) => {
              const item = data.find(d => d.name === payload.value);
              return (
                <text 
                  x={x} 
                  y={y} 
                  fill={item?.color || "#000"} 
                  fontSize={14} 
                  fontWeight="500" 
                  textAnchor="end"
                >
                  {payload.value}
                </text>
              );
            }} 
          />
          <Tooltip />
          <Bar dataKey="jumlah" barSize={40} radius={[0, 10, 10, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
            <LabelList 
              dataKey="jumlah" 
              position="right" 
              formatter={(value) => `${((value / maxValue) * 100).toFixed(0)}%`} 
              fill="#333" 
              fontSize={14} 
              fontWeight="bold"
              offset={10} // Jarak dari batang
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AttendanceChart;
