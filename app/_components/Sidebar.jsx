"use client";

import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import {
  FaHome,
  FaUserPlus,
  FaClipboardList,
  FaPaintBrush,
  FaClipboardCheck,
  FaBus,
  FaBars,
  FaPlusCircle,
  FaChevronRight,
  FaChevronDown
} from 'react-icons/fa';
import { RiLogoutCircleRLine } from "react-icons/ri";
import { IoPerson } from "react-icons/io5";

const allMenuItems = [
  { name: 'Beranda', icon: <FaHome />, path: '/beranda', notifications: 2 },
  { name: 'Profil', icon: <IoPerson />, path: '/kelolaprofil', notifications: 0 },
  { name: 'Tambah Akun', icon: <FaUserPlus />, path: '/tambahakun', notifications: 1 },
  { name: 'Kegiatan', icon: <FaPlusCircle />, path: '/kegiatan', notifications: 3 },
  { name: 'Absensi', icon: <FaClipboardList />, path: '/absensi', notifications: 5 },
  { name: 'Ekskul', icon: <FaPaintBrush />, path: '/ekskul', notifications: 0 },
  { name: 'Piket', icon: <FaClipboardCheck />, path: '/piket', notifications: 4 },
  { name: 'Perjalanan', icon: <FaBus />, notifications: 0 },
];

const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [role, setRole] = useState(null);
  const [isSubOpen, setIsSubOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const showFullMenu = isMobileOpen || !isCollapsed;

  useEffect(() => {
    const collapsedState = localStorage.getItem("sidebarCollapsed") === "true";
    setIsCollapsed(collapsedState);

    const user = JSON.parse(localStorage.getItem("user"));
    setRole(user?.role || null);

    if (pathname.startsWith("/studytour")) {
      setIsSubOpen(true);
    }
  }, [pathname]);

  const toggleSidebar = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    localStorage.setItem("sidebarCollapsed", newState);
  };

  const toggleMobileSidebar = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  const handleMenuClick = (path) => {
    router.push(path);
    setIsMobileOpen(false);
  };

  const menuItems = allMenuItems
    .map(item => {
      if (item.name === "Absensi" && role === "siswa") return { ...item, path: "/absensi/siswa" };
      if (item.name === "Ekskul" && role === "siswa") return { ...item, path: "/ekskulsiswa" };
      if (item.name === "Piket" && role === "siswa") return { ...item, path: "/piket/siswa" };
      return item;
    })
    .filter(item => !(role === "siswa" && (item.name === "Tambah Akun" || item.name === "Kegiatan")));

  return (
    <>
      <button
        className="md:hidden fixed sm:top-4 top-2 left-4 z-[60] bg-[#728cd3] text-white p-2 rounded-full shadow-lg"
        onClick={toggleMobileSidebar}
      >
        <FaBars />
      </button>

      <div
        className={`
          fixed inset-0 transition-opacity duration-300 ease-in-out
          ${isMobileOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}
          md:hidden z-40 bg-black bg-opacity-40 backdrop-blur-sm
        `}
        onClick={() => setIsMobileOpen(false)}
      />

      <div className={
        `
          fixed md:static top-0 left-0 h-screen z-[70] bg-[#98abe2] drop-shadow-lg text-white
          transition-all duration-700 ease-in-out
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0 md:flex md:flex-col
          ${isCollapsed ? 'w-20' : 'w-64'}
        `
      }>
        <button
          onClick={toggleSidebar}
          className="absolute -right-4 top-8 bg-[#728cd3] p-2 rounded-full hover:bg-[#639fe9] focus:outline-none shadow-lg hidden md:block"
        >
          <FaBars className={`text-white transition-transform duration-700 ease-in-out ${isCollapsed ? 'rotate-180' : ''}`} />
        </button>

        <div className="flex items-center justify-center pt-8 px-4 mb-8 h-20">
          <img
            src="/images/logosevh.png"
            alt="logo"
            width={70}
            height={70}
            className={`transition-transform duration-700 ease-in-out ${isCollapsed ? 'scale-75' : 'scale-100'}`}
          />
        </div>

        <nav className="mt-4">
          <ul>
            {menuItems.map((item, index) => {
              const isActive =
                pathname === item.path ||
                (item.path === "/beranda" && pathname.startsWith("/beranda/siswa")) ||
                (item.path === "/absensi" && pathname.startsWith("/absensi/siswa")) ||
                (item.path === "/absensi" && (
                  pathname.startsWith("/Inputabsensi") ||
                  pathname.startsWith("/ringkasanabsensi") ||
                  pathname.startsWith("/detailabsensi")
                )) ||
                ((item.path === "/ekskul" || item.path === "/ekskulsiswa") &&
                  (pathname.startsWith("/ekskul/") || pathname.startsWith("/ekskulsiswa/"))) ||
                (item.path === "/piket" && (
                  pathname.startsWith("/Inputpiket") ||
                  pathname.startsWith("/AbsensiPiket")
                )) ||
                (item.name === "Perjalanan" && pathname.startsWith("/studytour")) ||
                (item.path === "/detailabsensi" && pathname.startsWith("/detailabsensi"));

              if (item.name === "Perjalanan") {
                return (
                  <li key={index} className="mx-3 mb-2">
                    <div
                      className={`relative flex items-center p-2 cursor-pointer rounded-xl transition-all duration-700 ${
                        isActive ? "bg-[#728cd3]" : "hover:bg-[#3f84d8]"
                      }`}
                      onClick={() => setIsSubOpen(!isSubOpen)}
                    >
                      <span className={`text-lg ${isCollapsed ? 'w-20 flex justify-center' : 'ml-6'}`}>
                        {item.icon}
                      </span>
                      <span className={`ml-2 text-lg ${!showFullMenu ? 'hidden' : 'block'}`}>
                        {item.name}
                      </span>
                      {showFullMenu && (
                        <span className="ml-auto mr-4 text-sm">
                          {isSubOpen ? <FaChevronDown /> : <FaChevronRight />}
                        </span>
                      )}
                    </div>

                    {showFullMenu && isSubOpen && (
                      <ul className="ml-14 mt-1 space-y-1">
                        <li
                          className={`cursor-pointer text-sm px-3 py-1 rounded hover:bg-[#3f84d8] ${
                            pathname.startsWith("/studytour") && !pathname.startsWith("/studytour/pameran") ? "bg-[#728cd3]" : ""
                          }`}
                          onClick={() => handleMenuClick("/studytour")}
                        >
                          Study Tour
                        </li>
                        <li
                          className={`cursor-pointer text-sm px-3 py-1 rounded hover:bg-[#3f84d8] ${
                            pathname === "/studytour/pameran" ? "bg-[#728cd3]" : ""
                          }`}
                          onClick={() => handleMenuClick("/studytour/pameran")}
                        >
                          Pameran
                        </li>
                      </ul>
                    )}
                  </li>
                );
              }

              return (
                <li
                  key={index}
                  className={`relative flex items-center p-2 cursor-pointer rounded-xl mx-3 transition-all duration-700 ${
                    isActive ? "bg-[#728cd3]" : "hover:bg-[#3f84d8]"
                  }`}
                  onClick={() => handleMenuClick(item.path)}
                >
                  <span className={`text-lg ${isCollapsed ? 'w-20 flex justify-center' : 'ml-6'}`}>
                    {item.icon}
                  </span>
                  <span className={`ml-2 text-lg ${!showFullMenu ? 'hidden' : 'block'}`}>
                    {item.name}
                  </span>
                </li>
              );
            })}
          </ul>
        </nav>

        <button
          className='flex items-center p-2 cursor-pointer rounded-xl mx-3 mt-auto mb-4 bg-[#728cd3] hover:bg-[#5b70e9] transition-all duration-700'
          onClick={() => handleMenuClick('/')}
        >
          <span className={`text-lg ${isCollapsed ? 'w-20 flex justify-center' : 'ml-6'}`}>
            <RiLogoutCircleRLine />
          </span>
          <span className={`ml-10 text-lg ${!showFullMenu ? 'hidden' : 'block'}`}>
            Logout
          </span>
        </button>
      </div>
    </>
  );
};

export default Sidebar;