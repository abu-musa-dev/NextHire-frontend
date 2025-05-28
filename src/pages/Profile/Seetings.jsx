import React, { useState } from "react";
import Swal from "sweetalert2";
import {
  getAuth,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import { useDarkMode } from "../../context/DarkModeContext";

const Settings = () => {
  const { darkMode } = useDarkMode();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
  });

  const auth = getAuth();
  const user = auth.currentUser;

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    if (!user || !currentPassword || !newPassword) {
      return Swal.fire("Error", "Please fill in all fields", "error");
    }

    try {
      const credential = EmailAuthProvider.credential(
        user.email,
        currentPassword
      );

      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPassword);

      Swal.fire("Success", "Password changed successfully", "success");
      setCurrentPassword("");
      setNewPassword("");
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    }
  };

  const handleNotificationChange = (type) => {
    setNotifications((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  const handleSavePreferences = () => {
    Swal.fire("Saved", "Notification preferences updated!", "success");
    console.log("Preferences:", notifications);
  };

  const inputClass = `mt-1 block w-full border rounded-md p-2 transition duration-200 ${
    darkMode
      ? "bg-gray-800 border-gray-600 text-white placeholder-gray-400"
      : "bg-white border-gray-300 text-gray-900"
  }`;

  const boxClass = `rounded-lg shadow-md p-6 transition-colors duration-300 ${
    darkMode ? "bg-gray-900 border border-gray-700 text-white" : "bg-white border border-gray-200 text-gray-800"
  }`;

  const labelText = darkMode ? "text-gray-200" : "text-gray-700";

  return (
    <div
      className={`min-h-screen py-10 px-4 transition-colors duration-300 ${
        darkMode ? "bg-gray-950 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Account Settings</h2>

        {/* Password Section */}
        <div className={`${boxClass} mb-6`}>
          <h3 className="text-xl font-semibold mb-4">Change Password</h3>
          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div>
              <label className={`block text-sm font-medium ${labelText}`}>
                Current Password
              </label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Current password"
                className={inputClass}
              />
            </div>
            <div>
              <label className={`block text-sm font-medium ${labelText}`}>
                New Password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="New password"
                className={inputClass}
              />
            </div>
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
            >
              Change Password
            </button>
          </form>
        </div>

        {/* Notification Preferences */}
        <div className={boxClass}>
          <h3 className="text-xl font-semibold mb-4">Notification Settings</h3>
          <div className="space-y-3">
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={notifications.email}
                onChange={() => handleNotificationChange("email")}
                className="form-checkbox h-5 w-5"
              />
              <span className={labelText}>Email notifications</span>
            </label>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={notifications.push}
                onChange={() => handleNotificationChange("push")}
                className="form-checkbox h-5 w-5"
              />
              <span className={labelText}>Push notifications</span>
            </label>
          </div>
          <div className="mt-4">
            <button
              onClick={handleSavePreferences}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Save Preferences
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
