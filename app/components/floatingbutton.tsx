"use client";

import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";

type PHeader = {
  Location: string;
  fullname: string;
  email: string;
  github: string;
  // telephone: string;
  // portfolio: string;
};

type WorkExperience = {
  jobTitle: string;
  companyName: string;
  description: string;
  fromDate: string;
  toDate: string;
};

export default function FloatingButtonDialog() {
  const [showDialog, setShowDialog] = useState(false);
  const [selectedOption, setSelectedOption] = React.useState("");
  const [PHeaders, setPheader] = useState<PHeader[]>([]);

  // State for the PHeader

  const [workExperiences, setWorkExperiences] = useState<WorkExperience[]>([]);

  // const [newEntry, setNewEntry] = useState({
  //   fullname: "",
  //   Location: "",
  //   email: "",
  //   github: "",
  // });



  const [newEntry, setNewEntry] = useState<PHeader>({
    fullname: "",
    Location: "",
    email: "",
    github: "",
   // telephone:"",
    //portfolio:""
  });

  const [savedEntries, setSavedEntries] = useState<WorkExperience[]>([]);
  const [savedEntries1, setSavedEntries1] = useState<PHeader[]>([]);

  // const [workExperiences, setWorkExperiences] = useState([
  //   { companyName: "", jobTitle: "", description: "", fromDate: "", toDate: "" },
  // ]);

  const router = useRouter();

  const openDialog = () => setShowDialog(true);
  const closeDialog = () => setShowDialog(false);

  const addWorkExperience = () => {
    setWorkExperiences([
      ...workExperiences,
      {
        companyName: "",
        jobTitle: "",
        description: "",
        fromDate: "",
        toDate: "",
      },
    ]);
  };

  const updatepheader = (
    index: number,
    field: keyof (typeof PHeaders)[0],
    value: string
  ) => {
    setPheader((prev) =>
      prev.map((head, i) => (i === index ? { ...head, [field]: value } : head))
    );
  };

  const updateWorkExperience = (
    index: number,
    field: keyof (typeof workExperiences)[0],
    value: string
  ) => {
    setWorkExperiences((prev) =>
      prev.map((work, i) => (i === index ? { ...work, [field]: value } : work))
    );
  };

  const removeWorkExperience = (index: number) => {
    setWorkExperiences(workExperiences.filter((_, i) => i !== index));
  };

  const saveEntries1 = () => {
    setSavedEntries1(PHeaders); // No more TypeScript error!
    // Construct the query string
    const queryString1 = new URLSearchParams({
      entries: JSON.stringify(PHeaders),
    }).toString();

    router.push(`/?${queryString1}`);

    closeDialog();
  };

  const saveEntries = () => {
    setSavedEntries(workExperiences); // No more TypeScript error!
    // Construct the query string
    const queryString = new URLSearchParams({
      entries: JSON.stringify(workExperiences),
    }).toString();

    router.push(`/?${queryString}`);

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
                <option value="PHeader">CV Header</option>

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
            {selectedOption === "PHeader" && (
  <div>
    {PHeaders.length === 0 ? (
      <div>
        <div className="mb-6 border-b border-gray-200 pb-6">
          <input
            type="text"
            className="border border-gray-300 rounded w-full px-4 py-2 mb-4"
            placeholder="Full Name"
            value={newEntry.fullname}
            onChange={(e) =>
              setNewEntry({ ...newEntry, fullname: e.target.value })
            }
          />
          <input
            type="text"
            className="border border-gray-300 rounded w-full px-4 py-2 mb-4"
            placeholder="Location"
            value={newEntry.Location}
            onChange={(e) =>
              setNewEntry({ ...newEntry, Location: e.target.value })
            }
          />
          <input
            type="text"
            className="border border-gray-300 rounded w-full px-4 py-2 mb-4"
            placeholder="Email"
            value={newEntry.email}
            onChange={(e) =>
              setNewEntry({ ...newEntry, email: e.target.value })
            }
          />
          <input
            type="text"
            className="border border-gray-300 rounded w-full px-4 py-2 mb-4"
            placeholder="GitHub"
            value={newEntry.github}
            onChange={(e) =>
              setNewEntry({ ...newEntry, github: e.target.value })
            }
          />
       <button
  className="bg-blue-500 text-white px-4 py-2 rounded"
  onClick={() => {

    saveEntries1
    // if (
    //   newEntry.fullname &&
    //   newEntry.Location &&
    //   newEntry.email &&
    //   newEntry.github
    // ) {
    //   setPheader([...PHeaders, newEntry]); // Update headers

    //   // Navigate to another page with query parameters
    //   router.push(
    //     `/?fullname=${encodeURIComponent(
    //       newEntry.fullname
    //     )}&location=${encodeURIComponent(
    //       newEntry.Location
    //     )}&email=${encodeURIComponent(
    //       newEntry.email
    //     )}&github=${encodeURIComponent(newEntry.github)}`
    //   );
    
  }}
>
  Add
</button>
        </div>
      </div>
    ) : (
      PHeaders.map((head, index) => (
        <div key={index} className="mb-6 border-b border-gray-200 pb-6">
          <input
            type="text"
            className="border border-gray-300 rounded w-full px-4 py-2 mb-4"
            placeholder="Full Name"
            value={head.fullname}
            onChange={(e) =>
              updatepheader(index, "fullname", e.target.value)
            }
          />
          <input
            type="text"
            className="border border-gray-300 rounded w-full px-4 py-2 mb-4"
            placeholder="Location"
            value={head.Location}
            onChange={(e) =>
              updatepheader(index, "Location", e.target.value)
            }
          />
          <input
            type="text"
            className="border border-gray-300 rounded w-full px-4 py-2 mb-4"
            placeholder="Email"
            value={head.email}
            onChange={(e) =>
              updatepheader(index, "email", e.target.value)
            }
          />
          <input
            type="text"
            className="border border-gray-300 rounded w-full px-4 py-2 mb-4"
            placeholder="GitHub"
            value={head.github}
            onChange={(e) =>
              updatepheader(index, "github", e.target.value)
            }
          />
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={() => {
              const updatedPHeaders = PHeaders.filter((_, i) => i !== index);
              setPheader(updatedPHeaders);
              saveEntries1();
            }}
          >
            Remove
          </button>
        </div>
      ))
    )}
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
                {/* Default Work Experience Form */}
                {workExperiences.length === 0 && (
                  <div className="mb-6 border-b border-gray-200 pb-6">
                    {/* Company Name */}
                    <input
                      type="text"
                      className="border border-gray-300 rounded w-full px-4 py-2 mb-4"
                      placeholder="Company Name"
                      value={""} // Default empty value
                      onChange={(e) =>
                        setWorkExperiences([
                          ...workExperiences,
                          {
                            companyName: e.target.value,
                            jobTitle: "",
                            description: "",
                            fromDate: "",
                            toDate: "",
                          },
                        ])
                      }
                    />

                    {/* Job Title */}
                    <input
                      type="text"
                      className="border border-gray-300 rounded w-full px-4 py-2 mb-4"
                      placeholder="Job Title"
                      value={""} // Default empty value
                      disabled
                    />

                    {/* Description */}
                    <textarea
                      className="border border-gray-300 rounded w-full px-4 py-2 mb-4"
                      placeholder="Description (use bullet points)"
                      value={""} // Default empty value
                      disabled
                    />

                    {/* Dates */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-gray-700 mb-2">From:</p>
                        <input
                          type="date"
                          className="border border-gray-300 rounded w-full px-4 py-2 mb-4"
                          value={""} // Default empty value
                          disabled
                        />
                      </div>
                      <div>
                        <p className="text-gray-700 mb-2">To:</p>
                        <input
                          type="date"
                          className="border border-gray-300 rounded w-full px-4 py-2 mb-4"
                          value={""} // Default empty value
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Existing Work Experiences */}
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

                <button
                  onClick={saveEntries}
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
                >
                  Add
                </button>
              </div>
            )}

            {selectedOption === "otherContent" && (
              <p className="text-gray-700 mb-4">
                This is the other content displayed.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
