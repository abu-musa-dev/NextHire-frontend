import React, { useEffect, useState } from "react";
import axios from "axios";
import { Briefcase, Users, BarChart, Plus, LayoutDashboard, LogOut, FileText } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import ApplicantRow from "./ApplicantRow";
import { useAuth } from "../context/AuthContext"; // ✅ Correct import

const EmployerDashboard = () => {
  const [applicants, setApplicants] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user, logout } = useAuth(); // ✅ Get user and logout from context
  const navigate = useNavigate();
  const email = user?.email; // Use user from context
  const role = user?.role; // Get the user's role

  // If no user is logged in or user is not an employer, redirect to login
  useEffect(() => {
    if (!user || role !== "Employer") {
      navigate("/login");
    }
  }, [user, role, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!email) {
          console.error("User email not available in context.");
          return;
        }

        const [applicantRes, jobRes] = await Promise.all([
          axios.get(`http://localhost:5000/applications?posterEmail=${email}`),
          axios.get(`http://localhost:5000/jobs?email=${email}`),
        ]);

        setApplicants(applicantRes.data);
        setJobs(jobRes.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [email]);

  const updateApplicantStatus = (id, newStatus) => {
    setApplicants((prevApplicants) =>
      prevApplicants.map((applicant) =>
        applicant._id === id ? { ...applicant, status: newStatus } : applicant
      )
    );
  };

  if (loading) {
    return <p className="text-center text-gray-500">Loading data...</p>;
  }

  return (
    <div className="flex min-h-screen bg-[#f9fafb]">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6 hidden md:block">
        <div className="text-2xl font-bold text-gray-800 mb-10">
          <span className="text-green-700">Next</span>Hire
        </div>
        <nav className="flex flex-col gap-6 text-gray-700">
          <Link to="/dashboard/employer" className="flex items-center gap-3 hover:text-green-700">
            <LayoutDashboard size={20} /> Dashboard
          </Link>
          <Link to="/post-job" className="flex items-center gap-3 hover:text-green-700">
            <Briefcase size={20} /> Post Job
          </Link>
          <Link to="/my-jobs" className="flex items-center gap-3 hover:text-green-700">
            <Briefcase size={20} /> My Jobs
          </Link>
          <Link to="/applicants" className="flex items-center gap-3 hover:text-green-700">
            <Users size={20} /> Applicants
          </Link>
          <Link to="/reports" className="flex items-center gap-3 hover:text-green-700">
            <FileText size={20} /> Reports
          </Link>
          <Link to="/profile" className="flex items-center gap-3 hover:text-green-700">
            <Users size={20} /> Profile Settings
          </Link>
          <Link to="/inbox" className="flex items-center gap-3 hover:text-green-700">
            <FileText size={20} /> Inbox
          </Link>
          <Link to="/notifications" className="flex items-center gap-3 hover:text-green-700">
            <BarChart size={20} /> Notifications
          </Link>
          <Link
            to="/login"
            className="flex items-center gap-3 text-red-600 hover:text-red-800 mt-auto"
            onClick={logout}
          >
            <LogOut size={20} /> Logout
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">👔 Employer Dashboard</h1>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <StatCard title="Total Jobs" value={jobs.length} icon={<Briefcase size={24} />} color="green" />
          <StatCard title="Applicants" value={applicants.length} icon={<Users size={24} />} color="blue" />
        </div>

        {/* Actions */}
        <div className="flex justify-end mb-6">
          <Link to="/post-job">
            <button className="flex items-center gap-2 px-5 py-2 bg-green-700 text-white rounded-full hover:bg-green-800 transition font-semibold">
              <Plus size={18} /> Post New Job
            </button>
          </Link>
        </div>

        {/* Recent Applicants */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">📋 Recent Applicants</h2>
          <table className="w-full text-left text-sm text-gray-700">
            <thead className="text-gray-500 border-b">
              <tr>
                <th className="py-2">Name</th>
                <th className="py-2">Job</th>
                <th className="py-2">Applied Date</th>
                <th className="py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {applicants.map((applicant) => (
                <ApplicantRow
                  key={applicant._id}
                  id={applicant._id}
                  name={applicant.name}
                  job={applicant.job}
                  date={applicant.date}
                  status={applicant.status}
                  onStatusChange={updateApplicantStatus}
                />
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

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
