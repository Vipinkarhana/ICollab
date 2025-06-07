import React, { useState } from "react";
import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import KanbanBoard from "./KanbanBoard";

const ChatWindow = ({ chatData }) => {
  const [viewMode, setViewMode] = useState("chat"); // 'chat' or 'kanbanBoard'

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
          <MessageList messages={chatData.messages} isGroup={chatData.isGroup} />
          <MessageInput />
        </>
      )}

      {viewMode === "kanbanBoard" && <KanbanBoard />}
    </div>
  );
};

export default ChatWindow;



