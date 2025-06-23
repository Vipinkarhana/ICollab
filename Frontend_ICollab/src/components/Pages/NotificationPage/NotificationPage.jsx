import React, { useState, useRef, useEffect } from "react";
import { Bell } from "lucide-react";

const NotificationDropdown = () => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const notificationRef = useRef(null);

  // Dummy notifications
  const notifications = [
    { id: 1, icon: "🔔", message: "New follower request" },
    { id: 2, icon: "📧", message: "You received a message" },
    { id: 3, icon: "⚙️", message: "System maintenance scheduled" },
  ];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notificationRef.current && !notificationRef.current.contains(e.target)) {
        setIsNotificationOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={notificationRef}>
      {/* Bell Icon */}
      <div
        onClick={() => setIsNotificationOpen(!isNotificationOpen)}
        className="flex flex-col items-center justify-end text-sm pb-2 text-gray-600 hover:text-blue-600 cursor-pointer relative"
      >
        <Bell size={22} />
        <span className="text-xs mt-1 hidden lg:block">Notifications</span>

        {/* Badge */}
        {notifications.length > 0 && (
          <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[10px] font-semibold w-5 h-5 flex items-center justify-center rounded-full shadow-sm ring-2 ring-white">
            {notifications.length}
          </span>
        )}
      </div>

      {/* Dropdown */}
      {isNotificationOpen && (
        <div className="absolute right-0 top-10 w-80 bg-white shadow-lg rounded-lg border border-gray-200 z-50">
          <div className="px-4 py-3 font-semibold text-gray-800 border-b">
            Notifications
          </div>

          {notifications.length === 0 ? (
            <div className="p-4 text-gray-500 text-sm text-center">
              No new notifications
            </div>
          ) : (
            <ul className="divide-y text-sm max-h-64 overflow-auto">
              {notifications.map((note) => (
                <li
                  key={note.id}
                  className="flex items-start gap-2 px-4 py-3 hover:bg-gray-50 cursor-pointer transition"
                >
                  <span className="text-lg">{note.icon}</span>
                  <span className="text-gray-700">{note.message}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
