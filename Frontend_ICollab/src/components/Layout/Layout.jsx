import React, { useState, useEffect } from "react";
import Header from "../Common/Header/Header";
import { Outlet } from "react-router-dom";
function Layout() {

  return (
    <div className="flex flex-col min-h-screen">
        <>
          <Header id="Header" />
          <main className="flex-grow flex items-center justify-center gap-3">
            <Outlet />
          </main>
        </>
    </div>
  );
}

export default Layout;
