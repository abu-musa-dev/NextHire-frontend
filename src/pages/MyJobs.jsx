import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pencil, Trash2 } from "lucide-react";
import Swal from "sweetalert2";
import { useAuth } from "../context/AuthContext"; // Import useAuth from context

const MyJobs = () => {
  const { user, token } = useAuth(); // Get user and token from context
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch jobs when the component mounts
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        if (!user?.email || !token) {
          console.error("User email or token not found.");
          return;
        }

        const res = await axios.get(`http://localhost:5000/jobs?email=${user.email}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Add JWT token to Authorization header
          },
        });
        setJobs(res.data);
      } catch (error) {
        console.error("Failed to fetch jobs", error);
      } finally {
        setLoading(false); // Set loading to false when done
      }
    };

    fetchJobs();
  }, [user, token]); // Re-run fetch when user or token changes

  // Handle job deletion
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:5000/jobs/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setJobs(jobs.filter((job) => job._id !== id));
        Swal.fire("Deleted!", "Your job has been deleted.", "success");
      } catch (error) {
        console.error("Failed to delete job", error);
        Swal.fire("Error!", "There was an issue deleting the job.", "error");
      }
    }
  };

  // Handle job status change
  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.patch(
        `http://localhost:5000/jobs/${id}/status`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setJobs((prev) =>
        prev.map((job) => (job._id === id ? { ...job, status: newStatus } : job))
      );
    } catch (error) {
      console.error("Failed to update status", error);
    }
  };

  // Handle job title update
  const handleUpdate = async (id) => {
    const { value: newTitle } = await Swal.fire({
      title: "Enter new job title",
      input: "text",
      inputLabel: "New Title",
      inputValue: "",
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return "You need to write something!";
        }
      },
    });

    if (newTitle) {
      try {
        await axios.patch(
          `http://localhost:5000/jobs/${id}`,
          { title: newTitle },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setJobs((prev) =>
          prev.map((job) =>
            job._id === id ? { ...job, title: newTitle } : job
          )
        );
        Swal.fire("Updated!", "Job title has been updated.", "success");
      } catch (error) {
        console.error("Failed to update job", error);
        Swal.fire("Error!", "There was an issue updating the job.", "error");
      }
    }
  };

  if (loading) {
    return <div className="text-center text-lg text-gray-500">Loading jobs...</div>;
  }

  return (
    <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-semibold text-gray-800 mb-8">📄 My Jobs</h1>

      {jobs.length === 0 ? (
        <div className="text-center text-lg text-gray-500">No jobs posted yet.</div>
      ) : (
        <div className="overflow-x-auto bg-white shadow-lg rounded-xl p-6">
          <table className="min-w-full text-sm text-gray-700">
            <thead className="text-left text-gray-500 border-b">
              <tr>
                <th className="py-3 px-4">Title</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Location</th>
                <th className="py-3 px-4">Posted Date</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr
                  key={job._id}
                  className="border-b hover:bg-gray-100 transition duration-300 ease-in-out"
                >
                  <td className="py-3 px-4">{job.title}</td>
                  <td className="py-3 px-4">{job.category || "N/A"}</td>
                  <td className="py-3 px-4">{job.location}</td>
                  <td className="py-3 px-4">
                    {new Date(job.date || job.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4">
                    <select
                      value={job.status || "Active"}
                      onChange={(e) => handleStatusChange(job._id, e.target.value)}
                      className="border rounded-md px-3 py-1 text-sm w-full"
                    >
                      <option value="Active">Active</option>
                      <option value="Paused">Paused</option>
                      <option value="Closed">Closed</option>
                    </select>
                  </td>
                  <td className="py-3 px-4 flex justify-end gap-3">
                    <button
                      onClick={() => handleUpdate(job._id)}
                      className="text-blue-600 hover:text-blue-800 transition duration-200"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(job._id)}
                      className="text-red-600 hover:text-red-800 transition duration-200"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyJobs;
