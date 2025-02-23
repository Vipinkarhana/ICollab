import { UserPlus } from "lucide-react";
import ProfilePic from "../../Common/ProfilePic";
const NetworkCard = ({ person }) => {
    return (
      <div className="bg-white p-4 shadow-md rounded-md border border-gray-300">
        {/* <img
          src={person.img}
          alt={person.name}
          className="w-20 h-20 mx-auto rounded-full mb-2 border border-gray-300"
        /> */}
        <ProfilePic className="w-20 h-20 mx-auto mb-2"/>
        <h3 className="text-center font-bold">{person.name}</h3>
        <p className="text-center text-gray-600">{person.role}</p>
        <button className="w-full mt-2 bg-blue-500 text-white py-1 rounded flex items-center justify-center gap-1"> 
          <UserPlus size={20}/>
          Collab
        </button>
      </div>
    );
  };
  
  export default NetworkCard;
  