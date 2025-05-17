// import React, { useState, useEffect } from "react";
// import CollaboratorCard from "./CollaboratorCard"; // adjust path if needed
// import { userNetwork, suggestedNetwork } from "../../../../Services/networkService";

// const RightDiv = ({ className = "" }) => {
//   const [collaborators, setCollaborators, ] = useState([]);
//   const [headerText, setHeaderText] = useState("Network");

//   useEffect(() => {
//     const fetchUserNetwork = async () => {
//       const data = await userNetwork();
//       const suggestData = await suggestedNetwork();
//       console.log(data.emptyNetwork);
//       if(!data.emptyNetwork){
//         setHeaderText("Network");
//       if (Array.isArray(data.connectedUserIds)) {
//         setCollaborators(data.connectedUserIds);
//       } else {
//         console.error("Error fetching user network:", data.connectedUserIds);
//       }
//     }
//     else{
//       setHeaderText("Suggested Network");
//       if (Array.isArray(suggestData)) {
//         setCollaborators(suggestData);
//       } else {
//         console.error("Error fetching user network:", data.connectedUserIds);
//       }
//     }
//     };

//     fetchUserNetwork();
//   }, []);

//   return (
//     <div className={`w-[20%] h-auto flex flex-col justify-start items-center ${className}`}>
//       <div className="w-full h-full bg-white border border-gray-300 rounded-md flex flex-col items-center">
//         <div className="h-14 w-full text-xl font-bold px-2 flex items-center justify-start">
//           <p>{headerText}</p>
//         </div>

//         {/* Collaborator cards list */}
//         <div className="w-full h-[85%] flex flex-col items-center">
//           {collaborators.slice(0, 9).map((person, index) => (
//             <CollaboratorCard key={index} person={person} />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RightDiv;

import React, { useState } from "react";
import { CheckCircle, PlusCircle, CircleArrowRight } from "lucide-react"; // Using Lucide icons
import ProfileCheckList from "./ProfileStatus/ProfileCheckList";

const ProfileCompletionCard = () => {
  const [tasks, setTasks] = useState([
    { id: 1, label: "Add Profile Pic", completed: true },
    { id: 2, label: "Add your about", completed: false },
    { id: 3, label: "Add your education", completed: true },
    { id: 4, label: "Add your experience", completed: false },
    { id: 5, label: "Add your contact", completed: false },
    { id: 6, label: "Add your links", completed: false },
  ]);

  const [showAll, setShowAll] = useState(false);

  const completedCount = tasks.filter((task) => task.completed).length;
  const percentage = (completedCount / tasks.length) * 100;

  const toggleTask = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleViewAll = () => {
    setShowAll((prev) => !prev);
  };

  if (percentage === 100) {
    return <ProfileCheckList tasks={tasks} progress={100} />;
  }

  return (
    <div className="relative w-80 h-auto flex justify-center ">
      <div className="relative bg-white rounded-xl shadow-lg w-full h-auto p-6 z-10 mt-2">
        <h2 className="text-lg font-semibold">Complete your profile</h2>
        <p className="text-sm text-gray-500 mt-1 mb-4">
          By completing all the details you have a higher chance of being seen
          by recruiters.
        </p>

        {/* Progress Bar */}
        <div className="w-full mb-4">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium text-gray-700">
              Profile Completion
            </span>
            <span className="text-sm font-medium text-gray-700">
              {Math.round(percentage)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-green-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
        </div>

        {/* Task List */}
        <ul className="space-y-3">
          {(showAll ? tasks : tasks.slice(0, 3)).map((task) => (
            <li
              key={task.id}
              className="flex justify-between items-center border border-gray-200 rounded-lg p-3"
            >
              <div className="flex items-center gap-3">
                {task.completed ? (
                  <CheckCircle className="text-blue-500 w-5 h-5" />
                ) : (
                  <PlusCircle className="text-gray-400 w-5 h-5" />
                )}
                <span
                  className={`text-sm font-medium ${
                    task.completed
                      ? "text-gray-400 font-semibold"
                      : "text-gray-800 font-extrabold"
                  }`}
                >
                  {task.label}
                </span>
              </div>
              <CircleArrowRight
                className={`cursor-pointer transition-colors duration-200 ${
                  task.completed
                    ? "text-gray-400 hover:text-gray-500"
                    : "text-blue-400 hover:text-blue-500"
                }`}
                onClick={() => toggleTask(task.id)}
              />
            </li>
          ))}
        </ul>

        {/* View All */}
        {tasks.length > 3 && (
          <div
            className="mt-4 text-sm text-blue-600 font-medium cursor-pointer hover:underline"
            onClick={handleViewAll}
          >
            {showAll ? "Show less" : "View all"}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileCompletionCard;
