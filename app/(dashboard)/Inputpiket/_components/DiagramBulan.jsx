import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, LabelList } from 'recharts';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const data = [
  { name: 'Berkontribusi', jumlah: 50, color: "#640D5F", hoverColor: "#4AA62D" }, // Hijau
  { name: 'Tidak Berkontribusi', jumlah: 40, color: "#D91656", hoverColor: "#D93636" }, // Merah
];

const maxValue = 100;

const AttendanceChart = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [hoverIndex, setHoverIndex] = useState(null);

  return (
    <div className=" p-4 mt-5 ">
      <h2 className="text-xl font-bold text-center mb-4 mt-5">Capaian Kontribusi</h2>
      
      {/* Pilihan Bulan & Tahun */}
      <div className="flex items-center space-x-4 mb-4 ml-5">
        <p className="font-semibold">Pilih Bulan & Tahun:</p>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          dateFormat="MMMM yyyy"
          showMonthYearPicker
          className="border px-3 py-2 rounded-lg shadow-sm"
        />
      </div>

      <ResponsiveContainer width="100%" height={250}>
        <BarChart layout="vertical" data={data} margin={{ left: 20, right: 40 }} barGap={8}>
          <XAxis type="number" domain={[0, maxValue]} tick={false} axisLine={false} />
          <YAxis dataKey="name" type="category" width={0} axisLine={false} tickLine={false} tick={false} />
          <Tooltip cursor={{ fill: "rgba(0, 0, 0, 0.1)" }} />
          <Bar dataKey="jumlah" barSize={45} radius={[0, 10, 10, 0]}>
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={hoverIndex === index ? entry.hoverColor : entry.color} 
                onMouseEnter={() => setHoverIndex(index)} 
                onMouseLeave={() => setHoverIndex(null)}
              />
            ))}
            <LabelList 
              dataKey="jumlah" 
              position="right" 
              formatter={(value) => `${((value / maxValue) * 100).toFixed(0)}%`} 
              fill="#333" 
              fontSize={14} 
              fontWeight="bold"
              offset={10}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {/* Legend dalam bg putih yang sama */}
      <div className="flex justify-center gap-6 mt-4">
        {data.map((item) => (
          <div key={item.name} className="flex items-center gap-2">
            <div className="w-5 h-5" style={{ backgroundColor: item.color }}></div>
            <span className="text-sm font-medium">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AttendanceChart;
