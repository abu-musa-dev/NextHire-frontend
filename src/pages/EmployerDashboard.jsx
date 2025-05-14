import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Briefcase,
  Users,
  BarChart,
  Plus,
  LayoutDashboard,
  LogOut,
  FileText,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const EmployerDashboard = () => {
  const [applicants, setApplicants] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const email = user?.email;
  const role = user?.role;

  // Redirect if not employer
  useEffect(() => {
    if (!user || role !== "Employer") {
      navigate("/login");
    }
  }, [user, role, navigate]);

  // Fetch jobs and applicants
  useEffect(() => {
    const fetchData = async () => {
      if (!email) return;
      try {
        const [applicantRes, jobRes] = await Promise.all([
          axios.get(`http://localhost:5000/applications/by-poster?email=${encodeURIComponent(email)}`),
          axios.get(`http://localhost:5000/jobs?email=${email}`),
        ]);
        setApplicants(applicantRes.data);
        setJobs(jobRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [email]);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#f9fafb]">
      {/* Sidebar */}
      <Sidebar logout={logout} />

      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-6 md:p-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">👔 Employer Dashboard</h1>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
          <StatCard title="Total Jobs" value={jobs.length} icon={<Briefcase size={24} />} color="green" />
          <StatCard title="Applicants" value={applicants.length} icon={<Users size={24} />} color="blue" />
        </div>

        {/* Post Job Button */}
        <div className="flex justify-end mb-6">
          <Link to="/post-job">
            <button className="flex items-center gap-2 px-4 py-2 bg-green-700 text-white rounded-full hover:bg-green-800 transition text-sm font-semibold">
              <Plus size={18} /> Post New Job
            </button>
          </Link>
        </div>

        {/* Applicants Table */}
        <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border overflow-x-auto">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">📋 Recent Applicants</h2>
          <table className="min-w-full text-left text-sm text-gray-700">
            <thead className="text-gray-500 border-b">
              <tr>
                <th className="py-2 px-4">Name</th>
                <th className="py-2 px-4">Job</th>
                <th className="py-2 px-4">Applied Date</th>
                <th className="py-2 px-4">Status</th>
                <th className="py-2 px-4">Email</th>
                <th className="py-2 px-4">Resume</th>
              </tr>
            </thead>
            <tbody>
              {applicants.map((applicant) => (
                <tr key={applicant._id} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-4">{applicant.applicantName}</td>
                  <td className="py-2 px-4">{applicant.jobTitle}</td>
                  <td className="py-2 px-4">{new Date(applicant.createdAt).toLocaleDateString()}</td>
                  <td className="py-2 px-4 capitalize">{applicant.status || "Pending"}</td>
                  <td className="py-2 px-4">{applicant.applicantEmail}</td>
                  <td className="py-2 px-4">
                    {applicant.link ? (
                      <a href={applicant.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        View
                      </a>
                    ) : "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

// Sidebar component
const Sidebar = ({ logout }) => {
  const links = [
    { to: "/dashboard/employer", icon: <LayoutDashboard size={20} />, label: "Dashboard" },
    { to: "/post-job", icon: <Briefcase size={20} />, label: "Post Job" },
    { to: "/my-jobs", icon: <Briefcase size={20} />, label: "My Jobs" },
    { to: "/applicants", icon: <Users size={20} />, label: "Applicants" },
    { to: "/reports", icon: <FileText size={20} />, label: "Reports" },
    { to: "/profile", icon: <Users size={20} />, label: "Profile Settings" },
    { to: "/inbox", icon: <FileText size={20} />, label: "Inbox" },
    { to: "/notifications", icon: <BarChart size={20} />, label: "Notifications" },
  ];

  return (
    <aside className="w-full md:w-64 bg-white shadow-md p-6 hidden md:block">
      <div className="text-2xl font-bold text-gray-800 mb-10">
        <span className="text-green-700">Next</span>Hire
      </div>
      <nav className="flex flex-col gap-6 text-gray-700">
        {links.map(({ to, icon, label }) => (
          <Link key={to} to={to} className="flex items-center gap-3 hover:text-green-700">
            {icon} {label}
          </Link>
        ))}
        <Link to="/login" onClick={logout} className="flex items-center gap-3 text-red-600 hover:text-red-800 mt-auto">
          <LogOut size={20} /> Logout
        </Link>
      </nav>
    </aside>
  );
};

// Stat card component
const StatCard = ({ title, value, icon, color }) => {
  const colorMap = {
    green: "bg-green-100 text-green-700",
    blue: "bg-blue-100 text-blue-700",
    purple: "bg-purple-100 text-purple-700",
  };

  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border hover:shadow-md transition">
      <div className="flex items-center gap-4 mb-3">
        <div className={`p-3 rounded-full ${colorMap[color]}`}>{icon}</div>
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <h3 className="text-xl font-bold text-gray-800">{value}</h3>
        </div>
      </div>
    </div>
  );
};

export default EmployerDashboard;
