import React,{useState} from 'react'
import ProfilePic from '../../../../../../Common/ProfilePic'
import Name_Designation from '../../../../../../Common/Name&Designation'
import { Bookmark,BookmarkCheck } from 'lucide-react';
import Media from './Media';

function PostCard({text,media}) {
  const [bookmarked, setBookmarked] = useState(false);
  const [isFullTextVisible, setIsFullTextVisible] = useState(false);
  const words = text.split(" ");
  const wordLimit = 15;
  const textToDisplay = isFullTextVisible
    ? text
    : words.slice(0, wordLimit).join(" ");


  return (
    <div className="w-[100%] h-auto border-2 mt-3 bg-gray-200 rounded-lg px-2 py-1 flex flex-col justify-center items-center gap-2">
      <div className="h-18 w-full flex justify-between ">
        <div className="w-[50%] h-full flex justify-start items-center ">
          <ProfilePic />
          <Name_Designation />
        </div>
        <div className="w-[10%] h-full flex justify-end items-start">
          <button
            onClick={() => setBookmarked(!bookmarked)}
            className={`p-2 rounded-full transition-all ${
              bookmarked ? " text-gray-500" : "bg-gray-200 text-gray-500"
            } `}
          >
            {bookmarked ? (
              <BookmarkCheck
                size={30}
                color="blue"
                strokeWidth={1}
                className="transition-all"
              />
            ) : (
              <Bookmark
                size={30}
                strokeWidth={1}
                color="black"
                className="transition-all"
              />
            )}
          </button>
        </div>
      </div>
      <div className="h-auto w-[95%]">
        <p style={{whiteSpace:'pre-wrap'}} className="text-md text-gray-800">
          {textToDisplay}
          {words.length > wordLimit && (
            <button
              className="text-gray-950 font-semibold"
              onClick={() => setIsFullTextVisible(!isFullTextVisible)}
            >
              {isFullTextVisible ? "" : "...more"}
            </button>
          )}
        </p>
      </div>
      <div className="h-auto w-full object-cover flex justify-center items-center">
        <Media media={media}/>
      </div>
    </div>
  );
}

  export default PostCard;
