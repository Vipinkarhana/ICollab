import React, { useEffect, useState } from "react";
import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import KanbanBoard from "./KanbanBoard";
import { getAblyInstance } from "../../../../utils/ablyClient";
import { useSelector } from "react-redux";
import EmptyChatPlaceholder from "./EmptyChatPlaceholder";
import GroupSettingsPanel from "./GroupSettingsPanel";
import CreateNewGroup from "./CreateNewGroup";
import { fetchMessagesByGroup } from "../../../../Services/messageService";

const ChatWindow = ({ chatData }) => {
  const [viewMode, setViewMode] = useState("chat");
  const [initialMessages, setInitialMessages] = useState([]);
  const [realtimeMessages, setRealtimeMessages] = useState([]);
  const [typingUsers, setTypingUsers] = useState([]);
  const [showGroupSettings, setShowGroupSettings] = useState(false);
  const [showCreateNewGroup, setShowCreateNewGroup] = useState(false);
  const currentuser = useSelector((state) => state.user.userData.name);

  // ✅ Fetch messages from backend (once per group)
  useEffect(() => {
    const fetchMessages = async () => {
      if (!chatData?.groupId) return;
      try {
        const messages = await fetchMessagesByGroup(chatData.groupId);
        const formatted = messages.map((msg) => ({
          message: msg.text,
          sender: msg.sender.name || msg.sender,
          timestamp: msg.createdAt,
          isSender: msg.sender.name === currentuser,
          id: msg._id,
        }));
        setInitialMessages(formatted);
      } catch (err) {
        console.error("Failed to fetch messages", err);
      }
    };

    fetchMessages();
  }, [chatData?.groupId]);

  // ✅ Setup Ably real-time message + typing listener
  useEffect(() => {
    if (!chatData?.channelId) return;

    const ably = getAblyInstance();
    if (!ably) return;

    const messageChannel = ably.channels.get(`chat/${chatData.channelId}`);
    const typingChannel = ably.channels.get(`presense/${chatData.channelId}`);

    setRealtimeMessages([]);
    setTypingUsers([]);

    const handler = (msg) => {
      const { name, data, id } = msg;

      if (name === "message") {
        if (data.groupId !== chatData.groupId) return; // ✅ Only allow messages for current group

        setRealtimeMessages((prev) => [
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
        setTypingUsers((prev) => prev.filter((name) => name !== data.sender));
      }
    };

    messageChannel.subscribe(handler);
    typingChannel.subscribe(handler);

    return () => {
      messageChannel.detach();
      typingChannel.detach();
    };
  }, [chatData?.channelId, chatData?.groupId, currentuser]);

  if (!chatData) return <EmptyChatPlaceholder />;

  const allMessages = [...initialMessages, ...realtimeMessages];

  return (
    <div className="relative w-full h-full bg-violet-50 overflow-hidden">
      <div className="flex flex-col w-full h-full">
        <ChatHeader
          avatar={chatData.avatar}
          name={chatData.name}
          isOnline={chatData.isOnline}
          members={chatData.members}
          isGroup={chatData.isGroup}
          setViewMode={setViewMode}
          typingUsers={typingUsers}
          settingsClickHandler={() => setShowGroupSettings(true)}
        />

        {viewMode === "chat" && (
          <>
            <MessageList messages={allMessages} isGroup={chatData.isGroup} />
            <MessageInput
              channelId={chatData?.channelId}
              groupId={chatData?.groupId}
              roomId={chatData?.roomId}
              senderName={currentuser}
            />
          </>
        )}

        {viewMode === "kanbanBoard" && <KanbanBoard />}
      </div>

      {showGroupSettings && (
        <div className="absolute top-0 right-0 z-50 h-full">
          <GroupSettingsPanel
            members={chatData.members}
            onClose={() => setShowGroupSettings(false)}
            setShowCreateNewGroup={() => {
              setShowGroupSettings(false);
              setTimeout(() => setShowCreateNewGroup(true), 100);
            }}
          />
        </div>
      )}

      {showCreateNewGroup && (
        <div className="absolute inset-0 z-50 flex items-center justify-center">
          <CreateNewGroup
            roomId={chatData.roomId}
            members={chatData.members}
            onClose={() => setShowCreateNewGroup(false)}
          />
        </div>
      )}
    </div>
  );
};

export default ChatWindow;
