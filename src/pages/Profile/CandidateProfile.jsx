import React, { useState } from "react";
import Swal from "sweetalert2";
import { useAuth } from "../../context/AuthContext";

const CandidateProfile = () => {
  const { user, updateUser } = useAuth();

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

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow rounded mt-10 mb-10">
      <h1 className="text-2xl font-bold mb-4">Candidate Profile</h1>

      {/* ছবিটা এখানে উপরে দেখাবো */}
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
        <label className="block font-semibold mb-1">Photo:</label>
        <input type="file" accept="image/*" onChange={handlePhotoChange} />
      </div>

      <div className="mb-4">
        <label className="block font-semibold mb-1">Name:</label>
        <input
          type="text"
          className="border px-3 py-2 rounded w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
        />
      </div>

      <div className="mb-4">
        <label className="block font-semibold mb-1">Email:</label>
        <input
          type="email"
          className="border px-3 py-2 rounded w-full bg-gray-100 cursor-not-allowed"
          value={email}
          readOnly
        />
      </div>

      <div className="mb-4">
        <label className="block font-semibold mb-1">Phone:</label>
        <input
          type="text"
          className="border px-3 py-2 rounded w-full"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Your phone number"
        />
      </div>

      <div className="mb-4">
        <label className="block font-semibold mb-1">Skills:</label>
        <input
          type="text"
          className="border px-3 py-2 rounded w-full"
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
  );
};

export default CandidateProfile;
