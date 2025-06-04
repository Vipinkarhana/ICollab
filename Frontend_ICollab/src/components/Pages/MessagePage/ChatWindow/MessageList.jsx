import React, { useRef, useEffect } from "react";
import MessageBubble from "./MessageBubble";

const MessageList = ({ messages , isGroup}) => {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2 scrollbar-thin scrollbar-thumb-violet-300 scrollbar-track-gray-100">
     {messages.map((msg) => (
  <MessageBubble
    key={msg?.id}
    message={msg?.message}
    isSender={msg?.isSender}
    timestamp={msg?.timestamp}
    sender={msg?.sender}
    isGroup={isGroup}
  />
))}
      <div ref={bottomRef} />
    </div>
  );
};

export default MessageList;
