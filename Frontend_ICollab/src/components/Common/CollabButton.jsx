import React from 'react'
import { UserPlus } from 'lucide-react';
function CollabButton() {
  return (
    <button className="w-full  px-4 py-1 rounded flex items-center justify-center gap-1 bg-blue-500 text-white hover:bg-blue-600 transition-colors text-lg ">
      <UserPlus size={20} />
      Collab
    </button>
  );
}

export default CollabButton
