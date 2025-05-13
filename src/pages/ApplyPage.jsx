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

  // localStorage থেকে user load করা
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

  // job এর ডিটেইল fetch করা
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

    const applicationData = {
      applicantId: user._id,
      jobId: job._id,
      jobTitle: job.title,          // job title অ্যাপ্লিকেশন ডাটায় যোগ করা
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
      .then((data) => {
        console.log("Application response:", data);
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

  if (loading) return <p className="text-gray-600 text-center mt-10">Loading job details...</p>;
  if (error) return <p className="text-red-600 text-center mt-10">{error}</p>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-lg mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Apply for {job.title}</h2>

      {success && (
        <div className="bg-green-100 text-green-800 p-4 rounded mb-4 text-center">
          Application submitted successfully! Redirecting...
        </div>
      )}

      {!user ? (
        <p className="text-red-600 text-center font-semibold mt-4">
          🔒 Please login to apply for this job.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Name</label>
            <input
              type="text"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              className="w-full border border-gray-300 px-4 py-2 rounded"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              value={user.email}
              disabled
              className="w-full border border-gray-300 px-4 py-2 rounded"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">LinkedIn/Portfolio Link</label>
            <input
              type="url"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className="w-full border border-gray-300 px-4 py-2 rounded"
              placeholder="https://linkedin.com/in/yourprofile"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
          >
            Submit Application
          </button>
        </form>
      )}
    </div>
  );
};

export default ApplyPage;
