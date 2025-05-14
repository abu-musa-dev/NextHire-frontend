import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // useNavigate import
import Swal from "sweetalert2";

const JobDetails = () => {
  const { id } = useParams(); // Get the job ID from the URL
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state for better UX
  const [user, setUser] = useState(null); // Store user details for application
  const navigate = useNavigate(); // useNavigate hook for navigation

  // Fetch job details and user from localStorage
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
      setUser(JSON.parse(storedUser)); // Parse user from localStorage
    }

    fetchJobDetails();
  }, [id]);

  // Loading state UI
  if (loading) {
    return <p className="p-8 text-center text-gray-500">Loading job details...</p>;
  }

  // If no job is found, show error message
  if (!job) {
    return <p className="p-8 text-center text-red-500">Job not found.</p>;
  }

  // Handle apply action
  const handleApply = () => {
    if (!user) {
      Swal.fire("⚠️ Unauthorized", "You need to log in to apply.", "warning");
      navigate("/login"); // Redirect to login page using useNavigate
      return;
    }

    // Prepare application data
    const applicationData = {
      applicantId: user._id,
      jobId: job._id,
      applicantName: user.name,
      applicantEmail: user.email,
    };

    fetch("http://localhost:5000/applications", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(applicationData),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Application failed.");
        }
        return res.json();
      })
      .then((data) => {
        Swal.fire("✅ Success", "You have applied for the job successfully!", "success");
        console.log(data);
        navigate("/applications"); // Redirect to applications page (or anywhere else)
      })
      .catch((err) => {
        console.error("Application error:", err);
        Swal.fire("❌ Error", "Failed to apply. Please try again.", "error");
      });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-gray-50 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">{job.jobTitle}</h1>
      <p className="text-gray-700 mb-4">{job.description}</p>
      
      {/* Job Details Section */}
      <div className="space-y-4">
        <p className="text-lg text-gray-700">
          <strong>Company:</strong> {job.company}
        </p>
        <p className="text-lg text-gray-700">
          <strong>Location:</strong> {job.location}
        </p>
        <p className="text-lg text-gray-700">
          <strong>Salary:</strong> {job.salary || "Not specified"}
        </p>
        <p className="text-lg text-gray-700">
          <strong>Job Type:</strong> {job.jobType}
        </p>
      </div>

      {/* Apply Now Button */}
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
