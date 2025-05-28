import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pencil, Trash2 } from "lucide-react";
import Swal from "sweetalert2";
import { useAuth } from "../../context/AuthContext";
import { useDarkMode } from "../../context/DarkModeContext"; // import dark mode context

const MyJobs = () => {
  const { user, token } = useAuth();
  const { darkMode, toggleDarkMode } = useDarkMode(); // get dark mode state & toggle
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        if (!user?.email || !token) return;

        const res = await axios.get(`http://localhost:5000/jobs?email=${user.email}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setJobs(res.data);
      } catch (error) {
        console.error("Failed to fetch jobs", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [user, token]);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:5000/jobs/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setJobs(jobs.filter((job) => job._id !== id));
        Swal.fire("Deleted!", "Your job has been deleted.", "success");
      } catch (error) {
        console.error("Failed to delete job", error);
        Swal.fire("Error!", "There was an issue deleting the job.", "error");
      }
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.patch(
        `http://localhost:5000/jobs/${id}/status`,
        { status: newStatus },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setJobs((prev) =>
        prev.map((job) => (job._id === id ? { ...job, status: newStatus } : job))
      );
    } catch (error) {
      console.error("Failed to update status", error);
    }
  };

  const handleUpdate = async (id) => {
    const { value: newTitle } = await Swal.fire({
      title: "Enter new job title",
      input: "text",
      inputLabel: "New Title",
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) return "You need to write something!";
      },
    });

    if (newTitle) {
      try {
        await axios.patch(
          `http://localhost:5000/jobs/${id}`,
          { title: newTitle },
          {
            headers: { Authorization: `Bearer ${token}` },
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
    return (
      <div className={`text-center text-lg ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
        Loading jobs...
      </div>
    );
  }

  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-800"} p-6 md:p-10 min-h-screen`}>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-semibold">📄 My Jobs</h1>
        <button
          onClick={toggleDarkMode}
          className={`px-4 py-2 rounded ${
            darkMode
              ? "bg-gray-700 hover:bg-gray-600 text-white"
              : "bg-gray-200 hover:bg-gray-300 text-gray-800"
          }`}
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>

      {jobs.length === 0 ? (
        <div className="text-center text-lg">{darkMode ? "No jobs posted yet." : "No jobs posted yet."}</div>
      ) : (
        <div className={`${darkMode ? "bg-gray-800 shadow-lg" : "bg-white shadow-lg"} overflow-x-auto rounded-xl p-6`}>
          <table className={`min-w-full text-sm ${darkMode ? "text-gray-200" : "text-gray-800"}`}>
            <thead className={`text-left border-b ${darkMode ? "text-gray-400 border-gray-700" : "text-gray-600 border-gray-300"}`}>
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
                  className={`${darkMode ? "border-b border-gray-700 hover:bg-gray-700" : "border-b border-gray-300 hover:bg-gray-100"} transition`}
                >
                  <td className="py-3 px-4">{job.title}</td>
                  <td className="py-3 px-4">{job.category || "N/A"}</td>
                  <td className="py-3 px-4">{job.location}</td>
                  <td className="py-3 px-4">{new Date(job.date || job.createdAt).toLocaleDateString()}</td>
                  <td className="py-3 px-4">
                    <select
                      value={job.status || "Active"}
                      onChange={(e) => handleStatusChange(job._id, e.target.value)}
                      className={`${darkMode ? "border-gray-600 bg-gray-700 text-white" : "border-gray-300 bg-white text-gray-800"} border rounded-md px-3 py-1 text-sm w-full`}
                    >
                      <option value="Active">Active</option>
                      <option value="Paused">Paused</option>
                      <option value="Closed">Closed</option>
                    </select>
                  </td>
                  <td className="py-3 px-4 flex justify-end gap-3">
                    <button
                      onClick={() => handleUpdate(job._id)}
                      className={`${darkMode ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-800"} transition`}
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(job._id)}
                      className={`${darkMode ? "text-red-400 hover:text-red-300" : "text-red-600 hover:text-red-800"} transition`}
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
