import React from "react";
import MyNetwork from "./MyNetwork";
import SuggestedNetwork from "./SuggestedNetwork";
import ProfileCard from "../HomePage/LeftDiv/ProfileCard";
import { Users } from "lucide-react";
import CollaborationRequest from "./CollaborationRequest";

// Dummy data for collaboration requests
const collaborationRequests = [
  {
    id: 1,
    profilepic: "https://via.placeholder.com/50",
    name: "Tanmay Sharma ",
    designation: "Software Engineer",
  },
  {
    id: 2,
    profilepic: "https://via.placeholder.com/50",
    name: "Jane Smith",
    designation: "UI/UX Designer",
  },
  {
    id: 3,
    profilepic: "https://via.placeholder.com/50",
    name: "Michael Johnson",
    designation: "Data Scientist",
  },
  {
    id: 4,
    profilepic: "https://via.placeholder.com/50",
    name: "Alice Williams",
    designation: "Business Analyst",
  },
  {
    id: 5,
    profilepic: "https://via.placeholder.com/50",
    name: "Alice Williams",
    designation: "Business Analyst",
  },
   {
    id: 6,
    profilepic: "https://via.placeholder.com/50",
    name: "Chris Evans",
    designation: "Project Manager",
  },
  {
    id: 7,
    profilepic: "https://via.placeholder.com/50",
    name: "Emma Watson",
    designation: "Marketing Specialist",
  },
  {
    id: 8,
    profilepic: "https://via.placeholder.com/50",
    name: "Robert Downey",
    designation: "DevOps Engineer",
  },
  {
    id: 9,
    profilepic: "https://via.placeholder.com/50",
    name: "Scarlett Johansson",
    designation: "Product Manager",
  },
  {
    id: 10,
    profilepic: "https://via.placeholder.com/50",
    name: "Tom Holland",
    designation: "Frontend Developer",
  },
  {
    id: 11,
    profilepic: "https://via.placeholder.com/50",
    name: "Natalie Portman",
    designation: "Backend Developer",
  },
  {
    id: 12,
    profilepic: "https://via.placeholder.com/50",
    name: "Chris Hemsworth",
    designation: "Full Stack Developer",
  },
  {
    id: 13,
    profilepic: "https://via.placeholder.com/50",
    name: "Mark Ruffalo",
    designation: "Data Analyst",
  },
  {
    id: 14,
    profilepic: "https://via.placeholder.com/50",
    name: "Jeremy Renner",
    designation: "System Administrator",
  },
  {
    id: 15,
    profilepic: "https://via.placeholder.com/50",
    name: "Paul Rudd",
    designation: "Network Engineer",
  },
  {
    id: 16,
    profilepic: "https://via.placeholder.com/50",
    name: "Brie Larson",
    designation: "Security Analyst",
  },
  {
    id: 17,
    profilepic: "https://via.placeholder.com/50",
    name: "Chadwick Boseman",
    designation: "Cloud Architect",
  },
  {
    id: 18,
    profilepic: "https://via.placeholder.com/50",
    name: "Benedict Cumberbatch",
    designation: "AI Engineer",
  },
  {
    id: 19,
    profilepic: "https://via.placeholder.com/50",
    name: "Tom Hiddleston",
    designation: "Machine Learning Engineer",
  },
  {
    id: 20,
    profilepic: "https://via.placeholder.com/50",
    name: "Elizabeth Olsen",
    designation: "Software Tester",
  },
  {
    id: 21,
    profilepic: "https://via.placeholder.com/50",
    name: "Anthony Mackie",
    designation: "Technical Writer",
  },
  {
    id: 22,
    profilepic: "https://via.placeholder.com/50",
    name: "Sebastian Stan",
    designation: "Database Administrator",
  },
  {
    id: 23,
    profilepic: "https://via.placeholder.com/50",
    name: "Don Cheadle",
    designation: "IT Support Specialist",
  },
  {
    id: 24,
    profilepic: "https://via.placeholder.com/50",
    name: "Vin Diesel",
    designation: "Game Developer",
  },
  {
    id: 25,
    profilepic: "https://via.placeholder.com/50",
    name: "Gal Gadot",
    designation: "Blockchain Developer",
  }
];

function NetworkPage() {
  return (
    <div className="w-[100%] h-auto mt-12 py-1 flex justify-center gap-2">
      <div className="w-[23%] rounded-md h-auto py-2 flex flex-col items-center justify-start gap-2">
        <ProfileCard />
        <div className="w-full bg-white border border-gray-300 rounded-md h-auto">
          <div className="h-14 w-full border-b border-gray-300 flex items-center justify-between px-4">
            <div className="text-lg font-semibold">
              <p>Collaboration Requests</p>
            </div>
            <div className="relative w-auto h-auto">
              <Users size={28} />
              {collaborationRequests.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs p-1 px-2 rounded-full">
                  {collaborationRequests.length}
                </span>
              )}
            </div>
          </div>
          <div className="h-auto w-full px-2 py-2 flex flex-col gap-3 overflow-auto">
            {collaborationRequests.map((request) => (
              <CollaborationRequest
                key={request.id}
                profilepic={request.profilepic}
                name={request.name}
                designation={request.designation}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-[55%] h-auto p-2 flex flex-col gap-4 rounded-md">
        <MyNetwork />
        <SuggestedNetwork />
      </div>
    </div>
  );
}

export default NetworkPage;
