import React, { useState } from "react";
import { ImageUp, Youtube, X, ChevronLeft, ChevronRight } from "lucide-react";

const FileUpload = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleFileChange = (event, fileType) => {
    const files = Array.from(event.target.files);
    console.log(files);
    const newFiles = files.map((file) => ({ file, type: fileType }));
    setSelectedFiles((prev) => [...prev, ...newFiles]);
  };

  const removeFile = () => {
    setSelectedFiles((prev) => {
      const updatedFiles = prev.filter((_, i) => i !== currentIndex);
      if (updatedFiles.length === 0) {
        setCurrentIndex(0);
      } else {
        setCurrentIndex((prev) => {
          const newIndex =
            (prev - 1 + updatedFiles.length) % updatedFiles.length;
          return newIndex < 0 ? 0 : newIndex;
        });
      }
      return updatedFiles;
    });
  };

  const nextSlide = () => {
    if (selectedFiles.length > 0) {
      setCurrentIndex((prev) => (prev + 1) % selectedFiles.length);
    }
  };

  const prevSlide = () => {
    if (selectedFiles.length > 0) {
      setCurrentIndex(
        (prev) => (prev - 1 + selectedFiles.length) % selectedFiles.length
      );
    }
  };

  return (
    <div className="px-1 flex flex-col justify-start items-start w-full h-auto">
      <div className="flex gap-4">
        <div className="relative w-10 h-10">
          <button className="w-10 h-10 flex justify-center items-center">
            <ImageUp color="gray" size={26} />
          </button>
          <input
            type="file"
            accept="image/*"
            multiple
            className="absolute inset-0 opacity-0"
            onChange={(e) => handleFileChange(e, "photo")}
          />
        </div>

        <div className="relative w-10 h-10">
          <button className="w-10 h-10 flex justify-center items-center">
            <Youtube color="gray" size={28} />
          </button>
          <input
            type="file"
            accept="video/mp4,video/webm,video/ogg"
            multiple
            className="absolute inset-0 opacity-0"
            onChange={(e) => handleFileChange(e, "video")}
          />
        </div>
      </div>

      {selectedFiles.length > 0 && selectedFiles[currentIndex] && (
        <div className="mt-4 relative w-full h-full flex items-center justify-between">
          <button
            className="absolute left-1 bg-gray-500 text-white p-2 rounded-full z-[9999]"
            onClick={prevSlide}
          >
            <ChevronLeft size={20} />
          </button>

          <div className="relative w-full h-full">
            <button
              className="absolute bg-red-400 text-white p-1 rounded-full right-3 mt-2 z-10"
              onClick={removeFile}
            >
              <X color="white" size={24} />
            </button>
            {selectedFiles[currentIndex]?.type === "photo" ? (
              <img
                src={URL.createObjectURL(selectedFiles[currentIndex].file)}
                alt="Selected"
                className="w-42 h-42 object-cover rounded-md"
              />
            ) : (
              <video controls className="w-full h-42 rounded-md object-cover">
                <source
                  src={URL.createObjectURL(selectedFiles[currentIndex].file)}
                  type="video/mp4"
                />
              </video>
            )}
          </div>

          <button
            className="absolute right-1 bg-gray-500 text-white p-2 rounded-full"
            onClick={nextSlide}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
