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
      "X A", "X B", "X C", "XI IPA1", "XI IPA2", "XI IPS1",
      "XI IPS2", "XI BAHASA", "XII IPA1", "XII IPA2", "XII IPS1", "XII IPS2", "XII BAHASA"
    ],
    datasets: [
      {
        label: "Jumlah Kehadiran",
        data: [20, 25, 30, 15, 5, 30, 14, 28, 25, 30, 25, 10, 15],
        backgroundColor: [
          "#e74c3c", "#e67e22", "#f1c40f", "#2ecc71", "#1abc9c",
          "#3498db", "#9b59b6", "#34495e", "#95a5a6", "#d35400",
          "#c0392b", "#8e44ad", "#2980b9"
        ],
        borderRadius: 20,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
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
      padding: 0, // Mengurangi padding di sekitar chart
    },
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-0 rounded-lg shadow-lg bg-white mt-5">
      <Bar data={dataKehadiran} options={options} />
    </div>
  );
};

export default KehadiranChart;
