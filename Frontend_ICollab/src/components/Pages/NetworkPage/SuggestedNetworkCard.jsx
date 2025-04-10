import React from 'react'
import ProfilePic from "../../Common/ProfilePic";
import Name_Designation from '../../Common/Name&Designation'
import { UserPlus, Clock } from "lucide-react";

function SuggestedNetworkCard({person,collabStatus,onClick}) {
    console.log("Tanmay See This: ", person)
  return (
    <div key={person.id} className="bg-white p-4 shadow-md rounded-md border border-gray-300">
            {/* Profile Image */}
            <ProfilePic className="w-20 h-20 mx-auto mb-2 rounded-full object-cover" />
            {/* Name and Role */}
            <div className="flex flex-col items-center justify-center ">
              <Name_Designation
                name={person.name}
                designation={person.role}
                nameClass="text-[1.0rem] font-semibold text-gray-800 text-center"
                designationClass="text-sm text-gray-600 text-center"
              />
            </div>
            
            {/* Collab Button */}
            <button
              onClick={() => onClick(person.id)}
              className={`w-full mt-2 py-1 rounded flex items-center justify-center gap-1 ${collabStatus[person.id] === 'Pending' ? 'bg-gray-500 text-white' : 'bg-blue-500 text-white'}`}
              disabled={collabStatus[person.id] === 'Pending'} 
            >
              {/* Add appropriate icons */}
              {collabStatus[person.id] === 'Pending' ? (
                 <Clock size={20} />
              ) : (
                <UserPlus size={20} />
              )}
              {collabStatus[person.id] === 'Pending' ? 'Pending' : 'Collab'}
            </button>
          </div>
  )
}

export default SuggestedNetworkCard
