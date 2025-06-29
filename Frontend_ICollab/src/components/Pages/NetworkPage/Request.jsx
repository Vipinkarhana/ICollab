import React, { useState, useEffect } from 'react';
import RequestCard from './RequestCard';
import { myCollabRequest } from '../../../Services/networkService';
import { fetchMyRequests } from '../../../Redux/Slices/NetworkSlice';
import { useSelector, useDispatch } from 'react-redux';

function Request() {
  const [showAll, setShowAll] = useState(false);
  const dispatch = useDispatch();

  const { data: request, loading } = useSelector((state) => state.network?.myCollabRequest);

  useEffect(() => {
    dispatch(fetchMyRequests());
  },[dispatch]);

  const toggleShowAll = () => {
    setShowAll((prev) => !prev);
  };

  const visibleRequest = showAll ? request : request?.slice(0, 6);

  return (
    <>
      {request?.length > 0 && (
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
            {visibleRequest.map((person) => (
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
