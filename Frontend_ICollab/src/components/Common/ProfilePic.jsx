import React from 'react'
import ProfileImg from "../../assets/ProfilePic.png"
function ProfilePic() {
  return (
    <div className="h-16 w-16 rounded-full border-2 border-gray-500 shadow-xl  overflow-hidden">
                <img
                  src={ProfileImg}
                  alt=""
                  className="h-full w-full object-cover "
                />
    </div>
  )
}

export default ProfilePic
