import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function MonthlySummary() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div className="p-4 sm:p-6 bg-white rounded-lg shadow-lg w-full max-w-md mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-4">
        <p className="font-semibold text-sm sm:text-base">Pilih Bulan & Tahun:</p>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          dateFormat="MMMM yyyy"
          showMonthYearPicker
          className="border px-3 py-2 rounded-lg shadow-sm text-sm sm:text-base w-full sm:w-auto"
        />
      </div>
    </div>
  );
}
