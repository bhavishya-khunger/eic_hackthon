import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import GoogleLogo from "../assets/google_logo.png"; // Ensure this path is correct
import { login, loginWithGoogle, register } from "../backend/backend";

function LoginPage() {
    const [isRegistering, setIsRegistering] = useState(false);
    const [fullName, setFullName] = useState("");
    const [age, setAge] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isRegistering) {
                await register(fullName, email, age, password, confirmPassword);
            } else {
                await login(email, password);
            }
            navigate("/profile");
        } catch (error) {
            console.error("Authentication Error:", error.message);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            await loginWithGoogle();
            navigate("/profile");
        } catch (error) {
            console.error("Google Login Error:", error.message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#1a2a6c] via-[#b21f1f] to-[#fdbb2d]">
            {/* Glassmorphism Card */}
            <div className="relative w-full max-w-md p-8 backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl shadow-2xl">
                <h2 className="text-center text-3xl font-semibold text-white tracking-wide mb-6">
                    {isRegistering ? "Register" : "Login"}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {isRegistering && (
                        <>
                            <input
                                type="text"
                                placeholder="Full Name"
                                className="w-full px-4 py-3 bg-gray-800/50 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#fdbb2d] focus:outline-none placeholder-gray-400 transition"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                required
                            />
                            <input
                                type="number"
                                placeholder="Age"
                                className="w-full px-4 py-3 bg-gray-800/50 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#fdbb2d] focus:outline-none placeholder-gray-400 transition"
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                                required
                            />
                        </>
                    )}
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full px-4 py-3 bg-gray-800/50 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#fdbb2d] focus:outline-none placeholder-gray-400 transition"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full px-4 py-3 bg-gray-800/50 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#fdbb2d] focus:outline-none placeholder-gray-400 transition"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    {isRegistering && <input
                        type="password"
                        placeholder="Confirm Password"
                        className="w-full px-4 py-3 bg-gray-800/50 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#fdbb2d] focus:outline-none placeholder-gray-400 transition"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />}
                    <button
                        type="submit"
                        className="w-full px-4 py-3 bg-[#b21f1f] hover:bg-[#a11a1a] text-white rounded-lg shadow-md transition transform hover:scale-[1.02] font-medium"
                    >
                        {isRegistering ? "Sign Up" : "Sign In"}
                    </button>
                </form>

                <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-500"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-transparent text-gray-300">or</span>
                    </div>
                </div>

                <button
                    onClick={handleGoogleLogin}
                    className="w-full flex items-center justify-center gap-3 px-4 py-3 text-black bg-white hover:bg-[#e0e0e0] rounded-lg shadow-lg transition transform hover:scale-[1.02]"
                >
                    <img src={GoogleLogo} className="w-8" alt="Google Logo" />
                    <span className="text-sm font-medium">Sign in with Google</span>
                </button>

                <p className="mt-4 text-center text-gray-300 text-sm">
                    {isRegistering ? "Already have an account?" : "Don't have an account?"} {" "}
                    <button
                        onClick={() => setIsRegistering(!isRegistering)}
                        className="text-[#fdbb2d] hover:underline"
                    >
                        {isRegistering ? "Sign in" : "Sign up"}
                    </button>
                </p>
            </div>
        </div>
    );
}

export default LoginPage;