import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const login = async ({ identifier, password }) => {

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("http://localhost:8000/api/login", {
        identifier,
        password,
      });

      const { user: userData, token } = response.data;

      // ✅ Simpan token ke localStorage
      localStorage.setItem("token", token);

      // Optional: Simpan user lokal jika kamu pakai
      localStorage.setItem("user", JSON.stringify(userData));

      // ✅ Redirect berdasarkan role
      if (userData.role === "siswa") {
        router.push("/beranda");
      } else {
        router.push("/beranda");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Ups! NIP/NISN atau password salah. Coba lagi, ya.");
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, login };
};

export default useLogin;
