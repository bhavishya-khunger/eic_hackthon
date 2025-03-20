import React from "react";
import { useNavigate } from "react-router-dom";
import { Home, Users, MessageSquare, User } from "lucide-react";

function Sidebar() {
    const navigate = useNavigate();

    return (
        <div className="h-screen w-fit bg-gray-900 text-white flex flex-col justify-between py-6 px-4 shadow-lg">
            {/* Navigation Buttons */}
            <div className="space-y-6">
                <button
                    className="flex items-center gap-3 px-4 py-3 w-full rounded-lg hover:bg-gray-700 transition"
                    onClick={() => navigate("/home")}
                >
                    <Home size={20} />
                    {/* <span>Home</span> */}
                </button>
                <button
                    className="flex items-center gap-3 px-4 py-3 w-full rounded-lg hover:bg-gray-700 transition"
                    onClick={() => navigate("/connections")}
                >
                    <Users size={20} />
                    {/* <span>My Connections</span> */}
                </button>
                <button
                    className="flex items-center gap-3 px-4 py-3 w-full rounded-lg hover:bg-gray-700 transition"
                    onClick={() => navigate("/chat")}
                >
                    <MessageSquare size={20} />
                    {/* <span>Chats</span> */}
                </button>
            </div>

            {/* Profile Section */}
            <div className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-700 transition">
                <User size={24} />
                {/* <span>Your Profile</span> */}
            </div>
        </div>
    );
}

export default Sidebar;
