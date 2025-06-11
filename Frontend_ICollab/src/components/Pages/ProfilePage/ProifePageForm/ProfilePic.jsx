import React, { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, Pencil } from "lucide-react";
import CropperWithZoomButtons from "../../../Common/cropImage";

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

function ProfilePic({ setActiveTab }) {
  const [avatars, setAvatars] = useState(avatarsData);
  const [startIndex, setStartIndex] = useState(0);
  const [selectedAvatarId, setSelectedAvatarId] = useState(null);
  const [showSavedMessage, setShowSavedMessage] = useState(false);
  const [visibleCount, setVisibleCount] = useState(window.innerWidth < 640 ? 1 : 3);
  const fileInputRefs = useRef([]);
  const [cropperOpen, setCropperOpen] = useState(false);
  const [imageToCrop, setImageToCrop] = useState(null);
  const [croppingIndex, setCroppingIndex] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      setVisibleCount(window.innerWidth < 640 ? 1 : 3);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Initialize or update refs array when visible avatars change
  useEffect(() => {
    fileInputRefs.current = visibleAvatars.map(
      (_, i) => fileInputRefs.current[i] ?? React.createRef()
    );
  }, [startIndex, visibleCount]);

  const visibleAvatars = avatars.slice(startIndex, startIndex + visibleCount);

  const handlePrev = () => {
    setStartIndex((prev) =>
      prev === 0 ? avatars.length - visibleCount : prev - 1
    );
  };

  const handleNext = () => {
    setStartIndex((prev) =>
      prev + visibleCount >= avatars.length ? 0 : prev + visibleCount
    );
  };

  const triggerFileInput = (index) => {
    if (fileInputRefs.current[index]?.current) {
      fileInputRefs.current[index].current.click();
    }
  };

  const handleImageChange = (e, index) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageToCrop(reader.result); // ✅ base64 image
      setCroppingIndex(startIndex + index);
      setCropperOpen(true); // ✅ open cropper
    };
    reader.readAsDataURL(file); 
  }
};

  const handleCropCancel = () => {
    setCropperOpen(false);
    setImageToCrop(null);
    setCroppingIndex(null);
  };

  // Important: croppedImage must be a base64 string or URL!
  const handleCropDone = (croppedImage) => {
    console.log("Cropped Image:", croppedImage); // Debug: check what is received
    if (!croppedImage) {
      alert("Crop failed. Please try again.");
      return;
    }
    const updatedAvatars = [...avatars];
    updatedAvatars[croppingIndex].image = croppedImage;
    setAvatars(updatedAvatars);
    setSelectedAvatarId(updatedAvatars[croppingIndex].id);
    handleCropCancel();
  };

  const handleSaveAvatar = () => {
    if (!selectedAvatarId) {
      alert("Please select an avatar first!");
      return;
    }
    setShowSavedMessage(true);
    setTimeout(() => setShowSavedMessage(false), 2500);
  };

  return (
    <div className="bg-gray-50 min-h-[70vh] w-full px-4 sm:px-6 lg:px-8 py-8 flex items-center justify-center">
      <div className="w-full max-w-5xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-24 text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800">
            Choose Your Avatar
          </h1>
          <div className="flex flex-col items-center sm:items-end gap-1">
            <button
              onClick={handleSaveAvatar}
              className="px-5 sm:px-6 py-2 bg-blue-600 text-white text-sm sm:text-base font-medium rounded hover:bg-blue-700 transition"
            >
              Save Avatar
            </button>
            {showSavedMessage && (
              <span className="text-green-600 text-sm mt-1">
                ✅ Avatar saved successfully!
              </span>
            )}
          </div>
        </div>

        {/* Avatar Carousel */}
        <div className="relative w-full flex items-center justify-center mb-24">
          <button
            onClick={handlePrev}
            className="absolute left-0 sm:left-32 z-10 p-2 bg-white rounded-full shadow hover:bg-gray-100 transition"
          >
            <ChevronLeft size={24} />
          </button>

          <div className="flex flex-row gap-6 px-4 sm:px-12 justify-center items-center w-full max-w-full py-4">
            {visibleAvatars.map((avatar, index) => {
              const isCenter = visibleCount === 1 || index === 1;
              return (
                <div
                  key={avatar.id}
                  className="relative group shrink-0 transition-transform duration-300 ease-in-out"
                >
                  <img
                    src={avatar.image}
                    alt="avatar"
                    onClick={() => setSelectedAvatarId(avatar.id)}
                    className={`rounded-full shadow-lg object-cover transform cursor-pointer mx-auto border-none ${
                      isCenter
                        ? "w-36 h-36 sm:w-36 sm:h-36 md:w-60 md:h-60 hover:scale-110"
                        : "w-24 h-24 sm:w-36 sm:h-36 opacity-80 hover:scale-105"
                    }`}
                  />
                  {isCenter && (
                    <div
                      className="absolute top-1 right-1 bg-blue-100 p-3 rounded-full cursor-pointer transition"
                      onClick={() => triggerFileInput(index)}
                    >
                      <Pencil className="text-blue-600 w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8" />
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    ref={(el) => (fileInputRefs.current[index] = { current: el })}
                    onChange={(e) => handleImageChange(e, index)}
                  />
                </div>
              );
            })}
          </div>

          <button
            onClick={handleNext}
            className="absolute right-0 sm:right-32 z-10 p-2 bg-white rounded-full shadow hover:bg-gray-100 transition"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        <div className="flex justify-end mt-8">
          <button
            onClick={() => setActiveTab("ABOUT")}
            className="px-6 py-2 bg-blue-400 text-white font-semibold rounded hover:bg-blue-700 transition"
          >
            Next
          </button>
        </div>
      </div>

      {/* Cropper Modal */}
   {cropperOpen && (
  <CropperWithZoomButtons
    imageSrc={imageToCrop}
    onCancel={handleCropCancel}
    onCropDone={handleCropDone}
  />
)}
    </div>
  );
}

export default ProfilePic;
