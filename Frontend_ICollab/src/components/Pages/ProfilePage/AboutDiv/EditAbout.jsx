import { useEffect, useRef } from "react";
import { X } from "lucide-react";
function EditAbout({ SetIsOpen, isOpen }) {
  const textareaRef = useRef(null);
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
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative w-[35rem] h-auto bg-white shadow-lg rounded-lg  flex flex-col justify-start ">
        <div className="h-14 border-b flex justify-between items-center border-gray-300">
          <div className="h-full w-[30%] flex justify-center items-center text-2xl text-gray-700 font-semibold">
            <p>Edit About</p>
          </div>
          <button
            className="absolute  text-gray-600 hover:text-black hover:bg-gray-300 rounded-full p-1 top-2 right-2"
            onClick={() => SetIsOpen(false)}
          >
            <X size={26} />
          </button>
        </div>
        <div className="h-96 w-[100%] ">
          <textarea
            ref={textareaRef}
            name=""
            id=""
            placeholder="Write About Yourself..."
            className=" h-full w-full px-4 py-2 placeholder:text-xl outline-none resize-none scrollbar-hide"
          ></textarea>
        </div>
        <div className="h-12 border-t border-gray-300 flex items-center justify-end px-2">
          <button className="h-6 text-lg flex justify-center items-center w-16 text-gray-700 bg-gray-200 border border-gray-500 rounded-md p-4">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditAbout;
