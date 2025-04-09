import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const Layout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 md:ml-[20%] w-full p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
