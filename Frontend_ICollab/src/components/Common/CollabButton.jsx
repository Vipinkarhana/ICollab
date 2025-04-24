import React from 'react'
import { UserPlus } from 'lucide-react';
import clsx from 'clsx';
function CollabButton({className=""}) {
  return (
    <button className={clsx("w-32   px-4 py-2 rounded flex items-center justify-center gap-1 bg-blue-500 text-white hover:bg-blue-600 transition-colors text-lg", className)}>
      <UserPlus size={20} />
      Collab
    </button>
  );
}

export default CollabButton
