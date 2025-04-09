import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashBoard from "./components/Pages/Dashboard/Dashboard";
import Analytics from "./components/Pages/Analytics/Analytics";
import Notification from "./components/Pages/Notification/Notification";
import Report from "./components/Pages/Report/Report";
import Setting from "./components/Pages/Setting/Setting";
import ManagePosts from "./components/Pages/ManagePosts/ManagePosts";
import PrivateRoute from "./components/Common/PrivateRoute";
import Layout from "./components/Layout/Layout";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Private Routes (Require Authentication) */}
        {/* <Route element={<PrivateRoute />}> */}
          <Route element={<Layout />}>
            <Route path="/" element={<DashBoard />} />
            <Route path="/notification" element={<Notification />} />
            <Route path="/report" element={<Report />} />
            <Route path="/manage-posts" element={<ManagePosts />} />
            <Route path="/analytic" element={<Analytics />} />
            <Route path="/setting" element={<Setting />} />
          </Route>
        {/* </Route> */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
