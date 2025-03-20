import React, { useState } from "react";
import { updateUserProfile } from "../backend/backend";

const UpdateProfileForm = () => {
    const [profession, setProfession] = useState("");
    const [tagline, setTagline] = useState("");
    const [linkedin, setLinkedin] = useState("");
    const [areasOfInterest, setAreasOfInterest] = useState([]);
    const [newInterest, setNewInterest] = useState("");

    const handleAddTag = () => {
        if (newInterest.trim() && !areasOfInterest.includes(newInterest.trim())) {
            setAreasOfInterest([...areasOfInterest, newInterest.trim()]);
        }
        setNewInterest("");
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        await updateUserProfile(profession, tagline, linkedin, areasOfInterest);
        alert("Profile updated!");
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h2 className="text-2xl font-bold">Update Profile</h2>
            <form onSubmit={handleUpdate} className="space-y-4 w-80">
                <input
                    type="text"
                    placeholder="Profession"
                    className="p-2 border rounded w-full"
                    value={profession}
                    onChange={(e) => setProfession(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Tagline"
                    className="p-2 border rounded w-full"
                    value={tagline}
                    onChange={(e) => setTagline(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="LinkedIn URL"
                    className="p-2 border rounded w-full"
                    value={linkedin}
                    onChange={(e) => setLinkedin(e.target.value)}
                />
                <div className="flex items-center">
                    <input
                        type="text"
                        placeholder="Add Interest"
                        className="p-2 border rounded w-full"
                        value={newInterest}
                        onChange={(e) => setNewInterest(e.target.value)}
                    />
                    <button
                        type="button"
                        className="ml-2 bg-green-500 text-white px-4 py-2 rounded"
                        onClick={handleAddTag}
                    >
                        Add
                    </button>
                </div>
                <div className="flex flex-wrap gap-2">
                    {areasOfInterest.map((tag, index) => (
                        <span key={index} className="bg-blue-200 text-blue-800 px-2 py-1 rounded">
                            {tag}
                        </span>
                    ))}
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded w-full"
                >
                    Update Profile
                </button>
            </form>
        </div>
    );
};

export default UpdateProfileForm;
