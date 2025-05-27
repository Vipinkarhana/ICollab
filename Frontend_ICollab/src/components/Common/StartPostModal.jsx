import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import ProfilePic from "./ProfilePic";
import EmojiButton from "../Pages/HomePage/MidDiv/Feed/Posts/StartPost/EmojiButton";
import FileUpload from "../Pages/HomePage/MidDiv/Feed/Posts/StartPost/FileUpload";
import Name_Designation from "./Name&Designation";
import { useDispatch, useSelector } from "react-redux";
import { addDraft, createPost, openPostModal, updatePost } from "../../Redux/Slices/PostSlice";

function StartPostModal() {
  const isOpen = useSelector((state) => state.post.isStartPostModalOpen);
  if (!isOpen) return null;
  const dispatch = useDispatch();
  const post = useSelector((state) => state.post.post);
  const user = useSelector((state) => state.user.userData);
  const content = post.content;
  const [selectedFiles, setSelectedFiles] = useState(post?.media || []);

  const textareaRef = useRef(null);

  const addEmoji = (emoji) => {
    dispatch(addDraft({ content: content + emoji }));
  };

  // cursor Blinking
  useEffect(() => {
    const keepFocus = () => {
      if (document.activeElement !== textareaRef.current) {
        textareaRef.current?.focus();
      }
    };

    document.addEventListener("click", keepFocus);
    document.addEventListener("keydown", keepFocus);
    return () => {
      document.removeEventListener("click", keepFocus);
      document.removeEventListener("keydown", keepFocus);
    };
  }, []);

  const handleSubmit = () => {
    if(post.id){
      dispatch(updatePost({ mediaFiles: selectedFiles }));
    }else{
      // console.log("Post Not Available");
      dispatch(createPost({ mediaFiles: selectedFiles }));
    }
    dispatch(openPostModal(false))
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[9999]">
      <div className="relative w-[35rem] h-[35rem] bg-white shadow-lg rounded-lg  flex flex-col justify-start overflow-y-auto scrollbar-hide">
        <div className="h-[13%] w-full flex px-4 justify-between bg-gray-50 rounded-t-lg">
          <div className="h-full w-auto flex justify-evenly items-center gap-3 ">
            <ProfilePic picture={user?.profile_pic} />
            <Name_Designation name={user?.name} designation={user?.designation} />
          </div>
          <button
            className="absolute  text-gray-600 hover:text-black hover:bg-gray-300 rounded-full p-1 top-2 right-2"
            onClick={() => dispatch(openPostModal(false))}
          >
            <X size={26} />
          </button>
        </div>
        <div className="h-[87%] overflow-y-auto scrollbar-hide">
          <div className=" h-[68%] w-[100%] ">
            <textarea
              ref={textareaRef}
              name=""
              id=""
              value={content}
              onChange={(e) => dispatch(addDraft({ ...post, content: e.target.value }))}
              placeholder="What do you want to talk about?"
              className=" h-full w-full px-4 py-2 placeholder:text-xl outline-none resize-none scrollbar-hide"
            ></textarea>
          </div>
          <div className=" h-[30%] flex flex-col">
            <div className="h-auto flex flex-col justify-evenly">
              <div className="h-10 border-t flex justify-start items-center px-1">
                <EmojiButton onSelectEmoji={addEmoji} />
              </div>
              <div className="h-auto w-full flex justify-start items-center ">
                <FileUpload
                  selectedFiles={selectedFiles}
                  setSelectedFiles={setSelectedFiles}
                  existingMedia={post?.media || []}
                />

              </div>
            </div>
            <div className="h-24 mt-2 flex justify-end items-end px-2 py-1">
              <button
                onClick={handleSubmit}
                className="px-3  bg-slate-300 rounded-lg text-lg text-gray-800"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StartPostModal;
