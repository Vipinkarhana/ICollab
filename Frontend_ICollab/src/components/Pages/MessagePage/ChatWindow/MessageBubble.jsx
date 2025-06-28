import React from "react";

const MessageBubble = ({
  message = "No message",
  isSender = false,
  timestamp = new Date().toISOString(),
  sender = "Someone",
  isGroup,
  showTimestamp,
  showSenderName,
}) => {
  const formattedTime = new Date(timestamp).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <div
      className={`flex flex-col ${isSender ? "items-end" : "items-start"} w-full px-4`}
    >
      {isGroup && showSenderName && (
        <span className="text-xs text-gray-700 mb-1 ml-2">{sender}</span>
      )}

      <div
        className={`max-w-xs px-4 py-2 rounded-lg shadow ${
          isSender
            ? "bg-violet-500 text-white rounded-br-none"
            : "bg-white text-violet-900 rounded-bl-none"
        }`}
      >
        {message}
      </div>

      {showTimestamp && (
        <span className="text-[10px] text-gray-700 mt-1">{formattedTime}</span>
      )}
    </div>
  );
};

export default MessageBubble;
