import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDarkMode } from "../../context/DarkModeContext"; // your dark mode hook

const ApplyPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { darkMode } = useDarkMode();

  const [user, setUser] = useState(null);
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [link, setLink] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (err) {
        console.error("Invalid user JSON:", err);
        setUser(null);
      }
    }
  }, []);

  useEffect(() => {
    if (id) {
      setLoading(true);
      fetch(`http://localhost:5000/jobs/${id}`)
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch job");
          return res.json();
        })
        .then((data) => {
          setJob(data);
          setLoading(false);
        })
        .catch(() => {
          setError("Failed to load job details");
          setLoading(false);
        });
    }
  }, [id]);

  // চেক ইউজার কি জবের মালিক
  const isOwner = user && job && user._id === job.posterId;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user || !job) {
      setError("User or Job data missing");
      return;
    }

    if (isOwner) {
      setError("You cannot apply to your own job post.");
      return;
    }

    if (!link.trim()) {
      setError("Please provide your LinkedIn or Portfolio link.");
      return;
    }

    const applicationData = {
      applicantId: user._id,
      jobId: job._id,
      jobTitle: job.title,
      applicantName: user.name,
      applicantEmail: user.email,
      link,
    };

    fetch("http://localhost:5000/applications", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(applicationData),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to apply");
        return res.json();
      })
      .then(() => {
        setSuccess(true);
        setError(null);
        setTimeout(() => {
          navigate("/applications");
        }, 2000);
      })
      .catch(() => {
        setSuccess(false);
        setError("Failed to apply. Please try again.");
      });
  };

  if (loading)
    return (
      <div
        className={`${
          darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-800"
        } min-h-screen flex items-center justify-center`}
      >
        <p className="text-lg font-medium">Loading job details...</p>
      </div>
    );

  if (error)
    return (
      <div
        className={`${
          darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-800"
        } min-h-screen flex items-center justify-center`}
      >
        <p className="text-lg font-semibold text-red-500">{error}</p>
      </div>
    );

  return (
    <div
      className={`${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      } min-h-screen py-12`}
    >
      <div
        className={`max-w-md mx-auto p-8 rounded-xl shadow-xl border ${
          darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        }`}
      >
        <h2
          className={`text-3xl font-extrabold mb-6 text-center ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Apply for <span className="text-green-500">{job.title}</span>
        </h2>

        {success && (
          <div
            className={`p-4 rounded mb-6 text-center font-semibold transition duration-500 ${
              darkMode
                ? "bg-green-800 border border-green-600 text-green-200"
                : "bg-green-100 border border-green-400 text-green-700"
            }`}
          >
            🎉 Application submitted successfully! Redirecting...
          </div>
        )}

        {!user ? (
          <p
            className={`text-center font-semibold mt-6 text-lg ${
              darkMode ? "text-red-400" : "text-red-600"
            }`}
          >
            🔒 Please login to apply for this job.
          </p>
        ) : isOwner ? (
          <p
            className={`text-center font-semibold mt-6 text-lg ${
              darkMode ? "text-yellow-400" : "text-yellow-600"
            }`}
          >
            ⚠️ You cannot apply to your own job post.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className={`block font-semibold mb-2 ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
                className={`w-full rounded-md px-4 py-3 focus:outline-none focus:ring-2 transition border ${
                  darkMode
                    ? "bg-gray-800 border-gray-600 text-white focus:ring-green-400"
                    : "bg-white border-gray-300 text-gray-900 focus:ring-green-400"
                }`}
                required
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className={`block font-semibold mb-2 ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={user.email}
                disabled
                className={`w-full rounded-md px-4 py-3 cursor-not-allowed ${
                  darkMode
                    ? "bg-gray-700 border border-gray-600 text-gray-300"
                    : "bg-gray-100 border border-gray-300 text-gray-700"
                }`}
              />
            </div>

            {/* LinkedIn / Portfolio Link */}
            <div>
              <label
                htmlFor="link"
                className={`block font-semibold mb-2 ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                LinkedIn / Portfolio Link
              </label>
              <input
                id="link"
                type="url"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                placeholder="https://linkedin.com/in/yourprofile"
                className={`w-full rounded-md px-4 py-3 focus:outline-none focus:ring-2 transition border ${
                  darkMode
                    ? "bg-gray-800 border-gray-600 text-white focus:ring-green-400"
                    : "bg-white border-gray-300 text-gray-900 focus:ring-green-400"
                }`}
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className={`w-full font-bold py-3 rounded-md transition duration-300 ${
                darkMode
                  ? "bg-green-700 hover:bg-green-800 text-white"
                  : "bg-green-600 hover:bg-green-700 text-white"
              }`}
              disabled={success}
            >
              {success ? "Applied!" : "Submit Application"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ApplyPage;
