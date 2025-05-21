import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LayoutDashboard,
  FilePlus,
  ClipboardList,
  Users,
  FileText,
  UserCog,
  Inbox,
  Briefcase,
  Bell,
  Plus,
  LogOut,
  Menu,
  X
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const EmployerDashboard = () => {
  const [applicants, setApplicants] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const email = user?.email;
  const role = user?.role;

  useEffect(() => {
    if (!user || role !== "Employer") {
      navigate("/login");
    }
  }, [user, role, navigate]);

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

  if (loading) return <p className="text-center text-gray-500 mt-20">Loading...</p>;

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#f9fafb] relative">

      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className={`md:hidden absolute top-4 left-4 z-50 bg-white p-2 rounded-full shadow-md ${
          sidebarOpen ? "hidden" : "block"
        }`}
        aria-label="Open sidebar menu"
      >
        <Menu size={24} />
      </button>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <Sidebar logout={logout} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-6 md:p-10 mt-16 md:mt-0">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">👔 Employer Dashboard</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
          <StatCard title="Total Jobs" value={jobs.length} icon={<Briefcase size={24} />} color="green" />
          <StatCard title="Applicants" value={applicants.length} icon={<Users size={24} />} color="blue" />
        </div>

        <div className="flex justify-end mb-6">
          <Link to="/post-job">
            <button className="flex items-center gap-2 px-4 py-2 bg-green-700 text-white rounded-full hover:bg-green-800 transition text-sm font-semibold">
              <Plus size={18} /> Post New Job
            </button>
          </Link>
        </div>

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
const Sidebar = ({ logout, sidebarOpen, setSidebarOpen }) => {
  const links = [
    { to: "/dashboard/employer", icon: <LayoutDashboard size={20} />, label: "Dashboard" },
    { to: "/post-job", icon: <FilePlus size={20} />, label: "Post Job" },
    { to: "/my-jobs", icon: <ClipboardList size={20} />, label: "My Jobs" },
    { to: "/applicants", icon: <Users size={20} />, label: "Applicants" },
    { to: "/reports", icon: <FileText size={20} />, label: "Reports" },
    { to: "/profile", icon: <UserCog size={20} />, label: "Profile Settings" },
    { to: "/inbox", icon: <Inbox size={20} />, label: "Inbox" },
    { to: "/services", icon: <Briefcase size={20} />, label: "Services" },
    { to: "/notifications", icon: <Bell size={20} />, label: "Notifications" },
  ];

  return (
    <aside
      className={`bg-white shadow-md p-6 w-64 fixed md:static top-14 left-0 h-full z-40 transform transition-transform duration-300 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 flex flex-col justify-between`}
    >
      {/* Close button for mobile */}
      <button
        onClick={() => setSidebarOpen(false)}
        className="md:hidden absolute top-4 right-4 bg-gray-100 p-2 rounded-full shadow"
        aria-label="Close sidebar menu"
      >
        <X size={20} />
      </button>

      <div>
        <div className="text-2xl font-bold text-gray-800 mb-8">
          <span className="text-green-700">Next</span>Hire
        </div>
        <nav className="flex flex-col gap-6 text-gray-700 font-medium">
          {links.map(({ to, icon, label }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setSidebarOpen(false)}
              className="flex items-center gap-3 hover:text-green-700"
            >
              {icon} {label}
            </Link>
          ))}
        </nav>
      </div>

      <button
        onClick={logout}
        className="flex items-center gap-2 text-red-600 hover:text-red-800 font-medium mt-8"
      >
        <LogOut size={20} /> Logout
      </button>
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
