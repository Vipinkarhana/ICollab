import React, { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, Pencil } from "lucide-react";

const avatarsData = [
  { id: 1, image: "https://cdn-icons-png.flaticon.com/512/4140/4140048.png" },
  { id: 2, image: "https://cdn-icons-png.flaticon.com/512/4140/4140037.png" },
  { id: 3, image: "https://cdn-icons-png.flaticon.com/512/4140/4140061.png" },
  { id: 4, image: "https://cdn-icons-png.flaticon.com/512/4140/4140048.png" },
  { id: 5, image: "https://cdn-icons-png.flaticon.com/512/4140/4140037.png" },
  { id: 6, image: "https://cdn-icons-png.flaticon.com/512/4140/4140061.png" },
];

function ProfilePic() {
  const [avatars, setAvatars] = useState(avatarsData);
  const [startIndex, setStartIndex] = useState(0);
  const fileInputRefs = useRef([]);

  const visibleAvatars = avatars.slice(startIndex, startIndex + 3);

  useEffect(() => {
    fileInputRefs.current = visibleAvatars.map(
      (_, i) => fileInputRefs.current[i] ?? React.createRef()
    );
  }, [startIndex]);

  const handlePrev = () => {
    setStartIndex((prev) => (prev === 0 ? avatars.length - 3 : prev - 1));
  };

  const handleNext = () => {
    setStartIndex((prev) => (prev + 3 >= avatars.length ? 0 : prev + 1));
  };

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const updatedAvatars = [...avatars];
        updatedAvatars[startIndex + index].image = reader.result;
        setAvatars(updatedAvatars);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = (index) => {
    fileInputRefs.current[index].current.click();
  };

  return (
    <div className="bg-gray-50 min-h-screen px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8 text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800">
            Choose Your Avatar
          </h1>
          <button className="px-5 sm:px-6 py-2 bg-blue-600 text-white text-sm sm:text-base font-medium rounded hover:bg-blue-700 transition">
            Save Avatar
          </button>
        </div>

        {/* Avatar Carousel */}
        <div className="relative w-full flex items-center justify-center overflow-hidden">
          {/* Left Arrow */}
          <button
            onClick={handlePrev}
            className="absolute md:left-36 left-2 sm:left-6 z-10 p-2 bg-white rounded-full shadow hover:bg-gray-100 transition"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Avatars */}
          <div className="flex flex-col sm:flex-row gap-6 px-4 sm:px-12 justify-center items-center w-full max-w-full">
            {visibleAvatars.map((avatar, index) => {
              const isCenter = index === 1;
              return (
                <div className="relative group shrink-0" key={avatar.id}>
                  <img
                    src={avatar.image}
                    alt="avatar"
                    className={`rounded-full border-4 shadow-lg object-cover transition-transform duration-300 transform cursor-pointer mx-auto ${
                      isCenter
                        ? "w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 border-blue-500 hover:scale-110"
                        : "w-20 h-20 sm:w-24 sm:h-24 border-blue-300 opacity-80 hover:scale-105"
                    }`}
                  />
                  {isCenter && (
                    <div
                      className="absolute top-1 right-1 bg-blue-100 p-1 rounded-full cursor-pointer hover:bg-blue-200 transition"
                      onClick={() => triggerFileInput(index)}
                    >
                      <Pencil size={16} className="text-blue-600" />
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    ref={fileInputRefs.current[index]}
                    onChange={(e) => handleImageChange(e, index)}
                  />
                </div>
              );
            })}
          </div>

          {/* Right Arrow */}
          <button
            onClick={handleNext}
            className="absolute md:right-36 right-2 sm:right-6 z-10 p-2 bg-white rounded-full shadow hover:bg-gray-100 transition"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfilePic;
