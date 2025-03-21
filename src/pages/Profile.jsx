import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { auth } from '../firebaseConfig';
import { findUserFromUID, getCurrentUser } from '../backend/backend';
import { QRCodeCanvas } from "qrcode.react";
import { Search } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import ConnectionsList from '../components/ConnectionList';

const Profile = () => {
    const [user, setUser] = useState();
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
        navigate("/");
        return null; // Prevents rendering further
    }


    if (!user) {
        navigate("/");
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
                <p className="text-sm text-gray-400 text-center md:text-left">{user.headline || "Always glad to connect and interact!"}</p>
                <p className="mt-2 text-gray-300 text-center md:text-left">{user.bio || "Batch of PEC'27"}</p>
                <div className="mt-4 bg-white w-fit p-1 flex justify-center md:justify-start">
                    <QRCodeCanvas value={user.uid} size={100} />
                </div>
            </div>

            {/* Connections Section */}
            <ConnectionsList user={user}/>
        </div>
    );
};

export default Profile;