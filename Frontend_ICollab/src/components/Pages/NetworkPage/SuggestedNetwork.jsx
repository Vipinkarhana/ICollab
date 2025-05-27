import { useState, useEffect } from 'react';
import { suggestedNetwork } from '../../../Services/networkService';
import SuggestedNetworkCard from './SuggestedNetworkCard';

function SuggestedNetwork() {
  const [people, setPeople] = useState([]);

  const [showAll, setShowAll] = useState(false);
  const [collabStatus, setCollabStatus] = useState({});

  const toggleShowAll = () => setShowAll(!showAll);

  const visiblePeople = showAll ? people : people.slice(0, 6);

  // Function to handle button click
  const handleCollabClick = (personId) => {
    setCollabStatus((prevStatus) => ({
      ...prevStatus,
      [personId]: 'Pending',
    }));
  };

  useEffect(() => {
    const fetchNetworkData = async () => {
      try {
        const response = await suggestedNetwork();
        if (response.status === "success") {
          setPeople(response?.data);
        }
      } catch (error) {
        console.error("Error fetching network data:", error);
      }
    };
    fetchNetworkData();
  }, []);

  return (
    <div className="p-6 rounded-md w-full h-auto bg-white border border-gray-300">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Suggested Network</h2>
        <button
          onClick={toggleShowAll}
          className="text-blue-600 hover:underline font-medium text-lg"
        >
          {showAll ? "Show Less" : "Show All"}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {visiblePeople.map((person, index) => (
          <SuggestedNetworkCard key={person.id} person={person} collabStatus={collabStatus} onClick={handleCollabClick} />
        ))}

      </div>
    </div>
  );
}

export default SuggestedNetwork;
