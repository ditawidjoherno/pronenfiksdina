"use client"
import React from 'react';
import LoginForm from '@/app/_components/LoginForm2';

const LoginPage = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-[#8998D8] relative overflow-hidden">
            
            {/* Logo */}
            {/* <div className="absolute top-4 z-10 left-5">
                <img src="/images/logosevh.png" alt="Logo" className="w-16 h-16" />
            </div> */}

            {/* Background Gambar */}
            <div 
    className="absolute top-0 h-full w-full bg-cover bg-center mt-16"
    style={{ 
        backgroundImage: "url('/images/siswa.png')",
        backgroundSize: "25% auto",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center top", // Menggeser gambar ke bagian atas
    }}
></div>


            {/* Form Login */}
            <div className="relative z-10">
                <LoginForm />
            </div>
        </div>
    );
};

export default LoginPage;
