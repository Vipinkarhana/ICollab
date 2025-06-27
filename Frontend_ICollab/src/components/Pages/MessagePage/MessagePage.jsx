import { useState } from "react";
import ChatSearchBar from "./Chats/ChatSearchBar";
import GroupList from "./Chats/GroupList";
import ChatWindow from "./ChatWindow/ChatWindow";

const MessagePage = () => {
  const [selectedGroup, setSelectedGroup] = useState(null);
  console.log("MessagePage rendered with selectedGroup:", selectedGroup);
  const handleSubGroupClick = (group) => {
    console.log("Group clicked:", group);
    setSelectedGroup(group);
  };

  return (
    <div className="flex w-[100svw] h-[89svh] bg-white mt-14">
      {/* Left Sidebar */}
      <div className="flex flex-col w-[30%] h-full border-r-2 border-gray-300">
        <ChatSearchBar />
        <GroupList handleSubGroupClick={handleSubGroupClick} />
      </div>

      {/* Chat Window */}
      <div className="w-[70%] h-full flex flex-col">
        <ChatWindow chatData={selectedGroup} />
      </div>
    </div>
  );
};

export default MessagePage;


