import React from "react";
import { MessageCircleMore } from "lucide-react";

// truncateTitle function ko yahan import karna hai agar alag file mein ho
function truncateTitle(title, maxLength) {
  if (title.length > maxLength) {
    return title.slice(0, maxLength) + '...';
  }
  return title;
}

const TaskCard = ({ priority, title, users }) => {
  const maxLength = 30;  // Yahan apni maxLength set karein
  const truncatedTitle = truncateTitle(title, maxLength);

  return (
    <div className="bg-white p-4 rounded-2xl shadow-md flex  flex-col justify-between  gap-2  w-60 h-32 border border-gray-200">
      <span
        className={`text-xs font-semibold px-2 py-1 rounded-full w-fit ${
          priority === "Important" ? "bg-purple-100 text-purple-700" : "bg-gray-100 text-gray-700"
        }`}
      > 
        {priority}
      </span>
      <h3 className="text-sm font-medium">{truncatedTitle}</h3>
      <div className="flex items-center justify-between mt-2">
        <div className="flex -space-x-2 overflow-hidden">
          {users.slice(0, 4).map((user, index) => (
            <img
              key={index}
              src={user}
              alt="User"
              className="w-8 h-8 rounded-full border-2 border-white object-cover"
            />
          ))}
          {users.length > 4 && (
            <div className="w-8 h-8 flex items-center justify-center bg-gray-300 text-xs font-semibold rounded-full border-2 border-white">
              +{users.length - 4}
            </div>
          )}
        </div> 
        <span className="text-gray-500 text-sm font-medium"><MessageCircleMore /></span>
      </div>
    </div>
  );
};

export default TaskCard;
