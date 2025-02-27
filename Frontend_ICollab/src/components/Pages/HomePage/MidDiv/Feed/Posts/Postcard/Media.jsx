/**
 * @file Media.js
 * @brief A component to display and navigate through media (images/videos).
 *
 * This component handles:
 * - Displaying **single/multiple images** with navigation.
 * - Playing **videos** when applicable.
 * - Providing **left/right navigation** for multiple images.
 *
 * @author [Your Name]
 * @date 2025-02-20
 */

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
/**
 * @class Media
 * @brief Handles media display including images and videos.
 *
 * Features:
 * - Displays **single images** or **multiple images with navigation**.
 * - Detects and plays **video files** (MP4).
 * - Provides **left/right buttons** for navigation.
 *
 * @param {Object} props - React props.
 * @param {Array} props.media - An array of media URLs (images or videos).
 *
 * @returns {JSX.Element | null} The rendered media component.
 */

const Media = ({ media }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const isMultiMedia = media && media.length > 1;

  // Return nothing if media is empty
  if (!media || media.length === 0) return null;

  const mediaItem = media[currentIndex];
  const isVideo = typeof mediaItem === "string" && mediaItem.trim().endsWith(".mp4");

  // If it's a video, display a video player
  if (isVideo) {
    return (
      <div className="w-full h-auto py-2 px-1">
        <video src={media} controls className="w-full h-full object-cover rounded-md" />
      </div>
    );
  }

  // Navigation Handlers
  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? media.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev === media.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-[90%] h-auto flex items-center justify-center py-2">
      {isMultiMedia && (
        <button
          onClick={prevImage}
          className="absolute -left-10 p-2 rounded-full  opacity-75 group-hover:opacity-100 text-gray-900"
        >
          <ChevronLeft size={36} color="gray" strokeWidth={3} />
        </button>
      )}
      <div className="h-[60svh] w-auto max-w-[90%]">
        <img
          src={media[currentIndex]}
          alt="Post Media"
          className="w-full h-full object-contain rounded-md"
        />
      </div>

      {isMultiMedia && (
        <button
          onClick={nextImage}
          className="absolute -right-10  p-2 rounded-full text-white opacity-75 hover:opacity-100"
        >
          <ChevronRight size={36} color="gray" strokeWidth={3} />
        </button>
      )}
    </div>
  );
};

export default Media;
