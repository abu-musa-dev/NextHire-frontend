import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useDarkMode } from "../../context/DarkModeContext"; // Update path if needed

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { darkMode } = useDarkMode();

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const res = await fetch(`http://localhost:5000/jobs/${id}`);
        if (res.ok) {
          const data = await res.json();
          setJob(data);
        } else {
          Swal.fire("❌ Error", "Job not found.", "error");
        }
      } catch (error) {
        console.error("Failed to fetch job details:", error);
        Swal.fire("⚠️ Error", "Something went wrong. Please try again later.", "error");
      } finally {
        setLoading(false);
      }
    };

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    fetchJobDetails();
  }, [id]);

  const handleApply = () => {
    if (!user) {
      Swal.fire("⚠️ Unauthorized", "You need to log in to apply.", "warning");
      navigate("/login");
      return;
    }

    const applicationData = {
      applicantId: user._id,
      jobId: job._id,
      applicantName: user.name,
      applicantEmail: user.email,
    };

    fetch("http://localhost:5000/applications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(applicationData),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Application failed.");
        return res.json();
      })
      .then((data) => {
        Swal.fire({
          icon: "success",
          title: "✅ Success",
          text: "You have applied for the job successfully!",
          background: darkMode ? "#1f2937" : undefined,
          color: darkMode ? "#fff" : undefined,
        });
        navigate("/applications");
      })
      .catch((err) => {
        console.error("Application error:", err);
        Swal.fire({
          icon: "error",
          title: "❌ Error",
          text: "Failed to apply. Please try again.",
          background: darkMode ? "#1f2937" : undefined,
          color: darkMode ? "#fff" : undefined,
        });
      });
  };

  if (loading) {
    return (
      <p className={`p-8 text-center ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
        Loading job details...
      </p>
    );
  }

  if (!job) {
    return (
      <p className={`p-8 text-center ${darkMode ? "text-red-400" : "text-red-500"}`}>
        Job not found.
      </p>
    );
  }

  return (
    <div
      className={`p-6 max-w-4xl mx-auto rounded-lg shadow-lg transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-gray-200" : "bg-gray-50 text-gray-900"
      }`}
    >
      <h1 className="text-3xl font-bold mb-8 text-center">{job.jobTitle}</h1>
      <p className="mb-4">{job.description}</p>

      <div className="space-y-4">
        <p className="text-lg">
          <strong>Company:</strong> {job.company}
        </p>
        <p className="text-lg">
          <strong>Location:</strong> {job.location}
        </p>
        <p className="text-lg">
          <strong>Salary:</strong> {job.salary || "Not specified"}
        </p>
        <p className="text-lg">
          <strong>Job Type:</strong> {job.jobType}
        </p>
      </div>

      <div className="mt-6 text-center">
        <button
          onClick={handleApply}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Apply Now
        </button>
      </div>
    </div>
  );
};

export default JobDetails;
