// ✅ Pages/MessagePage/MessagePage.jsx
import { useState } from "react";
import ChatSearchBar from "./Chats/ChatSearchBar";
import GroupList from "./Chats/GroupList";
import ChatWindow from "./ChatWindow/ChatWindow";

const MessagePage = () => {
  const [selectedGroup, setSelectedGroup] = useState(null);
  const handleSubGroupClick = (group) => {
    setSelectedGroup(group);
  };

  return (
    <div className="flex w-[100svw] h-[89svh] bg-white mt-14">
      <div className="flex flex-col w-[30%] h-full border-r-2 border-gray-300">
        <ChatSearchBar />
        <GroupList handleSubGroupClick={handleSubGroupClick} />
      </div>
      <div className="w-[70%] h-full flex flex-col">
        <ChatWindow chatData={selectedGroup} />
      </div>
    </div>
  );
};

export default MessagePage;