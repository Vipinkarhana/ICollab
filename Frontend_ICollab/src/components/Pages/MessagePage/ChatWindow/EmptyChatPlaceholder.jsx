import React from "react";

const EmptyChatPlaceholder = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-violet-50 text-gray-600">
      <img
        src="/BgChatWindow.png"
        alt="Start Chat Illustration"
        className="w-66 h-48 mb-6 opacity-70"
      />
      <h2 className="text-xl font-semibold mb-2">Start a Conversation</h2>
      <p className="text-center text-sm max-w-xs">
        Select a group from the left panel to begin chatting with your team or friends.
      </p>
    </div>
  );
};

export default EmptyChatPlaceholder;
