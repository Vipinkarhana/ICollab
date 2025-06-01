import React from 'react';
import { Circle } from 'lucide-react'; // For online dot

const ChatCard = ({
  name,
  lastMessage,
  lastSender,
  time,
  unreadCount,
  avatar,
  isOnline = false,
  isGroup = false,
  onlineCount = 0,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="flex w-[95%] h-28 shadow-md items-center justify-between px-4 py-3 hover:bg-violet-200 cursor-pointer transition rounded-xl"
    >
      <div className="flex items-center gap-4">
        <div className="relative">
          <img
            src={avatar}
            alt={name}
            className="w-12 h-12 rounded-full object-cover"
          />
          {isOnline && (
            <Circle
              fill="#00FF00"
              stroke="#00FF00"
              className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-white dark:bg-zinc-800"
            />
          )}
        </div>
        <div>
          <p className="text-md font-medium text-gray-900">{name}</p>
          {isGroup && (
            <p className="text-xs text-green-600">
              {onlineCount} member{onlineCount !== 1 ? 's' : ''} online
            </p>
          )}
          <div className="text-sm text-gray-500 dark:text-gray-400 max-w-[150px] truncate flex items-center gap-1">
            <p className="text-gray-600">
              {isGroup && lastSender ? `${lastSender}: ` : ''}
            </p>
            {lastMessage}
          </div>
        </div>
      </div>

      {/* Time + Unread */}
      <div className="flex flex-col items-end gap-2">
        <span className="text-xs text-gray-500 dark:text-gray-400">{time}</span>
        {unreadCount > 0 && (
          <span className="text-xs bg-violet-400 text-black font-semibold px-2 py-0.5 rounded-full">
            {unreadCount}
          </span>
        )}
      </div>
    </div>
  );
};

export default ChatCard;




