"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type WorkExperience = {
  companyName: string;
  jobTitle: string;
  description: string;
  fromDate: string;
  toDate: string;
};

export default function SavedEntries() {
  const searchParams = useSearchParams();
  const [entries, setEntries] = useState<WorkExperience[]>([]);

  useEffect(() => {
    // Get 'entries' from query params
    const queryEntries = searchParams.get("entries");
    if (queryEntries) {
      setEntries(JSON.parse(queryEntries));
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-2xl font-bold mb-6">Saved Work Experiences</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl">
        {entries.map((work, index) => (
          <div key={index} className="mb-6">
            <h3 className="text-lg font-semibold">{work.companyName}</h3>
            <p className="text-gray-600">{work.jobTitle}</p>
            <p className="text-gray-800">{work.description}</p>
            <p className="text-gray-500">
              {work.fromDate} - {work.toDate}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
