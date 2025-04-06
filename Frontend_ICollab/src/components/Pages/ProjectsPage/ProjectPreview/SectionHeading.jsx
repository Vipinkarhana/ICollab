import React from "react";

const SectionHeading = ({ heading, photo, text_content, video }) => {
  return (
    <div className="max-w-5xl  p-6">
      {/* Heading */}
      {heading && (
        <h2 className="text-[2rem] font-semibold text-gray-800 mb-6 text-center md:text-left">
          {heading}
        </h2>
      )}

      {/* Photo Section */}
      {photo && (
        <div className="flex ">
        <img
          src={photo}
          alt="Media Content"
          className="w-[90%] max-w-2xl object-contain  rounded-lg mb-6  "
        />
        </div>
      )}

      {/* Text Content */}
      {text_content && (
        <p className="text-xl text-gray-600 mb-6 leading-relaxed text-justify">
          {text_content}
        </p>
      )}

      {/* Video Section */}
      {video && (
        <div className="relative w-full aspect-video  overflow-hidden  flex ">
          <iframe
            src={video}
            title="Video Content"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default SectionHeading;
