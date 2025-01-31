import { useEffect, useRef,useState } from "react";
import { X } from "lucide-react";
import ProfilePic from "../../../../Common/ProfilePic";
import EmojiButton from "./EmojiButton";
import FileUpload from "./FileUpload";

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
      <div className="relative w-[35rem] h-[35rem] bg-white shadow-lg rounded-lg  flex flex-col justify-start">
        <div className="h-[13%] w-full flex px-4 justify-between bg-gray-50 rounded-t-lg">
          <div className="h-full w-auto flex justify-evenly items-center ">
            <ProfilePic />
            <div className="flex h-16 px-4 py-2 flex-col ">
              <div className="text-xl font-bold">
                <p>Jhon Dews</p>
              </div>
              <div className="text-gray-900">
                <p>IT, Software Engineer</p>
              </div>
            </div>
          </div>
          <button
            className="absolute  text-gray-600 hover:text-black hover:bg-gray-300 rounded-full p-1 top-2 right-2"
            onClick={() => SetIsOpen(false)}
          >
            <X size={26} />
          </button>
        </div>
        <div className=" h-[63%] w-[100%] ">
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
        <div className=" h-[24%] flex flex-col">
          <div className="h-[60%] ">
            <div className="h-[50%] border-t flex justify-start items-center px-2">
              <EmojiButton onSelectEmoji={addEmoji} />
            </div>
            <div className="h-[50%]  flex justify-start items-center px-2">
              <FileUpload/>
            </div>
          </div>
          <div className="h-[40%]  flex justify-end items-center px-2">
            <button className="px-3  bg-slate-300 rounded-lg text-lg text-gray-800">
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StartPostModal;
