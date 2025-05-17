import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "../../firebase";
import ApplicantRow from "./ApplicantRow";

const Applicants = () => {
  const auth = getAuth(app);
  const [user, setUser] = useState(null);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });
    return () => unsubscribe();
  }, []);

  const fetchApplications = async () => {
    if (!user?.email) return;

    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:5000/applications/by-poster?email=${encodeURIComponent(user.email)}`
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
      const res = await fetch(`http://localhost:5000/applications/${id}/status`, {
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
    <div className="p-8 bg-[#f9fafb] min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">🧾 Applicants for My Posted Jobs</h1>

      {loading ? (
        <p className="text-gray-600">Loading...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : applications.length === 0 ? (
        <p className="text-gray-600">No one has applied for your posted jobs yet.</p>
      ) : (
        <div className="overflow-x-auto bg-white p-6 rounded-xl shadow-lg">
          <table className="min-w-full text-left text-sm text-gray-700">
            <thead className="bg-gray-200 text-gray-800 border-b">
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
