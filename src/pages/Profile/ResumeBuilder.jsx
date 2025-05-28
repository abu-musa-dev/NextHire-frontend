import React, { useState } from "react";
import { useDarkMode } from "../../context/DarkModeContext"; // import context

const ResumeBuilder = () => {
  const { darkMode } = useDarkMode(); // Make sure this matches the context
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    objective: "",
    skills: [],
    experience: [],
  });

  const [generatedLink, setGeneratedLink] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSkillsChange = (e) => {
    const { value } = e.target;
    setForm({ ...form, skills: value.split(",") });
  };

  const handleAddExperience = () => {
    setForm({
      ...form,
      experience: [
        ...form.experience,
        {
          jobTitle: "",
          companyName: "",
          startDate: "",
          endDate: "",
          responsibilities: "",
        },
      ],
    });
  };

  const handleExperienceChange = (e, index) => {
    const { name, value } = e.target;
    const newExperience = [...form.experience];
    newExperience[index][name] = value;
    setForm({ ...form, experience: newExperience });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const generatedUrl = `https://resume-builder.com/${Math.random().toString(36).substring(7)}`;
    setGeneratedLink(generatedUrl);
  };

  const inputClass = `w-full px-4 py-2 border rounded-md transition duration-200 ${
    darkMode
      ? "bg-gray-800 border-gray-600 text-white placeholder-gray-400"
      : "bg-white border-gray-300 text-gray-800"
  }`;

  return (
    <div
      className={`min-h-screen py-10 px-4 transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      <div
        className={`p-8 max-w-2xl mx-auto rounded-lg shadow-md transition-all ${
          darkMode ? "bg-gray-900 text-white border border-gray-700" : "bg-white text-gray-800 border border-gray-200"
        }`}
      >
        <h2 className="text-3xl font-semibold text-center mb-6">Resume Builder</h2>

        {/* Personal Info */}
        <div className="space-y-4 mb-6">
          {["name", "email", "phone", "location"].map((field) => (
            <div key={field}>
              <label className="block font-medium capitalize mb-1">{field}</label>
              <input
                type={field === "email" ? "email" : "text"}
                name={field}
                value={form[field]}
                onChange={handleChange}
                className={inputClass}
                placeholder={
                  field === "name"
                    ? "John Doe"
                    : field === "email"
                    ? "john@example.com"
                    : ""
                }
              />
            </div>
          ))}
        </div>

        {/* Objective */}
        <div className="mb-6">
          <label className="block font-medium mb-1">Objective</label>
          <textarea
            name="objective"
            value={form.objective}
            onChange={handleChange}
            className={inputClass}
            placeholder="Write your objective here..."
          />
        </div>

        {/* Skills */}
        <div className="mb-6">
          <label className="block font-medium mb-1">Skills</label>
          <input
            type="text"
            name="skills"
            value={form.skills.join(",")}
            onChange={handleSkillsChange}
            className={inputClass}
            placeholder="JavaScript, React, Node.js"
          />
        </div>

        {/* Experience */}
        <div className="mb-6">
          <label className="block font-medium mb-2">Experience</label>
          {form.experience.map((exp, index) => (
            <div key={index} className="space-y-3 mb-4">
              {["jobTitle", "companyName", "startDate", "endDate"].map((field) => (
                <input
                  key={field}
                  type="text"
                  name={field}
                  value={exp[field]}
                  onChange={(e) => handleExperienceChange(e, index)}
                  className={inputClass}
                  placeholder={field.replace(/([A-Z])/g, " $1")}
                />
              ))}
              <textarea
                name="responsibilities"
                value={exp.responsibilities}
                onChange={(e) => handleExperienceChange(e, index)}
                className={inputClass}
                placeholder="Responsibilities"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddExperience}
            className={`text-sm font-medium ${
              darkMode
                ? "text-green-400 hover:text-green-300"
                : "text-blue-500 hover:text-blue-700"
            }`}
          >
            + Add Experience
          </button>
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          className={`w-full py-3 font-semibold rounded-md transition duration-200 ${
            darkMode
              ? "bg-green-600 hover:bg-green-500 text-white"
              : "bg-green-600 hover:bg-green-700 text-white"
          }`}
        >
          Generate Resume
        </button>

        {/* Generated Link */}
        {generatedLink && (
          <div className="mt-6 text-center">
            <p>Your resume has been generated! You can view it here:</p>
            <a
              href={generatedLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`underline ${
                darkMode
                  ? "text-green-300 hover:text-green-200"
                  : "text-blue-500 hover:text-blue-700"
              }`}
            >
              {generatedLink}
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeBuilder;
