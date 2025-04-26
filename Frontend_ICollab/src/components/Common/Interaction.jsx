import { useRef, useState } from "react";
import { useDispatch } from 'react-redux';
import {toggleLike} from "../../Redux/Slices/PostSlice";
import {
  MessageCircle,
  ThumbsUp,
  SendHorizontal,
  Repeat2,
  MoreHorizontal,
  Send,
} from "lucide-react";
import ProfilePic from "./ProfilePic";

const Interactions = ({ postId, initialLikes, initialIsLiked, className="" }) => {
  const dispatch = useDispatch();
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [replyText, setReplyText] = useState({});
  const [replyingTo, setReplyingTo] = useState(null);
  const commentInputRef = useRef(null);

  // Function to add a new comment
  const addComment = () => {
    if (commentText.trim() !== "") {
      setComments([...comments, { text: commentText, likes: 0, replies: [] }]);
      setCommentText("");
    }
  };

  const handleLikeClick = () => {
    console.log("Reached handleClick function in interaction.jsx");
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
    setIsLiked(!isLiked);
    dispatch(toggleLike(postId));
  };

  const focusCommentInput = () => {
    if (commentInputRef.current) {
      commentInputRef.current.focus();
    }
  };

  // Function to add a reply to a specific comment
  const addReply = (index) => {
    if (replyText[index]?.trim()) {
      const newComments = [...comments];
      newComments[index].replies.push({
        text: replyText[index],
        likes: 0,
      });
      setComments(newComments);
      setReplyText({ ...replyText, [index]: "" });
      setReplyingTo(null);
    }
  };

  return (
    <div className="w-full max-w-full  px-2">
      {/* Post Actions (Like, Comment, Repost, Send) */}
      <div className={`flex justify-between items-center text-gray-600 text-sm border-t border-gray-300 pt-1 sm:pt-4 ${className}`}>
        <button
          className="flex items-center space-x-1 px-8 py-4 rounded-sm sm:px-4 sm:py-2 "
          onClick={handleLikeClick}
        >
          {isLiked ? (
            <ThumbsUp className="text-blue-500" size={18} />
          ) : (
            <ThumbsUp className="text-gray-500" size={18} />
          )}
          <span className="hidden sm:inline">
            {likes > 0 ? `${likes} Like${likes !== 1 ? 's' : ''}` : "Like"}
          </span>
        </button>

        <button
          className="flex items-center space-x-1 px-8 py-4 rounded-sm lg:hover:bg-gray-200 sm:px-4 sm:py-2"
          onClick={focusCommentInput}
        >
          <MessageCircle size={18} />
          <span className="hidden sm:inline">Comment</span>
        </button>

        <button className="flex items-center space-x-1 px-8 py-4 rounded-sm lg:hover:bg-gray-200 sm:px-4 sm:py-2">
          <Repeat2 size={18} />
          <span className="hidden sm:inline">Repost</span>
        </button>

        <button className="flex items-center space-x-1 px-8 py-4 rounded-sm lg:hover:bg-gray-200 sm:px-4 sm:py-2">
          <Send size={18} />
          <span className="hidden sm:inline">Send</span>
        </button>
      </div>

      {/* Comment Input Box */}
      <div className="flex items-center space-x-2 sm:mt-4">
        <ProfilePic className="w-9 h-9" />
        <div className="relative flex-1">
          <input
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Add a comment..."
            ref={commentInputRef}
            className="w-full border rounded-full px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          {commentText.trim() && (
            <button
              onClick={addComment}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-500 hover:text-blue-600"
            >
              <SendHorizontal size={20} />
            </button>
          )}
        </div>
      </div>

      {/* Display Comments & Replies */}
      <div className="mt-4">
        {comments.map((comment, index) => (
          <div key={index} className="mb-3 relative">
            {/* Vertical Line from main comment to last reply */}
            {/* Vertical Line (Adjustable height) */}
            {/* Vertical Line (Starts from main comment & stops before last reply) */}
            {comment.replies.length > 0 && (
              <div
                className="absolute left-3 w-[2px] bg-gray-300"
                style={{
                  top: "40px", // Adjust starting position
                  bottom: "50px", // Stops before the curve
                }}
              ></div>
            )}

            {/* Curved Bottom Line (Starts where vertical line ends) */}
            {comment.replies.length > 0 && (
              <div
                className="absolute left-3 border-l-2 border-b-2 border-gray-300 rounded-bl-full"
                style={{
                  bottom: "40px", // Ensures it starts exactly after the vertical line
                  width: "22px",
                  height: "18px", // Adjust this to control downward length
                  borderBottomLeftRadius: "10px", // Keeps a smooth curve
                }}
              ></div>
            )}

            {/* Main Comment */}
            <div className="flex items-start  justify-evenly gap-2">
              <ProfilePic className="w-9 h-9 relative " />
              <div className="bg-gray-100 p-3 rounded-lg w-[90%]">
                <p className="text-sm">{comment.text}</p>
                <div className="flex items-center text-gray-500 text-xs mt-1 space-x-3">
                  <button className="hover:text-blue-500 flex items-center space-x-1">
                    <ThumbsUp size={14} />
                    <span>Like</span>
                  </button>
                  <button
                    className="hover:text-blue-500 flex items-center space-x-1"
                    onClick={() => setReplyingTo(index)}
                  >
                    <MessageCircle size={14} />
                    <span>Reply</span>
                  </button>
                  <MoreHorizontal size={14} className="cursor-pointer" />
                </div>
              </div>
            </div>

            {/* Display Replies */}
            <div className="ml-10 mt-2">
              {comment.replies.map((reply, replyIndex) => (
                <div
                  key={replyIndex}
                  className="flex items-start justify-evenly gap-2 mt-2 relative"
                >
                  <ProfilePic className="w-9 h-9" />
                  <div className="bg-gray-100 p-3 rounded-lg w-[90%]">
                    <p className="text-sm">{reply.text}</p>
                    <div className="flex items-center text-gray-500 text-xs mt-1 space-x-3">
                      <button className="hover:text-blue-500 flex items-center space-x-1">
                        <ThumbsUp size={14} />
                        <span>Like</span>
                      </button>
                      <button
                        className="hover:text-blue-500 flex items-center space-x-1"
                        onClick={() => setReplyingTo(index)}
                      >
                        <MessageCircle size={14} />
                        <span>Reply</span>
                      </button>
                      <MoreHorizontal size={14} className="cursor-pointer" />
                    </div>
                  </div>
                </div>
              ))}

              {/* Reply Input Box - Placed at the Bottom of Replies */}
              {replyingTo === index && (
                <div className="flex items-center space-x-2 mt-2">
                  <ProfilePic className="w-9 h-9" />
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={replyText[index] || ""}
                      onChange={(e) =>
                        setReplyText({ ...replyText, [index]: e.target.value })
                      }
                      placeholder="Write a reply..."
                      className="w-full border rounded-full px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    {replyText[index]?.trim() && (
                      <button
                        onClick={() => addReply(index)}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-500 hover:text-blue-600"
                      >
                        <SendHorizontal size={20} />
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Interactions;
