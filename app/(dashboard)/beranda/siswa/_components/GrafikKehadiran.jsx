'use client';

import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from 'recharts';

const data = [
  { name: 'Hadir', value: 70, color: '#0047AB' },
  { name: 'Tidak Hadir', value: 25, color: '#FF0000' },
  { name: 'Terlambat', value: 25, color: '#FFC300' },
];

const COLORS = data.map((entry) => entry.color);

const dayNames = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

function getFormattedDate() {
  const today = new Date();
  const day = dayNames[today.getDay()];
  const date = today.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  return `${day}, ${date}`;
}

export default function AttendanceChart() {
  return (
    <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-md p-4 text-center mt-5">
      <h2 className="text-lg font-bold mb-1">Grafik Kehadiran</h2>
      <p className="text-sm text-gray-600 mb-4">{getFormattedDate()}</p>

      <PieChart width={250} height={250} className="mx-auto">
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={90}
          dataKey="value"
          startAngle={90}
          endAngle={-270}
          paddingAngle={2}
          label={({ percent }) =>
            `${(percent * 100).toFixed(0)}%`
          }
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>

      <div className="mt-4 space-y-1 text-sm">
        {data.map((entry, index) => (
          <div key={index} className="flex items-center justify-center gap-2">
            <span
              className="inline-block w-3 h-3 rounded-full"
              style={{ backgroundColor: entry.color }}
            ></span>
            <span>{entry.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
