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
      timestamp: "2025-06-07T09:00:00",
    },
    {
      id: 2,
      message: "We have a standup at 10?",
      isSender: true,
      sender: "Tanmay Sharma",
      timestamp: "2025-06-07T09:02:00",
    },
    {
      id: 3,
      message: "Yes, see you then.",
      isSender: false,
      sender: "Ravi Sharma",
      timestamp: "2025-06-07T09:03:00",
    },
    {
      id: 4,
      message: "Let's discuss the project updates.",
      isSender: false,
      sender: "Naman Maik",
      timestamp: "2025-06-07T09:05:00",
    },
    {
      id: 5,
      message: "Sure, I have some updates to share.",
      isSender: true,
      sender: "Tanmay Sharma",
      timestamp: "2025-06-07T09:06:00",
    },
    {
      id: 6,
      message: "Great, looking forward to it.",
      isSender: false,
      sender: "Ravi Sharma",
      timestamp: "2025-06-07T09:07:00",
    },
    {
      id: 7,
      message: "Don't forget to prepare your notes.",
      isSender: false,
      sender: "Naman Maik",
      timestamp: "2025-06-07T09:08:00",
    },
    {
      id: 8,
      message: "Already done! Ready to roll.",
      isSender: true,
      sender: "Tanmay Sharma",
      timestamp: "2025-06-07T09:09:00",
    },
    {
      id: 9,
      message: "Awesome, see you all at 10!",
      isSender: false,
      sender: "Ravi Sharma",
      timestamp: "2025-06-07T09:10:00",
    },
    {
      id: 10,
      message: "See you soon!",
      isSender: false,
      sender: "Naman Maik",
      timestamp: "2025-06-07T09:11:00",
    },
    {
      id: 11,
      message: "Bye!",
      isSender: true,
      sender: "Tanmay Sharma",
      timestamp: "2025-06-07T09:12:00",
    },
    {
      id: 12,
      message: "Take care everyone!",
      isSender: false,
      sender: "Naman Maik",
      timestamp: "2025-06-07T09:13:00",
    },
    {
      id: 13,
      message: "Let's make it a productive day!",
      isSender: false,
      sender: "Naman Maik",
      timestamp: "2025-06-07T09:14:00",
    },
    {
      id: 14,
      message: "Absolutely, let's do this!",
      isSender: true,
      sender: "Tanmay Sharma",
      timestamp: "2025-06-07T09:15:00",
    },
    {
      id: 15,
      message: "Ready when you are!",
      isSender: false,
      sender: "Ravi Sharma",
      timestamp: "2025-06-07T09:16:00",
    },
    {
      id: 16,
      message: "Let's crush it today!",
      isSender: false,
      sender: "Naman Maik",
      timestamp: "2025-06-07T09:17:00",
    },
    {
      id: 17,
      message: "Looking forward to it!",
      isSender: true,
      sender: "Tanmay Sharma",
      timestamp: "2025-06-07T09:18:00",
    },
    {
      id: 18,
      message: "See you all at the standup!",
      isSender: false,
      sender: "Ravi Sharma",
      timestamp: "2025-06-07T09:19:00",
    },
    {
      id: 19,
      message: "Let's make it a great day!",
      isSender: false,
      sender: "Naman Maik",
      timestamp: "2025-06-07T09:20:00",
    },
    {
      id: 20,
      message: "Absolutely, let's do this!",
      isSender: true,
      sender: "Tanmay Sharma",
      timestamp: "2025-06-07T09:21:00",
    },
    {
      id: 21,
      message: "Ready when you are!",
      isSender: false,
      sender: "Ravi Sharma",
      timestamp: "2025-06-07T09:22:00",
    },
    {
      id: 22,
      message: "Let's crush it today!",
      isSender: false,
      sender: "Naman Maik",
      timestamp: "2025-06-05T09:23:00",
    },
    {
      id: 23,
      message: "Looking forward to it!",
      isSender: true,
      sender: "Tanmay Sharma",
      timestamp: "2025-06-06T09:24:00",
    },
    {
      id: 24,
      message: "See you all at the standup!",
      isSender: false,
      sender: "Ravi Sharma",
      timestamp: "2025-06-07T09:25:00",
    },
  ],
};


  return (
    <div className="flex w-[100svw] h-[89svh] bg-white mt-14">
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
