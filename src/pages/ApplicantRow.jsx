// components/ApplicantRow.jsx
import React from "react";

const ApplicantRow = ({ id, name, jobTitle, email, status, resumeLink, onStatusChange }) => {
  console.log(name)
  const handleChange = (e) => {
    onStatusChange(id, e.target.value);
  };

  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="py-3 px-4">{name}</td>
      <td className="py-3 px-4">{jobTitle}</td>
      <td className="py-3 px-4">{email}</td>
      <td className="py-3 px-4">
        <select
          className="border rounded px-2 py-1"
          value={status}
          onChange={handleChange}
        >
          <option value="Pending">Pending</option>
          <option value="Reviewed">Reviewed</option>
          <option value="Shortlisted">Shortlisted</option>
          <option value="Rejected">Rejected</option>
        </select>
      </td>
      <td className="py-3 px-4">
        {resumeLink ? (
          <a
            href={resumeLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            View Resume
          </a>
        ) : (
          "N/A"
        )}
      </td>
    </tr>
  );
};

export default ApplicantRow;
