import React from 'react';

const Head = () => {
  return (
    <div className='w-full px-4'>
      {/* Project Title */}
      <div className="text-4xl font-bold text-gray-800 text-center md:text-left mt-6 mb-8">
        Project Title
      </div>

      {/* Image Section */}
      <div className="bg-white rounded-2xl  w-full max-w-full overflow-hidden flex justify-center">
        <img
          src="/LandingImage.png"
          alt="Landing Image"
          className="w-auto h-[20rem] md:h-[30rem] lg:h-[40rem] " // Adjusted height and used object-contain
        />
      </div>
    </div>
  );
};

export default Head;
