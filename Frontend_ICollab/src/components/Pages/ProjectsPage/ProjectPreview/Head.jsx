import React from 'react';

const Head = () => {
  return (
    <div className='w-full px-4'>
      <div className="text-[2.7rem] font-semibold text-gray-800 text-center md:text-left  mb-4">
        Project Title
      </div>

      <div className="bg-white rounded-2xl  w-full max-w-full overflow-hidden">
        <img
          src="/LandingImage.png"
          alt="Landing Image"
          className="w-auto h-[20rem] md:h-[30rem] lg:h-[40rem] " 
        />
      </div>
    </div>
  );
};

export default Head;
