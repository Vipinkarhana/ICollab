import { useState } from 'react';
import ProfilePic from "../../Common/ProfilePic"; // Ensure you import the image or path correctly
import { UserPlus } from "lucide-react"; // Importing the button icon

function SuggestedNetwork() {
  const people = [
    { id: 1, name: "John Dews", role: "Research Scholar", img: ProfilePic },
    { id: 2, name: "Chanchal Singh", role: "HR Professional", img: ProfilePic },
    { id: 3, name: "Chanchal Singh", role: "HR Professional", img: ProfilePic },
    { id: 4, name: "Chanchal Singh", role: "HR Professional", img: ProfilePic },
    { id: 5, name: "Chanchal Singh", role: "HR Professional", img: ProfilePic },
    { id: 6, name: "Chanchal Singh", role: "HR Professional", img: ProfilePic },
    { id: 7, name: "New User", role: "Software Engineer", img: ProfilePic },
    { id: 8, name: "Another User", role: "Data Scientist", img: ProfilePic },
    { id: 9, name: "Another User", role: "Data Scientist", img: ProfilePic },
    { id: 10, name: "Another User", role: "Data Scientist", img: ProfilePic },
    { id: 11, name: "Another User", role: "Data Scientist", img: ProfilePic },
    { id: 12, name: "Another User", role: "Data Scientist", img: ProfilePic },
    { id: 13, name: "Another User", role: "Data Scientist", img: ProfilePic },
    { id: 14, name: "Another User", role: "Data Scientist", img: ProfilePic },
    { id: 15, name: "Another User", role: "Data Scientist", img: ProfilePic },
  ];

  const [showAll, setShowAll] = useState(false);

  const toggleShowAll = () => setShowAll(!showAll);

  const visiblePeople = showAll ? people : people.slice(0, 6);

  return (
    <div className="p-6 rounded-md w-full h-auto bg-white border border-gray-300">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">People you may know</h2>
        <button
          onClick={toggleShowAll}
          className="text-blue-600 hover:underline font-medium"
        >
          {showAll ? "Show Less" : "Show All"}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {visiblePeople.map((person) => (
          <div key={person.id} className="bg-white p-4 shadow-md rounded-md border border-gray-300">
            {/* Profile Image */}
            <ProfilePic className="w-20 h-20 mx-auto mb-2" />
            {/* Name and Role */}
            <h3 className="text-center font-bold">{person.name}</h3>
            <p className="text-center text-gray-600">{person.role}</p>
            
            {/* Collab Button */}
            <button className="w-full mt-2 bg-blue-500 text-white py-1 rounded flex items-center justify-center gap-1">
              <UserPlus size={20} />
              Collab
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SuggestedNetwork;
