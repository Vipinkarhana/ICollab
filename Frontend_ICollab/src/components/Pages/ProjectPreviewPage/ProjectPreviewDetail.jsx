import React from "react";
import ProfilePic from "../../Common/ProfilePic";

function ProjectPreviewDetail() {
  return (
    <div className="flex flex-col lg:flex-row justify-between items-start w-full py-4 gap-6">
      {/* Team Members Section */}
      <div className="w-full lg:w-[30%]">
        <div className="bg-white flex flex-col gap-4 p-4 rounded-xl shadow-md">
          <h2 className="font-semibold text-2xl mb-1">Team Members</h2>
          {[
            { name: "Garima Goyal" },
            { name: "Ankita Ankita" },
          ].map((member, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 text-lg"
            >
              <ProfilePic className="h-10 w-10" />
              <p>{member.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right Content Section */}
      <div className="w-full lg:w-[68%] flex flex-col gap-6">
        {/* Problem and Challenges */}
        <div className="bg-white shadow-md rounded-md p-4 flex flex-col gap-6">
          {/* Problem */}
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-2">
              The Problem Circuit Solver Solves
            </h1>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Libero
              amet voluptatum provident vel expedita ipsum sit harum doloremque
              pariatur reiciendis quod, deleniti accusamus ullam. Explicabo
              dolores sequi nulla suscipit laborum velit dolorum itaque
              voluptate eligendi aut, officia, commodi exercitationem
              asperiores.
            </p>
          </div>

          {/* Challenges */}
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-2">
              Challenges We Ran Into
            </h1>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Libero
              amet voluptatum provident vel expedita ipsum sit harum doloremque
              pariatur reiciendis quod, deleniti accusamus ullam. Explicabo
              dolores sequi nulla suscipit laborum velit dolorum itaque
              voluptate eligendi aut, officia, commodi exercitationem
              asperiores.
            </p>
          </div>
        </div>

        {/* Technologies Used */}
        <div className="bg-white shadow-md w-full p-6 rounded-md">
          <h2 className="font-semibold text-xl sm:text-2xl mb-3">Technologies Used</h2>
          <div className="flex flex-wrap gap-3">
            {["OpenCV", "Deep Learning", "Tkinter", "Python"].map((tech) => (
              <span
                key={tech}
                className="bg-white border border-gray-300 px-4 py-2 rounded-full text-sm sm:text-base"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectPreviewDetail;
