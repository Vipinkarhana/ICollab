import React from 'react'
import { SquarePen } from 'lucide-react'
function ChatSearchBar() {
  return (
    <div>
        <div className="flex items-center justify-between p-3">
            <input
            type="text"
            placeholder="Search chats..."
            className="w-full p-2 px-4 border rounded-full outline-none shadow-sm border-violet-400 focus:ring-1 focus:ring-violet-600 placeholder:text-sm placeholder:text-violet-400 caret-violet-500 "
            />
            <button title='New Chat' className="ml-2 p-2 text-violet-400 border border-violet-200 rounded-full shadow-sm hover:border-violet-600 hover:text-violet-500 transition-colors duration-200">
            <SquarePen />
            </button>
        </div>
    </div>
  )
}

export default ChatSearchBar