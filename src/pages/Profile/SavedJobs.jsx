import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useDarkMode } from "../../context/DarkModeContext"; // আপনার path ঠিক রাখুন

const SavedJobs = () => {
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { darkMode } = useDarkMode();

  useEffect(() => {
    const storedJobs = JSON.parse(localStorage.getItem("savedJobs")) || [];
    setSavedJobs(storedJobs);
    setLoading(false);
  }, []);

  const handleRemove = (jobId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!",
      background: darkMode ? "#1f2937" : "#fff",
      color: darkMode ? "#fff" : "#000",
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedJobs = savedJobs.filter((job) => job._id !== jobId);
        setSavedJobs(updatedJobs);
        localStorage.setItem("savedJobs", JSON.stringify(updatedJobs));

        Swal.fire({
          icon: "success",
          title: "Removed!",
          text: "Your job has been removed.",
          background: darkMode ? "#1f2937" : "#fff",
          color: darkMode ? "#fff" : "#000",
        });
      }
    });
  };

  if (loading) {
    return (
      <div
        className={`flex justify-center items-center min-h-screen transition-colors duration-300 ${
          darkMode ? "bg-gray-950 text-gray-400" : "bg-white text-gray-700"
        }`}
      >
        Loading saved jobs...
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen py-10 px-4 transition-colors duration-300 ${
        darkMode ? "bg-gray-950 text-gray-200" : "bg-gray-100 text-gray-900"
      }`}
    >
      <div
        className={`max-w-3xl mx-auto rounded-lg p-6 shadow ${
          darkMode ? "bg-gray-900 border border-gray-700" : "bg-white"
        }`}
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Saved Jobs</h1>

        {savedJobs.length === 0 ? (
          <p className={darkMode ? "text-gray-400 text-center" : "text-gray-500 text-center"}>
            You have no saved jobs.
          </p>
        ) : (
          <ul className="space-y-4">
            {savedJobs.map((job) => (
              <li
                key={job._id}
                className={`p-4 rounded-lg shadow-sm flex justify-between items-center border transition-colors duration-300 ${
                  darkMode
                    ? "border-gray-700 bg-gray-800"
                    : "border-gray-200 bg-white"
                }`}
              >
                <div>
                  <h2 className="text-lg font-semibold">{job.title}</h2>
                  <p className={darkMode ? "text-gray-400" : "text-gray-600"}>
                    {job.location || "Unknown Location"}
                  </p>
                </div>
                <button
                  onClick={() => handleRemove(job._id)}
                  className="text-red-500 hover:underline"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SavedJobs;
