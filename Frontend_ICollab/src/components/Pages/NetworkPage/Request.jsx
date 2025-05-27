import React, { useState, useEffect } from 'react';
import RequestCard from './RequestCard';
import { myCollabRequest } from '../../../Services/networkService';

function Request() {
  const [showAll, setShowAll] = useState(false);
  const [people, setPeople] = useState([]);

  useEffect(() => {
    const fetchMyRequests = async () => {
      try {
        const response = await myCollabRequest();
        if (response.status === "success") {
          setPeople(response.data);
        }
      } catch (error) {
        console.error("Error fetching network data:", error);
      }
    };

    fetchMyRequests();
  }, []);

  const toggleShowAll = () => {
    setShowAll((prev) => !prev);
  };

  const visiblePeople = showAll ? people : people?.slice(0, 6);

  return (
    <>
      {people?.length > 0 && (
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
                key={person?.id}
                person={person?.reciever}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default Request;
