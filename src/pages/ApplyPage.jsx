import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ApplyPage = () => {
  const { id } = useParams(); // job ID from route
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [job, setJob] = useState(null);

  // Retrieve token and user info from localStorage when component mounts
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken) {
      setToken(storedToken); // Set token in state
    }

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser)); // Parse user info from localStorage
      } catch (err) {
        console.error("Invalid user JSON:", err);
        setUser(null);
      }
    }
  }, []);

  // Fetch job details if token and job ID are available
  useEffect(() => {
    if (token && id) {
      fetch(`http://localhost:5000/jobs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Send token in header for auth
        },
      })
        .then((res) => res.json())
        .then((data) => setJob(data)) // Set job data in state
        .catch((err) => console.error("Failed to load job:", err));
    }
  }, [id, token]);

  // Check if user is authenticated
  if (!user || !token) {
    return (
      <p className="text-red-600 text-center mt-10 font-semibold">
        🔒 Unauthorized <br /> Please log in to apply for jobs.
      </p>
    );
  }

  // Check if the job details are loading
  if (!job) {
    return (
      <p className="text-gray-600 text-center mt-10">
        Loading job details...
      </p>
    );
  }

  // Handle job application form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const applicationData = {
      applicantId: user._id,
      jobId: job._id,
      applicantName: user.name,
      applicantEmail: user.email,
    };

    fetch("http://localhost:5000/applications", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Include token in Authorization header
      },
      body: JSON.stringify(applicationData),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Unauthorized or failed to apply");
        }
        return res.json();
      })
      .then((data) => {
        alert("Application submitted successfully!");
        console.log(data);
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to apply. Please try again.");
      });
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-lg mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Apply for {job.title}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Name
          </label>
          <input
            type="text"
            value={user.name}
            disabled
            className="w-full border border-gray-300 px-4 py-2 rounded"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Email
          </label>
          <input
            type="email"
            value={user.email}
            disabled
            className="w-full border border-gray-300 px-4 py-2 rounded"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
        >
          Submit Application
        </button>
      </form>
    </div>
  );
};

export default ApplyPage;
