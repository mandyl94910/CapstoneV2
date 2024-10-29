import React from "react";
import Link from "next/link";
import { FaShieldAlt, FaEnvelope, FaBell } from "react-icons/fa";
import ProfileDropdown from "../admin/dashboard/ProfileDropdown";
import { useMessageContext } from "../../context/MessageContext"; // Importing context

const Header = ({ title }) => {
  const { messageCount, refreshMessageCount } = useMessageContext(); // State and refresh function

  // Function to mark messages as read
  const markMessagesAsRead = async () => {
    try {
      await fetch("/api/messages", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: 1 }), // Example: Mark first message as read
      });

      await refreshMessageCount(); // Refresh state
    } catch (error) {
      console.error("Failed to mark messages as read:", error);
    }
  };

  return (
    <div className="flex justify-between items-center p-4 bg-white shadow-md">
      <h1 className="text-xl font-bold text-slate-600">{title}</h1>
      <div className="flex space-x-6 items-center">
        <Link href="/admin/protection">
          <FaShieldAlt className="text-2xl text-green-500" />
        </Link>

        {/* Mail icon */}
        <Link
          href="/admin-icon/messages"
          className="relative"
          onClick={markMessagesAsRead}
        >
          <FaEnvelope className="text-2xl text-yellow-500" />
          {messageCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2 py-1">
              {messageCount}
            </span>
          )}
        </Link>

        <Link href="/admin/notifications">
          <FaBell className="text-2xl text-orange-500" />
        </Link>

        <ProfileDropdown />
      </div>
    </div>
  );
};

export default Header;
