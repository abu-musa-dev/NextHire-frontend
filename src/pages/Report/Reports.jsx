import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";
import axios from "axios";
import { useDarkMode } from "../../context/DarkModeContext";

const Reports = () => {
  const { isDarkMode } = useDarkMode();
  const [jobStats, setJobStats] = useState({ active: 0, paused: 0, closed: 0 });

  useEffect(() => {
    const fetchJobStats = async () => {
      try {
        const res = await axios.get("http://localhost:5000/jobs/stats", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (res.data && typeof res.data === "object") {
          setJobStats(res.data);
        } else {
          throw new Error("Invalid data format");
        }
      } catch (error) {
        console.error("Error fetching job statistics:", error);
        setJobStats({
          active: 10,
          paused: 4,
          closed: 6,
        });
      }
    };

    fetchJobStats();
  }, []);

  const data = [
    { name: "Active", value: jobStats.active },
    { name: "Paused", value: jobStats.paused },
    { name: "Closed", value: jobStats.closed },
  ];

  const COLORS = ["#4CAF50", "#FFC107", "#F44336"]; // Green, Yellow, Red

  return (
    <div
      className={`min-h-screen py-10 px-4 transition-colors duration-300 ${
        isDarkMode ? "bg-gray-950 text-gray-100" : "bg-gray-50 text-gray-900"
      }`}
    >
      <div
        className={`max-w-4xl mx-auto p-6 rounded-2xl shadow-md border transition-colors duration-300 ${
          isDarkMode ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"
        }`}
      >
        <h2
          className={`text-2xl font-extrabold mb-6 text-center ${
            isDarkMode ? "text-gray-100" : "text-gray-900"
          }`}
        >
          📊 Job Status Breakdown
        </h2>

        <div className="flex justify-center">
          <PieChart width={400} height={400}>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={120}
              label={{
                fill: isDarkMode ? "#e2e8f0" : "#1a202c",
                fontWeight: "700",
              }}
              labelLine={false}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: isDarkMode ? "#2d3748" : "#fff",
                color: isDarkMode ? "#fff" : "#000",
                border: isDarkMode ? "1px solid #4a5568" : "1px solid #e2e8f0",
                borderRadius: "8px",
              }}
            />
            <Legend
              verticalAlign="bottom"
              wrapperStyle={{ color: isDarkMode ? "#e2e8f0" : "#1a202c", fontWeight: "700" }}
            />
          </PieChart>
        </div>

        <div className="mt-6">
          <h3
            className={`text-lg font-bold mb-2 text-center ${
              isDarkMode ? "text-gray-100" : "text-gray-900"
            }`}
          >
            Job Status Summary
          </h3>
          <ul
            className={`list-disc pl-6 space-y-1 text-sm ${
              isDarkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            <li>✅ Active Jobs: {jobStats.active}</li>
            <li>⏸️ Paused Jobs: {jobStats.paused}</li>
            <li>❌ Closed Jobs: {jobStats.closed}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Reports;
