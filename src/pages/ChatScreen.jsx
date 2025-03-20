import React, { useState, useEffect } from 'react';
import ChatWindow from "../components/ChatWindow.jsx";
import ChatList from "../components/ChatList";  // If ChatList.jsx is in the same folder
import ChatUI from "../components/ChatUI.jsx";

const ChatScreen = () => {
    const [selectedUser, setSelectedUser] = useState(null);
    const [messages, setMessages] = useState({});
    const users = [
        { id: 1, name: "John Doe" },
        { id: 2, name: "Alice Smith" },
    ];

    const handleSendMessage = (msg) => {
        if (!selectedUser) return;

        setMessages((prevMessages) => {
            const updatedMessages = { ...prevMessages };
            updatedMessages[selectedUser.id] = [
                ...(updatedMessages[selectedUser.id] || []),
                msg,
            ];
            return updatedMessages;
        });
    };

    // Extract last message for each user
    const lastMessages = {};
    users.forEach((user) => {
        const userMessages = messages[user.id] || [];
        lastMessages[user.id] = userMessages.length > 0 ? userMessages[userMessages.length - 1].text : "No messages yet.";
    });

    return (
        <div className="flex h-screen">
            <ChatList users={users} onSelectUser={setSelectedUser} lastMessages={lastMessages} />
            {selectedUser ? (
                <ChatWindow selectedUser={selectedUser} messages={messages[selectedUser.id] || []} onSendMessage={handleSendMessage} />

            ) : (
                <div className="w-3/4 flex items-center justify-center text-gray-500">
                    Select a user to chat
                </div>
            )}
        </div>
    );
}

export default ChatScreen
