import React, { useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";
import Link from 'next/link';
import { useRouter } from "next/navigation";

const LoginForm = () => {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [rememberMe, setRememberMe] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrorMessage("");


        // Validasi sederhana
        if (!username || !password) {
            setErrorMessage("Username dan Password harus diisi.");
            return;
        }

        // Simulasi login
        console.log("Username:", username);
        console.log("Password:", password);
        console.log("Remember Me:", rememberMe);
        alert("Login berhasil!");
    };

    return (
        <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg ml-auto h-screen">
            <div className="flex justify-center mt-auto ml-auto">
                <img src="/images/logosevh.png" alt="Logo" className="w-20 h-20" />
            </div>
            <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                    <h1
                        className="text-2xl font-bold text-center text-[#011E43]"
                        style={{ fontFamily: "Poppins" }}
                    >
                        Welcome Student!
                    </h1>
                    <h2
                        className="text-base font-light text-center text-[#011E43]"
                        style={{ fontFamily: "Poppins" }}
                    >
                        Login To Your Account
                    </h2>
                </div>
                <div>
                    <label
                        htmlFor="username"
                        className="block text-sm font-light text-black"
                        style={{ fontFamily: "Poppins" }}
                    >
                        Username
                    </label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        onFocus={(e) => e.target.placeholder = "Masukkan Username Anda"}
                        onBlur={(e) => e.target.placeholder = ""}
                        placeholder=" " // Placeholder default kosong
                        className="w-full px-3 py-2 mt-1 border border-[#598EF6] rounded-xl focus:ring-2 focus:outline-none peer"
                        required
                    />
                </div>

                <div className="relative">
                    <label
                        htmlFor="password"
                        className="block text-sm font-medium text-black"
                        style={{ fontFamily: "Poppins" }}
                    >
                        Password
                    </label>
                    <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        placeholder=" " // Placeholder default kosong
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onFocus={(e) => e.target.placeholder = "Masukkan Password Anda"}
                        onBlur={(e) => e.target.placeholder = ""}
                        className="w-full px-3 py-2 mt-1 border border-[#598EF6] rounded-xl focus:ring-2 focus:outline-none peer"
                        required
                    />
                    {showPassword ? (
                        <IoEyeOff
                            className="absolute right-3 top-8 w-6 h-6 text-gray-500 cursor-pointer hover:text-gray-700"
                            onClick={() => setShowPassword(false)}
                        />
                    ) : (
                        <IoEye
                            className="absolute right-3 top-8 w-6 h-6 text-gray-500 cursor-pointer hover:text-gray-700"
                            onClick={() => setShowPassword(true)}
                        />
                    )}
                </div>

                <div className="flex items-center mt-2">
                    <input
                        type="checkbox"
                        id="rememberMe"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="w-4 h-4 -mt-2 text-[#598EF6] border-gray-300 rounded focus:ring-2 focus:ring-[#598EF6]"
                    />
                    <label
                        htmlFor="rememberMe"
                        className="ml-1 -mt-2 text-xs text-gray-700"
                        style={{ fontFamily: "Poppins" }}
                    >
                        Remember Me
                    </label>
                </div>

                {errorMessage && (
                    <p className="text-sm text-red-500 text-center">{errorMessage}</p>
                )}
                <button
                    type="submit"
                    className="w-2/3 py-2 ml-16 text-white bg-[#91B8FB] rounded-md hover:bg-[#FFC21E] font-semibold"
                    style={{
                        fontFamily: "Poppins",
                        boxShadow: "0px 8px 10px rgba(0, 0, 0, 0.25)", // Contoh bayangan
                    }}
                    onClick={() => router.push('/beranda')}
                >
                    Login
                </button>



                <button
                    type="button"
                    className="w-2/3 py-2 ml-16 text-white bg-[#1856A4] rounded-md hover:bg-[#828efc] font-semibold"
                    style={{
                        fontFamily: "Poppins",
                        boxShadow: "0px 8px 10px rgba(0, 0, 0, 0.25)", // Contoh bayangan
                    }}
                    onClick={() => router.push('/')}
                >
                    Login as Teacher
                </button>


                <hr className="border-t-1 border-[#598EF6] mt-4" />
                <p
                    className="text-sm font-extralight text-[#56595c]"
                    style={{ fontFamily: "Poppins" }}
                >
                    Follow us on
                </p>

                <div className="flex justify-center space-x-4">
                    <button
                        type="button"
                        className="w-1/3 py-2 text-white bg-[#4987f4] rounded-md hover:bg-[#1F245D] font-medium flex items-center justify-center space-x-2"
                        style={{
                            fontFamily: "Poppins",
                            boxShadow: "0px 8px 10px rgba(0, 0, 0, 0.25)",
                        }}
                    >
                        <img
                            src="/images/fb.png"
                            alt="Facebook Logo"
                            className="w-8 h-8"
                        />
                        <span>Facebook</span>
                    </button>

                    <button
                        type="button"
                        className="w-1/3 py-2 text-white bg-[#4987f4] rounded-md hover:bg-[#1F245D] font-medium flex items-center justify-center space-x-2"
                        style={{
                            fontFamily: "Poppins",
                            boxShadow: "0px 8px 10px rgba(0, 0, 0, 0.25)",
                        }}
                    >
                        <img
                            src="/images/ig.png"
                            alt="Instagram Logo"
                            className="w-8 h-8"
                        />
                        <span>Instagram</span>
                    </button>
                </div>


            </form>
        </div>
    );
};

export default LoginForm;
