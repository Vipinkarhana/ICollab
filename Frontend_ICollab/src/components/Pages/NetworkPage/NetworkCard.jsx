// import React, { useState } from "react";
// import ProfilePic from "/ProfilePic.png";

// const people = [
//   { id: 1, name: "John Dews", role: "Research Scholar",img: ProfilePic },
//   { id: 2, name: "Chanchal Singh", role: "HR Professional" },
//   { id: 3, name: "Chanchal Singh", role: "HR Professional" },
//   { id: 4, name: "Chanchal Singh", role: "HR Professional" },
//   { id: 5, name: "Chanchal Singh", role: "HR Professional" },
//   { id: 6, name: "Chanchal Singh", role: "HR Professional" },
//   { id: 7, name: "New User", role: "Software Engineer" }, // Extra users
//   { id: 8, name: "Another User", role: "Data Scientist" }, // Extra users
// ];

// const NetworkCard = () => {
//   const [showAll, setShowAll] = useState(false);

//   const visiblePeople = showAll ? people : people.slice(0, 6);

//   return (
//     <div className="p-6">
//       {/* Heading with "Show All" */}
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-xl font-semibold">People you may know</h2>
//         <button
//           onClick={() => setShowAll(!showAll)}
//           className="text-blue-600 hover:underline"
//         >
//           {showAll ? "Show Less" : "Show All"}
//         </button>
//       </div>

//       {/* Grid Layout for Cards */}
//       <div className="grid grid-cols-3 gap-4">
//         {visiblePeople.map((person) => (
//           <div key={person.id} className="bg-white p-4 shadow-md rounded-md">
//             <img
//               src={person.img}
//               alt={person.name}
//               className="w-20 h-20 mx-auto rounded-full mb-2 border- border-gray-300"
//             />
//             <h3 className="text-center font-bold">{person.name}</h3>
//             <p className="text-center text-gray-600">{person.role}</p>
//             <button className="w-full mt-2 bg-blue-500 text-white py-1 rounded">
//               Collab
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default NetworkCard;