import React, { useEffect, useState } from "react";
import { FaClock, FaChevronDown } from "react-icons/fa";

const RecentActivity = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    // Simulasi fetch data dari API
    setActivities([
      {
        date: "Jan 1, 2025",
        time: "09.00 am",
        name: "Olivia Carter Sophia",
        role: "User",
        action: "Melihat Absensi",
        avatar: "/images/profilsiswa.jpg",
        color: "bg-purple-300",
        textColor: "text-black",
        actionColor: "text-black",
        roleColor: "text-[#7E22CE]"
      },
      {
        date: "Jan 1, 2025",
        time: "09.00 am",
        name: "Andrew David Collins",
        role: "Admin",
        action: "Input Absensi",
        avatar: "/images/profiladmin.jpg",
        color: "bg-pink-300",
        textColor: "text-black",
        actionColor: "text-black",
        roleColor: "text-[#EC4899]"
      }
    ]);
  }, []);

  return (
    <div className="p-5 rounded-xl shadow-md bg-white w-full max-w-6xl mx-auto mt-5">
      <h2 className="text-xl font-semibold mb-3 flex items-center">
        <FaClock className="mr-2 text-lg" /> Recent Activity
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-base">
          <thead>
            <tr className="border-b text-gray-600">
              <th className="py-3 px-6 text-center">Date</th>
              <th className="py-3 px-6 text-center">Time</th>
              <th className="py-3 px-6 text-center">Name</th>
              <th className="py-3 px-10 ">Status</th>
              <th className="py-3 px-6 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity, index) => (
              <tr key={index} className="border-b text-gray-700 text-base text-center">
                <td className="py-3 px-6">{activity.date}</td>
                <td className="py-3 px-6">{activity.time}</td>
                <td className={`py-3 px-6 flex items-center justify-center gap-2 ${activity.textColor}`}>
                  <img src={activity.avatar} alt={activity.name} className="w-10 h-10 rounded-full" />
                  {activity.name}
                </td>
                <td className="py-3 px-6">
                  <span className={`text-white px-4 py-1 rounded-lg text-sm w-24 flex justify-center ${activity.color}`}>
                    <span className={activity.roleColor}>{activity.role}</span>
                  </span>
                </td>
                <td className={`py-3 px-6 ${activity.actionColor}`}>{activity.action}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="text-center text-base text-black mt-3">
        <button className="hover:underline font-semibold">See More</button>
        <div className="flex justify-center mt-1 text-gray-500">
          <FaChevronDown className="text-lg" />
        </div>
      </div>
    </div>
  );
};

export default RecentActivity;
