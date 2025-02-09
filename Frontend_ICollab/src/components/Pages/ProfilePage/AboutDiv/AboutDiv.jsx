import { React,useState } from 'react'
import { Pencil } from 'lucide-react';
function AboutDiv({text}) {
  const [isFullTextVisible, setIsFullTextVisible] = useState(false);
      const words = text.split(" ");
      const wordLimit = 30;
      const textToDisplay = isFullTextVisible
        ? text
        : words.slice(0, wordLimit).join(" ");
  return (
    <div className="w-[100%] h-auto bg-gray-200 rounded-md flex flex-col justify-around items-center border border-gray-400 text-gray-800">
      <div className="h-12 w-[100%] flex justify-between items-center py-2 px-4 border-b border-gray-400">
        <div className="text-2xl font-semibold ">
          <p>About</p>
        </div>
        <div className="w-[4%]   flex  items-start justify-center ">
          <button className="rounded-full hover:bg-slate-300 p-2">
            <Pencil size={24} />
          </button>
        </div>
      </div>
      <div className="h-auto w-[95%] py-2">
        <p
          style={{ whiteSpace: "pre-wrap" }}
          className="text-md text-gray-800 "
        >
          {textToDisplay}
          {words.length > wordLimit && (
            <button
              className="text-gray-700 font-semibold hover:text-blue-600"
              onClick={() => setIsFullTextVisible(!isFullTextVisible)}
            >
              {isFullTextVisible ? "..see less" : "...more"}
            </button>
          )}
        </p>
      </div>
    </div>
  );
}

export default AboutDiv
