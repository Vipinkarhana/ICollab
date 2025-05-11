import React, { useState } from 'react';
import RequestCard from './RequestCard'; 

const dummyPeople = [
  { id: 1, name: 'John Doe', role: 'Frontend Developer' },
  { id: 2, name: 'Jane Smith', role: 'Backend Developer' },
  { id: 3, name: 'Rahul Verma', role: 'Backend Developer' },
  { id: 4, name: 'Neha Singh', role: 'Product Manager' },
  { id: 5, name: 'Vikram Patil', role: 'DevOps Engineer' },
  { id: 6, name: 'Ayesha Khan', role: 'Full Stack Developer' },
  { id: 7, name: 'Ravi Joshi', role: 'Data Scientist' },
  { id: 8, name: 'Sneha Reddy', role: 'Mobile App Developer' },
  { id: 9, name: 'Aman Kapoor', role: 'QA Engineer' },
];

function Request() {
  const [showAll, setShowAll] = useState(false);
  // const [collabStatus, setCollabStatus] = useState({
  //   1: "Pending",
  //   2: "Pending",
  // });

  const toggleShowAll = () => {
    setShowAll((prev) => !prev);
  };

  // const handleCollabClick = (id) => {
  //   console.log(`Clicked on collab for id: ${id}`);
  //   // Update status logic here if needed
  // };

  
  const visiblePeople = showAll ? dummyPeople : dummyPeople.slice(0, 6);

  return (
    <div>
      <div className="w-full bg-white border border-gray-300 rounded-md">
        <div className="h-24 w-full border-b border-gray-300 flex items-center justify-between px-4">
          <p className="text-2xl font-semibold">Your Requests</p>
          <button
            onClick={toggleShowAll}
            className="text-blue-600 hover:underline font-medium text-lg"
          >
            {showAll ? "Show Less" : "Show All"}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {visiblePeople.map((person) => (
            <RequestCard
              key={person.id}
              person={person}
              // collabStatus={collabStatus}
              // onClick={handleCollabClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Request;
