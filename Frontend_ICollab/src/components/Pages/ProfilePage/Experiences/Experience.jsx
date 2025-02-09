import React,{useState} from "react";

function Experience({ experience }) {
  const [isFullTextVisible, setIsFullTextVisible] = useState(false);
        const words = experience.description.split(" ");
        const wordLimit = 12;
        const textToDisplay = isFullTextVisible
          ? experience.description
          : words.slice(0, wordLimit).join(" ");
  return (
    <div className="h-auto  p-2 flex flex-col justify-center gap-2 rounded-md  border ">
      <div className="h-16 w-full  flex items-center gap-4 p-2 ml-4">
        <div className="h-auto w-auto   flex justify-center items-center">
          <img
            src={experience.logo}
            alt="Company Logo"
            className="h-16 w-16 object-cover object-center "
          />
        </div>

        <div className="flex flex-col justify-center ">
          <div className="text-lg font-medium text-gray-800">
            {experience.title}
          </div>
          <div className="text-sm font-medium text-gray-600">
            {experience.company}
          </div>
          <div className="text-sm font-medium text-gray-600">
            {experience.duration}
          </div>
        </div>
      </div>
      <div className=" h-auto  flex justify-center items-center">
        <div className="h-auto w-[95%] text-lg text-gray-700 px-2 ml-2">
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
    </div>
  );
}

export default Experience;
