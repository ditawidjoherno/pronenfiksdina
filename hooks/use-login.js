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

  const login = async ({ identifier, password }) => {
    setLoading(true);
    setError(null);
    setUser(null);

    const payload = { identifier, password };

    try {
      const response = await axios.post("http://localhost:8000/api/login", payload);

      const { user: userData, token } = response.data;

      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", token); // ✅ Diperlukan untuk axios Authorization

      setUser(userData);
      setCookie(cookieName, token, { path: '/', maxAge: 3600 });

      if (userData.role === "siswa") {
        router.push("/beranda/siswa"); 
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
