import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { Loader2 } from "lucide-react";
import { useDarkMode } from "../../context/DarkModeContext";

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const auth = getAuth();
  const { darkMode } = useDarkMode(); // make sure this is "darkMode", not "isDarkMode"

  const fetchApplications = async () => {
    const user = auth.currentUser;

    if (!user || !user.email) {
      setMessage("You are not logged in.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`https://next-haire-backend-now.vercel.app/applications?email=${user.email}`);
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
    <div
      className={`min-h-screen py-12 px-4 transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      <div
        className={`max-w-3xl mx-auto mb-10 p-6 rounded-2xl border shadow-xl transition-all duration-300 ${
          darkMode ? "bg-gray-900 border-gray-700 text-white" : "bg-white border-gray-200 text-gray-800"
        }`}
      >
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Your Applications
        </h2>

        {message && (
          <div className="text-center mb-4 text-red-500 font-medium">{message}</div>
        )}

        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2
              className={`animate-spin h-6 w-6 ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            />
          </div>
        ) : applications.length === 0 ? (
          <p className={`text-center ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
            No applications found.
          </p>
        ) : (
          <div className="space-y-5">
            {applications.map((app) => (
              <div
                key={app._id}
                className={`border rounded-xl p-5 shadow-sm transition-all duration-200 ${
                  darkMode
                    ? "bg-gray-800 hover:bg-gray-700 border-gray-700 text-white"
                    : "bg-gray-50 hover:bg-gray-100 border-gray-200 text-gray-800"
                }`}
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-bold">{app.jobTitle}</h3>
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

                <div className={`text-sm space-y-1 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                  <p><strong>Name:</strong> {app.applicantName}</p>
                  <p><strong>Email:</strong> {app.applicantEmail}</p>
                  <p>
                    <strong>Link:</strong>{" "}
                    <a
                      href={app.link}
                      target="_blank"
                      rel="noreferrer"
                      className={`underline font-medium ${
                        darkMode
                          ? "text-green-400 hover:text-green-300"
                          : "text-blue-600 hover:text-blue-800"
                      }`}
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
    </div>
  );
};

export default Applications;
