import React, { useEffect, useState } from "react";
import { findUserFromUID } from "../backend/backend";

const ConnectionsList = ({ user }) => {
    const [connections, setConnections] = useState([]);

    useEffect(() => {
        const fetchConnections = async () => {
            if (!user?.connections) return;
            console.log(user.connections);

            const connectionsData = await Promise.all(
                user.connections.map(async (connection) => {
                    const connectionInfo = await findUserFromUID(connection);
                    return { ...connection, ...connectionInfo };
                })
            );

            setConnections(connectionsData);
        };

        fetchConnections();
    }, [user]);

    return (
        <div className="md:w-2/3 w-full">
            <h2 className="text-xl font-semibold mb-4 text-center md:text-left">
                Connections
            </h2>
            <div className="space-y-4">
                {connections.map((connection, index) => (
                    <div
                        key={index}
                        className="flex flex-col md:flex-row items-center bg-gray-800 p-4 rounded-lg shadow-lg"
                    >
                        <div className="w-16 h-16 rounded-full bg-blue-500 text-white flex items-center justify-center text-2xl font-bold mr-4">
                            {connection.name?.charAt(0)}
                        </div>
                        <div className="flex-grow text-center md:text-left">
                            <h3 className="text-lg font-semibold">{connection.name}</h3>
                        </div>
                        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm mt-2 md:mt-0">
                            Chat
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ConnectionsList;
