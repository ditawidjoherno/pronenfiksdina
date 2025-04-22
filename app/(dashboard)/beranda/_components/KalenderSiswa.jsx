"use client";
import { useState, useEffect } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  getDay,
  addMonths,
  subMonths,
  isBefore,
  isToday,
  getDay as getWeekday,
  setMonth,
  setYear,
} from "date-fns";
import { Dialog } from "@headlessui/react";

export default function EventCalendar() {
  const [mounted, setMounted] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [events, setEvents] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [note, setNote] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const days = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });

  const handleAddNote = () => {
    if (selectedDate && !isBefore(new Date(selectedDate), new Date())) {
      setEvents({ ...events, [selectedDate]: note });
      setNote("");
      setSelectedDate(null);
      setIsOpen(false);
    }
  };

  const handleDeleteNote = () => {
    if (selectedDate) {
      const newEvents = { ...events };
      delete newEvents[selectedDate];
      setEvents(newEvents);
      setSelectedDate(null);
      setIsOpen(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-xl rounded-2xl font-[Poppins] border border-gray-200 mt-2">
      <div className="flex justify-between items-center mb-6">
        <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))} className="px-3 py-2 bg-gray-100 rounded-full shadow hover:bg-gray-200">←</button>
        <div className="flex gap-2">
          <select
            className="px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            value={format(currentMonth, "MMMM")}
            onChange={(e) => setCurrentMonth(setMonth(currentMonth, new Date(Date.parse(e.target.value + " 1, 2022")).getMonth()))}
          >
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i} value={format(setMonth(new Date(), i), "MMMM")}>
                {format(setMonth(new Date(), i), "MMMM")}
              </option>
            ))}
          </select>
          <select
            className="px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            value={format(currentMonth, "yyyy")}
            onChange={(e) => setCurrentMonth(setYear(currentMonth, parseInt(e.target.value, 10)))}
          >
            {Array.from({ length: 10 }, (_, i) => (
              <option key={i} value={new Date().getFullYear() - 5 + i}>
                {new Date().getFullYear() - 5 + i}
              </option>
            ))}
          </select>
        </div>
        <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))} className="px-3 py-2 bg-gray-100 rounded-full shadow hover:bg-gray-200">→</button>
      </div>
      <div className="grid grid-cols-7 text-center gap-1">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="font-medium text-gray-600">{day}</div>
        ))}
        {Array(getDay(startOfMonth(currentMonth))).fill(null).map((_, i) => (
          <div key={i}></div>
        ))}
        {days.map((day) => {
          const dateKey = format(day, "yyyy-MM-dd");
          const isPast = isBefore(day, new Date());
          const weekday = getWeekday(day);
          const bgColor = isToday(day) ? "bg-yellow-400 text-white " : (weekday === 0 || weekday === 6) ? "bg-red-300 text-white " : "bg-gray-100 ";
          return (
            <div key={day} className={`p-4 text-center relative cursor-pointer rounded-lg ${bgColor} hover:bg-gray-300 transition-all`} onClick={() => { if (!isPast) { setSelectedDate(dateKey); setNote(events[dateKey] || ""); setIsOpen(true); } }}>
              <span>{format(day, "d")}</span>
              {events[dateKey] && <div className="w-2 h-2 bg-blue-500 rounded-full absolute bottom-1 left-1/2 transform -translate-x-1/2"></div>}
            </div>
          );
        })}
      </div>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="fixed inset-0 flex items-center justify-center p-4 bg-gray-800 bg-opacity-50">
        <div className="bg-white p-6 rounded-xl shadow-xl max-w-sm w-full">
          <h3 className="text-lg font-semibold mb-3">Manage Note for {selectedDate}</h3>
          <input type="text" className="w-full p-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" value={note} onChange={(e) => setNote(e.target.value)} />
          <div className="flex justify-end mt-4 gap-2">
            <button className="bg-gray-300 text-black px-4 py-2 rounded-md shadow hover:bg-gray-400 transition-all" onClick={() => setIsOpen(false)}>Cancel</button>
            <button className="bg-red-500 text-white px-4 py-2 rounded-md shadow hover:bg-red-600 transition-all" onClick={handleDeleteNote}>Delete</button>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600 transition-all" onClick={handleAddNote}>Save</button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
