import { useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";

export default function InputKejuaraan({ onClose }) {
  const [formData, setFormData] = useState({
    date: "",
    championship: "",
    event: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white p-6 rounded-xl shadow-lg w-96 relative">
        <button className="absolute top-4 right-4" onClick={onClose}>
          <AiFillCloseCircle className="w-6 h-6 text-red-500" />
        </button>
        <h2 className="text-center font-bold text-lg mb-4">Input Kejuaraan</h2>
        <label className="block font-semibold">Hari/Tanggal</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg mb-3"
        />
        <label className="block font-semibold">Kejuaraan</label>
        <input
          type="text"
          name="championship"
          value={formData.championship}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg mb-3"
        />
        <label className="block font-semibold">Event</label>
        <input
          type="text"
          name="event"
          value={formData.event}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg mb-4"
        />
        <button className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg">
          Selesai
        </button>
      </div>
    </div>
  );
}
