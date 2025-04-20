import React, { useState, useEffect } from "react";
import {
  FileText,
  FolderOpen,
  Users,
  Bookmark,
  BarChart3,
  X,
} from "lucide-react";

const ProfileStats = ({ stats }) => {
  const [showStats, setShowStats] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(
    typeof window !== "undefined" ? window.innerWidth >= 1024 : false
  );

  // Format number to k, M, B (e.g., 1.2k, 3.5M, 7.1B)
  const formatNumber = (num) => {
    if (num >= 1_000_000_000) {
      return (num / 1_000_000_000).toFixed(1).replace(".0", "") + "B";
    } else if (num >= 1_000_000) {
      return (num / 1_000_000).toFixed(1).replace(".0", "") + "M";
    } else if (num >= 1_000) {
      return (num / 1_000).toFixed(1).replace(".0", "") + "k";
    }
    return num;
  };

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const cardClass =
    "flex items-center justify-start lg:justify-evenly gap-4 p-4 rounded-xl bg-zinc-100 w-full sm:w-[48%] lg:w-[23.5%]";
  const containerClass =
    "flex flex-wrap gap-4 bg-white rounded-2xl p-5 shadow-md w-full max-w-[100%] md:max-w-[80%] mx-auto";
  const innerClass =
    "flex flex-row sm:flex-row lg:flex-col items-center lg:items-start gap-2 lg:gap-0";
  const labelClass = "text-sm text-gray-500 uppercase";
  const valueClass = "text-2xl font-bold text-gray-900";
  const iconClass = "w-7 h-7";

  return (
    <div className="w-full flex flex-col items-center">
      {!isLargeScreen && (
        <button
          className="lg:hidden flex items-center gap-2 px-4 py-2 mb-4 text-white bg-indigo-600 hover:bg-indigo-700 rounded-full shadow transition-all"
          onClick={() => setShowStats((prev) => !prev)}
        >
          {showStats ? <X size={20} /> : <BarChart3 size={20} />}
          <span>{showStats ? "Hide Stats" : "Show Stats"}</span>
        </button>
      )}

      {(isLargeScreen || showStats) && (
        <div className={containerClass}>
          <div className={cardClass}>
            <FileText className={`${iconClass} text-orange-400`} />
            <div className={innerClass}>
              <div className={valueClass}>{formatNumber(stats.posts)}</div>
              <div className={labelClass}>Posts</div>
            </div>
          </div>
          <div className={cardClass}>
            <FolderOpen className={`${iconClass} text-yellow-400`} />
            <div className={innerClass}>
              <div className={valueClass}>{formatNumber(stats.projects)}</div>
              <div className={labelClass}>Projects</div>
            </div>
          </div>
          <div className={cardClass}>
            <Users className={`${iconClass} text-purple-400`} />
            <div className={innerClass}>
              <div className={valueClass}>{formatNumber(stats.collaborators)}</div>
              <div className={labelClass}>Collaborators</div>
            </div>
          </div>
          <div className={cardClass}>
            <Bookmark className={`${iconClass} text-purple-400`} />
            <div className={innerClass}>
              <div className={valueClass}>{formatNumber(stats.saved)}</div>
              <div className={labelClass}>Saved Items</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileStats;
