import { useState } from "react";
import ChatSearchBar from "./Chats/ChatSearchBar";
import GroupList from "./Chats/GroupList";
import ChatWindow from "./ChatWindow/ChatWindow";

const MessagePage = () => {
  const chatData = {
    name: "Code Buddies",
    avatar: "https://i.pravatar.cc/150?img=30",
    isOnline: true,
    isGroup: true,
    members: [
      { name: "Naman Maik", avatar: "https://i.pravatar.cc/150?img=5", isOnline: true },
      { name: "Tanmay Sharma", avatar: "https://i.pravatar.cc/150?img=10", isOnline: true },
      { name: "Ravi Sharma", avatar: "https://i.pravatar.cc/150?img=12", isOnline: false },
    ],
    messages: [
      {
        id: 1,
        message: "Morning team!",
        isSender: false,
        sender: "Naman Maik",
        timestamp: "9:00 AM",
      },
      {
        id: 2,
        message: "We have a standup at 10?",
        isSender: true,
        sender: "Tanmay Sharma",
        timestamp: "9:02 AM",
      },
      {
        id: 3,
        message: "Yes, see you then.",
        isSender: false,
        sender: "Ravi Sharma",
        timestamp: "9:03 AM",
      },
    ],
  };

  return (
    <div className="flex w-[100svw] h-[89svh] bg-white mt-16">
      {/* Left Sidebar */}
      <div className="flex flex-col w-[30%] h-full border-r-2 border-gray-300">
        <ChatSearchBar />
        <GroupList />
      </div>

      {/* Chat Window */}
      <div className="w-[70%] h-full flex flex-col">
        <ChatWindow chatData={chatData} />
      </div>
    </div>
  );
};

export default MessagePage;
