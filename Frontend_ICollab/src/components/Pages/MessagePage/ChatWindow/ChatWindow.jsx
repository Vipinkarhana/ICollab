import React from "react";
import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

const ChatWindow = ({ chatData }) => {
  console.log(chatData);
  
  return (
    <div className="flex flex-col w-full h-full bg-violet-50">
      <ChatHeader
        avatar={chatData.avatar}
        name={chatData.name}
        isOnline={chatData.isOnline}
      />
      <MessageList messages={chatData.messages} isGroup={chatData.isGroup} />
      <MessageInput />
    </div>
  );
};

export default ChatWindow;

