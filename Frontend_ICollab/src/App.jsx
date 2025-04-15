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
import IncubatorsPage from "./components/Pages/IncubatorsPage/IncubatorsPage";
import PrivateRoute from "./utils/PrivateRoute";
import LandingPage from "./components/Pages/LandingPage/LandingPage";
import ProjectPreviewPage from "./components/Pages/ProjectPreviewPage/ProjectPreviewPage";
import ProfilePageForm from "./components/Pages/ProfilePage/ProifePageForm/ProfilePageForm";
import ProjectForm from "./components/Pages/ProjectsPage/ProjectForm";

function App() {

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <Router>
        <Routes>
          {/* Private routes: wrapped with PrivateRoute via the Layout element */}
          <Route element={<PrivateRoute element={<Layout />} />}>
            <Route path="/home" element={<HomePage />} />
            <Route path="/profile/:username" element={<ProfilePage />} />
            <Route path="/profile/edit" element={<ProfilePageForm />}></Route>
            <Route path="/network" element={<NetworkPage />} />
            <Route path="/projects" element={<ProjectPage />} />
            <Route path="/message" element={<MessagePage />} />
            <Route path="/notification" element={<NotificationPage />} />
            <Route path="/incubators" element={<IncubatorsPage />} />
            <Route path="/projectpreview" element={<ProjectPreviewPage />} />
            <Route path="/project" element={<ProjectPage/>}></Route>
            <Route path="/project/create" element={<ProjectForm />}></Route>
          </Route>

          {/* LandingPage with Layout, not a private route */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
}


export default App;
