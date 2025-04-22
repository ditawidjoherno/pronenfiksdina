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

  const login = async ({ nip, nisn, password }) => {
    setLoading(true);
    setError(null);
    setUser(null);

    const payload = { password };
    if (nip) payload.nip = nip;
    if (nisn) payload.nisn = nisn;

    try {
      const response = await axios.post("http://localhost:8000/api/login", payload, {
        withCredentials: true,
      });

      const { user: userData, token } = response.data;

      setUser(userData);
      setCookie(cookieName, token, { path: '/', maxAge: 3600 });

      router.push("/beranda");
    } catch (err) {
      console.error("Login error:", err);
      if (err.response) {
        console.error("Response data:", err.response.data);
        console.error("Payload yang dikirim:", payload);

        if (err.response.status === 422) {
          setError("Data login tidak valid. Periksa NIP/NISN atau password.");
        } else if (err.response.status === 401) {
          setError("Password salah.");
        } else {
          setError("Terjadi kesalahan saat login.");
        }
      } else {
        setError("Gagal terhubung ke server.");
      }
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, user, login };
};

export default useLogin;
