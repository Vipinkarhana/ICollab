import React, { useRef, useEffect } from "react";
import MessageBubble from "./MessageBubble";

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  if (date.toDateString() === today.toDateString()) return "Today";
  if (date.toDateString() === yesterday.toDateString()) return "Yesterday";

  return date.toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const groupMessagesByDate = (messages) => {
  const grouped = {};
  messages.forEach((msg) => {
    const dateKey = formatDate(msg.timestamp);
    if (!grouped[dateKey]) grouped[dateKey] = [];
    grouped[dateKey].push(msg);
  });
  return grouped;
};

const sortGroupKeysByOriginalDate = (grouped, messages) => {
  const dateMap = {};
  messages.forEach((msg) => {
    const label = formatDate(msg.timestamp);
    if (!dateMap[label]) dateMap[label] = new Date(msg.timestamp);
  });

  return Object.keys(grouped).sort((a, b) => dateMap[a] - dateMap[b]);
};

const MessageList = ({ messages, isGroup }) => {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const groupedMessages = groupMessagesByDate(messages);
  const sortedGroupKeys = sortGroupKeysByOriginalDate(groupedMessages, messages);

  return (
    <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4 scrollbar-thin scrollbar-thumb-violet-300 scrollbar-track-gray-100">
      {sortedGroupKeys.map((date) => (
        <div key={date} className="space-y-2">
          <div className="text-center text-xs text-gray-500">{date}</div>
          {groupedMessages[date].map((msg, index, arr) => {
            const isLastInGroup =
              index === arr.length - 1 ||
              arr[index + 1].sender !== msg.sender ||
              arr[index + 1].isSender !== msg.isSender;

            const isFirstInGroup =
              index === 0 ||
              arr[index - 1].sender !== msg.sender ||
              arr[index - 1].isSender !== msg.isSender;

            return (
              <MessageBubble
                key={msg?.id}
                message={msg?.message}
                isSender={msg?.isSender}
                timestamp={msg?.timestamp}
                sender={msg?.sender}
                isGroup={isGroup}
                showTimestamp={isLastInGroup}
                showSenderName={isFirstInGroup}
              />
            );
          })}
        </div>
      ))}
      <div ref={bottomRef} />
    </div>
  );
};

export default MessageList;
