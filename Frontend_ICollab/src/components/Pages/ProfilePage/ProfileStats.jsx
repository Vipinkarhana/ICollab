import React from "react";
import { FileText, FolderOpen, Users, Bookmark } from "lucide-react";

const ProfileStats = ({ stats }) => {
  const cardClass =
    "flex  items-center justify-evenly p-4 rounded-xl bg-zinc-100 w-1/4";
  const divClass = "flex flex-col items-left justify-evenly";
  const labelClass = "text-sm text-gray-500  uppercase";
  const valueClass = "text-3xl font-bold text-gray-900";
  const iconClass = "w-9 h-9 mb-2";

  return (
    <div className="flex gap-4 bg-white rounded-2xl p-5 shadow-md w-full max-w-[80%] mx-auto">
      <div className={cardClass}>
        <FileText className={`${iconClass} text-orange-400`} />
        <div className={divClass}>
          <div className={valueClass}>{stats.posts}</div>
          <div className={labelClass}>Posts</div>
        </div>
      </div>
      <div className={cardClass}>
        <FolderOpen className={`${iconClass} text-yellow-400`} />
        <div className={divClass}>
          <div className={valueClass}>{stats.projects}</div>
          <div className={labelClass}>Projects</div>
        </div>
      </div>
      <div className={cardClass}>
        <Users className={`${iconClass} text-purple-400`} />
        <div className={divClass}>
          <div className={valueClass}>{stats.collaborators}</div>
          <div className={labelClass}>Collaborators</div>
        </div>
      </div>
      <div className={cardClass}>
        <Bookmark className={`${iconClass} text-purple-400`} />
        <div className={divClass}>
          <div className={valueClass}>{stats.saved}</div>
          <div className={labelClass}>Saved Items</div>
        </div>
      </div>
    </div>
  );
};

export default ProfileStats;
