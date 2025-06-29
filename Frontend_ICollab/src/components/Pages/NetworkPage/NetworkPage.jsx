import React from "react";
import MyNetwork from "./MyNetwork";
import SuggestedNetwork from "./SuggestedNetwork";
import ProfileCard from "../HomePage/LeftDiv/ProfileCard";
import { Users } from "lucide-react";
import CollaborationRequest from "./CollaborationRequest";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCollaborationRequests } from "../../../Redux/Slices/NetworkSlice";
import Request from "./Request";

function NetworkPage() {
  const dispatch = useDispatch();

  const { data: collaborationRequests, loading} = useSelector((state) => state.network?.collaborationRequests);

  useEffect(() => {
    dispatch(fetchCollaborationRequests());
  },[dispatch]);

  return (
    <div className="w-full h-auto mt-20 py-1 flex flex-col lg:flex-row justify-center gap-4 px-4">
      {/* Left Sidebar (Profile Card and Collaboration Requests) */}
      <div className="w-full lg:w-[23%] flex flex-col items-center gap-4 lg:gap-6 lg:px-2">
        <div className="hidden lg:block w-full">
          <ProfileCard />
        </div>
        <div className="w-full bg-white border border-gray-300 rounded-md">
          <div className="h-14 w-full border-b border-gray-300 flex items-center justify-between px-4">
            <p className="text-lg font-semibold">Collaboration Requests</p>
            <div className="relative">
              <Users size={28} />
              {collaborationRequests?.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs p-1 px-2 rounded-full">
                  {collaborationRequests?.length}
                </span>
              )}
            </div>
          </div>
          <div className="h-auto w-full flex flex-col gap-3 overflow-auto">
            {collaborationRequests?.length > 0 ? (
              collaborationRequests?.map((request) => (
                <CollaborationRequest
                  key={request?.id}
                  profilepic={request?.sender?.profile_pic
                  }
                  name={request?.sender?.name}
                  designation={request?.sender?.designation}
                  username={request?.sender?.username}
                />
              ))
            ) : (
              <div className="text-center text-gray-500 p-4">
                No collaboration requests
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content (My Network and Suggested Network) */}
      <div className="w-full lg:w-[55%] flex flex-col gap-6">
        <Request />
        <MyNetwork />
        <SuggestedNetwork />
      </div>
    </div>
  );
}

export default NetworkPage;
