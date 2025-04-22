import Image from "next/image";
import { FaEdit } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";
import { FaCamera } from "react-icons/fa";
import { FaRegCheckCircle } from "react-icons/fa";

export default function ProfileEditPopup({ isOpen, onClose }) {
  if (!isOpen) return null;

  const handleImageUpload = () => {
    document.getElementById("fileInput").click();
  };

  return (
    <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg w-[90%] max-w-[600px]">
        <h2 className="text-2xl font-bold text-center mb-6 ">Kelola Profil</h2>
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-10 relative">
          <div className="flex justify-center relative mt-3">
            <Image
              src="/images/profil.jpg"
              alt="Profile Picture"
              width={210}
              height={210}
              className="rounded-xl object-cover"
            />
            <input type="file" id="fileInput" className="hidden" />
            <button 
              className="absolute -bottom-3 -right-1 bg-yellow-500 text-white p-2 rounded-full shadow-md"
              onClick={handleImageUpload}
            >
              <FaCamera />
            </button>
          </div>
          <div className="grid grid-cols-1 gap-2 w-full">
            <div>
              <p className="font-semibold text-lg">Nama</p>
              <div className="flex items-center border p-2 rounded-md">
                <input
                  type="text"
                  className="w-full focus:outline-none"
                  defaultValue="Treasure Arsinta"
                />
                <FaEdit className="text-gray-500" />
              </div>
            </div>
            <div>
              <p className="font-semibold text-lg">Agama</p>
              <select className="w-full border p-2 rounded-md">
                <option>Kristen</option>
                <option>Islam</option>
                <option>Hindu</option>
                <option>Buddha</option>
                <option>Konghucu</option>
              </select>
            </div>
            <div>
              <p className="font-semibold text-lg">No HP</p>
              <div className="flex items-center border p-2 rounded-md">
                <input
                  type="text"
                  className="w-full focus:outline-none"
                  defaultValue="+62xxxxxxxxxx"
                />
                <FaEdit className="text-gray-500" />
              </div>
            </div>
            <div>
              <p className="font-semibold text-lg">Email</p>
              <div className="flex items-center border p-2 rounded-md">
                <input
                  type="email"
                  className="w-full focus:outline-none"
                  defaultValue="Example@gmail.com"
                />
                <FaEdit className="text-gray-500" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-10 ">
          <button className="bg-green-600 text-white px-6 py-2 rounded-lg shadow-md flex items-center gap-2">
          <FaRegCheckCircle />Simpan
          </button>
          <button
            className="bg-red-600 text-white px-6 py-2 rounded-lg shadow-md flex items-center gap-2"
            onClick={onClose}
          >
            <MdOutlineCancel /> Batalkan
          </button>
        </div>
      </div>
    </div>
  );
}
