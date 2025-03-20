import React from "react";

const ChatList = ({ users, onSelectUser, lastMessages }) => {
  return (
    <div className="w-1/4 bg-[#90CAF9] text-gray-900 border-r border-gray-300 p-4">
      <h2 className="text-lg font-semibold mb-4">Chats</h2>
      <ul>
        {users.map((user) => (
          <li
            key={user.id}
            onClick={() => onSelectUser(user)}
            className="p-3 cursor-pointer rounded-md transition bg-[#64B5F6] mb-2"
          >
            <div className="font-medium">{user.name}</div>
            <div className="text-sm text-gray-700">{lastMessages[user.id]}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatList;



