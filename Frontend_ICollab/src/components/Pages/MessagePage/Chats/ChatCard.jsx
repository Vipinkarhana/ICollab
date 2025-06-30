import React, { useState } from 'react';
import { Circle, ChevronDown, ChevronUp } from 'lucide-react';

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
  subGroup = [],
  onClick = () => { },
  handleSubGroupClick = () => { },
}) => {
  const [showSubgroups, setShowSubgroups] = useState(false);

  const toggleSubGroups = () => {
    if (subGroup.length > 0) {
      setShowSubgroups(!showSubgroups);
    } else {
      onClick();
    }
  };

  const renderChatInfo = (
    name,
    avatar,
    lastMessage,
    lastSender,
    time,
    unreadCount,
    isOnline,
    isGroup,
    onlineCount,
    showChevron = false,
    onClick = null
  ) => (
    <div
      onClick={onClick}
      className="flex w-[95%] h-16 shadow-md items-center justify-between px-4 py-3  hover:bg-violet-100 cursor-pointer transition rounded-xl"
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
          <p className="text-md font-medium text-gray-900 flex items-center gap-1">
            {name}
            {showChevron &&
              (showSubgroups ? (
                <ChevronUp size={16} />
              ) : (
                <ChevronDown size={16} />
              ))}
          </p>
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

  return (
    <div className="w-full flex flex-col items-center">
      {renderChatInfo(
        name,
        avatar,
        lastMessage,
        lastSender,
        time,
        unreadCount,
        isOnline,
        isGroup,
        onlineCount,
        subGroup.length > 0,
        toggleSubGroups
      )}

      {/* SubGroups */}
      {showSubgroups && (
        <div className="relative w-[90%] ml-6 mt-2">
          {/* Timeline vertical line */}
          <div className="absolute sm:left-1 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 via-blue-500 to-blue-800 rounded-full shadow-md shadow-blue-400/50 animate-pulse" />
          <div className="flex flex-col gap-4">
            {subGroup.map((sub, index) => (
              <div className="relative pl-6" key={`${name}-sub-${index}`}>
                {/* Dot */}
                {/* <div className="absolute  top-1.5 w-3 h-3 bg-blue-600 border-2 border-white rounded-full z-10" /> */}
                {renderChatInfo(
                  sub.name,
                  sub.avatar,
                  sub.lastMessage,
                  sub.lastSender,
                  sub.time,
                  sub.unreadCount,
                  sub.isOnline,
                  true,
                  sub.members?.filter((m) => m.isOnline).length || 0,
                  false,
                  sub.onClick // ✅ direct handler from GroupList
                )}

              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatCard;