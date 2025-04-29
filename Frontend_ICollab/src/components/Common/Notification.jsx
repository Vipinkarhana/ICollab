import React, { useState, useEffect, useRef } from "react";
import { Bell } from "lucide-react";
import { getNotification, markNotificationRead, deleteNotification } from "../../Services/adminService";

const Notification = ({ username }) => {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setOpen(!open);

  const fetchNotifications = async () => {
    try {
      const res = await getNotification(username);
      const sorted = res.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setNotifications(sorted);
    } catch (err) {
      console.error("Failed to fetch notifications", err);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (username) {
      fetchNotifications(); // initial fetch
      const interval = setInterval(fetchNotifications, 7000); // poll every 7s
      return () => clearInterval(interval);
    }
  }, [username]);

  const handleMarkAsRead = async (id) => {
    await markNotificationRead(username, id);
    fetchNotifications();
  };

  const handleDelete = async (id) => {
    await deleteNotification(username, id);
    fetchNotifications();
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button onClick={toggleDropdown} className="relative">
        <Bell className="w-6 h-6 text-gray-600" />
        {notifications.filter((n) => !n.read).length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-semibold rounded-full px-1.5 py-0.5">
            {notifications.filter((n) => !n.read).length}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-72 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <div className="p-2 font-semibold border-b">Notifications</div>
          {notifications.length === 0 ? (
            <div className="p-2 text-sm text-gray-500">No new notifications.</div>
          ) : (
            notifications.map((notif) => (
              <div
                key={notif._id}
                className="p-2 text-md text-gray-900 hover:bg-gray-100 cursor-pointer"
              >
                <div className="flex justify-between items-center">
                  <span>{notif.text}</span>
                  <div className="flex gap-2 ml-2">
                    {!notif.read && (
                      <button
                        className="text-blue-600 text-xs"
                        onClick={() => handleMarkAsRead(notif._id)}
                      >
                        Mark as read
                      </button>
                    )}
                    <button
                      className="text-red-500 text-xs"
                      onClick={() => handleDelete(notif._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <div className="text-xs text-gray-600">
                  {new Date(notif.createdAt).toLocaleString()}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Notification;
