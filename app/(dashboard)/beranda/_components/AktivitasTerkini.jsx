import React, { useEffect, useState } from "react";
import { FaClock, FaChevronDown } from "react-icons/fa";

const RecentActivity = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/recent-activity", {
          headers: {
            "Content-Type": "application/json",
            // Jika endpoint dilindungi oleh JWT:
            // 'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
        });

        if (!response.ok) {
          throw new Error("Gagal memuat aktivitas");
        }

        const data = await response.json();
        setActivities(data);
      } catch (error) {
        console.error("Error fetching recent activity:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  return (
    <div className="p-5 rounded-xl shadow-md bg-white w-full max-w-6xl mx-auto mt-5">
      <h2 className="text-xl font-semibold mb-3 flex items-center">
        <FaClock className="mr-2 text-lg" /> Recent Activity
      </h2>

      <div className="overflow-x-auto">
        {loading ? (
          <div className="text-center py-6 text-gray-500">Loading...</div>
        ) : (
          <table className="w-full text-left text-base">
            <thead>
              <tr className="border-b text-gray-600">
                <th className="py-3 px-6 text-center">Date</th>
                <th className="py-3 px-6 text-center">Time</th>
                <th className="py-3 px-6 text-center">Name</th>
                <th className="py-3 px-10">Status</th>
                <th className="py-3 px-6 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {activities.length > 0 ? (
                activities.map((activity, index) => (
                  <tr
                    key={index}
                    className="border-b text-gray-700 text-base text-center"
                  >
                    <td className="py-3 px-6">{activity.date}</td>
                    <td className="py-3 px-6">{activity.time}</td>
                    <td
                      className={`py-3 px-6 flex items-center justify-center gap-2 ${activity.textColor}`}
                    >
                      <img
                        src={activity.avatar}
                        alt={activity.name}
                        className="w-10 h-10 rounded-full"
                      />
                      {activity.name}
                    </td>
                    <td className="py-3 px-6">
                      <span
                        className={`text-white px-4 py-1 rounded-lg text-sm w-24 flex justify-center ${activity.color}`}
                      >
                        <span className={activity.roleColor}>{activity.role}</span>
                      </span>
                    </td>
                    <td className={`py-3 px-6 ${activity.actionColor}`}>
                      {activity.action}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="py-3 px-6 text-center text-gray-500">
                    No recent activity found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
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
