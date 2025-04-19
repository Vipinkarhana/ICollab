import React from "react";
import ProfilePic from "../../Common/ProfilePic";

function ProjectPreviewDetail() {
  return (
    <div className="flex justify-between items-start w-full py-4">
      <div className="w-[30%] h-auto">
        <div className="bg-white flex flex-col justify-start items-left gap-2  p-4 rounded-xl shadow-md h-auto ">
          <h2 className="font-semibold text-xl  mb-3">Team Members</h2>
          <div className="flex items-center gap-2 text-xl">
          <ProfilePic className="h-11 w-11"/>
            <p>Garima Goyal</p>
          </div>
          <div className="flex items-center gap-2 text-xl">
           <ProfilePic  className="h-11 w-11"/>
            <p>Ankita Ankita</p>
          </div>
        </div>
      </div>
      <div className="w-[68%] h-auto gap-3 flex flex-col justify-start items-center gap-">
        <div className="h-auto flex flex-col justify-start bg-white shadow-md rounded-md p-4 items-center gap-4">
          <div className="flex flex-col juatify-start items-left">
            <h1 className="text-3xl font-semibold tracking-tighter">
              The Problem Circuit Solver Solves
            </h1>
            <p className="text-lg text-gray-600">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Libero
              amet voluptatum provident vel expedita ipsum sit harum doloremque
              pariatur reiciendis quod, deleniti accusamus ullam. Explicabo
              dolores sequi nulla suscipit laborum velit dolorum itaque
              voluptate eligendi aut, officia, commodi exercitationem
              asperiores.
            </p>
          </div>
          <div className="flex flex-col justify-start items-left">
            <h1 className="text-3xl font-semibold tracking-tighter">
              Challanges we ran into
            </h1>
            <p className="text-lg text-gray-600">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Libero
              amet voluptatum provident vel expedita ipsum sit harum doloremque
              pariatur reiciendis quod, deleniti accusamus ullam. Explicabo
              dolores sequi nulla suscipit laborum velit dolorum itaque
              voluptate eligendi aut, officia, commodi exercitationem
              asperiores.
            </p>
          </div>
        </div>
        <div className="bg-white shadow-md w-full h-[25svh]  p-8 rounded-md">
              <h2 className="font-semibold text-2xl mb-2 ">Technologies Used</h2>
               <div className="flex flex-wrap gap-4">
                 {["OpenCV", "Deep Learning", "Tkinter", "Python"].map(
                   (tech) => (
                     <span
                       key={tech}
                      className="bg-white border border-gray-300 px-3 py-1 rounded-full text-lg"
                     >
                       {tech}
                     </span>
                   )
                 )}
               </div>
             </div>
      </div>
    </div>
  );
}

export default ProjectPreviewDetail;
