import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Pencil, Trash2, UserPlus, Ban, EllipsisVertical } from "lucide-react";
import ProfilePic from "../../../../../../Common/ProfilePic";
import Name_Designation from "../../../../../../Common/Name&Designation";
import {
  BookmarkIcon as OutlineBookmark,
  BookmarkIcon as SolidBookmark,
} from "@heroicons/react/24/solid";
import Media from "./Media";
import { useDispatch } from "react-redux";
import {
  addDraft,
  openPostModal,
  removePost,
  fetchMyPosts,
  saveOrUnsavePost,
  toggleLike,
} from "../../../../../../../Redux/Slices/PostSlice";
import Interaction from "../../../../../../Common/Interaction";
import { sendRequest } from "../../../../../../../Services/networkService";

function PostCard({ post }) {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [isConnected, setIsConnected] = useState(!post?.isConnection);
  const savedPosts = useSelector((state) => state.post.savePost);

  const text = post?.content;
  const media = post?.media;
  const user = post?.user;

  const dropdownRef = useRef(null); // ✅ New ref

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleToggleSave = () => {
    dispatch(saveOrUnsavePost({ post: post }));
    setIsOpen(false);
  };

  const bookmarked = savedPosts.hasOwnProperty(post._id);

  useEffect(() => {
    console.log("bookmarked", bookmarked);
    console.log(post._id, "post id");
  }, []);

  // ✅ Detect outside click to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
  };

  const handleDelete = () => {
    dispatch(removePost({ postid: post?.id }));
    dispatch(fetchMyPosts());
  };

  const handleSendRequest = () => {
    sendRequest(user?.username)
    setIsConnected(false);
    setIsOpen(false);
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
                <div
                  ref={dropdownRef}
                  className="absolute mt-7 mr-3 sm:mr-6 sm:mt-8 z-50 bg-white rounded-md w-36 border border-gray-300 shadow-xl "
                >
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
                <div
                  ref={dropdownRef}
                  className="absolute mt-7 mr-3 sm:mr-6 sm:mt-8 z-50 bg-white rounded-md w-36 border border-gray-300 shadow-xl "
                >
                  {isConnected ? (
                    <button
                      className=" text-xl text-blue-600 h-16 border-b w-full hover:bg-blue-50 rounded-md py-1  flex items-center justify-start gap-3 px-4"
                      onClick={() => handleSendRequest()}
                    >
                      <UserPlus size={22} />
                      Collab
                    </button>
                  ) : (
                    <></>
                  )}
                  <button className="text-gray-500  w-full px-4 hover:bg-gray-100 rounded-b-lg flex items-center justify-start gap-3 text-xl border-b h-16 ">
                    <Ban size={20} color="red" />
                    <p>Block</p>
                  </button>
                  <button
                    onClick={handleToggleSave}
                    className=" transition-all h-16 flex items-center justify-start w-full px-4 text-gray-500 hover:bg-gray-100"
                  >
                    {bookmarked ? (
                      <div className="flex items-center justify-start gap-3 w-full text-xl">
                        <SolidBookmark className="w-auto h-[1.5rem] text-blue-400" />
                        <p>Saved</p>
                      </div>
                    ) : (
                      <div className="flex items-center justify-start gap-3 w-full text-xl">
                        <OutlineBookmark className="w-auto h-[1.5rem] text-gray-500" />
                        <p>Save</p>
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
      {!isCurrentUser && (
        <div className="w-full ">
          <Interaction 
          postId={post._id}
          initialLikes={post.likes}
          initialIsLiked={post.isLiked}
          />
        </div>
      )}
    </div>
  );
}

export default PostCard;
