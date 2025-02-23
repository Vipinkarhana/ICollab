import {useState} from 'react'
import NetworkCard from './NetworkCard'
import ProfilePic from "/ProfilePic.png";
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
          className="text-blue-600 hover:underline"
        >
          {showAll ? "Show Less" : "Show All"}
        </button>
      </div>

      <div className="grid grid-cols-3  gap-4 h-auto">
        {visiblePeople.map((person) => (
          <NetworkCard key={person.id} person={person} />
        ))}
      </div>
    </div>
  );
}

export default SuggestedNetwork
