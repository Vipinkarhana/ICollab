import { useState, useEffect } from 'react';
import ChatCard from './ChatCard';
import { getMyRooms } from '../../../../Services/roomService';

function GroupList() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleChatClick = (chat) => {
    console.log('Main chat opened:', chat.name);
  };

  const handleSubGroupClick = (subgroup) => {
    console.log('Subgroup opened:', subgroup.name);
  };

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

  if (loading) {
    return <p className="text-center text-gray-500">Loading chats...</p>;
  }

  return (
    <div className="space-y-1 py-2 flex flex-col items-center justify-start w-full h-full overflow-y-auto gap-2 scrollbar-thin scrollbar-thumb-violet-300 scrollbar-track-gray-100">
      {rooms.map((chat) => {
        const defaultGroup = chat.groups?.find(
          (group) => group.id === chat.defaultGroup
        );

        const subGroupArray = defaultGroup
          ? [
            {
              name: defaultGroup.name,
              avatar: `https://ui-avatars.com/api/?name=${defaultGroup.name}&background=random`,
              lastMessage: 'Tap to open group',
              lastSender: '',
              time: new Date(chat.updatedAt).toLocaleTimeString(),
              unreadCount: 0,
              isOnline: false,
              members: [],
            },
          ]
          : [];

        const onlineCount = chat.members
          ? chat.members.filter((m) => m.isOnline).length
          : 0;

        return (
          <ChatCard
            key={chat.id}
            name={chat.name}
            lastMessage={'Tap to open group'}
            lastSender={''}
            time={new Date(chat.updatedAt).toLocaleTimeString()}
            unreadCount={0}
            avatar={`https://ui-avatars.com/api/?name=${chat.name}&background=random`}
            isOnline={onlineCount > 0}
            isGroup={true}
            onlineCount={onlineCount}
            subGroup={subGroupArray}
            onClick={() => handleChatClick(chat)}
            handleSubGroupClick={handleSubGroupClick}
          />
        );
      })}
    </div>
  );
}

export default GroupList;






