import React, { useState, useRef } from "react";
import { Smile, Paperclip, Send } from "lucide-react";
import EmojiButton from "../../HomePage/MidDiv/Feed/Posts/StartPost/EmojiButton";
import { getAblyInstance } from "../../../../utils/ablyClient";

const MessageInput = ({ channelId, senderName }) => {
  const [text, setText] = useState("");
  const typingSentRef = useRef(false);
  const typingTimeoutRef = useRef(null);
  const ablyRef = useRef(getAblyInstance());

  const publishTyping = async () => {
    const ably = ablyRef.current;
    if (!ably || !channelId) return;

    const channel = ably.channels.get(channelId);

    if (!typingSentRef.current) {
      typingSentRef.current = true;
      await channel.publish("typing", { sender: senderName });
    }

    clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      channel.publish("stop_typing", { sender: senderName });
      typingSentRef.current = false;
    }, 2000);
  };

  const handleSend = async () => {
    if (!text.trim()) return;

    const ably = ablyRef.current;
    if (!ably || !channelId) return;

    const channel = ably.channels.get(channelId);
    const timestamp = new Date().toISOString();

    await channel.publish("message", {
      message: text,
      sender: senderName,
      timestamp,
    });

    setText("");

    // Reset typing
    clearTimeout(typingTimeoutRef.current);
    typingSentRef.current = false;
    await channel.publish("stop_typing", { sender: senderName });
  };

  return (
    <div className="border-t border-gray-200 px-4 py-3 flex items-center gap-3 bg-white">
      <button className="text-gray-600 hover:text-violet-600">
        <EmojiButton onSelectEmoji={(emoji) => setText((prev) => prev + emoji)} />
      </button>
      <button className="text-gray-600 hover:text-violet-600">
        <Paperclip className="w-5 h-5" />
      </button>
      <input
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          publishTyping();
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault(); // prevent newline
            handleSend();
          }
        }}
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