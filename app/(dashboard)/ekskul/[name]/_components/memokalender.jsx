"use client";

import React, { useState, useEffect } from "react";
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay } from "date-fns";
import { id } from "date-fns/locale";

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [memos, setMemos] = useState({});
  const [currentTime, setCurrentTime] = useState(null);
  const [isClient, setIsClient] = useState(false);
  const [memoInput, setMemoInput] = useState("");

  useEffect(() => {
    setIsClient(true);
    const storedMemos = JSON.parse(localStorage.getItem("memos")) || {};
    setMemos(storedMemos);
  }, []);

  useEffect(() => {
    if (isClient) {
      localStorage.setItem("memos", JSON.stringify(memos));
    }
  }, [memos, isClient]);

  useEffect(() => {
    if (isClient) {
      const interval = setInterval(() => {
        setCurrentTime(new Date());
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isClient]);

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const firstDayOfMonth = startOfMonth(currentMonth);
  const lastDayOfMonth = endOfMonth(currentMonth);
  const firstDayOfWeek = startOfWeek(firstDayOfMonth);
  const lastDayOfWeek = endOfWeek(lastDayOfMonth);

  const days = [];
  let day = firstDayOfWeek;

  while (day <= lastDayOfWeek) {
    days.push(day);
    day = addDays(day, 1);
  }

  const handleMemoChange = (event) => {
    setMemoInput(event.target.value);
  };

  const saveMemo = () => {
    if (selectedDate && memoInput.trim()) {
      setMemos({ ...memos, [selectedDate]: memoInput });
      setMemoInput("");
    }
  };

  return (
    <div className="max-w-xs mx-auto p-2 bg-white shadow-md rounded-lg text-sm">
      <div className="flex justify-between items-center mb-2">
        <button onClick={prevMonth} className="text-xs">&lt;</button>
        <h2 className="text-sm font-bold">{format(currentMonth, "MMMM yyyy", { locale: id })}</h2>
        <button onClick={nextMonth} className="text-xs">&gt;</button>
      </div>
      {isClient && currentTime && (
        <div className="text-center text-gray-600 mb-2 text-xs">{format(currentTime, "EEEE, dd MMMM yyyy HH:mm:ss", { locale: id })}</div>
      )}
      <div className="grid grid-cols-7 gap-1 text-center font-bold text-xs">
        {["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"].map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1 mt-1">
        {days.map((day, index) => (
          <div key={index} className={`p-1 border rounded text-xs cursor-pointer ${!isSameMonth(day, currentMonth) ? "text-gray-400" : ""} ${isSameDay(day, selectedDate) ? "bg-blue-300" : ""}`} onClick={() => setSelectedDate(format(day, "yyyy-MM-dd"))}>
            {format(day, "d")}
            {memos[format(day, "yyyy-MM-dd")] && <span className="block text-[10px] text-red-500">🔔</span>}
          </div>
        ))}
      </div>
      {selectedDate && (
        <div className="mt-2 p-2 border rounded bg-gray-100">
          <h3 className="text-xs font-bold">Memo untuk {format(new Date(selectedDate), "dd MMMM yyyy", { locale: id })}</h3>
          <textarea className="w-full p-1 text-xs border rounded mt-1" value={memoInput} onChange={handleMemoChange} placeholder="Tambah memo..."></textarea>
          <button className="w-full mt-1 bg-blue-500 text-white text-xs p-1 rounded" onClick={saveMemo}>Simpan</button>
        </div>
      )}
    </div>
  );
};

export default Calendar;
