import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./pages/Authentication";
import Profile from "./pages/Profile";
import ExpertFinder from "./pages/ExpertFinder";
import LandingPage from "./pages/LandingPage";
import SetupProfile from "./pages/SetUpProfile";
import UpdateProfileForm from "./pages/SetUpProfile";
import ChatScreen from "./pages/ChatScreen";
import Layout from "./layouts/Layout";
import StartupForm from './pages/StartupForm'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/suf" element={<StartupForm />} />
        <Route path="/setup" element={<UpdateProfileForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/chat" element={<Layout children={<ChatScreen />} />} />
        <Route path="/connections" element={<Layout children={<Profile />} />} />
        <Route path="/expert" element={<Layout children={<ExpertFinder />} />} />
        <Route path="*" element={<Layout children={<Profile />} />} />
      </Routes>
    </Router>
  );
};

export default App;