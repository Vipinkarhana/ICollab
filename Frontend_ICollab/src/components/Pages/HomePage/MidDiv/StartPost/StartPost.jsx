import { useState} from 'react'
import ProfilePic from '../../../../Common/ProfilePic'
import StartPostModal from './StartPostModal';

function StartPost() {
  const [isOpen, SetIsOpen] = useState(false);
  console.log(isOpen);
  
  return (
    <div className="w-[99%] h-[15%] bg-gray-200 rounded-md flex justify-evenly items-center">
        <ProfilePic />
      <button onClick={()=>{SetIsOpen(true)}} className="h-12 w-[80%] border-2 border-gray-400 rounded-3xl text-gray-500 font-semibold text-lg hover:bg-gray-300">
         Start a Post 
      </button>
      {isOpen && (
        <StartPostModal SetIsOpen={SetIsOpen} isOpen={isOpen}/>
      )}
    </div>
  )
}

export default StartPost
