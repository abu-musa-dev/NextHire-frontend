import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ApplyPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user || !job) {
      setError("User or Job data missing");
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
      <p className="text-gray-600 text-center mt-10 text-lg font-medium">
        Loading job details...
      </p>
    );
  if (error)
    return (
      <p className="text-red-600 text-center mt-10 text-lg font-semibold">
        {error}
      </p>
    );

  return (
    <div className="max-w-md mx-auto p-8 bg-white rounded-xl shadow-xl mt-16">
      <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-900">
        Apply for <span className="text-green-600">{job.title}</span>
      </h2>

      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 p-4 rounded mb-6 text-center font-semibold transition duration-500">
          🎉 Application submitted successfully! Redirecting...
        </div>
      )}

      {!user ? (
        <p className="text-red-600 text-center font-semibold mt-6 text-lg">
          🔒 Please login to apply for this job.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-gray-700 font-semibold mb-2"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 font-semibold mb-2"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={user.email}
              disabled
              className="w-full border border-gray-300 rounded-md px-4 py-3 bg-gray-100 cursor-not-allowed"
            />
          </div>

          {/* LinkedIn / Portfolio Link */}
          <div>
            <label
              htmlFor="link"
              className="block text-gray-700 font-semibold mb-2"
            >
              LinkedIn / Portfolio Link
            </label>
            <input
              id="link"
              type="url"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="https://linkedin.com/in/yourprofile"
              className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-md transition duration-300"
            disabled={success}
          >
            {success ? "Applied!" : "Submit Application"}
          </button>
        </form>
      )}
    </div>
  );
};

export default ApplyPage;
