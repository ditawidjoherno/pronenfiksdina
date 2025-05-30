import { FaListAlt } from "react-icons/fa";

export default function DaftarEkskul() {
  const ekskulList = [
    {
      nama: "Nama Ekskul",
      mentor: "Mentor",
      tanggalBergabung: "21-mei-2025"
    },
    {
      nama: "Nama Ekskul",
      mentor: "Mentor",
      tanggalBergabung: "21-mei-2025"
    },
    {
      nama: "Nama Ekskul",
      mentor: "Mentor",
      tanggalBergabung: "21-mei-2025"
    }
  ];

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-lg">
      <h2 className="text-lg font-semibold flex items-center mb-4">
                <FaListAlt className="mr-2" /> Daftar Ekskul Anda 
              </h2>
      {ekskulList.map((ekskul, index) => (
        <div
          key={index}
          className="flex items-center justify-between bg-white p-4 mb-4 rounded-xl border-2 border-blue-400 shadow-sm"
        >
          <div>
            <h3 className="text-lg font-bold text-gray-800">{ekskul.nama}</h3>

            <div className="flex items-center text-gray-600 mt-1">
              <img
                src="/images/profil.png"
                alt="Mentor Icon"
                className="w-5 h-5 mr-2"
              />
              <span className="font-semibold">{ekskul.mentor}</span>
            </div>

            <p className="text-sm text-gray-500 mt-1">
              Anda bergabung sejak {ekskul.tanggalBergabung}
            </p>
          </div>

          <img
            src="/images/ekskulsiswa.png"
            alt="Ikon Ekskul"
            className="w-16 h-16 object-contain"
          />
        </div>
      ))}
    </div>
  );
}
