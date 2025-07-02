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

const ChatWindow = ({ chatData }) => {
  const [viewMode, setViewMode] = useState("chat");
  const [messages, setMessages] = useState([]);
  const [typingUsers, setTypingUsers] = useState([]);
  const [showGroupSettings, setShowGroupSettings] = useState(false);
  const [showCreateNewGroup, setShowCreateNewGroup] = useState(false);
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
      channel.unsubscribe();
    };
  }, [chatData?.channelId, currentuser]);

  if (!chatData) {
    return <EmptyChatPlaceholder />;
  }

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
            <MessageList messages={messages} isGroup={chatData.isGroup} />
            <MessageInput
              channelId={chatData.channelId}
              senderName={currentuser}
            />
          </>
        )}

        {viewMode === "kanbanBoard" && <KanbanBoard />}
      </div>

      {/* Overlays: absolutely positioned to float above layout */}
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
            roomId={chatData.roomid}
            members={chatData.members}
            onClose={() => setShowCreateNewGroup(false)}
          />
        </div>
      )}
    </div>
  );
};

export default ChatWindow;
