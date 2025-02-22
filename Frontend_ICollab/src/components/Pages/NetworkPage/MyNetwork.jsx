import React, { useState } from "react";
import NetworkCard from "./NetworkCard";
import ProfilePic from "/ProfilePic.png";

// Array of people
const people = [
  { id: 1, name: "John Dews", role: "Research Scholar", img: ProfilePic },
  { id: 2, name: "Chanchal Singh", role: "HR Professional", img: ProfilePic },
  { id: 3, name: "Chanchal Singh", role: "HR Professional", img: ProfilePic },
  { id: 4, name: "Chanchal Singh", role: "HR Professional", img: ProfilePic },
  { id: 5, name: "Chanchal Singh", role: "HR Professional", img: ProfilePic },
  { id: 6, name: "Chanchal Singh", role: "HR Professional", img: ProfilePic },
  { id: 7, name: "New User", role: "Software Engineer", img: ProfilePic },
  { id: 8, name: "Another User", role: "Data Scientist", img: ProfilePic },
];

const MyNetwork = () => {
  const [showAll, setShowAll] = useState(false);

  // Toggle showAll state
  const toggleShowAll = () => setShowAll(!showAll);

  // Logic to decide how many people to show
  const visiblePeople = showAll ? people : people.slice(0, 6);

  return (
    <div className="p-6 rounded-md w-full h-auto">
      {/* Show All button moved to MyNetwork */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">People you may know</h2>
        <button
          onClick={toggleShowAll}
          className="text-blue-600 hover:underline"
        >
          {showAll ? "Show Less" : "Show All"}
        </button>
      </div>

      {/* Mapping over the visiblePeople */}
      <div className="grid grid-cols-3 grid-rows-2 gap-4 h-auto">
        {visiblePeople.map((person) => (
          <NetworkCard
            key={person.id}
            person={person} // Passing individual person data to NetworkCard
          />
        ))}
      </div>
    </div>
  );
};

export default MyNetwork;
