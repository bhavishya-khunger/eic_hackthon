import React, { useState, useEffect, useRef } from "react";

const ChatWindow = ({ selectedUser, messages, onSendMessage }) => {
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  // Auto-scroll to latest message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (input.trim() === "") return;
    onSendMessage({ text: input, sender: "user" });
    setInput(""); // Clear input after sending
  };

  return (
    <div className="w-3/4 bg-gradient-to-b from-gray-100 to-white shadow-lg flex flex-col h-full border border-gray-300">
      {/* Fixed Chat Header with Light Blue Background & Shadow */}
      <div className="sticky top-0 left-0 right-0 bg-blue-100 text-gray-800 px-4 py-3 font-semibold border-b border-gray-300 shadow-md">
        {selectedUser ? selectedUser.name : "Select a chat"}
      </div>

      {/* Chat Messages Container */}
      <div className="flex-1 overflow-auto p-4 space-y-3 flex flex-col bg-gray-50">
        {messages.length > 0 ? (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`max-w-[75%] px-4 py-2 rounded-2xl shadow-md break-words ${
                msg.sender === "user"
                  ? "bg-blue-400 text-white self-end"
                  : "bg-gray-300 text-black self-start"
              }`}
            >
              {msg.text}
            </div>
          ))
        ) : (
          <div className="text-gray-600 text-center">No messages yet</div>
        )}
        {/* Empty div to auto-scroll to latest message */}
        <div ref={chatEndRef}></div>
      </div>

      {/* Message Input Box & Send Button */}
      <div className="flex items-center gap-2 bg-white p-3 border-t border-gray-300 shadow-md">
        <input
          type="text"
          className="flex-1 p-3 border border-gray-300 rounded-full shadow-sm outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()} // Send on Enter key
        />
        <button
          onClick={handleSend}
          className="bg-blue-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-blue-600 transition-all"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
