"use client";

import React, { useState } from "react";

type PHeader = {
  fullname: string;
  Location: string;
  email: string;
  github: string;
};

type WorkExperience = {
  jobTitle: string;
  companyName: string;
  description: string;
  fromDate: string;
  toDate: string;
};

type Skills = {
  skillName: string;
  level: string; // e.g., Beginner, Intermediate, Advanced
};

type Education = {
  schoolName: string;
  degree: string;
  fieldOfStudy: string;
  graduationYear: string;
};

export default function FloatingButtonDialog({
  onSave,
}: {
  onSave: (
    header: PHeader,
    workExperience: WorkExperience[],
    skills: Skills[],
    education: Education[]
  ) => void;
}) {
  const [showDialog, setShowDialog] = useState(false);
  const [selectedSection, setSelectedSection] = useState<string>("Header");
  const [newHeader, setNewHeader] = useState<PHeader>({
    fullname: "",
    Location: "",
    email: "",
    github: "",
  });
  const [workExperiences, setWorkExperiences] = useState<WorkExperience[]>([]);
  const [skills, setSkills] = useState<Skills[]>([]);
  const [education, setEducation] = useState<Education[]>([]);

  const openDialog = () => setShowDialog(true);
  const closeDialog = () => setShowDialog(false);

  const saveData = () => {
    onSave(newHeader, workExperiences, skills, education);
    closeDialog();
  };

  const renderForm = () => {
    switch (selectedSection) {
      case "Header":
        return (
          <div>
            <h4 className="text-lg font-semibold mb-2">Header</h4>
            <input
              type="text"
              className="border rounded w-full px-4 py-2 mb-2"
              placeholder="Full Name"
              value={newHeader.fullname}
              onChange={(e) =>
                setNewHeader({ ...newHeader, fullname: e.target.value })
              }
            />
            <input
              type="text"
              className="border rounded w-full px-4 py-2 mb-2"
              placeholder="Location"
              value={newHeader.Location}
              onChange={(e) =>
                setNewHeader({ ...newHeader, Location: e.target.value })
              }
            />
            <input
              type="email"
              className="border rounded w-full px-4 py-2 mb-2"
              placeholder="Email"
              value={newHeader.email}
              onChange={(e) =>
                setNewHeader({ ...newHeader, email: e.target.value })
              }
            />
            <input
              type="text"
              className="border rounded w-full px-4 py-2"
              placeholder="GitHub"
              value={newHeader.github}
              onChange={(e) =>
                setNewHeader({ ...newHeader, github: e.target.value })
              }
            />
          </div>
        );
      case "Work Experience":
        return (
          <div>
            <h4 className="text-lg font-semibold mb-2">Work Experience</h4>
            {workExperiences.map((work, index) => (
              <div key={index} className="mb-4">
                <input
                  type="text"
                  className="border rounded w-full px-4 py-2 mb-2"
                  placeholder="Job Title"
                  value={work.jobTitle}
                  onChange={(e) =>
                    setWorkExperiences((prev) =>
                      prev.map((w, i) =>
                        i === index ? { ...w, jobTitle: e.target.value } : w
                      )
                    )
                  }
                />
                <input
                  type="text"
                  className="border rounded w-full px-4 py-2 mb-2"
                  placeholder="Company Name"
                  value={work.companyName}
                  onChange={(e) =>
                    setWorkExperiences((prev) =>
                      prev.map((w, i) =>
                        i === index ? { ...w, companyName: e.target.value } : w
                      )
                    )
                  }
                />
                <textarea
                  className="border rounded w-full px-4 py-2 mb-2"
                  placeholder="Description"
                  value={work.description}
                  onChange={(e) =>
                    setWorkExperiences((prev) =>
                      prev.map((w, i) =>
                        i === index ? { ...w, description: e.target.value } : w
                      )
                    )
                  }
                />
                <input
                  type="date"
                  className="border rounded w-full px-4 py-2 mb-2"
                  placeholder="From Date"
                  value={work.fromDate}
                  onChange={(e) =>
                    setWorkExperiences((prev) =>
                      prev.map((w, i) =>
                        i === index ? { ...w, fromDate: e.target.value } : w
                      )
                    )
                  }
                />
                <input
                  type="date"
                  className="border rounded w-full px-4 py-2"
                  placeholder="To Date"
                  value={work.toDate}
                  onChange={(e) =>
                    setWorkExperiences((prev) =>
                      prev.map((w, i) =>
                        i === index ? { ...w, toDate: e.target.value } : w
                      )
                    )
                  }
                />
              </div>
            ))}
            <button
              onClick={() =>
                setWorkExperiences([
                  ...workExperiences,
                  {
                    jobTitle: "",
                    companyName: "",
                    description: "",
                    fromDate: "",
                    toDate: "",
                  },
                ])
              }
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded mb-4"
            >
              Add Work Experience
            </button>
          </div>
        );
      case "Skills":
        return (
          <div>
            <h4 className="text-lg font-semibold mb-2">Skills</h4>
            {/* Implement Skills form */}
          </div>
        );
      case "Education":
        return (
          <div>
            <h4 className="text-lg font-semibold mb-2">Education</h4>
            {/* Implement Education form */}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <button
        onClick={openDialog}
        className="fixed bottom-4 right-4 bg-blue-500 text-white w-12 h-12 rounded-full shadow-lg flex items-center justify-center text-2xl hover:bg-blue-600 transition"
      >
        +
      </button>

      {showDialog && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          onClick={closeDialog}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg w-96"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold mb-4">Add CV Details</h3>

            <select
              className="border rounded w-full px-4 py-2 mb-4"
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
            >
              <option value="Header">Header</option>
              <option value="Work Experience">Work Experience</option>
              <option value="Skills">Skills</option>
              <option value="Education">Education</option>
            </select>

            {renderForm()}

            <button
              onClick={saveData}
              className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
