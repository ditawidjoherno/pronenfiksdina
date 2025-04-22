"use client";
import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const KehadiranChart = () => {
  const tanggalHariIni = new Date().toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const dataKehadiran = {
    labels: [
      "X A", "X B", "X C", "X D", "XI A", "XI B",
      "XI C", "XI D", "XII A", "XII B", "XII C", "XII D"
    ],
    datasets: [
      {
        label: "Jumlah Kehadiran",
        data: [20, 25, 30, 15, 5, 30, 14, 28, 25, 30, 25, 10],
        backgroundColor: "#B2A5FF",
        borderRadius: 20,
      },
      {
        label: "Jumlah Keseluruhan Siswa",
        data: [35, 40, 38, 32, 30, 45, 33, 40, 42, 38, 36, 29],
        backgroundColor: "#493D9E",
        borderRadius: 20,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: true },
      title: {
        display: true,
        text: `Kehadiran Siswa - ${tanggalHariIni}`,
        color: "#000",
      },
    },
    scales: {
      x: {
        ticks: { color: "#000" },
        grid: { display: false },
      },
      y: {
        ticks: { color: "#000" },
        grid: { color: "rgba(0, 0, 0, 0.2)" },
      },
    },
    layout: {
      padding: 0,
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-0 rounded-2xl shadow-lg bg-white mt-5" style={{ height: "450px" }}>
      <Bar data={dataKehadiran} options={options} />
    </div>
  );
};

export default KehadiranChart;
