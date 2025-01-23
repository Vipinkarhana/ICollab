import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/Pages/HomePage/HomePage";
import ProfilePage from "./components/Pages/ProfilePage/ProfilePage";
import NetworkPage from "./components/Pages/NetworkPage/NetworkPage";
import Layout from "./components/Layout/Layout";
function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/network" element={<NetworkPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;


