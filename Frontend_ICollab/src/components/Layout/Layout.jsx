/**
 * @file Layout.js
 * @brief Main layout component for the application.
 * @details Provides the structural layout, including the header, main content area, 
 *          and a back-to-top button. Uses React Router's Outlet to render nested components.
 * @author ICollab
 * @date 2025-02-20
 */

import React from "react";
import Header from "../Common/Header/Header";
import { Outlet } from "react-router-dom";
import BackToTopButton from "./BackToTopButton";
import { useSelector } from "react-redux";
import StartPostModal from "../Common/StartPostModal";
import Tracker from "../Common/Tracker";

/**
 * @class Layout
 * @brief Application layout component.
 * @returns {JSX.Element} The layout structure including the header, main content, and back-to-top button.
 */
function Layout() {
  const isOpen = useSelector((state) => state.post.isStartPostModalOpen);
  return (
    <div className="flex flex-col min-h-screen">
      <Header id="Header" />
      {isOpen && <StartPostModal />}
      <BackToTopButton />
      <main className="flex-grow flex items-center justify-center gap-3">
        <Tracker/>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
