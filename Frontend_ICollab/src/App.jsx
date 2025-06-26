import React, { Suspense, lazy, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import useFetchSavedItems from "./Hooks/useFetchSavedItmes";
import { ToastContainer } from 'react-toastify';
import { getMyRooms } from "../src/Services/roomService";
import 'react-toastify/dist/ReactToastify.css';
const HomePage = lazy(() => import("./components/Pages/HomePage/HomePage"));
const ProfilePage = lazy(() =>
  import("./components/Pages/ProfilePage/ProfilePage")
);
const ProfilePageForm = lazy(() =>
  import("./components/Pages/ProfilePage/ProifePageForm/ProfilePageForm")
);
const NetworkPage = lazy(() =>
  import("./components/Pages/NetworkPage/NetworkPage")
);
const ProjectPage = lazy(() =>
  import("./components/Pages/ProjectsPage/ProjectsPage")
);
const MessagePage = lazy(() =>
  import("./components/Pages/MessagePage/MessagePage")
);
const NotificationPage = lazy(() =>
  import("./components/Pages/NotificationPage/NotificationPage")
);
const IncubatorsPage = lazy(() =>
  import("./components/Pages/IncubatorsPage/IncubatorsPage")
);
const ProjectPreviewPage = lazy(() =>
  import("./components/Pages/ProjectPreviewPage/ProjectPreviewPage")
);
const ProjectForm = lazy(() =>
  import("./components/Pages/ProjectsPage/ProjectForm")
);
const Login = lazy(() =>
  import("./components/Pages/Login_RegistrationPages/Login")
);
const Register = lazy(() =>
  import("./components/Pages/Login_RegistrationPages/Registration")
);
const LandingPage = lazy(() =>
  import("./components/Pages/LandingPage/LandingPage")
);
const Layout = lazy(() => import("./components/Layout/Layout"));
const PrivateRoute = lazy(() => import("./utils/PrivateRoute"));

function App() {
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const data = await getMyRooms();
        setRooms(data);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);
  useFetchSavedItems(); // Fetch saved items on app load
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <ToastContainer />
      <Router>
        {/* Wrap Routes with Suspense to handle loading fallback */}
        <Suspense
          fallback={
            <div style={{ textAlign: "center", padding: "2rem" }}>
              Loading...
            </div>
          }
        >
          <Routes>
            {/* Private routes */}
            <Route element={<PrivateRoute element={<Layout />} />}>
              <Route path="/home" element={<HomePage />} />
              <Route path="/profile/:username" element={<ProfilePage />} />
              <Route path="/profile/edit" element={<ProfilePageForm />} />
              <Route path="/network" element={<NetworkPage />} />
              <Route path="/projects" element={<ProjectPage />} />
              <Route path="/message" element={<MessagePage />} />
              <Route path="/notification" element={<NotificationPage />} />
              <Route path="/incubators" element={<IncubatorsPage />} />
              <Route path="/project" element={<ProjectPage />} />
              <Route path="/project/create" element={<ProjectForm />} />
              <Route path="/projects/edit/:projectId" element={<ProjectForm />} />
              <Route path="/project/:id" element={<ProjectPreviewPage />} />
            </Route>

            {/* Public routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Suspense>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
