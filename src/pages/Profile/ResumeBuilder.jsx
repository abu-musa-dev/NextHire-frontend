import React, { useState } from "react";

const ResumeBuilder = () => {
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
    setForm({ ...form, experience: [...form.experience, { jobTitle: "", companyName: "", startDate: "", endDate: "", responsibilities: "" }] });
  };

  const handleExperienceChange = (e, index) => {
    const { name, value } = e.target;
    const newExperience = [...form.experience];
    newExperience[index][name] = value;
    setForm({ ...form, experience: newExperience });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate link generation after form submission
    const generatedUrl = `https://resume-builder.com/${Math.random().toString(36).substring(7)}`;
    setGeneratedLink(generatedUrl);
  };

  return (
    <div className="p-8 max-w-2xl mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-semibold text-center mb-6">Resume Builder</h2>

      {/* Personal Information */}
      <div className="space-y-4 mb-6">
        <div>
          <label className="block font-medium">Full Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            placeholder="John Doe"
          />
        </div>

        <div>
          <label className="block font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            placeholder="john.doe@example.com"
          />
        </div>

        <div>
          <label className="block font-medium">Phone</label>
          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            placeholder="123-456-7890"
          />
        </div>

        <div>
          <label className="block font-medium">Location</label>
          <input
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            placeholder="City, Country"
          />
        </div>
      </div>

      {/* Objective */}
      <div className="mb-6">
        <label className="block font-medium">Objective</label>
        <textarea
          name="objective"
          value={form.objective}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
          placeholder="Write your objective here..."
        />
      </div>

      {/* Skills */}
      <div className="mb-6">
        <label className="block font-medium">Skills</label>
        <input
          type="text"
          name="skills"
          value={form.skills.join(",")}
          onChange={handleSkillsChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
          placeholder="JavaScript, React, Node.js"
        />
      </div>

      {/* Experience */}
      <div className="mb-6">
        <label className="block font-medium">Experience</label>
        {form.experience.map((exp, index) => (
          <div key={index} className="space-y-3 mb-3">
            <input
              type="text"
              name="jobTitle"
              value={exp.jobTitle}
              onChange={(e) => handleExperienceChange(e, index)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              placeholder="Job Title"
            />
            <input
              type="text"
              name="companyName"
              value={exp.companyName}
              onChange={(e) => handleExperienceChange(e, index)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              placeholder="Company Name"
            />
            <input
              type="text"
              name="startDate"
              value={exp.startDate}
              onChange={(e) => handleExperienceChange(e, index)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              placeholder="Start Date"
            />
            <input
              type="text"
              name="endDate"
              value={exp.endDate}
              onChange={(e) => handleExperienceChange(e, index)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              placeholder="End Date"
            />
            <textarea
              name="responsibilities"
              value={exp.responsibilities}
              onChange={(e) => handleExperienceChange(e, index)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              placeholder="Responsibilities"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddExperience}
          className="text-blue-500 hover:underline"
        >
          Add Experience
        </button>
      </div>

      {/* Submit */}
      <button
        onClick={handleSubmit}
        className="w-full py-3 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition duration-200"
      >
        Generate Resume
      </button>

      {/* Display Generated Resume Link */}
      {generatedLink && (
        <div className="mt-6 text-center">
          <p>Your resume has been generated! You can view it here:</p>
          <a
            href={generatedLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            {generatedLink}
          </a>
        </div>
      )}
    </div>
  );
};

export default ResumeBuilder;
