import React from "react";

const SuggestedResponses = ({ onSendMessage }) => {
  const suggestions = ["Hi!", "Hello!", "How are you?"];

  return (
    <div className="flex space-x-2 p-2 bg-white shadow-md rounded-lg mx-4 mb-2">
      {suggestions.map((msg, index) => (
        <button
          key={index}
          className="bg-blue-300 px-4 py-2 rounded-lg text-sm shadow-md hover:bg-blue-400 hover:text-white transition cursor-pointer"
          onClick={() => onSendMessage(msg)} // Auto-send on click
        >
          {msg}
        </button>
      ))}
    </div>
  );
};

export default SuggestedResponses;
