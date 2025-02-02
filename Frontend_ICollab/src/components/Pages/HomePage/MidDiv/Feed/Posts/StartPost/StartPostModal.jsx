import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import ProfilePic from "../../../../../../Common/ProfilePic";
import EmojiButton from "./EmojiButton";
import FileUpload from "./FileUpload";
import Name_Designation from "../../../../../../Common/Name&Designation";

function StartPostModal({ isOpen, SetIsOpen }) {
  if (!isOpen) return null;
  const [text, setText] = useState("");

  const textareaRef = useRef(null);

  const addEmoji = (emoji) => {
    setText((prev) => prev + emoji);
  };

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

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative w-[35rem] h-[35rem] bg-white shadow-lg rounded-lg  flex flex-col justify-start overflow-y-auto">
        <div className="h-[13%] w-full flex px-4 justify-between bg-gray-50 rounded-t-lg">
          <div className="h-full w-auto flex justify-evenly items-center ">
            <ProfilePic />
            <Name_Designation />
          </div>
          <button
            className="absolute  text-gray-600 hover:text-black hover:bg-gray-300 rounded-full p-1 top-2 right-2"
            onClick={() => SetIsOpen(false)}
          >
            <X size={26} />
          </button>
        </div>
        <div className="h-[87%] overflow-y-auto">
          <div className=" h-[68%] w-[100%] ">
            <textarea
              ref={textareaRef}
              name=""
              id=""
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="What do you want to talk about?"
              className=" h-full w-full px-4 py-2 placeholder:text-xl outline-none resize-none"
            ></textarea>
          </div>
          <div className=" h-[30%] flex flex-col">
            <div className="h-auto flex flex-col justify-evenly">
              <div className="h-10 border-t flex justify-start items-center px-1">
                <EmojiButton onSelectEmoji={addEmoji} />
              </div>
              <div className="h-auto w-full flex justify-start items-center ">
                <FileUpload />
              </div>
            </div>
            <div className="h-24 mt-2 flex justify-end items-end px-2 py-1">
              <button
                onClick={() => {
                  console.log("action");
                }}
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
