import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Ellipsis, Pencil, Trash2, UserPlus } from "lucide-react";
import ProfilePic from "../../../../../../Common/ProfilePic";
import Name_Designation from "../../../../../../Common/Name&Designation";
import {
  BookmarkIcon as OutlineBookmark,
  BookmarkIcon as SolidBookmark,
} from "@heroicons/react/24/solid";
import { BookmarkIcon } from "lucide-react";
import Media from "./Media";
import { useDispatch } from "react-redux";
import { addDraft, openPostModal, removePost, fetchMyPosts } from "../../../../../../../Redux/Slices/PostSlice";

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
    <div className="w-[100%] h-auto border border-gray-300 mt-3 bg-white rounded-lg px-2 py-1 flex flex-col justify-center items-center gap-2">
      <div className="h-18 w-full flex justify-between ">
        <div className="w-auto h-full flex justify-start items-center ">
          <ProfilePic picture={user?.profile_pic} />
          <Name_Designation
            name={user?.name}
            designation={user?.designation}
            user={user}
          />
        </div>
        <div className="w-[10%] h-full flex justify-end items-start p-1">
          {isCurrentUser ? (
            <>
              <button
                onClick={toggleDropdown}
                className="flex items-center justify-center text-gray-800 rounded-md"
              >
                <Ellipsis />
              </button>
              {isOpen && (
                <div className="absolute mt-6 bg-white rounded-md w-24 border border-gray-300 shadow-xl ">
                  <button
                    onClick={() => {
                      handleEdit();
                    }}
                    className="text-gray-500 font-semibold w-full h-10 p-1 border-b-[0.5px] border-gray-400 hover:bg-gray-100 rounded-t-lg flex items-center justify-start gap-2 px-3 "
                  >
                    <Pencil color="gray" size={18} />
                    <p>Edit</p>
                  </button>
                  <button
                    onClick={() => {
                      handleDelete();
                    }}
                    className="text-gray-500 font-semibold w-full h-10 p-1 hover:bg-gray-100 rounded-b-lg flex items-center justify-center gap-1"
                  >
                    <Trash2 color="gray" size={18} />
                    <p>Delete</p>
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="flex w-auto gap-1">
              <button className="px-2  text-blue-600 hover:bg-blue-50 rounded-md py-1  flex items-center justify-center gap-2">
                <UserPlus size={20} />
                Collab
              </button>
              <button
                onClick={() => setBookmarked(!bookmarked)}
                className={`rounded-full transition-all ${
                  bookmarked ? "text-gray-500" : " text-gray-500"
                }`}
              >
                {bookmarked ? (
                  <SolidBookmark className="w-auto h-[1.84rem] text-gray-600" />
                ) : (
                  <BookmarkIcon size={30} color="gray" />
                )}
              </button>
            </div>
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
      <div className="h-auto w-full object-cover flex justify-center items-center">
        <Media media={media} />
      </div>
      {isCurrentUser && <div className="w-full flex justify-end p-2"></div>}
    </div>
  );
}

export default PostCard;
