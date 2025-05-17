import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { Loader2 } from "lucide-react";

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const auth = getAuth();

  const fetchApplications = async () => {
    const user = auth.currentUser;

    if (!user || !user.email) {
      setMessage("You are not logged in.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/applications?email=${user.email}`);
      if (!res.ok) throw new Error("Fetch failed");
      const data = await res.json();
      setApplications(data);
      setMessage("");
    } catch {
      setMessage("Failed to fetch applications.");
      setApplications([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
    const interval = setInterval(fetchApplications, 10000);
    return () => clearInterval(interval);
  }, [auth]);

  return (
    <div className="max-w-3xl mx-auto p-6 mt-12 bg-white shadow-xl rounded-2xl border border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        Your Applications
      </h2>

      {message && (
        <div className="text-center mb-4 text-red-600 font-medium">{message}</div>
      )}

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="animate-spin h-6 w-6 text-gray-500" />
        </div>
      ) : applications.length === 0 ? (
        <p className="text-center text-gray-500">No applications found.</p>
      ) : (
        <div className="space-y-5">
          {applications.map((app) => (
            <div
              key={app._id}
              className="bg-gray-50 hover:bg-gray-100 transition-all duration-200 border rounded-xl p-5 shadow-sm"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-bold text-gray-700">{app.jobTitle}</h3>
                <span
                  className={`text-sm font-medium px-3 py-1 rounded-full ${
                    app.status === "Accepted"
                      ? "bg-green-100 text-green-700"
                      : app.status === "Rejected"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {app.status || "Pending"}
                </span>
              </div>

              <div className="text-sm text-gray-600 space-y-1">
                <p><strong>Name:</strong> {app.applicantName}</p>
                <p><strong>Email:</strong> {app.applicantEmail}</p>
                <p>
                  <strong>Link:</strong>{" "}
                  <a
                    href={app.link}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 underline hover:text-blue-800"
                  >
                    View Submission
                  </a>
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Applications;
