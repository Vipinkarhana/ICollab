import React, { useState } from "react";
import { Smile, Paperclip, Send } from "lucide-react";
import EmojiButton from "../../HomePage/MidDiv/Feed/Posts/StartPost/EmojiButton";
const MessageInput = () => {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (text.trim()) {
      console.log("Send:", text);
      setText("");
    }
  };

  return (
    <div className="border-t border-gray-200 px-4 py-3 flex items-center gap-3 bg-white">
      <button className="text-gray-600 hover:text-violet-600">
        <EmojiButton onSelectEmoji={(emoji) => setText(text + emoji)} />
      </button>
      <button className="text-gray-600 hover:text-violet-600">
        <Paperclip className="w-5 h-5" />
      </button>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message..."
        className="flex-1 px-4 py-2 border border-gray-300 rounded-full outline-none focus:border-violet-400 text-sm"
      />
      <button
        onClick={handleSend}
        className="bg-violet-500 hover:bg-violet-600 text-white p-2 rounded-full"
      >
        <Send className="w-4 h-4" />
      </button>
    </div>
  );
};

export default MessageInput;
