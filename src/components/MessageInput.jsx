import React, { useState } from "react";

const MessageInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim() !== "") {
      onSendMessage({ text: message, sender: "user" });
      setMessage("");
    }
  };

  return (
    <div className="p-2 border-t flex items-center">
      <input
        type="text"
        className="flex-1 p-2 border rounded"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button className="ml-2 p-2 bg-blue-500 text-white rounded" onClick={handleSend}>
        Send
      </button>
    </div>
  );
};

export default MessageInput;
