import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashBoard from "./components/Pages/Dashboard/Dashboard";
import Sidebar from "./components/Layout/Sidebar";
import Analytics from "./components/Pages/Analytics/Analytics";
import Notification from "./components/Pages/Notification/Notification";
import Report from "./components/Pages/Report/Report";
import Setting from "./components/Pages/Setting/Setting";

const App = () => {
  return (
    <BrowserRouter>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 md:ml-[20%] w-full">
          <Routes>
            <Route path="/" element={<DashBoard />} />
            <Route path="/admin/notification" element={<Notification />} />
            <Route path="/admin/report" element={<Report />} />
            <Route path="/admin/analytic" element={<Analytics />} />
            <Route path="/admin/setting" element={<Setting />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
