import ProfilePic from "../../../../../../Common/ProfilePic";
import { useSelector, useDispatch  } from "react-redux";
import {openPostModal} from "../../../../../../../Redux/Slices/PostSlice"

function StartPost({className=""}) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.user?.userData);

  return (
    <div className={`w-full h-20 bg-white rounded-md flex justify-evenly items-center p-1 border border-gray-300 ${className}`}>
      <ProfilePic picture={user?.profile_pic}/>
      <button
        onClick={() => {
          dispatch(openPostModal(true));
        }}
        className="h-12 w-[80%] border-2 border-gray-300 rounded-3xl text-gray-500 font-semibold text-lg hover:bg-gray-100"
      >
        Start a Post
      </button>
    </div>
  );
}

export default StartPost;
