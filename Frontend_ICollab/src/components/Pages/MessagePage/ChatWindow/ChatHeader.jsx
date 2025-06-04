import React from "react";
import { Video, Phone, Info, Circle } from "lucide-react";

const ChatHeader = ({ avatar, name, isOnline }) => {
  return (
    <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-white">
      <div className="flex items-center gap-3">
        <div className="relative">
          <img src={avatar} alt={name} className="w-10 h-10 rounded-full object-cover" />
          {isOnline && (
            <Circle
              fill="#00FF00"
              stroke="#00FF00"
              className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-white"
            />
          )}
        </div>
        <div>
          <h2 className="text-sm font-semibold">{name}</h2>
          <p className="text-xs text-gray-500">{isOnline ? "Online" : "Offline"}</p>
        </div>
      </div>

      <div className="flex items-center gap-4 text-gray-600">
        <Video className="w-5 h-5 cursor-pointer hover:text-violet-600" />
        <Phone className="w-5 h-5 cursor-pointer hover:text-violet-600" />
        <Info className="w-5 h-5 cursor-pointer hover:text-violet-600" />
      </div>
    </div>
  );
};

export default ChatHeader;
