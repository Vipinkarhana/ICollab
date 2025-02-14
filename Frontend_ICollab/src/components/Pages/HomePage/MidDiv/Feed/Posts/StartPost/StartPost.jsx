import { useState } from "react";
import ProfilePic from "../../../../../../Common/ProfilePic";
import StartPostModal from "./StartPostModal";
import { useSelector } from "react-redux";

function StartPost() {
  const [isOpen, SetIsOpen] = useState(false);
  const user = useSelector((state) => state?.user?.userData);

  return (
    <div className="w-full h-20 bg-gray-200 rounded-md flex justify-evenly items-center p-1 border border-gray-400">
      <ProfilePic picture={user?.profile_pic}/>
      <button
        onClick={() => {
          SetIsOpen(true);
        }}
        className="h-12 w-[80%] border-2 border-gray-400 rounded-3xl text-gray-500 font-semibold text-lg hover:bg-gray-300"
      >
        Start a Post
      </button>
      {isOpen && <StartPostModal SetIsOpen={SetIsOpen} isOpen={isOpen} />}
    </div>
  );
}

export default StartPost;
