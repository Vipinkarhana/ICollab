import { useState, useEffect } from 'react';
import ChatCard from './ChatCard';
import { getMyRooms } from '../../../../Services/roomService';

function GroupList({ handleSubGroupClick }) {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedRoomId, setExpandedRoomId] = useState(null);
  console.log('GroupList rendered with rooms:', rooms);
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const data = await getMyRooms();
        setRooms(data);
      } catch (err) {
        console.error('Failed to fetch rooms:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  const handleChatClick = (roomId) => {
    setExpandedRoomId(prev => (prev === roomId ? null : roomId));
  };

  const handleSubGroupClickLocal = (room, group) => {
    console.log("group members:", group.members);
    console.log("room members:", room.members);
    const payload = {
  name: group.name,
  avatar: `https://ui-avatars.com/api/?name=${group.name}&background=random`,
  isOnline: room.members?.some((m) => m.isOnline),
  isGroup: true,
  members: group.members || [],
  channelId: room.channelId, // ✅ This is required for Ably to work
};


    handleSubGroupClick(payload);
  };

  if (loading) {
    return <p className="text-center text-gray-500">Loading chats...</p>;
  }

  return (
    <div className="space-y-1 py-2 flex flex-col items-center justify-start w-full h-full overflow-y-auto gap-2 scrollbar-thin scrollbar-thumb-violet-300 scrollbar-track-gray-100">
      {rooms.map((room) => {
        const subGroupArray =
          room.groups?.map((group) => ({
            name: group.name,
            avatar: `https://ui-avatars.com/api/?name=${group.name}&background=random`,
            lastMessage: 'Tap to open group',
            time: new Date(room.updatedAt).toLocaleTimeString(),
            onClick: () => handleSubGroupClickLocal(room, group), // 👈 this makes subgroups clickable
          })) || [];

        const onlineCount = room.members?.filter((m) => m.isOnline).length || 0;

        return (
          <ChatCard
            key={room._id}
            name={room.name}
            lastMessage="Tap to open group"
            time={new Date(room.updatedAt).toLocaleTimeString()}
            unreadCount={0}
            avatar={`https://ui-avatars.com/api/?name=${room.name}&background=random`}
            isOnline={onlineCount > 0}
            isGroup={true}
            onlineCount={onlineCount}
            subGroup={expandedRoomId === room._id ? subGroupArray : []} // 👈 show subgroups only if expanded
            onClick={() => handleChatClick(room._id)} // 👈 expands/collapses
          />
        );
      })}
    </div>
  );
}

export default GroupList;