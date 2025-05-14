import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext"; // ✅ useAuth hook import
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Applications = () => {
  const { user } = useAuth(); // ✅ useAuth hook থেকে user পাওয়া যাবে
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.email) return; // ✅ যদি user না থাকে, তবে API কল করা হবে না

    console.log(`Fetching applications for ${user.email}...`);

    fetch(`http://localhost:5000/applications?email=${user.email}`)
      .then((res) => {
        console.log("Response:", res);
        return res.json();
      })
      .then((data) => {
        console.log("Fetched applications:", data);
        setApplications(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching applications:", error);
        setLoading(false);
      });
  }, [user]); // ✅ user পরিবর্তন হলে API কল হবে

  const handleViewDetails = (jobId) => {
    navigate(`/job/${jobId}`); // ✅ job details page এ navigate হবে
  };

  const handleWithdraw = (appId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this action!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, withdraw it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/applications/${appId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userEmail: user.email }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.message === "Application withdrawn successfully") {
              setApplications((prev) =>
                prev.filter((app) => app._id !== appId)
              );
              Swal.fire("Withdrawn!", "Your application has been withdrawn.", "success");
            } else {
              Swal.fire("Error", data.message || "Something went wrong", "error");
            }
          })
          .catch((err) => {
            console.error(err);
            Swal.fire("Error", "Failed to withdraw application", "error");
          });
      }
    });
  };

  if (loading) {
    return (
      <p className="p-8 text-center text-gray-500">Loading applications...</p>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto bg-gray-50 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        📋 My Applications
      </h1>

      {applications.length === 0 ? (
        <p className="text-center text-gray-600">No applications submitted yet.</p>
      ) : (
        <div className="space-y-6">
          {applications.map((app) => (
            <div
              key={app._id}
              className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-lg transition duration-300 ease-in-out"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    {app.jobTitle || "Untitled Job"}
                  </h2>
                  <p className="text-sm text-gray-500">
                    Applied on:{" "}
                    {app.date ? new Date(app.date).toLocaleDateString() : "N/A"}
                  </p>
                </div>

                <span
                  className={`inline-block px-3 py-1 text-sm font-medium rounded-full
                    ${app.status === "Pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : app.status === "Accepted"
                      ? "bg-green-100 text-green-800"
                      : app.status === "Rejected"
                      ? "bg-red-100 text-red-800"
                      : "bg-gray-100 text-gray-800"}`}
                >
                  {app.status || "Pending"}
                </span>
              </div>

              <div className="mt-4 flex flex-wrap justify-end gap-3">
                <button
                  onClick={() => handleViewDetails(app._id)}
                  className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-md hover:bg-blue-700 transition duration-200"
                >
                  View Details
                </button>

                {/* ✅ Show message button if status is Accepted */}
                {app.status === "Accepted" && (
                  <button
                    onClick={() =>
                      Swal.fire(
                        "Message from Employer",
                        app.message || "No message provided",
                        "info"
                      )
                    }
                    className="px-4 py-2 bg-green-600 text-white text-sm font-semibold rounded-md hover:bg-green-700 transition duration-200"
                  >
                    View Message
                  </button>
                )}

                <button
                  onClick={() => handleWithdraw(app._id)}
                  className={`px-4 py-2 text-white text-sm font-semibold rounded-md transition duration-200 ${
                    app.status === "Accepted"
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-red-600 hover:bg-red-700"
                  }`}
                  disabled={app.status === "Accepted"}
                >
                  Withdraw
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Applications;
