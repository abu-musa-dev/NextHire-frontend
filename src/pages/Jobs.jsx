import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const Jobs = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/jobs")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setJobs(data);
        } else {
          console.error("Jobs data is not an array", data);
          setJobs([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching jobs:", error);
        setJobs([]);
      });
  }, []);
const navigate = useNavigate();
  const handleApplyClick = (job) => {
    if (job.status === "Paused" || job.status === "Closed") {
      alert("This job is not accepting applications right now.");
    } else {
     navigate(`/apply/${job._id}`);
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-8">
        Available Jobs
      </h1>
      <div className="grid gap-8 lg:grid-cols-3 sm:grid-cols-1">
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <div
              key={job._id}
              className="bg-white p-6 rounded-xl shadow-lg transition hover:shadow-xl"
            >
              <div className="flex justify-between items-center mb-4">
                <div className="font-medium text-gray-500 text-sm">
                  <strong>Status:</strong>{" "}
                  <span
                    className={`${
                      job.status === "Active"
                        ? "bg-green-100 text-green-600"
                        : job.status === "Paused"
                        ? "bg-yellow-100 text-yellow-600"
                        : job.status === "Closed"
                        ? "bg-red-100 text-red-600"
                        : "bg-gray-200 text-gray-600"
                    } px-3 py-1 rounded-full`}
                  >
                    {job.status || "No Status"}
                  </span>
                </div>
              </div>

              <h2 className="text-2xl font-semibold text-gray-800">
                {job.title}
              </h2>
              <p className="text-sm text-gray-500">{job.location}</p>
              <p className="text-sm text-gray-500">{job.type}</p>

              <div className="mt-4">
                <button
                  onClick={() => handleApplyClick(job)}
                  disabled={job.status === "Paused" || job.status === "Closed"}
                  className={`w-full text-center px-6 py-3 rounded-md font-semibold transition duration-200 ${
                    job.status === "Paused" || job.status === "Closed"
                      ? "bg-gray-400 cursor-not-allowed text-white"
                      : "bg-green-600 hover:bg-green-700 text-white"
                  }`}
                >
                  {job.status === "Paused" || job.status === "Closed"
                    ? "Cannot Apply"
                    : "Apply Now"}
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-lg text-gray-600">
            No jobs available at the moment.
          </p>
        )}
      </div>
    </div>
  );
};

export default Jobs;
