import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import HomePage from "./components/Pages/HomePage/HomePage";
import ProfilePage from "./components/Pages/ProfilePage/ProfilePage";
import NetworkPage from "./components/Pages/NetworkPage/NetworkPage";
import ProjectPage from "./components/Pages/ProjectsPage/ProjectsPage";
import NotificationPage from "./components/Pages/NotificationPage/NotificationPage";
import MessagePage from "./components/Pages/MessagePage/MessagePage";
import Login from "./components/Pages/Login_RegistrationPages/Login";
import Register from "./components/Pages/Login_RegistrationPages/Registration";
import Layout from "./components/Layout/Layout";
function App() {
  return (
    <GoogleOAuthProvider clientId="158006314043-jqdft8o3lrds0j62jrh5t8ir19k7b1ra.apps.googleusercontent.com">
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
        <Route path="/login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
      </Routes>
    </Router>
    </GoogleOAuthProvider>
  );
}

export default App;


