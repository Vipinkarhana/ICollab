import React, { useEffect, useState } from "react";
import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import KanbanBoard from "./KanbanBoard";
import { getAblyInstance } from "../../../../utils/ablyClient";
import { useSelector } from "react-redux";
import EmptyChatPlaceholder from "./EmptyChatPlaceholder";

const ChatWindow = ({ chatData }) => {
  const [viewMode, setViewMode] = useState("chat");
  const [messages, setMessages] = useState([]);
  const [typingUsers, setTypingUsers] = useState([]);
  const currentuser = useSelector((state) => state.user.userData.name);

  useEffect(() => {
    if (!chatData?.channelId) return;

    const ably = getAblyInstance();
    if (!ably) return;

    const channel = ably.channels.get(chatData.channelId);
    setMessages([]);
    setTypingUsers([]);

    const handler = (msg) => {
      const { name, data, id } = msg;

      if (name === "message") {
        setMessages((prev) => [
          ...prev,
          {
            message: data.message,
            sender: data.sender,
            timestamp: data.timestamp,
            isSender: data.sender === currentuser,
            id,
          },
        ]);
      } else if (name === "typing" && data.sender !== currentuser) {
        setTypingUsers((prev) =>
          prev.includes(data.sender) ? prev : [...prev, data.sender]
        );
      } else if (name === "stop_typing" && data.sender !== currentuser) {
        setTypingUsers((prev) =>
          prev.filter((name) => name !== data.sender)
        );
      }
    };

    channel.subscribe(handler);

    return () => {
      channel.unsubscribe(); // unsubscribes all handlers from this channel
    };
  }, [chatData?.channelId, currentuser]);

  if (!chatData) {
    return (
      <EmptyChatPlaceholder/>
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
        typingUsers={typingUsers}
      />
      {viewMode === "chat" && (
        <>
          <MessageList messages={messages} isGroup={chatData.isGroup} />
          <MessageInput
            channelId={chatData.channelId}
            senderName={currentuser}
          />
        </>
      )}
      {viewMode === "kanbanBoard" && <KanbanBoard />}
    </div>
  );
};

export default ChatWindow;
