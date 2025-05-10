// hooks/use-login.js
import axios from 'axios';
import { setCookie } from "@/lib/cookieFunction";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const router = useRouter();
  const cookieName = process.env.NEXT_PUBLIC_COOKIE_NAME;

// hooks/use-login.js

const login = async ({ identifier, password }) => {
  setLoading(true);
  setError(null);
  setUser(null);

  const payload = { identifier, password };

  try {
    // Use axios instead of axiosInstance
    const response = await axios.post("http://localhost:8000/api/login", payload);

    const { user: userData, token } = response.data;

    // Simpan data pengguna di localStorage
    localStorage.setItem("user", JSON.stringify(userData));
    
    setUser(userData);
    setCookie(cookieName, token, { path: '/', maxAge: 3600 });

    // Redirect berdasarkan role pengguna
    if (userData.role === "siswa") {
      router.push("/beranda/siswa"); 
    } else if (userData.role === "guru") {
      router.push("/beranda");
    } else {
      router.push("/beranda");
    }
  } catch (err) {
    console.error("Login error:", err);
    setError("Login failed.");
  } finally {
    setLoading(false);
  }
};


  return { loading, error, user, login };
};

export default useLogin;
