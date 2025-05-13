import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "../firebase";

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
      setError("তোমার পোস্ট করা জবগুলোতে কে কে অ্যাপ্লাই করেছে তা লোড করতে সমস্যা হয়েছে।");
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

      // সফলভাবে আপডেট হলে আবার fetch করো
      fetchApplications();
    } catch (err) {
      console.error("Error updating status:", err);
      alert("স্ট্যাটাস আপডেট করতে সমস্যা হয়েছে");
    }
  };

  return (
    <div className="p-8 bg-[#f9fafb] min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">🧾 আমার পোস্টে আবেদনকৃত ইউজারসমূহ</h1>

      {loading ? (
        <p className="text-gray-600">লোড হচ্ছে...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : applications.length === 0 ? (
        <p className="text-gray-600">তোমার পোস্ট করা কোনো জবে এখনও কেউ আবেদন করেনি।</p>
      ) : (
        <div className="overflow-x-auto bg-white p-6 rounded-xl shadow-lg">
          <table className="min-w-full text-left text-sm text-gray-700">
            <thead className="bg-gray-200 text-gray-800 border-b">
              <tr>
                <th className="py-3 px-4">চাকরির নাম</th>
                <th className="py-3 px-4">প্রার্থীর নাম</th>
                <th className="py-3 px-4">ইমেইল</th>
                <th className="py-3 px-4">লিঙ্ক</th>
                <th className="py-3 px-4">তারিখ</th>
                <th className="py-3 px-4">স্ট্যাটাস</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr key={app._id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">{app.jobTitle || "N/A"}</td>
                  <td className="py-3 px-4">{app.applicantName || "N/A"}</td>
                  <td className="py-3 px-4">{app.applicantEmail}</td>
                  <td className="py-3 px-4">
                    {app.link ? (
                      <a
                        href={app.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        দেখুন
                      </a>
                    ) : (
                      "N/A"
                    )}
                  </td>
                  <td className="py-3 px-4">
                    {new Date(app.date).toLocaleDateString("bn-BD", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </td>
                  <td className="py-3 px-4">
                    <select
                      value={app.status || "Pending"}
                      onChange={(e) => handleStatusChange(app._id, e.target.value)}
                      className="border rounded px-2 py-1"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Accepted">Accepted</option>
                      <option value="Rejected">Rejected</option>
                    </select>
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

export default Applicants;
