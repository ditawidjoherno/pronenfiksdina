import Image from "next/image";

const StudentCard = () => {
    return (
      <div className="bg-white border rounded-2xl p-4 flex gap-6 items-center shadow-md w-full h-80 mt-8 **py-4**">
  
        {/* Foto Profil */}
        <div className="w-48 h-56 overflow-hidden rounded-lg ml-10">
          <Image
            src="/images/profilsiswa.jpg"
            alt="Profile Picture"
            width={100}
            height={100}
            className="object-cover w-full h-full"
          />
        </div>
  
        {/* Informasi + Statistik */}
        <div className="flex-1 ml-10">
          {/* Informasi Siswa */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="font-bold text-gray-700">Nama</p>
              <p className="text-gray-800">Mikayla Astranaya Putri</p>
            </div>
            <div>
              <p className="font-bold text-gray-700">Kelas</p>
              <p className="text-gray-800">X-A</p>
            </div>
            <div>
              <p className="font-bold text-gray-700">NISN</p>
              <p className="text-gray-800">10xxxxxxxx</p>
            </div>
            <div>
              <p className="font-bold text-gray-700">Jenis Kelamin</p>
              <p className="text-gray-800">Perempuan</p>
            </div>
            <div>
              <p className="font-bold text-gray-700">Agama</p>
              <p className="text-gray-800">Islam</p>
            </div>
            <div>
              <p className="font-bold text-gray-700">Tanggal Lahir</p>
              <p className="text-gray-800">12 Juli 2007</p>
            </div>
            <div>
              <p className="font-bold text-gray-700">No HP</p>
              <p className="text-gray-800">08XXXXXXXX</p>
            </div>
            <div>
              <p className="font-bold text-gray-700">Email</p>
              <p className="text-gray-800">example@gmail.com</p>
            </div>
          </div>
  
          {/* Statistik */}
          <div className="flex gap-6 mt-4">
            <div className="w-48 h-16 bg-[#5CB338] text-white flex items-center justify-center rounded-full text-xl font-bold shadow-md">
              12
            </div>
            <div className="w-48 h-16 bg-[#FB4141] text-white flex items-center justify-center rounded-full text-xl font-bold shadow-md">
              4
            </div>
            <div className="w-48 h-16 bg-[#FFBB03] text-white flex items-center justify-center rounded-full text-xl font-bold shadow-md">
              2
            </div>
          </div>
        </div>
      </div>
    );
  };

export default StudentCard;
