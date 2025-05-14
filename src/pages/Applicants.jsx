import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const Applicants = () => {
  const { user, token } = useAuth();
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // এখানে 'jobId' স্টেট সেট করা হচ্ছে, যার মাধ্যমে আপনি চাকরির আইডি ফিল্টার করবেন
  const [jobId, setJobId] = useState(""); // আপনি যখন চাকরি পোস্ট করবেন, তখন এই 'jobId' সেট করতে হবে

  useEffect(() => {
    if (jobId) {
      fetchApplicants(); // চাকরির আইডি থাকলে আবেদনকারীদের ফেচ করতে হবে
    }
  }, [user, token, jobId]);

  // আবেদনকারীদের ডেটা ফেচ করার ফাংশন
  const fetchApplicants = async () => {
    try {
      if (!user?.email || !token || !jobId) {
        throw new Error("অথেনটিকেশন বা চাকরির আইডি নেই।");
      }

      const response = await fetch(`http://localhost:5000/applications?email=${user.email}&jobId=${jobId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("ডেটা ফেচ করতে সমস্যা হয়েছে");
      }

      const data = await response.json();
      setApplicants(data);
    } catch (err) {
      console.error("Applicants ডেটা ফেচ করতে সমস্যা:", err);
      setError("Applicants ডেটা ফেচ করতে সমস্যা হয়েছে.");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      const response = await axios.patch(
        `http://localhost:5000/applications/${id}/status`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setApplicants((prevApplicants) =>
          prevApplicants.map((applicant) =>
            applicant._id === id ? { ...applicant, status: newStatus } : applicant
          )
        );
      }
    } catch (err) {
      console.error("স্ট্যাটাস আপডেট করতে সমস্যা:", err);
      setError("স্ট্যাটাস আপডেট করতে সমস্যা হয়েছে.");
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-gray-500">Applicants লোড হচ্ছে...</div>;
  }

  if (error) {
    return <div className="p-8 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="p-8 bg-[#f9fafb] min-h-screen">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">👥 Applicants</h1>
      <div className="bg-white shadow-xl rounded-xl p-6 overflow-x-auto">
        <table className="min-w-full text-left text-sm text-gray-700">
          <thead className="bg-gray-200 text-gray-800 border-b">
            <tr>
              <th className="py-3 px-4">নাম</th>
              <th className="py-3 px-4">কাজের শিরোনাম</th>
              <th className="py-3 px-4">ইমেইল</th>
              <th className="py-3 px-4">স্ট্যাটাস</th>
              <th className="py-3 px-4">রেজ্যুমে</th>
              <th className="py-3 px-4">অ্যাকশন</th>
            </tr>
          </thead>
          <tbody>
            {applicants.map((applicant) => (
              <tr key={applicant._id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">{applicant.name}</td>
                <td className="py-3 px-4">{applicant.jobTitle || "N/A"}</td>
                <td className="py-3 px-4">{applicant.email}</td>
                <td className="py-3 px-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      applicant.status === "Accepted"
                        ? "bg-green-200 text-green-800"
                        : applicant.status === "Rejected"
                        ? "bg-red-200 text-red-800"
                        : "bg-yellow-200 text-yellow-800"
                    }`}
                  >
                    {applicant.status}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <a
                    href={applicant.resumeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700"
                  >
                    রেজ্যুমে দেখুন
                  </a>
                </td>
                <td className="py-3 px-4">
                  <button
                    onClick={() => updateStatus(applicant._id, "Accepted")}
                    className="bg-green-500 text-white py-1 px-4 rounded-lg hover:bg-green-600"
                  >
                    গ্রহণ
                  </button>
                  <button
                    onClick={() => updateStatus(applicant._id, "Pending")}
                    className="bg-yellow-500 text-white py-1 px-4 rounded-lg hover:bg-yellow-600 ml-2"
                  >
                    মুলতুবি
                  </button>
                  <button
                    onClick={() => updateStatus(applicant._id, "Rejected")}
                    className="bg-red-500 text-white py-1 px-4 rounded-lg hover:bg-red-600 ml-2"
                  >
                    বাতিল
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Applicants;
