import React, { useEffect, useState } from "react";
import {
  Bookmark,
  ClipboardList,
  BarChart,
  User,
  LayoutDashboard,
  FileText,
  UserCircle,
  Bell,
  MessageSquare,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const CandidateDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [applicationCount, setApplicationCount] = useState(0);
  const [savedJobsCount, setSavedJobsCount] = useState(0);
  const [profileViews, setProfileViews] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!user || user.role !== "Candidate") {
      navigate("/login");
      return;
    }

    const fetchCounts = async () => {
      try {
        const appRes = await fetch(`http://localhost:5000/applications?email=${user.email}`);
        const apps = await appRes.json();
        setApplicationCount(apps.length);

        const savedRes = await fetch(`http://localhost:5000/savedJobs?email=${user.email}`);
        const savedJobs = await savedRes.json();
        setSavedJobsCount(savedJobs.length);

        const profileRes = await fetch(`http://localhost:5000/profileViews?email=${user.email}`);
        const profileData = await profileRes.json();
        setProfileViews(profileData.views || 0);
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      }
    };

    fetchCounts();
  }, [user, navigate]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setSidebarOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/home");
  };

  return (
    <div className="min-h-screen bg-[#f9fafb] flex flex-col md:flex-row relative">

      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(true)}
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
        />
      )}

      {/* Sidebar */}
      <aside
        className={`bg-white shadow-md p-6 w-64 fixed md:static top-14 left-0 h-full z-40 transform transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 flex flex-col justify-between`}
      >
        {/* Close button */}
        <button
          onClick={() => setSidebarOpen(false)}
          className="md:hidden absolute top-4 right-4 bg-gray-100 p-2 rounded-full shadow"
        >
          <X size={20} />
        </button>

        <div>
          <div className="text-2xl font-bold text-gray-800 mb-8 flex items-center gap-2">
            <User size={28} /> Candidate
          </div>
          <nav className="space-y-4 text-gray-700 font-medium">
            <NavItem to="#" icon={<LayoutDashboard size={18} />} label="Dashboard" />
            <NavItem to="/savejobs" icon={<Bookmark size={18} />} label="Saved Jobs" />
            <NavItem to="/applications" icon={<ClipboardList size={18} />} label="Applications" />
            <NavItem to="/updateProfile" icon={<UserCircle size={18} />} label="Profile" />
            <NavItem to="/resume" icon={<FileText size={18} />} label="Resume Builder" />
            <NavItem to="#" icon={<Bell size={18} />} label="Job Alerts" />
            <NavItem to="#" icon={<MessageSquare size={18} />} label="Messages" />
            <NavItem to="/seetings" icon={<Settings size={18} />} label="Settings" />
          </nav>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-red-600 hover:text-red-800 font-medium mt-8"
        >
          <LogOut size={18} /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-8 mt-16 md:mt-0">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">🎯 Candidate Dashboard</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          <StatCard title="Saved Jobs" value={savedJobsCount} icon={<Bookmark size={24} />} color="purple" />
          <StatCard title="Applications" value={applicationCount} icon={<ClipboardList size={24} />} color="blue" />
          <StatCard title="Profile Views" value={profileViews} icon={<BarChart size={24} />} color="green" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <SectionCard title="Saved Jobs" description="Jobs you've saved for future reference or application." />
          <SectionCard title="Applications" description="Track the progress of the jobs you've applied to." />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FeatureCard title="Resume Builder" description="Create or upload a professional resume to boost your profile visibility." />
          <FeatureCard title="Job Alerts" description="Set up job alerts to get notified about relevant new opportunities." />
          <FeatureCard title="Messages" description="Communicate with recruiters and track conversations here." />
          <FeatureCard title="Profile Settings" description="Update your personal information, job preferences, and notifications." />
        </div>
      </main>
    </div>
  );
};

// Reusable Components
const NavItem = ({ to, icon, label }) => (
  <Link
    to={to}
    className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-700 hover:bg-green-50 hover:text-green-700 transition"
  >
    {icon} {label}
  </Link>
);

const StatCard = ({ title, value, icon, color }) => {
  const colorMap = {
    green: "from-green-100 to-green-200 text-green-700",
    blue: "from-blue-100 to-blue-200 text-blue-700",
    purple: "from-purple-100 to-purple-200 text-purple-700",
  };

  return (
    <div className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition border">
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-xl bg-gradient-to-br ${colorMap[color]} shadow-inner`}>
          {icon}
        </div>
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
        </div>
      </div>
    </div>
  );
};

const SectionCard = ({ title, description }) => (
  <div className="bg-white p-6 rounded-2xl border shadow hover:shadow-md transition">
    <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
    <p className="text-gray-600 mt-1">{description}</p>
  </div>
);

const FeatureCard = SectionCard;

export default CandidateDashboard;
