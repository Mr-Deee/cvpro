"use client";

import React from "react";
import { useState } from "react";
type WorkExperience = {
  companyName: string;
  jobTitle: string;
  description: string;
  fromDate: string;
  toDate: string;
};

export default function FloatingButtonDialog() {
  const [showDialog, setShowDialog] = useState(false);
  const [selectedOption, setSelectedOption] = React.useState("");
  const [workExperiences, setWorkExperiences] = useState<WorkExperience[]>([]);
  const [savedEntries, setSavedEntries] = useState<WorkExperience[]>([]);
  // const [workExperiences, setWorkExperiences] = useState([
  //   { companyName: "", jobTitle: "", description: "", fromDate: "", toDate: "" },
  // ]);


  const openDialog = () => setShowDialog(true);
  const closeDialog = () => setShowDialog(false);


  const addWorkExperience = () => {
    setWorkExperiences([
      ...workExperiences,
      { companyName: "", jobTitle: "", description: "", fromDate: "", toDate: "" },
    ]);
  };

  const updateWorkExperience = (
    index: number,
    field: keyof typeof workExperiences[0],
    value: string
  ) => {
    setWorkExperiences((prev) =>
      prev.map((work, i) =>
        i === index ? { ...work, [field]: value } : work
      )
    );
  };
  const removeWorkExperience = (index: number) => {
    setWorkExperiences(workExperiences.filter((_, i) => i !== index));
  };

  const saveEntries = () => {
    setSavedEntries(workExperiences); // No more TypeScript error!
    closeDialog();
  };


  return (
    <div>
      {/* Floating Button */}
      <button
        onClick={openDialog}
        className="fixed bottom-4 right-4 bg-blue-500 text-white w-12 h-12 rounded-full shadow-lg flex items-center justify-center text-2xl hover:bg-blue-600 transition"
      >
        +
      </button>

      {/* Dialog Box */}
      {showDialog && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          onClick={closeDialog}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg w-80 text-black"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside dialog
          >
            <div className="flex justify-center mb-4">
              {/* Dropdown at the top center */}
              <select
                className="border border-gray-300 rounded px-4 py-2"
                onChange={(e) => setSelectedOption(e.target.value)}
                value={selectedOption}
              >
                <option value="" className="text-black-700">
                  Select Option
                </option>
                <option value="Header" className="text-black">
                  Header
                </option>
                <option value="WorkExperience">Work Experience</option>

                <option
                  value="Education"
                  className="text-gray-400 bg-gray-50 hover:bg-blue-100"
                >
                  Education
                </option>
                <option value="otherContent">Show Other Content</option>
              </select>
            </div>

            {/* Conditional Content */}
            {selectedOption === "Header" && (
              <div>
                <p className="text-black">Enter Full Name</p>
                <input
                  type="text"
                  className="border border-gray-300 rounded w-full px-4 py-2 mb-4 text-black"
                  placeholder="Enter some text"
                />
                <p className="text-black"> Enter E-mail</p>

                <input
                  type="text"
                  className="border border-gray-300 rounded w-full px-4 py-2 mb-4 text-black"
                  placeholder="Enter some text"
                />
              </div>
            )}
            {selectedOption === "Education" && (
              <input
                type="text"
                className="border border-gray-300 rounded w-full px-4 py-2 mb-4"
                placeholder="Enter some text"
              />
            )}

            {selectedOption === "WorkExperience" && (
              <div>
                {workExperiences.map((work, index) => (
                  <div
                    key={index}
                    className="mb-6 border-b border-gray-200 pb-6"
                  >
                    {/* Company Name */}
                    <input
                      type="text"
                      className="border border-gray-300 rounded w-full px-4 py-2 mb-4"
                      placeholder="Company Name"
                      value={work.companyName}
                      onChange={(e) =>
                        updateWorkExperience(
                          index,
                          "companyName",
                          e.target.value
                        )
                      }
                    />

                    {/* Job Title */}
                    <input
                      type="text"
                      className="border border-gray-300 rounded w-full px-4 py-2 mb-4"
                      placeholder="Job Title"
                      value={work.jobTitle}
                      onChange={(e) =>
                        updateWorkExperience(index, "jobTitle", e.target.value)
                      }
                    />

                    {/* Description */}
                    <textarea
                      className="border border-gray-300 rounded w-full px-4 py-2 mb-4"
                      placeholder="Description (use bullet points)"
                      value={work.description}
                      onChange={(e) =>
                        updateWorkExperience(
                          index,
                          "description",
                          e.target.value
                        )
                      }
                    />

                    {/* Dates */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-gray-700 mb-2">From:</p>
                        <input
                          type="date"
                          className="border border-gray-300 rounded w-full px-4 py-2 mb-4"
                          value={work.fromDate}
                          onChange={(e) =>
                            updateWorkExperience(
                              index,
                              "fromDate",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div>
                        <p className="text-gray-700 mb-2">To:</p>
                        <input
                          type="date"
                          className="border border-gray-300 rounded w-full px-4 py-2 mb-4"
                          value={work.toDate}
                          onChange={(e) =>
                            updateWorkExperience(
                              index,
                              "toDate",
                              e.target.value
                            )
                          }
                        />
                      </div>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeWorkExperience(index)}
                      className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
                    >
                      -
                    </button>
                  </div>
                ))}

                {/* Add Work Experience Button */}
                <button
                  onClick={addWorkExperience}
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition mt-4"
                >
                  +
                </button>
              </div>
            )}

            {selectedOption === "otherContent" && (
              <p className="text-gray-700 mb-4">
                This is the other content displayed.
              </p>
            )}

            <button
              onClick={saveEntries}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
            >
              Add
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
