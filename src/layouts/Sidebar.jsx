import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Home, Users, MessageSquare, User } from "lucide-react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { approveConnection, getCurrentUser, sendConnectionRequest } from "../backend/backend";

function Sidebar() {
    const navigate = useNavigate();
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
            // setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const sample = () => {
        // sendConnectionRequest("BOrPri01yqcquwtT7em1ScfL6z12", "PO0RXtpTCAa5vj6h25LcZ3UPH2N2");
        approveConnection("PO0RXtpTCAa5vj6h25LcZ3UPH2N2", "BOrPri01yqcquwtT7em1ScfL6z12");
        console.log("Ho gya");
    }

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
            <div onClick={sample} className="flex justify-center font-semibold text-xl items-center gap-3 p-3 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-700 transition">
                <span>{user?.name?.charAt(0).toUpperCase()}</span>
            </div>
        </div>
    );
}

export default Sidebar;
