import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/jobs")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setJobs(data);
        else setJobs([]);
      })
      .catch(() => setJobs([]));
  }, []);

  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    setWishlist(storedWishlist);
  }, []);

  const toggleWishlist = (job) => {
    let updatedWishlist = [...wishlist];
    let savedJobs = JSON.parse(localStorage.getItem("savedJobs") || "[]");

    if (wishlist.includes(job._id)) {
      updatedWishlist = updatedWishlist.filter((id) => id !== job._id);
      savedJobs = savedJobs.filter((savedJob) => savedJob._id !== job._id);
    } else {
      updatedWishlist.push(job._id);
      savedJobs.push(job);
    }

    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    localStorage.setItem("savedJobs", JSON.stringify(savedJobs));
  };

  const handleApplyClick = (job) => {
    if (job.status === "Paused" || job.status === "Closed") {
      alert("This job is not accepting applications right now.");
    } else {
      navigate(`/apply/${job._id}`);
    }
  };

  return (
    <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-10">
        Available Jobs
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => {
          const isInWishlist = wishlist.includes(job._id);

          return (
            <div
              key={job._id}
              className="relative border border-yellow-200 bg-white p-6 rounded-xl shadow hover:shadow-md transition"
            >
              {/* Crown badge */}
              <div className="absolute top-3 right-3 flex items-center gap-2">
                <span className="text-yellow-500 text-xl">👑</span>
                <button onClick={() => toggleWishlist(job)}>
                  <span className="text-xl">{isInWishlist ? "💚" : "🤍"}</span>
                </button>
              </div>

              {/* Logo */}
              {job.logoUrl && (
                <img
                  src={job.logoUrl}
                  alt="Company Logo"
                  className="h-12 rounded-full w-12 object-contain mb-4"
                />
              )}

              {/* Title */}
              <h2 className="text-lg font-bold text-gray-800">{job.title}</h2>

              {/* Location */}
              {job.location && (
                  <span className="text-xs bg-green-100 text-green-700 font-semibold px-2 py-1 rounded-full">
                    📍 {job.location}
                  </span>
                )}

              {/* Tags: type, location, salary, price */}
              <div className="flex flex-wrap gap-2 mt-3">
                {job.type && (
                  <span className="text-xs bg-purple-100 text-purple-700 font-semibold px-2 py-1 rounded-full">
                    {job.type}
                  </span>
                )}
                {job.salary && (
                  <span className="text-xs bg-emerald-100 text-emerald-700 font-semibold px-2 py-1 rounded-full">
                    Max: ${job.salary}/month
                  </span>
                )}
                {job.price && (
                  <span className="text-xs bg-yellow-100 text-yellow-700 font-semibold px-2 py-1 rounded-full">
                    Price: ৳{job.price}
                  </span>
                )}
              </div>

              {/* Deadline or Days Left */}
              {job.deadline && (
                <p className="text-sm text-gray-600 mt-4 font-medium">
                  {Math.max(
                    0,
                    Math.ceil(
                      (new Date(job.deadline).getTime() - Date.now()) /
                        (1000 * 60 * 60 * 24)
                    )
                  )}{" "}
                  days left to apply
                </p>
              )}

              {/* Apply Button */}
              <button
                onClick={() => handleApplyClick(job)}
                disabled={job.status === "Paused" || job.status === "Closed"}
                className={`mt-4 w-full py-2 px-4 rounded-md font-medium text-white transition ${
                  job.status === "Paused" || job.status === "Closed"
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700"
                }`}
              >
                {job.status === "Paused" || job.status === "Closed"
                  ? "Not Available"
                  : "Apply Now"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Jobs;
