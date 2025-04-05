import React from 'react'
const collaborators = [
    {
      name: "Mohit Goel",
      role: "Frontend Developer",
      image: "/AvtarImage1.avif",
    },
    {
      name: "Anjali Sharma",
      role: "UI/UX Designer",
      image: "/AvtarImage2.avif",
    },
    {
      name: "Rohan Mehta",
      role: "Backend Developer",
      image: "/AvtarImage3.webp",
    },
    
    
  ];
function ProjectCollab() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 border border-gray-100 m-2 rounded-md bg-gray-100 flex flex-col justify-center items-center">
        <h2 className="text-2xl font-bold mb-6 ">Collaborators</h2>
        <div className="flex flex-wrap gap-6 overflow-x-auto scrollbar-hide">
          {collaborators.map((user, index) => (
            <div
              key={index}
              className="flex items-center gap-4 bg-white p-4 rounded-xl shadow hover:shadow-md transition hover:scale-[1.02] "
            >
              <img
                src={user.image}
                alt={user.name}
                className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-300"
              />
              <div>
                <p className="font-semibold text-base">{user.name}</p>
                <p className="text-sm text-gray-500 flex items-center gap-1">{user.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
  )
}

export default ProjectCollab;
