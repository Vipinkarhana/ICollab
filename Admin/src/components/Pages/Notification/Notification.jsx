import React, { useState, useEffect } from "react";
import {
  getAllUsers,
  sendNotification,
} from "../../../services/adminService";

const Notification = () => {
  const [recipient, setRecipient] = useState("");
  const [message, setMessage] = useState("");
  // const [sentMessages, setSentMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!recipient || !message) return;

    setLoading(true);
    try {
      await sendNotification(recipient, message);
      setMessage("");
      setRecipient("");
      // fetchSentMessages();
    } catch (err) {
      console.error("Error sending notification:", err);
    } finally {
      setLoading(false);
    }
  };

  // const fetchSentMessages = async () => {
  //   try {
  //     const res = await getLatestNotifications();
  //     const flattened = res.flatMap((user) =>
  //       user.messages.map((msg) => ({
  //         ...msg,
  //         recipient: user.username,
  //       }))
  //     );

      
  //     const sorted = flattened.sort(
  //       (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  //     );

      
  //     setSentMessages(sorted.slice(0, 10));
  //   } catch (err) {
  //     console.error("Error fetching sent messages:", err);
  //   }
  // };

  const fetchUsers = async () => {
    try {
      const data = await getAllUsers();
      setUsers(data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
    // fetchSentMessages();
  }, []);

  // const getRecipientLabel = (recipient) => {
  //   if (recipient === "all") return "All Users";
  //   const user = users.find((u) => u.username === recipient);
  //   return user ? user.name : recipient;
  // };

  return (
    <div className="w-full md:w-[80%] min-h-screen mt-14 p-4 md:p-6 bg-gray-100 absolute top-0 md:left-[20%]">
      <div className="md:flex gap-6">
        {/* Send Notification */}
        <form
          onSubmit={handleSend}
          className="md:w-1/2 space-y-4 bg-white p-4 rounded-lg shadow-md"
        >
          <h2 className="text-lg font-semibold">Send Notification</h2>

          <select
            className="w-full border px-3 py-2 rounded"
            value={recipient}
            required
            onChange={(e) => setRecipient(e.target.value)}
          >
            <option value="">Select Recipient</option>
            <option value="all">All Users</option>
            {users.map((user) => (
              <option key={user._id} value={user.username}>
                {user.name}
              </option>
            ))}
          </select>

          <textarea
            className="w-full border px-3 py-2 rounded"
            rows="4"
            placeholder="Enter your message"
            value={message}
            required
            onChange={(e) => setMessage(e.target.value)}
          />

          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            type="submit"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </form>

        {/* Display Sent Messages */}
        {/* <div className="md:w-1/2 bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-2">Last 10 Messages</h2>
          <ul className="space-y-2 max-h-72 overflow-y-auto">
            {sentMessages?.map((msg) => (
              <li key={msg._id} className="border p-2 rounded text-sm">
                <h4 className="font-bold">
                  To: {getRecipientLabel(msg.recipient)}
                </h4>
                <p>{msg.text}</p>
                <div className="text-xs text-gray-500">
                  {new Date(msg.createdAt).toLocaleString()}
                </div>
              </li>
            ))}
          </ul>
        </div> */}
      </div>
    </div>
  );
};

export default Notification;
