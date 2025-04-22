import { FaBullhorn } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function TourCard() {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("Pameran HUT Minahasa Ke 597");
  const [date, setDate] = useState("04 Apr, 2025");
  const [eventType, setEventType] = useState("Pameran");

  const handleClick = () => {
    if (!isEditing) {
      router.push("/studytourdetail"); // Ganti dengan path yang sesuai
    }
  };

  const handleEditClick = (e) => {
    e.stopPropagation(); // Mencegah navigasi saat tombol ditekan
    setIsEditing(!isEditing);
  };

  return (
    <div
      className="bg-[#869ddd] p-6 rounded-2xl shadow-lg w-full max-w-7xl h-[220px] mt-5 flex justify-between items-start cursor-pointer hover:opacity-90 relative"
      onClick={handleClick}
    >
      <div className="flex-1 flex flex-col justify-center">
        <div className="flex items-center gap-3">
          <FaBullhorn className="text-white text-2xl" />
          {isEditing ? (
            <select
              value={eventType}
              onChange={(e) => setEventType(e.target.value)}
              className="text-black font-semibold text-2xl p-1 rounded"
            >
              <option value="Pameran">Pameran</option>
              <option value="Study Tour">Study Tour</option>
            </select>
          ) : (
            <h2 className="text-white font-semibold text-2xl">{eventType}</h2>
          )}
        </div>
        {isEditing ? (
          <input
            type="text"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="text-black font-medium text-xl mt-1 p-1 rounded"
          />
        ) : (
          <p className="text-white font-medium text-xl mt-1">{date}</p>
        )}
        <div className="flex justify-center items-center ml-28 mt-2">
          {isEditing ? (
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-black text-3xl font-bold p-1 rounded"
            />
          ) : (
            <p className="text-3xl font-bold text-blue-950" onClick={() => router.push("/studytourdetail")}>{title}</p>
          )}
        </div>
      </div>
      <div className="w-24 h-24 mr-8 overflow-hidden flex-shrink-0 mt-10">
        <img 
          src="/images/tour.png" 
          alt="Foto Petugas Piket" 
          className="w-full h-full object-cover"
        />
      </div>
      <button
        onClick={handleEditClick}
        className="bg-white text-blue-600 font-semibold px-4 py-2 rounded-lg shadow absolute bottom-4 left-4"
      >
        {isEditing ? "Simpan" : "Update Perjalanan"}
      </button>
    </div>
  );
}