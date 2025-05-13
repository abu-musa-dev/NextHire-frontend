import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const [message, setMessage] = useState("");
  const auth = getAuth();

  // 🔄 Data fetch function
  const fetchApplications = async () => {
    const user = auth.currentUser;

    if (!user || !user.email) {
      setMessage("User not logged in");
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/applications?email=${user.email}`);
      if (!res.ok) throw new Error("Fetch failed");
      const data = await res.json();
      setApplications(data);
      setMessage("");
    } catch {
      setMessage("Failed to fetch applications");
      setApplications([]);
    }
  };

  // ⏱️ Initial load & auto-refresh every 10 seconds
  useEffect(() => {
    fetchApplications(); // Initial fetch

    const interval = setInterval(() => {
      fetchApplications(); // Repeat fetch every 10s
    }, 10000);

    return () => clearInterval(interval); // Cleanup
  }, [auth]);

  return (
    <div className="max-w-xl mx-auto p-4 mt-10 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">Your Applications</h2>

      {message && <p className="text-center mb-3 text-red-500">{message}</p>}

      {applications.length === 0 ? (
        <p className="text-center">No applications found.</p>
      ) : (
        <ul className="space-y-3">
          {applications.map((app) => (
            <li key={app._id} className="border p-3 rounded shadow">
              <p><strong>Job Title:</strong> {app.jobTitle}</p>
              <p><strong>Applicant Name:</strong> {app.applicantName}</p>
              <p><strong>Email:</strong> {app.applicantEmail}</p>
              <p>
                <strong>Link:</strong>{" "}
                <a href={app.link} target="_blank" rel="noreferrer" className="text-blue-600 underline">
                  {app.link}
                </a>
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={`font-semibold ${
                    app.status === "Accepted"
                      ? "text-green-600"
                      : app.status === "Rejected"
                      ? "text-red-600"
                      : "text-yellow-600"
                  }`}
                >
                  {app.status || "Pending"}
                </span>
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Applications;
