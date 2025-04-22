"use client";
import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { FaHome, FaUserPlus, FaClipboardList, FaPaintBrush, FaClipboardCheck, FaBus, FaBars, FaPlusCircle } from 'react-icons/fa';
import { RiLogoutCircleRLine } from "react-icons/ri";
import { IoPerson } from "react-icons/io5";

const menuItems = [
  { name: 'Beranda', icon: <FaHome />, path: '/beranda', notifications: 2 },
  { name: 'Profil', icon: <IoPerson />, path: '/kelolaprofil', notifications: 0 },
  { name: 'Tambah Akun', icon: <FaUserPlus />, path: '/tambahakun', notifications: 1 },
  { name: 'Kegiatan', icon: <FaPlusCircle />, path: '/kegiatan', notifications: 3 },
  { name: 'Absensi', icon: <FaClipboardList />, path: '/absensi', notifications: 5 },
  { name: 'Ekskul', icon: <FaPaintBrush />, path: '/ekskul', notifications: 0 },
  { name: 'Piket', icon: <FaClipboardCheck />, path: '/piket', notifications: 4 },
  { name: 'Study Tour', icon: <FaBus />, path: '/studytour', notifications: 0 },
];

const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const collapsedState = localStorage.getItem("sidebarCollapsed") === "true";
    setIsCollapsed(collapsedState);
  }, []);

  const toggleSidebar = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    localStorage.setItem("sidebarCollapsed", newState);
  };

  const handleMenuClick = (path) => {
    router.push(path);
    localStorage.setItem("sidebarCollapsed", isCollapsed);
  };

  return (
    <div className={`flex flex-col h-screen ${isCollapsed ? 'w-20' : 'w-64'} bg-[#98abe2] drop-shadow-lg shadow-white text-white transition-width duration-700 ease-in-out relative z-50`}> 
      
      <button
        onClick={toggleSidebar}
        className="absolute -right-4 top-8 bg-[#728cd3] p-2 rounded-full hover:bg-[#639fe9] focus:outline-none shadow-lg transition-transform duration-700 ease-in-out"
      >
        <FaBars className="text-white transform transition-transform duration-700 ease-in-out" style={{ transform: isCollapsed ? 'rotate(180deg)' : 'rotate(0deg)' }} />
      </button>

      <div className="flex items-center justify-center pt-8 px-4 mb-8 h-20 transition-opacity duration-700 ease-in-out">
        <img
          src="/images/logosevh.png"
          alt="logo"
          width={70}
          height={70}
          className={`block transition-transform duration-700 ease-in-out ${isCollapsed ? 'scale-75' : 'scale-100'}`}
        />
      </div>

      <nav className="mt-4">
        <ul>
          {menuItems.map((item, index) => (
            <li
              key={index}
              className={`flex items-center p-2 cursor-pointer rounded-xl mx-3 transition-all duration-700 ease-in-out ${
                (item.path === "/beranda" && 
                  (pathname.startsWith("/beranda/siswa"))) ||
                (item.path === "/absensi" &&
                  (pathname.startsWith("/absensi") ||
                   pathname.startsWith("/ringkasanabsensi") ||
                   pathname.startsWith("/detailabsensi") ||
                   pathname.startsWith("/Inputabsensi"))) ||
                (item.path === "/ekskul" && 
                  (pathname.startsWith("/ekskul/osis"))) ||
                (item.path === "/piket" &&
                    (pathname.startsWith("/Inputpiket"))) ||
                (item.path === "/studytour" &&
                  (pathname.startsWith("/detailevent") ||
                    pathname.startsWith(("/riwayattour")) ||
                    pathname.startsWith("/Inputstudytour"))) ||
                pathname === item.path
                  ? "bg-[#728cd3]" 
                  : "hover:bg-[#3f84d8]"
              }`}
              onClick={() => handleMenuClick(item.path)}
            >
              {/* Ikon Menu */}
              <span className={`text-lg transition-all duration-700 ease-in-out ${isCollapsed ? 'w-20 flex justify-center' : 'ml-6'}`}>
                {item.icon}
              </span> 

              {/* Nama Menu */}
              <span className={`ml-2 text-lg transition-all duration-700 ease-in-out ${isCollapsed ? 'hidden' : 'block'}`}>
                {item.name}
              </span>

              {/* Notifikasi Badge */}
                {item.notifications > 0 && (
              <span 
                 className={`absolute right-4 bg-red-500 text-white text-xs font-bold rounded-full px-2 py-0.5 ${isCollapsed ? '-mr-4' : ''}`} 
                 style={{ display: 'none' }} // Sembunyikan notifikasi untuk sementara
              >
              {item.notifications}
              </span>
              )}
            </li>                    
          ))}
        </ul>
      </nav>

      <button 
        className='flex items-center p-2 cursor-pointer rounded-xl mx-3 mt-auto mb-4 bg-[#728cd3] hover:bg-[#5b70e9] transition-all duration-700 ease-in-out' 
        onClick={() => handleMenuClick('/')}
      >
        <span className={`text-lg transition-all duration-700 ease-in-out ${isCollapsed ? 'w-20 flex justify-center' : 'ml-6'}`}>
          <RiLogoutCircleRLine />
        </span>
        <span className={`ml-10 text-lg transition-all duration-700 ease-in-out ${isCollapsed ? 'hidden' : 'block'}`}>
          Logout
        </span>
      </button>
    </div>
  );
};

export default Sidebar;
