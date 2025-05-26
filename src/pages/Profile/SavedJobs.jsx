import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const SavedJobs = () => {
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // লোকালস্টোরেজ থেকে সেভড জবস লোড করা
  useEffect(() => {
    const storedJobs = JSON.parse(localStorage.getItem("savedJobs")) || [];
    setSavedJobs(storedJobs);
    setLoading(false);
  }, []);

  // সেভড জব ডিলিট করার ফাংশন
  const handleRemove = (jobId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedJobs = savedJobs.filter((job) => job._id !== jobId);
        setSavedJobs(updatedJobs);
        localStorage.setItem("savedJobs", JSON.stringify(updatedJobs));

        Swal.fire("Removed!", "Your job has been removed.", "success");
      }
    });
  };

  if (loading) {
    return <div className="text-center">Loading saved jobs...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Saved Jobs</h1>

      {savedJobs.length === 0 ? (
        <p className="text-gray-500">You have no saved jobs.</p>
      ) : (
        <ul className="space-y-4">
          {savedJobs.map((job) => (
            <li
              key={job._id}
              className="p-4 border border-gray-200 rounded-lg shadow-sm flex justify-between items-center"
            >
              <div>
                <h2 className="text-lg font-semibold">{job.title}</h2>
                
                <p className="text-sm text-gray-600">{job.location || "Unknown Location"}</p>
                {/* আপনি চাইলে আরও ডিটেইলস এখানে দেখাতে পারেন */}
              </div>
              <button
                onClick={() => handleRemove(job._id)}
                className="text-red-500 hover:underline"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SavedJobs;
