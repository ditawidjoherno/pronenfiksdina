import axios from "axios";
import { useState } from "react";
import { getCookie } from "@/lib/cookieFunction";

const UpdateProfile = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const cookie = process.env.NEXT_PUBLIC_COOKIE_NAME;
    const token = getCookie(cookie);
    const bearerToken = `Bearer ${token}`;

    const updateData = async (body) => {
        setLoading(true);
        setError(null);
        setData(null);

        try {
            const response = await axios.put("http://localhost:8000/api/edit-profile", body, {
                headers: {
                    Authorization: bearerToken
                }
            });

            if (response.status !== 200) {
                throw new Error(response.data.message || "Gagal Mendapat User");
            }

            setData(response.data);
            console.log(response);
        } catch (error) {
            setError(error.response?.data?.message || error.message);
        } finally {
            setLoading(false);
        }
    };

    const updatePassword = async (body) => {
        setLoading(true);
        setError(null);
        setData(null);

        try {
            const response = await axios.put("https://backend-monitoring-btn-production.up.railway.app/api/password/change", body, {
                headers: {
                    Authorization: bearerToken
                }
            });

            if (response.status !== 200) {
                throw new Error(response.data.message || "Gagal Memperbarui Password");
            }

            setData(response.data);
            console.log(response);
        } catch (error) {
            setError(error.response?.data?.message || error.message);
        } finally {
            setLoading(false);
        }
    };

    const updateProfileImage = async (imageFile) => {
        setLoading(true);
        setError(null);
        setData(null);
    
        try {
            const formData = new FormData();
            formData.append('foto_profil', imageFile);
    
            const response = await axios.post("https://backend-monitoring-btn-production.up.railway.app/api/update-profile-image", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: bearerToken
                }
            });
    
            if (response.status !== 200) {
                throw new Error(response.data.message || "Gagal Mengupload Foto Profil");
            }
    
            setData(response.data);
            console.log(response);
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
            setError(error.response?.data?.message || error.message); 
        } finally {
            setLoading(false);
        }
    };
    

    return { loading, error, data, updateData, updatePassword, updateProfileImage };
};

export default UpdateProfile;