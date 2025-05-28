import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "../../firebase";
import ApplicantRow from "./ApplicantRow";
import { useDarkMode } from "../../context/DarkModeContext";

const Applicants = () => {
  const auth = getAuth(app);
  const [user, setUser] = useState(null);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { darkMode, toggleDarkMode } = useDarkMode();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });
    return () => unsubscribe();
  }, [auth]);

  const fetchApplications = async () => {
    if (!user?.email) return;

    setLoading(true);
    try {
      const res = await fetch(
        `https://next-haire-backend-now.vercel.app/applications/by-poster?email=${encodeURIComponent(user.email)}`
      );
      if (!res.ok) throw new Error("Fetch failed");

      const data = await res.json();
      setApplications(data);
      setError("");
    } catch (err) {
      console.error("Error fetching applications:", err);
      setError("Failed to load applicants for your posted jobs.");
      setApplications([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [user?.email]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await fetch(`https://next-haire-backend-now.vercel.app/applications/${id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) throw new Error("Status update failed");

      fetchApplications();
    } catch (err) {
      console.error("Error updating status:", err);
      alert("Failed to update status.");
    }
  };

  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-[#f9fafb] text-gray-800"} p-8 min-h-screen`}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">🧾 Applicants for My Posted Jobs</h1>
      </div>

      {loading ? (
        <p className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}>Loading...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : applications.length === 0 ? (
        <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
          No one has applied for your posted jobs yet.
        </p>
      ) : (
        <div className={`${darkMode ? "bg-gray-800 shadow-lg" : "bg-white shadow-lg"} overflow-x-auto p-6 rounded-xl`}>
          <table className={`min-w-full text-left text-sm ${darkMode ? "text-gray-200" : "text-gray-700"}`}>
            <thead className={`${darkMode ? "bg-gray-700 text-gray-300 border-gray-600" : "bg-gray-200 text-gray-800 border-gray-300"} border-b`}>
              <tr>
                <th className="py-3 px-4">Applicant Name</th>
                <th className="py-3 px-4">Job Title</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Resume</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <ApplicantRow
                  key={app._id}
                  id={app._id}
                  name={app.applicantName}
                  jobTitle={app.jobTitle}
                  email={app.applicantEmail}
                  status={app.status || "Pending"}
                  onStatusChange={handleStatusChange}
                  resumeLink={app.link}
                  darkMode={darkMode} // Pass darkMode prop if ApplicantRow needs styling
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Applicants;
