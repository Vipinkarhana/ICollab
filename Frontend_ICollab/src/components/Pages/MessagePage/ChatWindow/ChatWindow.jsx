// ✅ Pages/MessagePage/ChatWindow/ChatWindow.jsx
import React, { useEffect, useState } from "react";
import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import KanbanBoard from "./KanbanBoard";
import { getAblyInstance } from "../../../../utils/ablyClient";
import { useSelector } from "react-redux";

const ChatWindow = ({ chatData }) => {
  const [viewMode, setViewMode] = useState("chat");
  const [messages, setMessages] = useState([]);
  const [typingUser, setTypingUser] = useState("");
  const currentuser = useSelector((state) => state.user.userData.name);

  useEffect(() => {
    const setupAbly = async () => {
      const ably = getAblyInstance();
      if (!ably || !chatData?.channelId) return;

      const channel = ably.channels.get(chatData.channelId);

      await channel.presence.enter();

      try {
        const page = await channel.history({ limit: 50 });
        const historyMessages = page.items.reverse().map((msg) => ({
          message: msg.data.message,
          sender: msg.data.sender,
          timestamp: msg.data.timestamp,
          isSender: msg.data.sender === currentuser,
          id: msg.id,
        }));
        setMessages(historyMessages);
      } catch (err) {
        console.error("History load failed:", err);
      }

      const handler = (msg) => {
        if (msg.name === "message") {
          setMessages((prev) => [
            ...prev,
            {
              message: msg.data.message,
              sender: msg.data.sender,
              timestamp: msg.data.timestamp,
              isSender: msg.data.sender === currentuser,
              id: msg.id,
            },
          ]);
        } else if (msg.name === "typing" && msg.data.sender !== currentuser) {
          setTypingUser(`${msg.data.sender} is typing...`);
        } else if (msg.name === "stop_typing" && msg.data.sender !== currentuser) {
          setTypingUser("");
        }
      };

      channel.subscribe(handler);
      channel.subscribe("typing", handler);
      channel.subscribe("stop_typing", handler);

      return () => {
        channel.unsubscribe("message", handler);
        channel.unsubscribe("typing", handler);
        channel.unsubscribe("stop_typing", handler);
        channel.presence.leave();
      };
    };

    if (chatData?.channelId) {
      setMessages([]);
      setupAbly();
    }
  }, [chatData?.channelId]);

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
        typingUser={typingUser}
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
