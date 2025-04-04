import React, { useState } from "react";
import { useSelector } from "react-redux";
import {  Pencil, Trash2, UserPlus, Ban } from "lucide-react";
import ProfilePic from "../../../../../../Common/ProfilePic";
import Name_Designation from "../../../../../../Common/Name&Designation";
import {
  BookmarkIcon as OutlineBookmark,
  BookmarkIcon as SolidBookmark,
} from "@heroicons/react/24/solid";
import Media from "./Media";
import { useDispatch } from "react-redux";
import { addDraft, openPostModal, removePost, fetchMyPosts } from "../../../../../../../Redux/Slices/PostSlice";
import { EllipsisVertical } from "lucide-react";
import PostInteraction from "./PostInteraction";
  function PostCard({post}) {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const text = post?.content;
  const media = post?.media;
  const user = post?.user;

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const [bookmarked, setBookmarked] = useState(false);
  const [isFullTextVisible, setIsFullTextVisible] = useState(false);
  const currentUser = useSelector((state) => state.user.userData);

  const words = text?.split(" ");

  let wordLimit;
  if (media?.length == 0) {
    wordLimit = 80;
  } else {
    wordLimit = 15;
  }
  const textToDisplay = isFullTextVisible
    ? text
    : words?.slice(0, wordLimit)?.join(" ");

  const isCurrentUser = user?.name === currentUser?.name;

  const handleEdit = () => {
    dispatch(addDraft(post));
    dispatch(openPostModal(true));
  }

  const handleDelete = () => {
    dispatch(removePost({postid: post?.id}));
    dispatch(fetchMyPosts());
  }

  return (
    <div className="w-[100%] h-auto border border-gray-300 mt-3 bg-white rounded-lg   flex flex-col justify-center items-center gap-2">
      <div className="h-14 w-full flex justify-between ">
        <div className="w-auto h-full flex justify-start items-center gap-2 px-2">
          <ProfilePic
            picture={user?.profile_pic}
            className="h-[2.7rem] w-[2.7rem]"
          />
          <Name_Designation
            name={user?.name}
            designation={user?.designation}
            user={user}
            nameClass="text-[0.8rem] lg:text-[1.1rem] font-semibold text-gray-800 tracking-tighter "
            designationClass="text-[0.7rem] text-gray-600"
            divclass="h-[30%]"
          />
        </div>
        <div className="w-[10%] h-full flex justify-end items-start p-1 ">
          {isCurrentUser ? (
            <>
              <button
                onClick={toggleDropdown}
                className="flex items-center justify-center text-gray-800 rounded-md py-1"
              >
                <EllipsisVertical />
              </button>
              {isOpen && (
                <div className="absolute mt-7 mr-3 sm:mr-6 sm:mt-8 z-50 bg-white rounded-md w-36 border border-gray-300 shadow-xl ">
                  <button
                    onClick={() => {
                      handleEdit();
                    }}
                    className="text-gray-500 text-xl w-full h-16 p-1 border-b-[0.5px] border-gray-400 hover:bg-gray-100 rounded-t-lg flex items-center justify-start gap-2 px-3 "
                  >
                    <Pencil color="gray" size={18} />
                    <p>Edit</p>
                  </button>
                  <button
                    onClick={() => {
                      handleDelete();
                    }}
                    className="text-gray-500  w-full h-16 text-xl p-1 hover:bg-gray-100 rounded-b-lg flex items-center justify-start gap-2 px-3"
                  >
                    <Trash2 color="gray" size={18} />
                    <p>Delete</p>
                  </button>
                </div>
              )}
            </>
          ) : (
            <>
              <button
                onClick={toggleDropdown}
                className="flex items-center justify-start text-gray-800 rounded-md py-1"
              >
                <EllipsisVertical />
              </button>
              {isOpen && (
                <div className="absolute mt-7 mr-3 sm:mr-6 sm:mt-8 z-50 bg-white rounded-md w-36 border border-gray-300 shadow-xl ">
                  <button className=" text-xl text-blue-600 h-16 border-b w-full hover:bg-blue-50 rounded-md py-1  flex items-center justify-start gap-3 px-4">
                    <UserPlus size={22} />
                    Collab
                  </button>
                  <button className="text-gray-500  w-full px-4 hover:bg-gray-100 rounded-b-lg flex items-center justify-start gap-3 text-xl border-b h-16 ">
                    <Ban size={20} color="red" />
                    <p>Block</p>
                  </button>
                  <button
                    onClick={() => setBookmarked(!bookmarked)}
                    className={`rounded-full transition-all h-16 flex items-center justify-start w-full px-4${
                      bookmarked ? "text-gray-500" : " text-gray-500"
                    }`}
                  >
                    {bookmarked ? (
                      <div className="flex items-center justify-start gap-3  w-full text-xl px-4">
                        <SolidBookmark className="w-auto h-[1.5rem]  text-gray-400"  />
                        <p className="text-xl text-gray-500">Saved</p>
                      </div>
                    ) : (
                      <div className="flex gap-1 items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
                          />
                        </svg>
                        <p className="text-xl">Save</p>
                      </div>
                    )}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <div className="h-auto w-[95%]">
        <p style={{ whiteSpace: "pre-wrap" }} className="text-md text-gray-800">
          {textToDisplay}
          {words?.length > wordLimit && (
            <button
              className="text-gray-700 font-semibold hover:text-blue-600"
              onClick={() => setIsFullTextVisible(!isFullTextVisible)}
            >
              {isFullTextVisible ? "..see less" : "...more"}
            </button>
          )}
        </p>
      </div>
      <div className="h-auto w-full object-cover flex justify-center items-center ">
        <Media media={media} />
      </div>
      {!isCurrentUser &&
        <div className="w-full ">
            <PostInteraction/>
        </div>
      }
    </div>
  );
}

export default PostCard;