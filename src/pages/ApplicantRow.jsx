import React from "react";

const ApplicantRow = ({ id, name, jobTitle, email, status, onStatusChange, resumeLink }) => {
  return (
    <tr>
      <td className="py-2">{name}</td>
      <td className="py-2">{jobTitle}</td>
      <td className="py-2">{email}</td>
      <td className="py-2">
        <select
          value={status}
          onChange={(e) => onStatusChange(id, e.target.value)}
          className="border px-2 py-1 rounded"
        >
          <option value="Pending">Pending</option>
          <option value="Accepted">Accepted</option>
          <option value="Rejected">Rejected</option>
        </select>
      </td>
      <td className="py-2">
        {resumeLink ? (
          <a href={resumeLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
            View Resume
          </a>
        ) : (
          "No Resume"
        )}
      </td>
    </tr>
  );
};

export default ApplicantRow;
