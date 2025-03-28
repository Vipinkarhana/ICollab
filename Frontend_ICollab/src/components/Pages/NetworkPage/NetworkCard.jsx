import { UserPlus } from "lucide-react";
import ProfilePic from "../../Common/ProfilePic";

const NetworkCard = ({ person }) => {
  return (
    <div className="bg-white p-4 shadow-md rounded-md border border-gray-300 flex flex-col items-center">
      {/* Profile Image */}
      <ProfilePic className="w-20 h-20 mx-auto mb-2 rounded-full border border-gray-300" />
      
      {/* Name */}
      <h3 className="text-center font-bold text-lg sm:text-xl md:text-xl">{person.name}</h3>
      
      {/* Role */}
      <p className="text-center text-gray-600 text-sm sm:text-base">{person.role}</p>
      
      {/* Collab Button */}
      <button className="w-full mt-2 bg-blue-500 text-white py-1 rounded flex items-center justify-center gap-1 text-sm sm:text-base">
        <UserPlus size={20} />
        Collab
      </button>
    </div>
  );
};

export default NetworkCard;
