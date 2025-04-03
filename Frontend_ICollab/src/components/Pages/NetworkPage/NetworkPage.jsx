import React from "react";
import MyNetwork from "./MyNetwork";
import SuggestedNetwork from "./SuggestedNetwork";
import ProfileCard from "../HomePage/LeftDiv/ProfileCard";
import { Users } from "lucide-react";
import CollaborationRequest from "./CollaborationRequest";

// Dummy data for collaboration requests
const collaborationRequests = [
  // { id: 1, profilepic: "https://via.placeholder.com/50", name: "Tanmay Sharma", designation: "Software Engineer" },
  // { id: 2, profilepic: "https://via.placeholder.com/50", name: "Jane Smith", designation: "UI/UX Designer" },
  // { id: 3, profilepic: "https://via.placeholder.com/50", name: "Michael Johnson", designation: "Data Scientist" },
  // { id: 4, profilepic: "https://via.placeholder.com/50", name: "Alice Williams", designation: "Business Analyst" },
  // { id: 5, profilepic: "https://via.placeholder.com/50", name: "Chris Evans", designation: "Project Manager" },
  // { id: 6, profilepic: "https://via.placeholder.com/50", name: "Emma Watson", designation: "Marketing Specialist" },
  // { id: 7, profilepic: "https://via.placeholder.com/50", name: "Robert Downey", designation: "DevOps Engineer" },
  // { id: 8, profilepic: "https://via.placeholder.com/50", name: "Scarlett Johansson", designation: "Product Manager" },
  // { id: 9, profilepic: "https://via.placeholder.com/50", name: "Tom Holland", designation: "Frontend Developer" },
  // { id: 10, profilepic: "https://via.placeholder.com/50", name: "Natalie Portman", designation: "Backend Developer" },
  // { id: 11, profilepic: "https://via.placeholder.com/50", name: "Chris Hemsworth", designation: "Full Stack Developer" },
  // { id: 12, profilepic: "https://via.placeholder.com/50", name: "Mark Ruffalo", designation: "Data Analyst" },
  // { id: 13, profilepic: "https://via.placeholder.com/50", name: "Jeremy Renner", designation: "System Administrator" },
  // { id: 14, profilepic: "https://via.placeholder.com/50", name: "Paul Rudd", designation: "Network Engineer" },
  // { id: 15, profilepic: "https://via.placeholder.com/50", name: "Brie Larson", designation: "Security Analyst" },
  // { id: 16, profilepic: "https://via.placeholder.com/50", name: "Chadwick Boseman", designation: "Cloud Architect" },
  // { id: 17, profilepic: "https://via.placeholder.com/50", name: "Benedict Cumberbat", designation: "AI Engineer" },
  // { id: 18, profilepic: "https://via.placeholder.com/50", name: "Tom Hiddleston", designation: "Machine Learning Engineer" },
  // { id: 19, profilepic: "https://via.placeholder.com/50", name: "Elizabeth Olsen", designation: "Software Tester" },
  // { id: 20, profilepic: "https://via.placeholder.com/50", name: "Anthony Mackie", designation: "Technical Writer" },
  // { id: 21, profilepic: "https://via.placeholder.com/50", name: "Sebastian Stan", designation: "Database Administrator" },
  // { id: 22, profilepic: "https://via.placeholder.com/50", name: "Don Cheadle", designation: "IT Support Specialist" },
  // { id: 23, profilepic: "https://via.placeholder.com/50", name: "Vin Diesel", designation: "Game Developer" },
  // { id: 24, profilepic: "https://via.placeholder.com/50", name: "Gal Gadot", designation: "Blockchain Developer" }
];

function NetworkPage() {
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
              {collaborationRequests.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs p-1 px-2 rounded-full">
                  {collaborationRequests.length}
                </span>
              )}
            </div>
          </div>
          <div className="h-auto w-full flex flex-col gap-3 overflow-auto">
            {collaborationRequests.length > 0 ? (
              collaborationRequests.map((request) => (
                <CollaborationRequest
                  key={request.id}
                  profilepic={request.profilepic}
                  name={request.name}
                  designation={request.designation}
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
        <MyNetwork />
        <SuggestedNetwork />
      </div>
    </div>
  );
}

export default NetworkPage;
