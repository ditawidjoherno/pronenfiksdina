"use client"; 
import { FaSearch } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function ButtonPerjalanan() {
    const router = useRouter();

    const handleClick = () => {
        router.push("/riwayattour");
    };

    return (
        <button 
            className="bg-[#869ddd] flex items-center gap-2 text-blue-950 font-semibold py-2 px-4 rounded-lg shadow mt-4"
            onClick={handleClick}
        >
            <FaSearch className="text-blue-950 text-lg" />
            Lihat Perjalanan Sebelumnya
        </button>
    );
}