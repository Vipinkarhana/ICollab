import React,{useState} from 'react'
import ProfilePic from '../../../../../../Common/ProfilePic'
import Name_Designation from '../../../../../../Common/Name&Designation'
import { BookmarkIcon as OutlineBookmark, BookmarkIcon as SolidBookmark } from "@heroicons/react/24/solid";
import { BookmarkIcon } from 'lucide-react';
import Media from './Media';

function PostCard({text,media,user}) {
  const [bookmarked, setBookmarked] = useState(false);
  const [isFullTextVisible, setIsFullTextVisible] = useState(false);
  const words = text.split(" ");

  let wordLimit
  if(media?.length == 0){
    wordLimit = 80;
  }
  else{
    wordLimit = 15;
  }
  const textToDisplay = isFullTextVisible
    ? text
    : words.slice(0, wordLimit).join(" ");


  return (
    <div className="w-[100%] h-auto border border-gray-400 mt-3 bg-gray-200 rounded-lg px-2 py-1 flex flex-col justify-center items-center gap-2">
      <div className="h-18 w-full flex justify-between ">
        <div className="w-auto h-full flex justify-start items-center ">
          <ProfilePic picture={user?.profile_pic} />
          <Name_Designation name={user?.name} />
        </div>
        <div className="w-[10%] h-full flex justify-end items-start p-1">
          <button
            onClick={() => setBookmarked(!bookmarked)}
            className={` rounded-full transition-all ${
              bookmarked ? " text-gray-500" : "bg-gray-200 text-gray-500"
            } `}
          >
            {bookmarked ? (
              <SolidBookmark className="w-auto h-[1.84rem] text-gray-500" />
            ) : (
              <BookmarkIcon size={30} color='gray'/>
            )}
          </button>
        </div>
      </div>
      <div className="h-auto w-[95%]">
        <p style={{ whiteSpace: "pre-wrap" }} className="text-md text-gray-800">
          {textToDisplay}{words.length > wordLimit && (
            <button
              className="text-gray-700 font-semibold hover:text-blue-600"
              onClick={() => setIsFullTextVisible(!isFullTextVisible)}
            >
              {isFullTextVisible ? "..see less" : "...more"}
            </button>
          )}
        </p>
      </div>
      <div className="h-auto w-full object-cover flex justify-center items-center">
        <Media media={media} />
      </div>
    </div>
  );
}

export default PostCard;
