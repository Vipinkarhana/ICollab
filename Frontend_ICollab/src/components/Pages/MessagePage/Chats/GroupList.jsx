import React from 'react';
import ChatCard from './ChatCard';

// Updated Dummy Chat Data with members for groups
const dummyChatData = [
  {
    id: 1,
    name: "Crypto Dawgsss",
    lastMessage: "Let’s go all in this weekend 🚀",
    lastSender: "Tanmay",
    time: "1:05 PM",
    unreadCount: 10,
    avatar: "https://i.pravatar.cc/150?img=12",
    isOnline: false,
    members: [
      { name: "Tanmay", isOnline: true },
      { name: "Mohit", isOnline: false },
      { name: "Ritika", isOnline: true },
    ],
  },
  {
    id: 2,
    name: "Mohit Sharma",
    lastMessage: "Bhai class kab se hai?",
    time: "12:45 PM",
    unreadCount: 2,
    avatar: "https://i.pravatar.cc/150?img=2",
    isOnline: true,
  },
  {
    id: 3,
    name: "Design Team",
    lastMessage: "Uploaded the new logo in drive",
    lastSender: "Riya",
    time: "11:10 AM",
    unreadCount: 0,
    avatar: "https://i.pravatar.cc/150?img=20",
    isOnline: false,
    members: [
      { name: "Riya", isOnline: true },
      { name: "Ali", isOnline: false },
    ],
  },
  {
    id: 4,
    name: "Naman",
    lastMessage: "Check your email please",
    time: "10:20 AM",
    unreadCount: 1,
    avatar: "https://i.pravatar.cc/150?img=5",
    isOnline: true,
  },
  {
    id: 5,
    name: "Project Alpha",
    lastMessage: "Meeting rescheduled to next week",
    lastSender: "Ayush",
    time: "9:15 AM",
    unreadCount: 0,
    avatar: "https://i.pravatar.cc/150?img=30",
    isOnline: false,
    members: [
      { name: "Ayush", isOnline: true },
      { name: "Tanisha", isOnline: false },
    ],
  },
  {
    id: 6,
    name: "Family Group",
    lastMessage: "Dinner plans for Sunday?",
    lastSender: "Mom",
    time: "8:00 AM",
    unreadCount: 3,
    avatar: "https://i.pravatar.cc/150?img=15",
    isOnline: true,
    members: [
      { name: "Mom", isOnline: true },
      { name: "Dad", isOnline: true },
      { name: "You", isOnline: true },
    ],
  },
    {
        id: 7,
        name: "College Friends",
        lastMessage: "Who’s bringing the snacks?",
        lastSender: "Rahul",
        time: "Yesterday",
        unreadCount: 5,
        avatar: "https://i.pravatar.cc/150?img=25",
        isOnline: false,
        members: [
        { name: "Rahul", isOnline: true },
        { name: "Sneha", isOnline: false },
        { name: "Vikram", isOnline: true },
        ],
    },
    {
        id: 8,
        name: "Book Club",
        lastMessage: "Next meeting on Friday",
        lastSender: "Priya",
        time: "Yesterday",
        unreadCount: 0,
        avatar: "https://i.pravatar.cc/150?img=35",
        isOnline: true,
        members: [
          { name: "Priya", isOnline: true },
          { name: "Karan", isOnline: false },
          { name: "Sita", isOnline: true },
        ],
    },
];

function GroupList() {
  return (
    <div className="space-y-1 flex flex-col items-center justify-start w-full h-full overflow-y-auto gap-2 scrollbar-thin scrollbar-thumb-violet-300 scrollbar-track-gray-100">
      {dummyChatData.map((chat) => {
        const isGroup = !!chat.lastSender;
        const onlineCount =
          isGroup && chat.members
            ? chat.members.filter((member) => member.isOnline).length
            : 0;

        return (
          <ChatCard
            key={chat.id}
            name={chat.name}
            lastMessage={chat.lastMessage}
            lastSender={chat.lastSender}
            time={chat.time}
            unreadCount={chat.unreadCount}
            avatar={chat.avatar}
            isOnline={chat.isOnline}
            isGroup={isGroup}
            onlineCount={onlineCount}
          />
        );
      })}
    </div>
  );
}

export default GroupList;

