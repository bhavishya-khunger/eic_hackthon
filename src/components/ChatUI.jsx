import React, { useState } from "react";
import ChatList from "./ChatList";
import ChatWindow from "./ChatWindow";


const users = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Alice Smith" },
  { id: 3, name: "Bob Johnson" },
  { id: 4, name: "Emma Brown" },
];

const initialMessages = {
  1: [{ text: "Hey John!", sender: "me" }, { text: "Hello!", sender: "John Doe" }],
  2: [{ text: "Alice, how’s it going?", sender: "me" }],
  3: [{ text: "Meeting at 3 PM?", sender: "me" }, { text: "Sounds good!", sender: "Bob Johnson" }],
  4: [{ text: "Hey Emma!", sender: "me" }, { text: "Hi there!", sender: "Emma Brown" }],
};

const App = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState(initialMessages);

  const handleSendMessage = (msg) => {
    if (!selectedUser) return;
    
    setMessages((prevMessages) => ({
      ...prevMessages,
      [selectedUser.id]: [...(prevMessages[selectedUser.id] || []), { text: msg, sender: "me" }],
    }));
  };

  return (
    <div className="flex h-screen">
      {/* Chat List on the Left */}
      <ChatList users={users} onSelectUser={setSelectedUser} lastMessages={messages} />

      {/* Chat Window on the Right */}
      {selectedUser ? (
        <ChatWindow
          selectedUser={selectedUser}
          messages={messages[selectedUser.id] || []}
          onSendMessage={handleSendMessage}
        />
      ) : (
        <div className="w-3/4 flex items-center justify-center text-gray-500">
          Select a user to chat
        </div>
      )}
    </div>
  );
};

export default App;
