import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";
import axios from "axios";

const Reports = () => {
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
        // ✅ ফেক ডাটা fallback
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

  const COLORS = ["#4CAF50", "#FFC107", "#F44336"]; // Active, Paused, Closed color

  return (
    <div className="p-6 bg-white shadow-md rounded-2xl">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
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
            fill="#8884d8"
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend verticalAlign="bottom" />
        </PieChart>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">
          Job Status Summary
        </h3>
        <ul className="list-disc pl-6 text-gray-600 space-y-1 text-sm">
          <li>✅ Active Jobs: {jobStats.active}</li>
          <li>⏸️ Paused Jobs: {jobStats.paused}</li>
          <li>❌ Closed Jobs: {jobStats.closed}</li>
        </ul>
      </div>
    </div>
  );
};

export default Reports;
