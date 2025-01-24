import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/Pages/HomePage/HomePage";
import ProfilePage from "./components/Pages/ProfilePage/ProfilePage";
import NetworkPage from "./components/Pages/NetworkPage/NetworkPage";
import ProjectPage from "./components/Pages/ProjectsPage/ProjectsPage";
import NotificationPage from "./components/Pages/NotificationPage/NotificationPage";
import MessagePage from "./components/Pages/MessagePage/MessagePage";
import Layout from "./components/Layout/Layout";
function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/network" element={<NetworkPage />} />
          <Route path="/project" element={<ProjectPage />} />
          <Route path="/message" element={<MessagePage />} />
          <Route path="/notification" element={<NotificationPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;


