"use client";
import Image from "next/image";
import FloatingButtonDialog from "./components/floatingbutton";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type WorkExperience = {
  companyName: string;
  jobTitle: string;
  description: string;
  fromDate: string;
  toDate: string;
};

type PHeader = {
  Location: string;
  fullname: string;
  email: string;
  github: string;
  telephone: string;
  portfolio: string;
};

export default function Home() {
  const searchParams = useSearchParams();
  const [entries, setEntries] = useState<WorkExperience[]>([]);
  const [entries2, setEntries2] = useState<PHeader[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editedEntry, setEditedEntry] = useState(entries[0]);

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setEditedEntry(entries[index]); // Set current entry to editable
  };

useEffect(() => {
  const queryEntries = searchParams.get("entries");
  const queryEntries2 = searchParams.get("entries2");

  if (queryEntries) setEntries(JSON.parse(queryEntries));
  if (queryEntries2) setEntries2(JSON.parse(queryEntries2));
}, [searchParams]);



  return (
    <div className=" items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <FloatingButtonDialog />

      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        {entries2.map((head, index) => (
          <div>
            <div
              key={index}
              className="flex justify-between items-start mb-6 border-b pb-4 last:border-b-0"
            >
              {/* Left Section */}
              <div className="w-1/3">
                <h3 className="text-lg font-semibold text-gray-900">
                  {head.fullname}
                </h3>
                <p className="text-gray-600 italic">{head.github}</p>
                <p className="text-gray-500 mt-1">
                  {/* {work.fromDate} - {work.toDate} */}
                </p>
              </div>
            </div>
          </div>
        ))}

        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl mx-auto my-10">
          <h2 className="text-3xl font-bold mb-8 text-gray-900"></h2>

          {/* Experience Section */}
          <h2 className="text-3xl font-bold mb-8 text-gray-900">Experience</h2>
          {entries.map((work, index) => (
            <div
              key={index}
              className="flex justify-between items-start mb-6 border-b pb-4 last:border-b-0"
              onClick={() => handleEdit(index)} // Enable edit on click
            >
              {editingIndex === index ? (
                // Editable Mode
                <div className="w-full flex flex-col gap-4">
                  <input
                    type="text"
                    value={editedEntry.companyName}
                    onChange={(e) =>
                      setEditedEntry({
                        ...editedEntry,
                        companyName: e.target.value,
                      })
                    }
                    className="border border-gray-300 rounded w-full px-4 py-2"
                    placeholder="Company Name"
                  />
                  <input
                    type="text"
                    value={editedEntry.jobTitle}
                    onChange={(e) =>
                      setEditedEntry({
                        ...editedEntry,
                        jobTitle: e.target.value,
                      })
                    }
                    className="border border-gray-300 rounded w-full px-4 py-2"
                    placeholder="Job Title"
                  />
                  <input
                    type="text"
                    value={editedEntry.fromDate}
                    onChange={(e) =>
                      setEditedEntry({
                        ...editedEntry,
                        fromDate: e.target.value,
                      })
                    }
                    className="border border-gray-300 rounded w-full px-4 py-2"
                    placeholder="From Date"
                  />
                  <input
                    type="text"
                    value={editedEntry.toDate}
                    onChange={(e) =>
                      setEditedEntry({ ...editedEntry, toDate: e.target.value })
                    }
                    className="border border-gray-300 rounded w-full px-4 py-2"
                    placeholder="To Date"
                  />
                  <textarea
                    value={editedEntry.description}
                    onChange={(e) =>
                      setEditedEntry({
                        ...editedEntry,
                        description: e.target.value,
                      })
                    }
                    className="border border-gray-300 rounded w-full px-4 py-2"
                    placeholder="Description"
                  ></textarea>
                  <button
                    // onClick={() => handleSave(index)}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <>
                  {/* Left Section */}
                  <div className="w-1/3">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {work.companyName}
                    </h3>
                    <p className="text-gray-600 italic">{work.jobTitle}</p>
                    <p className="text-gray-500 mt-1">
                      {work.fromDate} - {work.toDate}
                    </p>
                  </div>

                  {/* Right Section */}
                  <div className="w-2/3 pl-6">
                    <p className="text-gray-800">{work.description}</p>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// {PHeaders.map((work, index) => (
//   <div
//     key={index}
//     className="mb-6 border-b border-gray-200 pb-6"
//   >
//     {/* Full Name */}
//     <input
//       type="text"
//       className="border border-gray-300 rounded w-full px-4 py-2 mb-4"
//       placeholder="Full Name"
//       value={work.fullname}
//       onChange={(e) =>
//         updatepheader(index, "fullname", e.target.value)
//       }
//     />

//     {/* Location */}
//     <input
//       type="text"
//       className="border border-gray-300 rounded w-full px-4 py-2 mb-4"
//       placeholder="Location"
//       value={work.Location}
//       onChange={(e) =>
//         updatepheader(index, "Location", e.target.value)
//       }
//     />

//     {/* Email */}
//     <input
//       type="text"
//       className="border border-gray-300 rounded w-full px-4 py-2 mb-4"
//       placeholder="Email"
//       value={work.email}
//       onChange={(e) =>
//         updatepheader(index, "email", e.target.value)
//       }
//     />

//     {/* GitHub */}
//     <input
//       type="text"
//       className="border border-gray-300 rounded w-full px-4 py-2 mb-4"
//       placeholder="GitHub"
//       value={work.github}
//       onChange={(e) =>
//         updatepheader(index, "github", e.target.value)
//       }
//     />
//   </div>

//
