import {useState} from "react";
import ChatSearchBar from "./Chats/ChatSearchBar";
import GroupList from "./Chats/GroupList";
const MessagePage = () => {
  return (
    <div className="flex w-[100svw] h-[89svh] bg-white mt-16 border-2 border-red-500 ">
      <div className="flex flex-col w-[30%] h-full border-r-2 border-gray-300">
          <ChatSearchBar />
          <GroupList />
      </div>
      <div className=""></div>
      
      
    </div>
  );
}

export default MessagePage;