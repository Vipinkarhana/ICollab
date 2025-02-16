import React from "react";
import Header from "../Common/Header/Header";
import { Outlet } from "react-router-dom";
import BackToTopButton from "./BackToTopButton";
import LandingPage from "../Pages/LandingPage/LandingPage";

function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header id="Header" />
      <BackToTopButton />
      <main className="flex-grow flex items-center justify-center gap-3">
        {/* This is where the content will be injected (LandingPage, ProfilePage, etc.) */}
        <LandingPage />
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
