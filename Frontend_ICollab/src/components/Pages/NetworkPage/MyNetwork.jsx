import React, { useState, useEffect } from "react";
import NetworkCard from "./NetworkCard";
import { userNetwork } from "../../../Services/networkService"; // Adjust the import path as necessary

const MyNetwork = () => {
  const [showAll, setShowAll] = useState(false);
  const [myNetwork, setmyNetwork] = useState([]);

  useEffect(() => {
    const fetchNetworkData = async () => {
      try {
        const response = await userNetwork();
        if (response.status === "success") {
          setmyNetwork(response.data);
        }
      } catch (error) {
        console.error("Error fetching network data:", error);
      }
    };
    fetchNetworkData();
  }, []);

  const toggleShowAll = () => setShowAll(!showAll);
  const visiblemyNetwork = showAll ? myNetwork : myNetwork.slice(0, 6);

  return (
    <>
      {myNetwork.length > 0 && (
        <div className="p-6 rounded-md w-full h-auto bg-white border border-gray-300">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Your Collaborators</h2>
            {myNetwork.length > 6 && (
              <button
                onClick={toggleShowAll}
                className="text-blue-600 hover:underline font-medium"
              >
                {showAll ? "Show Less" : "Show All"}
              </button>
            )}
          </div>

          {/* Responsive Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {visiblemyNetwork.map((person) => (
              <NetworkCard key={person.id} person={person} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default MyNetwork;
