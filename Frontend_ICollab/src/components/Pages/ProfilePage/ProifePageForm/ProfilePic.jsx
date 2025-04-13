import React, { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, Pencil } from "lucide-react";

const avatarsData = [
  { id: 1, image: "https://cdn-icons-png.flaticon.com/512/4140/4140048.png" },
  { id: 2, image: "https://cdn-icons-png.flaticon.com/512/4140/4140037.png" },
  { id: 3, image: "https://cdn-icons-png.flaticon.com/512/4140/4140061.png" },
  { id: 4, image: "https://cdn-icons-png.flaticon.com/512/4140/4140048.png" },
  { id: 5, image: "https://cdn-icons-png.flaticon.com/512/4140/4140037.png" },
  { id: 6, image: "https://cdn-icons-png.flaticon.com/512/4140/4140061.png" },
  { id: 7, image: "/Avatarman1.png" },
  { id: 8, image: "/Avatarold-woman.png" },
  { id: 9, image: "/Avatarold-man.png" },
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
        <div className="relative w-full flex items-center justify-center">
          {/* Left Arrow */}
          <button
            onClick={handlePrev}
            className="absolute md:left-36 left-1 sm:left-6 z-10 p-2 bg-white rounded-full shadow hover:bg-gray-100 transition"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Avatars */}
          <div className="flex flex-col sm:flex-row gap-6 px-4 sm:px-12 justify-center items-center w-full max-w-full">
            {visibleAvatars.map((avatar, index) => {
              const isCenter = index === 1;
              return (
                <div
                  className="relative group shrink-0 transition-transform duration-300 ease-in-out"
                  key={avatar.id}
                >
                  <img
                    src={avatar.image}
                    alt="avatar"
                    className={`rounded-full shadow-lg object-cover transform cursor-pointer mx-auto ${
                      isCenter
                        ? "w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 hover:scale-110"
                        : "w-24 h-24 sm:w-28 sm:h-28 opacity-80 hover:scale-105"
                    }`}
                  />
                  {/* Pencil only on center avatar */}
                  {isCenter && (
                    <div
                      className="absolute top-1 right-1 bg-blue-100 p-2 rounded-full cursor-pointer hover:bg-blue-200 transition"
                      onClick={() => triggerFileInput(index)}
                    >
                      <Pencil size={24} className="text-blue-600" />
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
            className="absolute md:right-36 right-1 sm:right-6 z-10 p-2 bg-white rounded-full shadow hover:bg-gray-100 transition"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfilePic;
