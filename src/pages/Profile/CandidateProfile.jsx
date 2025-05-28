import React, { useState } from "react";
import Swal from "sweetalert2";
import { useAuth } from "../../context/AuthContext";
import { useDarkMode } from "../../context/DarkModeContext";

const CandidateProfile = () => {
  const { user, updateUser } = useAuth();
  const { darkMode } = useDarkMode();

  const [name, setName] = useState(user?.name || "");
  const [email] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [skills, setSkills] = useState(user?.skills || "");
  const [photo, setPhoto] = useState(user?.photo || "");

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setPhoto(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (!name || !email) {
      Swal.fire("Error", "Name and Email are required", "error");
      return;
    }

    const updatedUser = { ...user, name, email, phone, skills, photo };
    updateUser(updatedUser);

    Swal.fire("Success", "Profile saved successfully!", "success");
  };

  // Main container style
  const wrapperClass = `min-h-screen py-10 px-4 transition-colors duration-300 ${
    darkMode ? "bg-gray-950 text-white" : "bg-gray-100 text-gray-900"
  }`;

  const containerClass = `max-w-md mx-auto p-6 rounded shadow ${
    darkMode ? "bg-gray-900 border border-gray-700" : "bg-white"
  }`;

  const labelClass = `block font-semibold mb-1 ${
    darkMode ? "text-gray-200" : "text-gray-800"
  }`;

  const inputClass = `border px-3 py-2 rounded w-full transition-colors duration-200 ${
    darkMode
      ? "bg-gray-800 text-white border-gray-600 placeholder-gray-400"
      : "bg-white text-black border-gray-300"
  }`;

  const readOnlyInputClass = `${inputClass} bg-gray-200 cursor-not-allowed ${
    darkMode ? "bg-gray-700 text-gray-400" : "bg-gray-100"
  }`;

  return (
    <div className={wrapperClass}>
      <div className={containerClass}>
        <h1 className="text-2xl font-bold mb-4 text-center">Candidate Profile</h1>

        {/* Profile Photo Preview */}
        {photo && (
          <div className="flex justify-center mb-6">
            <img
              src={photo}
              alt="Profile"
              className="w-32 h-32 object-cover rounded-full border"
            />
          </div>
        )}

        <div className="mb-4">
          <label className={labelClass}>Photo:</label>
          <input type="file" accept="image/*" onChange={handlePhotoChange} />
        </div>

        <div className="mb-4">
          <label className={labelClass}>Name:</label>
          <input
            type="text"
            className={inputClass}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
          />
        </div>

        <div className="mb-4">
          <label className={labelClass}>Email:</label>
          <input
            type="email"
            className={readOnlyInputClass}
            value={email}
            readOnly
          />
        </div>

        <div className="mb-4">
          <label className={labelClass}>Phone:</label>
          <input
            type="text"
            className={inputClass}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Your phone number"
          />
        </div>

        <div className="mb-4">
          <label className={labelClass}>Skills:</label>
          <input
            type="text"
            className={inputClass}
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            placeholder="Your skills"
          />
        </div>

        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Save Profile
        </button>
      </div>
    </div>
  );
};

export default CandidateProfile;
