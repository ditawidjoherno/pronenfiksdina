"use client"
import { getCookie } from "@/lib/cookieFunction";
import axios from "axios";
import { useState } from "react";

const useJumlah = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [data, setData] = useState(null)
  const cookieName = process.env.NEXT_PUBLIC_COOKIE_NAME;
  const token = getCookie(cookieName)

  const getUserJumlah = async () => {
    setLoading(true)
    setError(null)
    setData(null)

    if (!token) {
      setError("Token tidak ditemukan");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get("http://localhost:8000/api/jumlahUser", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // ✅ Sesuaikan response key
      const userData = response.data;
      setData(userData);
    } catch (error) {
      setError(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  }

  return { loading, error, data, getUserJumlah }
}

export default useJumlah;
