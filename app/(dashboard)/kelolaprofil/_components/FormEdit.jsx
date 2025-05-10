import Image from "next/image";
import { FaEdit } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";
import { FaCamera } from "react-icons/fa";
import { FaRegCheckCircle } from "react-icons/fa";
import { useState, useEffect } from "react";
import getProfile from "@/hooks/get-profile";
import UpdateProfile from "@/hooks/update-profile";

export default function ProfileEditPopup({ isOpen, onClose }) {
  const { data, getProfileUser } = getProfile();
  const { loading, error, updateData, updateProfileImage } = UpdateProfile(); // Use the hook here
  const [updatedNama, setUpdatedNama] = useState('');
  const [updatedEmail, setUpdatedEmail] = useState('');
  const [updatedAgama, setUpdatedAgama] = useState('');
  const [updatedNomorHp, setUpdatedNomorHp] = useState('');
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    getProfileUser(); // Fetch user profile data from the backend
  }, [getProfileUser]);

  useEffect(() => {
    if (data) {
      setUpdatedNama(data.nama);
      setUpdatedEmail(data.email);
      setUpdatedAgama(data.agama);
      setUpdatedNomorHp(data.nomor_hp);
    }
  }, [data]);

  if (!isOpen) return null;

  const handleImageUpload = () => {
    document.getElementById("fileInput").click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };

  const handleSave = async () => {
    if (imageFile) {
      await updateProfileImage(imageFile); // Update the profile image if there's a new file
    }

    const profileData = {
      nama: updatedNama,
      email: updatedEmail,
      agama: updatedAgama,
      nomor_hp: updatedNomorHp,
    };

    await updateData(profileData); // Update the profile data

    onClose(); // Close the popup after saving
  };

  return (
    <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg w-[90%] max-w-[600px]">
        <h2 className="text-2xl font-bold text-center mb-6">Kelola Profil</h2>
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-10 relative">
          <div className="flex justify-center relative mt-3">
            <Image
              src={data?.foto_profil || "/images/profil.jpg"}
              alt="Profile Picture"
              width={210}
              height={210}
              className="rounded-xl object-cover"
            />
            <input
              type="file"
              id="fileInput"
              className="hidden"
              onChange={handleFileChange} // Handle file input change
            />
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
                  value={updatedNama}
                  onChange={(e) => setUpdatedNama(e.target.value)}
                />
                <FaEdit className="text-gray-500" />
              </div>
            </div>
            <div>
              <p className="font-semibold text-lg">Agama</p>
              <select
                className="w-full border p-2 rounded-md"
                value={updatedAgama}
                onChange={(e) => setUpdatedAgama(e.target.value)}
              >
                <option value="">-- Pilih Agama --</option>
                <option value="Kristen">Kristen</option>
                <option value="Islam">Islam</option>
                <option value="Hindu">Hindu</option>
                <option value="Buddha">Buddha</option>
                <option value="Konghucu">Konghucu</option>
              </select>
            </div>
            <div>
              <p className="font-semibold text-lg">No HP</p>
              <div className="flex items-center border p-2 rounded-md">
                <input
                  type="text"
                  className="w-full focus:outline-none"
                  value={updatedNomorHp}
                  onChange={(e) => setUpdatedNomorHp(e.target.value)}
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
                  value={updatedEmail}
                  onChange={(e) => setUpdatedEmail(e.target.value)}
                />
                <FaEdit className="text-gray-500" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-10">
          <button
            className="bg-green-600 text-white px-6 py-2 rounded-lg shadow-md flex items-center gap-2"
            onClick={handleSave}
            disabled={loading} // Disable the button when loading
          >
            <FaRegCheckCircle /> {loading ? 'Saving...' : 'Simpan'}
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
