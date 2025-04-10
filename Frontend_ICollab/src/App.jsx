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
import PrivateRoute from "./components/Common/PrivateRoute";
import ActivityPage from "./components/Pages/ActivityPage/ActivityPage";
import LandingPage from "./components/Pages/LandingPage/LandingPage";
import ProjectPreview from "./components/Pages/ProjectsPage/ProjectPreview/ProjectPreview";
import SavedItemPage from "./components/Pages/SavedItems/SavedItemPage";
import NewProjectPage from "./components/Pages/NewProjectPage/NewProjectPage";
import ProfilePageForm from "./components/Pages/ProfilePage/ProifePageForm/ProfilePageForm";

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
            <Route path="/project" element={<ProjectPage />} />
            <Route path="/project/new" element={<NewProjectPage />}></Route>
            <Route path="/message" element={<MessagePage />} />
            <Route path="/notification" element={<NotificationPage />} />
            <Route path="/incubators" element={<IncubatorsPage />} />
            <Route path="/activity/:username" element={<ActivityPage />} />
            <Route path="/project_preview" element={<ProjectPreview/>} />
            <Route path="/saved_items" element={<SavedItemPage/>}></Route>
          </Route>

          {/* LandingPage with Layout, not a private route */}
          <Route path="/" element={<LandingPage />} />

          {/* Public routes: no authentication required */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
}


export default App;
