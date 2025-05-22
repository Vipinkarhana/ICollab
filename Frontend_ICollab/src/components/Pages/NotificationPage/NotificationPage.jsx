// src/components/Notification/index.jsx or wherever your NotificationDropdown is

import { Bell } from "lucide-react";

const NotificationDropdown = () => {
  const notificationCount = 3; // or use props/state

  return (
    <div className="relative flex flex-col items-center text-sm hover:text-black cursor-pointer">
      {/* Bell Icon */}
      <Bell size={20} />

      {/* Notification count badge */}
      {notificationCount > 0 && (
        <span className="absolute -top-1 -right-2 text-xs bg-red-500 text-white rounded-full px-1.5">
          {notificationCount}
        </span>
      )}

      {/* Label text below the icon */}
      <span className="text-xs mt-1 hidden lg:block">Notifications</span>
    </div>
  );
};

export default NotificationDropdown;
