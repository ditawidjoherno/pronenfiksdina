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
  className="absolute top-0 h-full w-full 
             bg-no-repeat bg-top 
             bg-[length:270px_auto] sm:bg-[length:25%_auto] sm:mt-16 mt-20"
  style={{ 
    backgroundImage: "url('/images/siswa.png')",
    backgroundPosition: "center top",
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
