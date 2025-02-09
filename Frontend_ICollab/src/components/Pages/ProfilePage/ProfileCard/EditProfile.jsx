import React from "react";
import { Pencil, X } from "lucide-react";
import ProfilePic from "../../../Common/ProfilePic";
function EditProfile({ SetIsOpen, isOpen }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative w-[35rem] h-auto bg-white shadow-lg rounded-lg  flex flex-col justify-start overflow-y-auto">
        <div className="h-14 border-b flex justify-between items-center border-gray-300">
          <div className="h-full w-[30%] flex justify-center items-center text-2xl text-gray-700 font-semibold">
            <p>Edit Profile</p>
          </div>
          <button
            className="absolute  text-gray-600 hover:text-black hover:bg-gray-300 rounded-full p-1 top-2 right-2"
            onClick={() => SetIsOpen(false)}
          >
            <X size={26} />
          </button>
        </div>
        <div className="h-auto flex justify-evenly">
          <div className="w-[50%] h-64 flex flex-col justify-center items-center relative">
            <div className="relative">
              <ProfilePic className="h-52 w-52 shadow-none" />
              <div className="h-12 w-12  flex justify-center items-center absolute bottom-2 right-2">
                <label className="rounded-full p-3 hover:bg-slate-400 bg-slate-300 h-auto w-auto">
                  <Pencil />
                  <input type="file" className="hidden" />
                </label>
              </div>
            </div>
          </div>
          <div className="w-[50%] h-64  flex flex-col justify-evenly items-center">
            <input
              type="text"
              className="bg-gray-100 outline-none border rounded-sm border-gray-400 px-2 py-2 placeholder:text-xl text-gray-700"
              placeholder="Your Name"
            />
            <input
              type="text"
              className="bg-gray-100 outline-none border rounded-sm border-gray-400 px-2 py-2 placeholder:text-xl text-gray-700"
              placeholder="Your Designation"
            />
          </div>
        </div>
        <div className="h-12 border-t border-gray-300 flex items-center justify-end px-2">
          <button className="h-6 text-lg flex justify-center items-center w-16 text-gray-700 bg-gray-200 border border-gray-500 rounded-md p-4">Save</button>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
