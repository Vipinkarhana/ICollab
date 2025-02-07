import React from "react";
import { Pencil } from "lucide-react";
import Experience from "../Experiences/Experience";

const experiences = [
  {
    id: 1,
    title: "Software Engineer Intern",
    company: "Ineuron.ai",
    duration: "June 2023 - Sept 2023",
    description:
      "Worked on a soil farming agent project, implementing AI-based solutions for farmers.",
    logo: "https://ineuron.ai/images/ineuron-logo.ico",
  },
  {
    id: 2,
    title: "MERN Stack Developer",
    company: "Freelance",
    duration: "Oct 2023 - Present",
    description:
      "Developed multiple full-stack applications using React, Node.js, Express, and MongoDB.",
    logo: "https://www.google.com/favicon.ico",
  },
  {
    id: 3,
    title: "Event Organizer",
    company: "CodeClashes",
    duration: "Jan 2024 - Feb 2024",
    description:
      "Organized a competitive programming event for multiple branches, engaging 100+ students.",
    logo: "https://static.licdn.com/sc/h/1bt1uwvian5lj4o3bflq8sprj",
  },
];

function Experiences() {
  return (
    <div className="w-full h-auto rounded-md bg-gray-200 border border-gray-400">
      <div className="h-12 w-full flex justify-between items-center py-2 px-4 border-b border-gray-400 text-gray-800">
        <div className="text-2xl font-semibold">
          <p>Experiences</p>
        </div>
        <div className="w-8 flex items-center justify-center">
          <button className="rounded-full hover:bg-slate-300 p-2">
            <Pencil size={24} />
          </button>
        </div>
      </div>
      <div className="h-auto py-2 px-2 flex flex-col gap-3">
        {experiences.map((exp) => (
          <Experience key={exp.id} experience={exp} />
        ))}
      </div>
    </div>
  );
}

export default Experiences;
