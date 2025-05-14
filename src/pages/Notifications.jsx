import React, { useEffect, useState } from "react";
import axios from "axios";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const userEmail = localStorage.getItem("email"); // ইমেইল লোকালস্টোরেজে রাখতে হবে

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/notifications?email=${userEmail}`);
        setNotifications(res.data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    if (userEmail) {
      fetchNotifications();
    }
  }, [userEmail]);

  return (
    <div className="p-6 bg-white shadow-md rounded-xl">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">🔔 Your Notifications</h2>
      {notifications.length === 0 ? (
        <p className="text-gray-600">No notifications for your account.</p>
      ) : (
        <ul className="space-y-4">
          {notifications.map((notification) => (
            <li
              key={notification.id}
              className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
            >
              <h3 className="text-lg font-semibold text-gray-800">{notification.title}</h3>
              <p className="text-sm text-gray-600">{notification.message}</p>
              <span className="text-xs text-gray-400">{notification.date}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notifications;
