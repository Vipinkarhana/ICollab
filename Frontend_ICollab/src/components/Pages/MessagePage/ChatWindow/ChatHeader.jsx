import React from "react";
import {
  Video,
  Phone,
  Info,
  FolderKanban,
  MessageSquareText,
} from "lucide-react";

const ChatHeader = ({
  avatar,
  name,
  isGroup,
  members = [],
  setViewMode,
  typingUsers = [],
}) => {
  const renderTypingText = () => {
    if (typingUsers.length === 0) return null;

    const displayNames = typingUsers.slice(0, 2).join(", ");
    const remaining = typingUsers.length - 2;

    return (
      <p className="text-xs text-gray-400 italic mt-0.5">
        {displayNames}
        {remaining > 0
          ? ` and ${remaining} other${remaining > 1 ? "s" : ""}`
          : ""}{" "}
        {typingUsers.length > 1 ? "are" : "is"} typing...
      </p>
    );
  };

  return (
    <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-white">
      <div className="flex items-center gap-3">
        <div className="relative">
          <img
            src={avatar}
            alt={name}
            className="w-10 h-10 rounded-full object-cover"
          />
        </div>
        <div>
          <h2 className="text-sm font-semibold">{name}</h2>
          {renderTypingText()}
          {isGroup && (
            <p className="text-xs text-violet-500 line-clamp-1 max-w-xs">
              {members.length} member{members.length !== 1 ? "s" : ""}:{" "}
              {members.map((member) => member.name).join(", ")}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4 text-gray-600">
        {isGroup && (
          <>
            <button onClick={() => setViewMode("chat")} title="Chat">
              <MessageSquareText className="w-5 h-5 cursor-pointer hover:text-violet-600" />
            </button>
            <button onClick={() => setViewMode("kanbanBoard")} title="Kanban View">
              <FolderKanban className="w-5 h-5 cursor-pointer hover:text-violet-600" />
            </button>
          </>
        )}
        <Video className="w-5 h-5 cursor-pointer hover:text-violet-600" />
        <Phone className="w-5 h-5 cursor-pointer hover:text-violet-600" />
        <Info className="w-5 h-5 cursor-pointer hover:text-violet-600" />
      </div>
    </div>
  );
};

export default ChatHeader;
