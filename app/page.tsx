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
  telephone?: string;
  portfolio?: string;
};

export default function Home() {
  const searchParams = useSearchParams();
  const [entries, setEntries] = useState<WorkExperience[]>([]);
  const [entries2, setEntries2] = useState<PHeader[]>([
    {
      fullname: "",
      Location: "",
      email: "",
      github: "",
      telephone: "",
      portfolio: "",
    },
  ]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editedEntry, setEditedEntry] = useState<WorkExperience | null>(null);

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setEditedEntry(entries[index]); // Set current entry to editable
  };

  useEffect(() => {
    const queryEntries = searchParams.get("entries");
    const queryEntries2 = searchParams.get("entries2");

    try {
      if (queryEntries) setEntries(JSON.parse(queryEntries));
      if (queryEntries2) setEntries2(JSON.parse(queryEntries2));
    } catch (error) {
      console.error("Failed to parse entries:", error);
    }
  }, [searchParams]);

  return (
    <div className="items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <FloatingButtonDialog
        onSave={(header: PHeader, workExperience: WorkExperience[]) => {
          setEntries2([header]); // Update header
          setEntries(workExperience); // Update work experience
        }}
      />

      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        {/* Render Header */}
        {entries2.map((head, index) => (
          <div key={index} className="mb-4">
            <h1 className="text-xl font-bold">{head.fullname || "Full Name"}</h1>
            <p>{head.email || "Email not provided"}</p>
            <p>{head.github || "GitHub not provided"}</p>
            <p>{head.Location || "Location not provided"}</p>
            <p>{head.telephone || "Telephone not provided"}</p>
            <p>{head.portfolio || "Portfolio not provided"}</p>
          </div>
        ))}

        {/* Render Experience Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl mx-auto my-10">
          <h2 className="text-3xl font-bold mb-8 text-gray-900">Experience</h2>
          {entries.map((work, index) => (
            <div
              key={index}
              className="flex justify-between items-start mb-6 border-b pb-4 last:border-b-0"
              onClick={() => handleEdit(index)} // Enable edit on click
            >
              {editingIndex === index && editedEntry ? (
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
                      setEditedEntry({
                        ...editedEntry,
                        toDate: e.target.value,
                      })
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
                    onClick={() => {
                      const updatedEntries = [...entries];
                      if (editingIndex !== null && editedEntry) {
                        updatedEntries[editingIndex] = editedEntry;
                        setEntries(updatedEntries);
                        setEditingIndex(null);
                      }
                    }}
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
