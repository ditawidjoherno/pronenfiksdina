import React, { useState } from "react";

const AccountTabs = ({ onTabChange }) => {
  const [activeTab, setActiveTab] = useState("user");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    onTabChange(tab); // Kirim ke parent (Beranda)
  };

  return (
    <div className="flex border-b border-gray-300 w-full max-w-md mt-10">
      <button
        className={`flex-1 text-center py-2 font-medium ${
          activeTab === "user"
            ? "text-black border-b-2 border-purple-500"
            : "text-gray-500"
        }`}
        onClick={() => handleTabClick("user")}
      >
        Users
      </button>
      <button
        className={`flex-1 text-center py-2 font-medium ${
          activeTab === "admin"
            ? "text-black border-b-2 border-purple-500"
            : "text-gray-500"
        }`}
        onClick={() => handleTabClick("admin")}
      >
        Admins
      </button>
    </div>
  );
};

export default AccountTabs;
