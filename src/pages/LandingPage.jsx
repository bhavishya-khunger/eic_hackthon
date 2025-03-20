import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../backend/backend";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConfig";

export default function LandingPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          const loggedUser = await getCurrentUser();
          console.log("loggedUser: ", loggedUser);
          setUser(loggedUser);
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleClick = () => {
    if (!user) {
      navigate("/login");
    } else {
      navigate("/connections");
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#0A0A0A] via-[#000F1C] to-[#020C1B] text-white relative overflow-hidden">

      {/* Background Overlay */}
      <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{ backgroundImage: "url('/glassy blue effect.png')" }}></div>

      {/* Hero Section */}
      <motion.div
        className="text-center max-w-3xl px-6 z-10"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-5xl font-extrabold text-white">
          Transform Your <span className="italic text-[#1E90FF]">Connections</span>
        </h1>
        <p className="mt-4 text-lg text-gray-300">
          AI-powered profile matching that revolutionizes networking.
        </p>
        <motion.button
          onClick={handleClick}
          className="mt-6 px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition hover:scale-105"
          whileHover={{ scale: 1.1 }}
        >
          Get Started →
        </motion.button>
      </motion.div>

      {/* Features Section */}
      <motion.div
        className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 z-10"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <FeatureCard title="⚡ AI-Powered Matching" description="Smart recommendations based on skills & interests." />
        <FeatureCard title="🎨 Futuristic UI" description="A sleek, modern interface with smooth interactions." />
        <FeatureCard title="📡 Real-Time Insights" description="Live profile suggestions & data-driven matches." />
      </motion.div>

      {/* Trusted by Brands Section */}
      {/* <motion.div
        className="mt-12 flex items-center justify-center gap-8 opacity-80 z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <img src="/logo1.png" className="h-10 grayscale hover:grayscale-0 transition" />
        <img src="/logo2.png" className="h-10 grayscale hover:grayscale-0 transition" />
        <img src="/logo3.png" className="h-10 grayscale hover:grayscale-0 transition" />
      </motion.div> */}
    </div>
  );
}

// Feature Card Component
function FeatureCard({ title, description }) {
  return (
    <motion.div
      className="p-6 bg-[#0F172A] rounded-xl shadow-md border border-[#1E90FF] text-white hover:shadow-lg transition"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-2xl font-bold">{title}</h2>
      <p className="mt-2 text-gray-400">{description}</p>
    </motion.div>
  );
}
