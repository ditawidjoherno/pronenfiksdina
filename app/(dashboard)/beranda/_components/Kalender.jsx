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
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [events, setEvents] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [note, setNote] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const API_BASE = "http://localhost:8000/api";

  // Ambil event dari backend saat pertama kali load
  useEffect(() => {
    fetch(`${API_BASE}/events`)
      .then((res) => res.json())
      .then((data) => {
        const mapped = {};
        data.forEach((e) => (mapped[e.date] = e.note));
        setEvents(mapped);
      })
      .catch((err) => {
        console.error("Gagal ambil data:", err);
      });
  }, []);

  const days = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });

  // ✅ Simpan atau update catatan
  const handleAddNote = () => {
    if (!selectedDate || note.trim() === "") return;

    console.log("🚀 Mengirim data:", { date: selectedDate, note });

    fetch(`${API_BASE}/events`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        date: selectedDate,
        note: note,
      }),
    })
      .then(async (res) => {
        const raw = await res.text();
        console.log("📨 Respon status:", res.status);
        console.log("📨 Respon isi:", raw);
        if (!res.ok) throw new Error("Gagal menyimpan");
        return JSON.parse(raw);
      })
      .then((data) => {
        setEvents((prev) => ({ ...prev, [data.date]: data.note }));
        setNote("");
        setSelectedDate(null);
        setIsOpen(false);
      })
      .catch((err) => {
        console.error("❗Gagal simpan:", err);
        alert("Gagal menyimpan catatan.");
      });
  };

  // ✅ Hapus catatan
  const handleDeleteNote = () => {
    if (!selectedDate) return;

    fetch(`${API_BASE}/events/${selectedDate}`, {
      method: "DELETE",
      headers: {
        "Accept": "application/json",
      },
    })
      .then(() => {
        const updated = { ...events };
        delete updated[selectedDate];
        setEvents(updated);
        setSelectedDate(null);
        setIsOpen(false);
      })
      .catch((err) => {
        console.error("❗Gagal hapus:", err);
        alert("Gagal menghapus catatan.");
      });
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-xl rounded-2xl font-[Poppins] border border-gray-200 mt-2">
      {/* Navigasi Bulan */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
          className="px-3 py-2 bg-gray-100 rounded-full shadow hover:bg-gray-200"
        >
          ←
        </button>
        <div className="flex gap-2">
          <select
            className="px-3 py-2 border rounded-md"
            value={format(currentMonth, "MMMM")}
            onChange={(e) =>
              setCurrentMonth(
                setMonth(
                  currentMonth,
                  new Date(Date.parse(e.target.value + " 1, 2022")).getMonth()
                )
              )
            }
          >
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i} value={format(setMonth(new Date(), i), "MMMM")}>
                {format(setMonth(new Date(), i), "MMMM")}
              </option>
            ))}
          </select>
          <select
            className="px-3 py-2 border rounded-md"
            value={format(currentMonth, "yyyy")}
            onChange={(e) =>
              setCurrentMonth(setYear(currentMonth, parseInt(e.target.value)))
            }
          >
            {Array.from({ length: 10 }, (_, i) => {
              const year = new Date().getFullYear() - 5 + i;
              return (
                <option key={i} value={year}>
                  {year}
                </option>
              );
            })}
          </select>
        </div>
        <button
          onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
          className="px-3 py-2 bg-gray-100 rounded-full shadow hover:bg-gray-200"
        >
          →
        </button>
      </div>

      {/* Hari-hari dalam bulan */}
      <div className="grid grid-cols-7 text-center gap-1">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="font-medium text-gray-600">
            {day}
          </div>
        ))}
        {Array(getDay(startOfMonth(currentMonth)))
          .fill(null)
          .map((_, i) => (
            <div key={i}></div>
          ))}
        {days.map((day) => {
          const dateKey = format(day, "yyyy-MM-dd");
          const weekday = getWeekday(day);
          const bgColor = isToday(day)
            ? "bg-yellow-400 text-white"
            : weekday === 0 || weekday === 6
            ? "bg-red-300 text-white"
            : "bg-gray-100";

          return (
            <div
              key={dateKey}
              className={`p-4 text-center relative cursor-pointer rounded-lg ${bgColor} hover:bg-gray-300 transition-all`}
              onClick={() => {
                setSelectedDate(dateKey);
                setNote(events[dateKey] || "");
                setIsOpen(true);
              }}
            >
              <span>{format(day, "d")}</span>
              {events[dateKey] && (
                <div className="w-2 h-2 bg-blue-500 rounded-full absolute bottom-1 left-1/2 transform -translate-x-1/2"></div>
              )}
            </div>
          );
        })}
      </div>

      {/* Dialog Modal Input */}
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-40"
      >
        <div className="bg-white p-6 rounded-xl shadow-xl max-w-sm w-full">
          <h3 className="text-lg font-semibold mb-3">
            Manage Note for {selectedDate}
          </h3>
          <input
            type="text"
            className="w-full p-2 border rounded-md shadow-sm"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Tulis catatan..."
          />
          <div className="flex justify-end mt-4 gap-2">
            <button
              className="bg-gray-300 text-black px-4 py-2 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-md"
              onClick={handleDeleteNote}
            >
              Delete
            </button>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
              onClick={handleAddNote}
            >
              Save
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
