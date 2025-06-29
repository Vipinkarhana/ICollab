import { useState, useEffect } from 'react';
import SuggestedNetworkCard from './SuggestedNetworkCard';
import { fetchSuggestedNetwork } from '../../../Redux/Slices/NetworkSlice';
import { useSelector, useDispatch } from 'react-redux';

function SuggestedNetwork() {
  const [showAll, setShowAll] = useState(false);
  const [collabStatus, setCollabStatus] = useState({});
  const dispatch = useDispatch();

  const { data: suggestedNetwork, loading } = useSelector((state) => state.network?.suggestedNetwork);

  const toggleShowAll = () => setShowAll(!showAll);

  const visibleNetwork = showAll ? suggestedNetwork : suggestedNetwork?.slice(0, 6);

  const handleCollabClick = (personId) => {
    setCollabStatus((prevStatus) => ({
      ...prevStatus,
      [personId]: 'Pending',
    }));
  };

  useEffect(() => {
    dispatch(fetchSuggestedNetwork());
  }, [dispatch]);

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
        {visibleNetwork?.map((person, index) => (
          <SuggestedNetworkCard
            key={person.id}
            person={person}
            collabStatus={collabStatus}
            onClick={handleCollabClick}
          />
        ))}
      </div>
    </div>
  );
}

export default SuggestedNetwork;
