import React from "react";

const SectionHeading = ({ heading, photo, text_content, video }) => {
  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Heading */}
      {heading && (
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center md:text-left">
          {heading}
        </h2>
      )}

      {/* Photo Section */}
      {photo && (
        <div className="flex justify-center">
        <img
          src={photo}
          alt="Media Content"
          className="w-[90%] max-w-2xl object-contain  rounded-lg mb-6 shadow-lg "
        />
        </div>
      )}

      {/* Text Content */}
      {text_content && (
        <p className="text-lg text-gray-600 mb-6 leading-relaxed">
          {text_content}
        </p>
      )}

      {/* Video Section */}
      {video && (
        <div className="relative w-full aspect-video rounded-lg overflow-hidden  mb-6 flex justify-center">
          <iframe
            src={video}
            title="Video Content"
            allowFullScreen
            className="w-[80%] h-[80%]"
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default SectionHeading;
