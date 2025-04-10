import React from 'react';
import Name_Designation from '../../../Common/Name&Designation'; // adjust import as needed
import ProfilePic from '../../../Common/ProfilePic';
import { Send } from 'lucide-react';

function CollaboratorCard({ person }) {
  return (
   <div className="flex justify-between items-center w-full h-14 border px-2">
    <div className="flex justify-start items-center gap-2">
    <div className="h-[2.5rem] w-[2.5rem] flex items-center justify-center">
        <ProfilePic className="h-full w-full"/>
    </div>
    <div className="h-full w-auto">
         {/* <div className="text-lg font-medium">
            <p>Tanmay Sharma</p>
         </div>
         <div className="text-sm text-gray-600">
            <p>Frontend developer</p>
         </div> */}
         <Name_Designation
         name={person.name}
         designation={person.designation}
         nameClass="text-lg font-medium"
         designationClass="text-sm text-gray-600"
         />

         
    </div>
    </div>
    
    <div className="w-auto h-[90%] flex justify-center items-center">
        <Send size={24} color='blue' strokeWidth={1.7}/>
    </div>
   </div>
  );
}

export default CollaboratorCard;
