import { AiOutlineCloseCircle, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";

const UserPopup = ({ user, onClose, onEdit, onDelete }) => {
  if (!user) return null; // Cegah error jika user tidak tersedia

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
        {/* Tombol Close */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-red-500 hover:text-red-700"
        >
          <AiOutlineCloseCircle size={24} />
        </button>

        {/* Header */}
        <h2 className="text-lg font-semibold text-center mb-4">Detail Pengguna</h2>

        {/* Informasi User */}
        <div className="space-y-2 text-gray-700">
          <p><strong>NISN</strong><br />{user.nisn}</p>
          <p><strong>Nama</strong><br />{user.name}</p>
          <p><strong>Jenis Kelamin</strong><br />{user.gender}</p>
          <p><strong>Phone</strong><br />{user.phone}</p>
          <p><strong>Kelas</strong><br />{user.class}</p>
          <p><strong>Tahun Ajaran</strong><br />{user.year}</p>
          <p><strong>Status</strong><br />{user.status}</p>
        </div>

        {/* Tombol Aksi */}
        <div className="flex justify-between mt-4">
          <button
            onClick={() => onEdit(user)}
            className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
          >
            <AiOutlineEdit size={16} /> Edit
          </button>
          <button
            onClick={() => onDelete(user)}
            className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            <AiOutlineDelete size={16} /> Hapus Akun
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserPopup;
