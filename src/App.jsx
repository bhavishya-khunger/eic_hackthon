import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./pages/Authentication";
import Profile from "./pages/Profile";
import ExpertFinder from "./pages/ExpertFinder";
import LandingPage from "./pages/LandingPage";
import SetupProfile from "./pages/SetUpProfile";
import UpdateProfileForm from "./pages/SetUpProfile";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/setup" element={<UpdateProfileForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/expert" element={<ExpertFinder />} />
        <Route path="*" element={<Profile />} />
      </Routes>
    </Router>
  );
};

export default App;
