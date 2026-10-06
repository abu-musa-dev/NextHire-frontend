import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  FiHeart, 
  FiMapPin, 
  FiClock, 
  FiDollarSign, 
  FiBriefcase, 
  FiSearch,
  FiArrowRight,
  FiChevronLeft,
  FiChevronRight
} from "react-icons/fi";
import { FaHeart, FaCrown } from "react-icons/fa";
import Swal from "sweetalert2";
import { useDarkMode } from "../../context/DarkModeContext";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [wishlist, setWishlist] = useState([]);
  
  // Pagination State 
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 10;

  const navigate = useNavigate();
  const { darkMode } = useDarkMode();

  // SweetAlert Toast Notification Setup
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    background: darkMode ? "#1f2937" : "#ffffff",
    color: darkMode ? "#f3f4f6" : "#111827",
  });

  useEffect(() => {
    setLoading(true);
    fetch("https://next-haire-backend-now.vercel.app/jobs")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setJobs(data);
          setFilteredJobs(data);
        } else {
          setJobs([]);
          setFilteredJobs([]);
        }
      })
      .catch(() => {
        setJobs([]);
        setFilteredJobs([]);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    setWishlist(storedWishlist);
  }, []);

  // Search Filter Handler
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = jobs.filter(
      (job) =>
        job.title?.toLowerCase().includes(term) ||
        job.company?.toLowerCase().includes(term) ||
        job.location?.toLowerCase().includes(term)
    );
    setFilteredJobs(filtered);
    setCurrentPage(1); 
  };

  const toggleWishlist = (job) => {
    let updatedWishlist = [...wishlist];
    let savedJobs = JSON.parse(localStorage.getItem("savedJobs") || "[]");

    if (wishlist.includes(job._id)) {
      updatedWishlist = updatedWishlist.filter((id) => id !== job._id);
      savedJobs = savedJobs.filter((savedJob) => savedJob._id !== job._id);

      Toast.fire({
        icon: "info",
        title: "Removed from saved jobs",
      });
    } else {
      updatedWishlist.push(job._id);
      savedJobs.push(job);

      Toast.fire({
        icon: "success",
        title: "Added to saved jobs!",
      });
    }

    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    localStorage.setItem("savedJobs", JSON.stringify(savedJobs));
  };

  const handleApplyClick = (job) => {
    if (job.status === "Paused" || job.status === "Closed") {
      Toast.fire({
        icon: "warning",
        title: "This job is not accepting applications right now.",
      });
    } else {
      navigate(`/apply/${job._id}`);
    }
  };

  // Pagination Calculations
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      className={`min-h-screen py-12 px-4 sm:px-6 lg:px-12 transition-colors duration-300 ${
        darkMode ? "bg-[#0B0F19] text-gray-100" : "bg-slate-50 text-gray-900"
      }`}
    >
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-green-500/10 text-[#22c55e] border border-green-500/20">
            Find Your Dream Career
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            Explore Available <span className="text-[#22c55e]">Opportunities</span>
          </h1>
          <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400">
            Discover top-tier roles curated from high-growth startups and tech leaders.
          </p>

          {/* Search Bar */}
          <div className="relative pt-2">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
            <input
              type="text"
              placeholder="Search by job title, company, or location..."
              value={searchTerm}
              onChange={handleSearch}
              className={`w-full pl-11 pr-4 py-3 rounded-xl border text-sm transition focus:outline-none focus:ring-2 focus:ring-[#22c55e] ${
                darkMode
                  ? "bg-gray-800/80 border-gray-700 text-white placeholder-gray-500"
                  : "bg-white border-gray-200 text-gray-800 placeholder-gray-400 shadow-sm"
              }`}
            />
          </div>
        </div>

        {/* Loading State: Skeleton List */}
        {loading ? (
          <div className="flex flex-col gap-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className={`p-5 rounded-2xl border animate-pulse flex flex-col md:flex-row items-center justify-between gap-4 ${
                  darkMode ? "bg-gray-800/40 border-gray-800" : "bg-white border-gray-200"
                }`}
              >
                <div className="flex items-center gap-4 w-full md:w-2/3">
                  <div className="w-14 h-14 bg-gray-300 dark:bg-gray-700 rounded-xl shrink-0" />
                  <div className="space-y-2 w-full">
                    <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-1/2" />
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/3" />
                  </div>
                </div>
                <div className="h-10 w-full md:w-32 bg-gray-300 dark:bg-gray-700 rounded-xl" />
              </div>
            ))}
          </div>
        ) : filteredJobs.length === 0 ? (
          /* Empty State */
          <div className="text-center py-16 space-y-3">
            <p className="text-4xl">🔍</p>
            <h3 className="text-xl font-bold">No jobs found</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Try searching with a different keyword or check back later.
            </p>
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-4">
              {currentJobs.map((job) => {
                const isInWishlist = wishlist.includes(job._id);
                const isClosed = job.status === "Paused" || job.status === "Closed";

                const daysLeft = job.deadline
                  ? Math.max(
                      0,
                      Math.ceil(
                        (new Date(job.deadline).getTime() - Date.now()) /
                          (1000 * 60 * 60 * 24)
                      )
                    )
                  : null;

                return (
                  <div
                    key={job._id}
                    className={`group flex flex-col md:flex-row items-start md:items-center justify-between p-5 md:p-6 rounded-2xl border transition-all duration-300 hover:shadow-lg hover:border-[#22c55e]/60 gap-5 ${
                      darkMode
                        ? "bg-gray-800/50 border-gray-700/60 hover:bg-gray-800/80"
                        : "bg-white border-gray-200/90 shadow-sm hover:shadow-[#22c55e]/10"
                    }`}
                  >
                    {/* Left: Logo & Details */}
                    <div className="flex items-start gap-4 flex-1">
                      {/* Logo */}
                      {job.logoUrl ? (
                        <div className="h-14 w-14 shrink-0 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-white p-1 flex items-center justify-center">
                          <img
                            src={job.logoUrl}
                            alt={`${job.company} Logo`}
                            className="h-full w-full object-contain"
                          />
                        </div>
                      ) : (
                        <div className="h-14 w-14 shrink-0 rounded-xl bg-gradient-to-tr from-[#22c55e] to-emerald-400 text-white flex items-center justify-center font-bold text-xl shadow-sm">
                          {job.company ? job.company.charAt(0).toUpperCase() : "J"}
                        </div>
                      )}

                      {/* Content Info */}
                      <div className="space-y-1.5 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h2 className="text-lg md:text-xl font-bold group-hover:text-[#22c55e] transition-colors">
                            {job.title}
                          </h2>
                          <span className="p-1 rounded-md bg-amber-500/10 text-amber-500 border border-amber-500/20 text-xs">
                            <FaCrown />
                          </span>
                        </div>

                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          {job.company || "Confidential Company"}
                        </p>

                        {/* Badges / Tags */}
                        <div className="flex flex-wrap items-center gap-2 pt-1">
                          {job.location && (
                            <span className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-md bg-green-500/10 text-[#22c55e] border border-green-500/20">
                              <FiMapPin className="w-3 h-3" />
                              {job.location}
                            </span>
                          )}

                          {job.type && (
                            <span className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                              <FiBriefcase className="w-3 h-3" />
                              {job.type}
                            </span>
                          )}

                          {job.salary && (
                            <span className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-md bg-green-500/10 text-[#22c55e] border border-green-500/20">
                              <FiDollarSign className="w-3 h-3" />
                              ${job.salary}/mo
                            </span>
                          )}

                          {job.price && (
                            <span className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                              ৳{job.price}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Right: Deadline, Status, Wishlist & Apply */}
                    <div className="flex flex-col sm:flex-row md:flex-col items-start sm:items-center md:items-end justify-between w-full md:w-auto gap-4 pt-3 md:pt-0 border-t md:border-t-0 border-gray-100 dark:border-gray-700/60 shrink-0">
                      {/* Deadline & Status */}
                      <div className="flex items-center gap-3 text-xs font-medium text-gray-400">
                        {daysLeft !== null ? (
                          <span className="inline-flex items-center gap-1">
                            <FiClock className="w-3.5 h-3.5 text-amber-500" />
                            <span className={daysLeft <= 3 ? "text-red-500 font-semibold" : ""}>
                              {daysLeft === 0 ? "Expires today" : `${daysLeft} days left`}
                            </span>
                          </span>
                        ) : (
                          <span>Actively hiring</span>
                        )}
                        <span className={`capitalize font-semibold ${isClosed ? "text-red-500" : "text-[#22c55e]"}`}>
                          ● {isClosed ? "Closed" : "Open"}
                        </span>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-2 w-full sm:w-auto">
                        <button
                          onClick={() => toggleWishlist(job)}
                          className={`p-2.5 rounded-xl border transition shrink-0 ${
                            isInWishlist
                              ? "bg-red-500/10 border-red-500/30 text-red-500"
                              : darkMode
                              ? "bg-gray-700/50 border-gray-600 text-gray-400 hover:text-red-400"
                              : "bg-gray-50 border-gray-200 text-gray-500 hover:text-red-500"
                          }`}
                          aria-label={isInWishlist ? "Remove from saved" : "Save job"}
                        >
                          {isInWishlist ? (
                            <FaHeart className="w-4 h-4 text-red-500" />
                          ) : (
                            <FiHeart className="w-4 h-4" />
                          )}
                        </button>

                        <button
                          onClick={() => handleApplyClick(job)}
                          disabled={isClosed}
                          className={`flex-1 sm:flex-none py-2.5 px-6 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition duration-200 shadow-sm ${
                            isClosed
                              ? "bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed"
                              : "bg-[#22c55e] hover:bg-green-600 text-white shadow-green-500/20 active:scale-[0.98]"
                          }`}
                        >
                          {isClosed ? "Unavailable" : "Apply Now"}
                          {!isClosed && <FiArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 pt-8">
                {/* Prev Button */}
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`p-2.5 rounded-xl border flex items-center justify-center transition ${
                    currentPage === 1
                      ? "opacity-40 cursor-not-allowed"
                      : darkMode
                      ? "hover:bg-gray-800 border-gray-700 text-gray-200"
                      : "hover:bg-gray-100 border-gray-200 text-gray-700"
                  }`}
                  aria-label="Previous Page"
                >
                  <FiChevronLeft className="w-5 h-5" />
                </button>

                {/* Page Number Buttons */}
                {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`w-10 h-10 rounded-xl font-semibold text-sm transition ${
                      currentPage === pageNum
                        ? "bg-[#22c55e] text-white shadow-md shadow-green-500/20"
                        : darkMode
                        ? "text-gray-300 hover:bg-gray-800 border border-gray-700"
                        : "text-gray-700 hover:bg-gray-100 border border-gray-200"
                    }`}
                  >
                    {pageNum}
                  </button>
                ))}

                {/* Next Button */}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`p-2.5 rounded-xl border flex items-center justify-center transition ${
                    currentPage === totalPages
                      ? "opacity-40 cursor-not-allowed"
                      : darkMode
                      ? "hover:bg-gray-800 border-gray-700 text-gray-200"
                      : "hover:bg-gray-100 border-gray-200 text-gray-700"
                  }`}
                  aria-label="Next Page"
                >
                  <FiChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Jobs;