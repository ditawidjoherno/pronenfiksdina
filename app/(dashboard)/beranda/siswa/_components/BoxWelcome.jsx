"use client";
import React from "react";

const BoxWelcome = () => {
  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto mt-10 px-4">
      {/* Box utama */}
      <div className="bg-white sm:rounded-lg rounded-xl shadow-lg w-full py-3 px-4 sm:px-6 md:px-10">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-8">
          {/* Teks - tampil duluan di mobile */}
          <div className="text-center md:text-left md:order-1 mt-1 md:mt-6">
  <h2 className="sm:text-2xl text-xl font-semibold text-[#070841]">Hai, Studies!</h2>
  <h1 className="sm:text-xl text-md font-poppins">
    Selamat datang di SEVH!
  </h1>
  <p className="sm:text-xl text-md">
    Pantau terus setiap kegiatan harian kamu disini ya
  </p>
</div>
          {/* Gambar - tampil di bawah di HP, tetap di kiri di desktop */}
          <img
  src="/images/siswabox.png"
  alt="siswa"
  className="sm:w-[220px] w-[100px] sm:h-[220px] h-[100px] object-contain order-last md:ml-auto"
/>
        </div>
      </div>
    </div>
  );
};

export default BoxWelcome;

// "use client";
// import React from "react";

// const BoxWelcome = () => {
//   return (
//     <div className="flex flex-col w-full max-w-6xl mx-auto mt-10">
//       {/* Judul "Dashboard" */}
//       {/* <h1 className="text-3xl text-black font-bold mb-2 mt-2">Dashboard</h1> */}

//       {/* Box utama */}
//       <div className="bg-white rounded-lg py-0 px-auto flex items-center text-black shadow-lg w-full">
//         {/* Left Content (Illustration) */}
//         <div className="flex items-center space-x-8 ">
//           <img
//             src="/images/siswabox.png" // Ganti dengan path gambar yang sesuai
//             alt="guru"
//             className="w-[220px] h-[220px] object-contain ml-8" // Ukuran diperbesar
//           />

//           {/* Right Content (Text) */}
//           <div>
//             <h2 className="text-2xl font-semibold text-[#070841]">Hai, Studies!</h2>
//             <h1 className="text-xl font-poppins">
//             Selamat datang di SEVH!  
//             </h1>
//             <p className="text-xl">
//             Buat semuanya lebih mudah dan praktis untuk siswa dan guru
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BoxWelcome;
