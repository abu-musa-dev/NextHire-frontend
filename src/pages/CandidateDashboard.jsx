import React, { useEffect } from "react";
import { Bookmark, ClipboardList, BarChart, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // adjust path as needed

const CandidateDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role !== "Candidate") {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <div className="flex min-h-screen bg-[#f9fafb]">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6 hidden md:block">
        <div className="text-2xl font-bold text-gray-800 mb-8 flex items-center gap-2">
          <User size={28} /> Candidate
        </div>
        <nav className="space-y-4 text-gray-700 font-medium">
          <Link to="#" className="block hover:text-green-700">Dashboard</Link>
          <Link to="/savejobs" className="block hover:text-green-700">Saved Jobs</Link>
          <Link to="/applications" className="block hover:text-green-700">Applications</Link>
          <Link to="#" className="block hover:text-green-700">Profile</Link>
          <Link to="/resume" className="block hover:text-green-700">Resume Builder</Link>
          <Link to="#" className="block hover:text-green-700">Job Alerts</Link>
          <Link to="#" className="block hover:text-green-700">Messages</Link>
          <Link to="#" className="block hover:text-green-700">Settings</Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">🎯 Candidate Dashboard</h1>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <StatCard title="Saved Jobs" value="8" icon={<Bookmark size={24} />} color="purple" />
          <StatCard title="Applications" value="5" icon={<ClipboardList size={24} />} color="blue" />
          <StatCard title="Profile Views" value="120" icon={<BarChart size={24} />} color="green" />
        </div>

        {/* Section Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="bg-white p-6 rounded-2xl shadow-sm border hover:shadow-md transition">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Saved Jobs</h2>
            <p className="text-gray-600">Jobs you've saved for future reference or application.</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border hover:shadow-md transition">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Applications</h2>
            <p className="text-gray-600">Track the progress of the jobs you've applied to.</p>
          </div>
        </div>

        {/* Extra Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FeatureCard title="Resume Builder" description="Create or upload a professional resume to boost your profile visibility." />
          <FeatureCard title="Job Alerts" description="Set up job alerts to get notified about relevant new opportunities." />
          <FeatureCard title="Messages" description="Communicate with recruiters and track conversations here." />
          <FeatureCard title="Profile Settings" description="Update your personal information, job preferences, and notifications." />
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

const FeatureCard = ({ title, description }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border hover:shadow-md transition">
    <h2 className="text-xl font-semibold text-gray-800 mb-2">{title}</h2>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default CandidateDashboard;
