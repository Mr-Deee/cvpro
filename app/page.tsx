"use client"
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
  fullname:string;
  email:string;
  github: string;
  telephone: string;
  portfolio: string;      
};

export default function Home() {


   const searchParams = useSearchParams();
      const [entries, setEntries] = useState<WorkExperience[]>([]);
      const [entries2, setEntries2] = useState<PHeader[]>([]);

      useEffect(() => {
        // Get 'entries' from query params
        const queryEntries = searchParams.get("entries");
        if (queryEntries) {
          setEntries(JSON.parse(queryEntries));
        }

        const queryEntries2 = searchParams.get("entries2");
        if (queryEntries2) {
          setEntries(JSON.parse(queryEntries2));
        }

      }, [searchParams]);
  return (
    <div className=" items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
     
  <FloatingButtonDialog/>

  <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">





  <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl mx-auto my-10">

  <h2 className="text-3xl font-bold mb-8 text-gray-900"></h2>
    {}

    {/* Experience Section */}
    <h2 className="text-3xl font-bold mb-8 text-gray-900">Experience</h2>
    {entries.map((work, index) => (
      <div
        key={index}
        className="flex justify-between items-start mb-6 border-b pb-4 last:border-b-0"
      >
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
      </div>
    ))}
  </div>
</div>

    
    </div>
  );
}
