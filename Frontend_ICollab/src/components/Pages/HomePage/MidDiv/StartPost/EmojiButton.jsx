import React, { useState, useRef } from "react";
import { SmilePlus } from "lucide-react";
import EmojiPicker from "emoji-picker-react";

const EmojiButton = ({ onSelectEmoji }) => {
  console.log("EmojiButton Component Rendered");

  const [showPicker, setShowPicker] = useState(false);
  const pickerRef = useRef(null);

  const onEmojiClick = (emojiData) => {
    onSelectEmoji(emojiData.emoji);
  };

  const handleClickOutside = (event) => {
    if (pickerRef.current && !pickerRef.current.contains(event.target)) {
      setShowPicker(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative ">
      <button
        className="p-2"
        onClick={(e) => {
          e.stopPropagation();
          setShowPicker(!showPicker);
        }}
      >
        <SmilePlus color="gray" size={26} /> 
      </button>
      {showPicker && (
        <div ref={pickerRef} className="absolute -right-96 bottom-12 shadow-lg ">
          <EmojiPicker onEmojiClick={onEmojiClick} />
        </div>
      )}
    </div>
  );
};

export default EmojiButton;
