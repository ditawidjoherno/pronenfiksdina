"use client"
import React from 'react';
import LoginForm from '@/app/_components/LoginForm';

const LoginPage = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-[#91B8FB]">
            {/* Bagian Gambar Siswa */}
            <div className="relative flex justify-center mt-auto ml-auto">
                <img
                    src="/images/awan.png"
                    alt="biru"
                    className="w-[300px] h-[150px] absolute top-2 left-2 z-10 -mt-36" // Ukuran lebih besar
                />
                <img
                    src="/images/awankanan.png"
                    alt="biru"
                    className="w-[300px] h-[150px] absolute right-4 z-10 -mt-36" // Ukuran lebih besar
                />
                <img
                    src="/images/matahari.png"
                    alt="biru"
                    className="w-[70px] h-[70px] absolute top-auto left-auto z-10 -mt-36 " // Ukuran lebih besar
                />
                <img
                    src="/images/biru.png"
                    alt="biru"
                    className="w-[800px] h-[500px] -mt-12  " // Ukuran lebih besar
                />
                <img
                    src="/images/siswa.png"
                    alt="Student Illustration"
                    className="absolute w-[685px] h-[452px] " // Ukuran lebih besar
                />
            </div>

            {/* Memanggil Komponen LoginForm */}
            <LoginForm />
        </div>
    );
};

export default LoginPage;

