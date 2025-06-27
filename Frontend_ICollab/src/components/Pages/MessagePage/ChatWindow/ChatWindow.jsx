import React, { useState, useEffect } from "react";
import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import KanbanBoard from "./KanbanBoard";

const ChatWindow = ({ chatData }) => {
  const [viewMode, setViewMode] = useState("chat");
  console.log("ChatWindow rendered with chatData:", chatData);
  if (!chatData) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        Select a group to start chatting
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full h-full bg-violet-50">
      <ChatHeader
        avatar={chatData.avatar}
        name={chatData.name}
        isOnline={chatData.isOnline}
        members={chatData.members}
        isGroup={chatData.isGroup}
        setViewMode={setViewMode}
      />

      {viewMode === "chat" && (
        <>
          <MessageList messages={chatData.messages || []} isGroup={chatData.isGroup} />
          <MessageInput />
        </>
      )}

      {viewMode === "kanbanBoard" && <KanbanBoard />}
    </div>
  );
};

export default ChatWindow;






