import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Pencil,
  Trash2,
  UserPlus,
  Ban,
  EllipsisVertical,
} from "lucide-react";
import ProfilePic from "../../../../../../Common/ProfilePic";
import Name_Designation from "../../../../../../Common/Name&Designation";
import {
  BookmarkIcon as OutlineBookmark,
  BookmarkIcon as SolidBookmark,
} from "@heroicons/react/24/solid";
import Media from "./Media";
import {
  addDraft,
  openPostModal,
  removePost,
  fetchMyPosts,
} from "../../../../../../../Redux/Slices/PostSlice";
import { toggleSaveItemThunk } from "../../../../../../../Redux/Slices/SaveItemSlice";
import Interaction from "../../../../../../Common/Interaction";
import { sendRequest } from "../../../../../../../Services/networkService";
import * as postService from "../../../../../../../Services/postService";

function PostCard({ post }) {
  const [comments, setComments] = useState([]);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [isConnected, setIsConnected] = useState(!post?.isConnection);
  const dropdownRef = useRef(null);

  const savedPosts = useSelector((state) => state.savedItem.savedPosts);
  const isSaved = savedPosts.some((savedPost) => savedPost._id === post._id);

  const text = post?.content;
  const media = post?.media;
  const user = post?.user;

  const currentUser = useSelector((state) => state.user.userData);
  const [isFullTextVisible, setIsFullTextVisible] = useState(false);

  const words = text?.split(" ");
  const wordLimit = media?.length === 0 ? 80 : 15;
  const textToDisplay = isFullTextVisible
    ? text
    : words?.slice(0, wordLimit)?.join(" ");

  const isCurrentUser = user?.name === currentUser?.name;

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSaveToggle = () => {
    dispatch(toggleSaveItemThunk({ itemId: post._id, itemType: "posts", item: post }));
  };

  const handleEdit = () => {
    dispatch(addDraft(post));
    dispatch(openPostModal(true));
  };

  const handleDelete = () => {
    dispatch(removePost({ postid: post._id }));
    dispatch(fetchMyPosts());
  };

  const handleSendRequest = () => {
    sendRequest(user?.username);
    setIsConnected(false);
    setIsOpen(false);
  };

  useEffect(() => {
  const loadComments = async () => {
    try {
      const data = await postService.getPostComments(post._id);
      setComments(data);
    } catch (e) {
      console.error('Failed to load comments', e);
    }
  };
  loadComments();
}, [post._id]);

  // Close dropdown on outside click
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

  return (
    <div className="w-full border border-gray-300 mt-3 bg-white rounded-lg flex flex-col justify-center items-center gap-2">
      <div className="h-14 w-full flex justify-between">
        <div className="flex items-center gap-2 px-2">
          <ProfilePic
            picture={user?.profile_pic}
            className="h-[2.7rem] w-[2.7rem]"
          />
          <Name_Designation
            name={user?.name}
            designation={user?.designation}
            user={user}
            nameClass="text-[0.8rem] lg:text-[1.1rem] font-semibold text-gray-800 tracking-tighter"
            designationClass="text-[0.7rem] text-gray-600"
            divclass="h-[30%]"
          />
        </div>
        <div className="w-[10%] flex justify-end items-start p-1 relative">
          <button
            onClick={toggleDropdown}
            className="text-gray-800 rounded-md py-1"
          >
            <EllipsisVertical />
          </button>

          {isOpen && (
            <div
              ref={dropdownRef}
              className="absolute mt-7 mr-3 sm:mr-6 sm:mt-8 z-50 bg-white rounded-md w-36 border border-gray-300 shadow-xl"
            >
              {isCurrentUser ? (
                <>
                  <button
                    onClick={handleEdit}
                    className="text-gray-500 text-xl w-full h-16 p-1 border-b border-gray-400 hover:bg-gray-100 flex items-center gap-2 px-3"
                  >
                    <Pencil size={18} />
                    <p>Edit</p>
                  </button>
                  <button
                    onClick={handleDelete}
                    className="text-gray-500 w-full h-16 text-xl p-1 hover:bg-gray-100 flex items-center gap-2 px-3"
                  >
                    <Trash2 size={18} />
                    <p>Delete</p>
                  </button>
                </>
              ) : (
                <>
                  {isConnected && (
                    <button
                      onClick={handleSendRequest}
                      className="text-blue-600 text-xl h-16 w-full hover:bg-blue-50 flex items-center gap-3 px-4"
                    >
                      <UserPlus size={22} />
                      Collab
                    </button>
                  )}
                  <button className="text-gray-500 w-full px-4 hover:bg-gray-100 flex items-center gap-3 text-xl h-16">
                    <Ban size={20} color="red" />
                    <p>Block</p>
                  </button>
                  <button
                    onClick={handleSaveToggle}
                    className="h-16 flex items-center w-full px-4 text-gray-500 hover:bg-gray-100"
                  >
                    {isSaved ? (
                      <div className="flex gap-3 text-xl">
                        <SolidBookmark className="h-6 text-blue-400" />
                        <p>Saved</p>
                      </div>
                    ) : (
                      <div className="flex gap-3 text-xl">
                        <OutlineBookmark className="h-6 text-gray-500" />
                        <p>Save</p>
                      </div>
                    )}
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="w-[95%]">
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

      <div className="w-full flex justify-center items-center">
        <Media media={media} />
      </div>

      {!isCurrentUser && (
        <div className="w-full">
          <Interaction
            postId={post._id}
            initialComments={comments}
            fetchComments={() => postService.getPostComments(post._id)}
            postComment={(content) => 
              postService.postPostComment({ postId: post._id, content })
            }
            postReply={(content, parentId) => 
              postService.postPostReply({ 
                postId: post._id, 
                content, 
                parentCommentId: parentId 
              })
            }
            initialLikes={post.likes}
            initialIsLiked={post.isLiked}
          />
        </div>
      )}
    </div>
  );
}

export default PostCard;
