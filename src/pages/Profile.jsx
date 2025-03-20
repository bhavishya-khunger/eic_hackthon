import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { auth } from '../firebaseConfig';
import { getCurrentUser } from '../backend/backend';
import { QRCodeCanvas } from "qrcode.react";
import { Search } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const [user, setUser] = useState({
        name: "John Doe",
        headline: "AI Researcher | Data Scientist",
        bio: "Passionate about AI, ML, and data-driven insights.",
        profilePic: "https://via.placeholder.com/150",
        connections: [
            { name: "Dr. Jane Smith", platform: "LinkedIn", link: "https://linkedin.com/in/janesmith" },
            { name: "Mike Johnson", platform: "GitHub", link: "https://github.com/mikejohnson" },
            { name: "AI Research Hub", platform: "Twitter", link: "https://twitter.com/airesearch" }
        ]
    });
    const navigate = useNavigate();

    const handleLogout = () => {
        signOut(auth).then(() => {
            console.log("User signed out");
        }).catch((error) => {
            console.error("Logout error", error);
        });
    };

    const [loading, setLoading] = useState(true);

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

    if (loading) {
        return <div className="text-white text-center">Loading...</div>; // Prevents premature redirection
    }

    if (!user) {
        navigate("/login");
        return null; // Prevents rendering further
    }


    if (!user) {
        navigate("/login");
        return;
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6 flex flex-col md:flex-row gap-6">
            {/* Profile Section */}
            <div className="md:w-1/3 w-full bg-gray-800 p-6 rounded-lg shadow-lg relative">
                <button
                    onClick={handleLogout}
                    className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm"
                >
                    Logout
                </button>
                {/* <img src={user.profilePic} alt="Profile" className="w-24 h-24 rounded-full mb-4 mx-auto md:mx-0" /> */}
                <div className="w-24 h-24 rounded-full mb-4 flex items-center justify-center bg-blue-500 text-white text-2xl font-bold">
                    {user.name.charAt(0)}
                </div>
                <h1 className="text-2xl font-semibold text-center md:text-left">{user.name}</h1>
                <p className="text-sm text-gray-400 text-center md:text-left">{user.headline}</p>
                <p className="mt-2 text-gray-300 text-center md:text-left">{user.bio}</p>
                <div className="mt-4 flex justify-center md:justify-start">
                    <QRCodeCanvas value={user.qrValue} size={100} />
                </div>
            </div>

            {/* Connections Section */}
            <div className="md:w-2/3 w-full">
                <h2 className="text-xl font-semibold mb-4 text-center md:text-left">Connections</h2>
                <div className="space-y-4">
                    {user?.connections?.map((connection, index) => (
                        <div key={index} className="flex flex-col md:flex-row items-center bg-gray-800 p-4 rounded-lg shadow-lg">
                            <img src={connection.profilePic} alt="Profile" className="w-16 h-16 rounded-full mr-4" />
                            <div className="flex-grow text-center md:text-left">
                                <h3 className="text-lg font-semibold">{connection.name}</h3>
                                <p className="text-sm text-gray-400">{connection.designation}</p>
                            </div>
                            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm mt-2 md:mt-0">
                                Chat
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Profile;