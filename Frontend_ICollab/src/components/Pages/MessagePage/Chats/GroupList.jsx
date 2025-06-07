import React from 'react';
import ChatCard from './ChatCard';
import dummyChatData from './dummyData'; // if separate

function GroupList() {
  const handleChatClick = (chat) => {
    console.log("Main chat opened:", chat.name);
    // Navigate or open modal
  };

  const handleSubGroupClick = (subgroup) => {
    console.log("Subgroup opened:", subgroup.name);
    // Navigate or open modal
  };

  return (
    <div className=" space-y-1 py-2 flex flex-col items-center justify-start w-full h-full overflow-y-auto gap-2 scrollbar-thin scrollbar-thumb-violet-300 scrollbar-track-gray-100">
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
            subGroup={chat.subGroup || []}
            onClick={() => handleChatClick(chat)}
            handleSubGroupClick={handleSubGroupClick}
          />
        );
      })}
    </div>
  );
}

export default GroupList;




