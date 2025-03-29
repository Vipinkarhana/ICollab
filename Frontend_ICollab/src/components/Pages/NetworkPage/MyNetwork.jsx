import React, { useState } from "react";
import NetworkCard from "./NetworkCard";
import ProfilePic from "/ProfilePic.png";

// Array of people
const people = [
  { id: 1, name: "John Dews", role: "Research Scholar", img: ProfilePic, description: "John is a research scholar with an interest in AI." },
  { id: 2, name: "Chanchal Singh", role: "HR Professional", img: ProfilePic, description: "Chanchal is an HR professional with 10+ years of experience." },
  { id: 3, name: "Chanchal Singh", role: "HR Professional", img: ProfilePic, description: "Chanchal is an HR professional with 10+ years of experience." },
  { id: 4, name: "Chanchal Singh", role: "HR Professional", img: ProfilePic, description: "Chanchal is an HR professional with 10+ years of experience." },
  { id: 5, name: "Chanchal Singh", role: "HR Professional", img: ProfilePic, description: "Chanchal is an HR professional with 10+ years of experience." },
  { id: 6, name: "Chanchal Singh", role: "HR Professional", img: ProfilePic, description: "Chanchal is an HR professional with 10+ years of experience." },
  { id: 7, name: "New User", role: "Software Engineer", img: ProfilePic, description: "New user in software engineering, enthusiastic about developing web apps." },
  { id: 8, name: "Another User", role: "Data Scientist", img: ProfilePic, description: "Data scientist focused on machine learning and analytics." },
  { id: 9, name: "Another User", role: "Data Scientist", img: ProfilePic, description: "Data scientist focused on machine learning and analytics." },
  { id: 10, name: "Another User", role: "Data Scientist", img: ProfilePic, description: "Data scientist focused on machine learning and analytics." },
  { id: 11, name: "Another User", role: "Data Scientist", img: ProfilePic, description: "Data scientist focused on machine learning and analytics." },
  { id: 12, name: "Another User", role: "Data Scientist", img: ProfilePic, description: "Data scientist focused on machine learning and analytics." },
  { id: 13, name: "Another User", role: "Data Scientist", img: ProfilePic, description: "Data scientist focused on machine learning and analytics." },
  { id: 14, name: "Another User", role: "Data Scientist", img: ProfilePic, description: "Data scientist focused on machine learning and analytics." },
  { id: 15, name: "Another User", role: "Data Scientist", img: ProfilePic, description: "Data scientist focused on machine learning and analytics." },
];

const MyNetwork = () => {
  const [showAll, setShowAll] = useState(false);

  const toggleShowAll = () => setShowAll(!showAll);

  const visiblePeople = showAll ? people : people.slice(0, 6);

  return (
    <div className="p-6 rounded-md w-full h-auto bg-white border border-gray-300">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Your Collaborators</h2>
        <button
          onClick={toggleShowAll}
          className="text-blue-600 hover:underline font-medium"
        >
          {showAll ? "Show Less" : "Show All"}
        </button>
      </div>

      {/* Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {visiblePeople.map((person) => (
          <NetworkCard key={person.id} person={person} />
        ))}
      </div>
    </div>
  );
};

export default MyNetwork;
