import React, { useState } from "react";

const Media = ({ media }) => {
  const [expanded, setExpanded] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false); // New state for preloader

  if (!media || media.length === 0) return null;

  const handleExpand = (index = 0) => {
    setCurrentIndex(index);
    setExpanded(true);
  };

  const handleClose = (e) => {
    if (e.target.id === "expanded-view" || e.target.id === "close-btn") {
      setExpanded(false);
    }
  };

  const handlePrev = () => {
    setLoading(true); // Show preloader
    setCurrentIndex((prev) => (prev === 0 ? media.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setLoading(true); // Show preloader
    setCurrentIndex((prev) => (prev === media.length - 1 ? 0 : prev + 1));
  };

  if (expanded && media.length > 1) {
    const isVideo = media[currentIndex].endsWith(".mp4");

    return (
      <div
        id="expanded-view"
        className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-6 mt-14 overflow-hidden "
        onClick={handleClose}
      >
        <div className="relative max-w-5xl w-full max-h-[90vh] bg-white rounded-lg overflow-hidden flex flex-col items-center">
          {/* Close Button */}
          <button
            id="close-btn"
            className="absolute top-2 right-2 text-white bg-red-600 px-3 py-1 rounded z-10"
            onClick={handleClose}
          >
            ✕
          </button>

          {/* Preloader */}
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
              <div className="loader border-t-4 border-white rounded-full w-12 h-12 animate-spin"></div>
            </div>
          )}

          {/* Media Display */}
          <div className="flex-grow w-full flex items-center justify-center overflow-hidden">
            {isVideo ? (
              <video
                src={media[currentIndex]}
                controls
                className="max-h-[75vh] max-w-full object-contain"
                onCanPlay={() => setLoading(false)} // Hide preloader when video is ready
              />
            ) : (
              <div className="overflow-auto scrollbar-hide min-h-[35svh] max-h-[75vh] max-w-full p-2">
                <img
                  src={media[currentIndex]}
                  alt="Expanded Media"
                  className="max-h-[75vh] min-h-[35svh] max-w-full object-contain cursor-zoom-in"
                  onLoad={() => setLoading(false)} // Hide preloader when image is loaded
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="w-full flex justify-between items-center p-4 bg-black text-white">
            <button
              onClick={handlePrev}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded"
            >
              ◀ Prev
            </button>
            <span>
              {currentIndex + 1} / {media.length}
            </span>
            <button
              onClick={handleNext}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded"
            >
              Next ▶
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (expanded && media.length === 1) {
    return (
      <div
        id="expanded-view"
        className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
        onClick={handleClose}
      >
        <div className="max-w-4xl w-full bg-white rounded-lg overflow-hidden relative">
          <button
            id="close-btn"
            className="absolute top-2 right-2 text-white bg-red-600 px-3 py-1 rounded z-10"
            onClick={handleClose}
          >
            ✕
          </button>
          <img
            src={media[0]}
            alt="Expanded Media"
            className="w-full max-h-[80vh] object-contain"
          />
        </div>
      </div>
    );
  }

  if (media.length === 1) {
    const isVideo = media[0].endsWith(".mp4");
    return (
      <div className="w-full h-auto py-2 px-1" onClick={() => handleExpand(0)}>
        {isVideo ? (
          <video
            src={media[0]}
            controls
            className="w-full h-full object-cover rounded-md"
          />
        ) : (
          <img
            src={media[0]}
            alt="Post Media"
            className="w-full h-auto rounded-md"
          />
        )}
      </div>
    );
  }

  const visibleImages = media.slice(0, 3);
  const remainingCount = media.length - 3;

  return (
    <div
      className="grid gap-1 overflow-hidden cursor-pointer"
      style={getCollageGridStyle(media.length)}
      onClick={() => handleExpand(0)}
    >
      {visibleImages.map((item, index) => (
        <div
          key={index}
          className={`relative ${getCollageCellClass(index, media.length)}`}
        >
          <img
            src={item}
            alt={`Media ${index}`}
            className="w-full h-full object-cover"
          />
          {index === 2 && remainingCount > 0 && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white text-2xl font-bold rounded-md">
              +{remainingCount}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

const getCollageGridStyle = (count) => {
  if (count === 2) {
    return {
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)",
      gridTemplateRows: "1fr",
      height: "auto",
      minHeight: "320px",
    };
  }
  return {
    display: "grid",
    gridTemplateColumns: count >= 3 ? "2fr 1fr" : "repeat(2, 1fr)",
    gridTemplateRows: "1fr 1fr",
    height: "auto",
    minHeight: count >= 3 ? "450px" : "250px",
    maxHeight: "500px",
  };
};

const getCollageCellClass = (index, count) => {
  if (count === 2) {
    return "col-span-1 row-span-1 h-full";
  }
  if (index === 0) return "col-span-1 row-span-2 h-full";
  return "col-span-1 row-span-1 h-full";
};

export default Media;
