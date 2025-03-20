import React from "react";
import { FiMessageCircle, FiUser, FiSettings, FiHome } from "react-icons/fi";

const NavigationPanel = () => {
  return (
    <div className="w-16 bg-gray-200 h-full flex flex-col items-center py-4 shadow-md">
      <FiHome className="text-gray-600 text-2xl my-4 cursor-pointer hover:text-blue-500" />
      <FiUser className="text-gray-600 text-2xl my-4 cursor-pointer hover:text-blue-500" />
      <FiMessageCircle className="text-blue-500 text-2xl my-4 cursor-pointer" /> {/* Active */}
      <FiSettings className="text-gray-600 text-2xl my-4 cursor-pointer hover:text-blue-500" />
    </div>
  );
};

export default NavigationPanel;
