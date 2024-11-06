import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FaShieldAlt, FaEnvelope, FaBell } from "react-icons/fa";
import ProfileDropdown from "../admin/dashboard/ProfileDropdown";
import { useMessageContext } from "../../context/MessageContext";

const Header = ({ title }) => {
  const { messageCount, refreshMessageCount } = useMessageContext();
  const [notifications, setNotifications] = useState([]);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    // Load notifications from localStorage on component mount
    const storedNotifications =
      JSON.parse(localStorage.getItem("notifications")) || [];
    setNotifications(storedNotifications);
  }, []);

  const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);

  const markMessagesAsRead = async () => {
    try {
      await fetch("/api/messages", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ markAllAsRead: true }),
      });
      await refreshMessageCount();
    } catch (error) {
      console.error("Failed to mark messages as read:", error);
    }
  };

  // 알림을 클릭하면 제거하는 함수
  const removeNotification = (indexToRemove) => {
    const updatedNotifications = notifications.filter(
      (_, index) => index !== indexToRemove
    );
    setNotifications(updatedNotifications);
    localStorage.setItem("notifications", JSON.stringify(updatedNotifications));
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

        <div className="relative">
          <FaBell
            className="text-2xl text-orange-500 cursor-pointer"
            onClick={toggleDropdown}
          />
          {notifications.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2 py-1">
              {notifications.length}
            </span>
          )}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white border rounded-lg shadow-lg p-4">
              <h3 className="font-bold mb-2">Notifications</h3>
              <ul>
                {notifications.map((notification, index) => (
                  <li
                    key={index}
                    className="text-sm mb-2 cursor-pointer"
                    onClick={() => removeNotification(index)} // 클릭 시 알림 제거
                  >
                    <strong>{notification.customerName}</strong> ordered:
                    {notification.items ? (
                      <ul className="ml-5 list-disc">
                        {notification.items.map((item, idx) => (
                          <li key={idx}>
                            <strong>{item}</strong>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="ml-5 text-gray-500">No items</p>
                    )}
                    <span className="text-gray-500 text-xs">
                      Ordered at:{" "}
                      {new Date(notification.orderTime).toLocaleString()}
                    </span>
                  </li>
                ))}
              </ul>
              {notifications.length === 0 && (
                <p className="text-sm text-gray-500">No new notifications</p>
              )}
            </div>
          )}
        </div>

        <ProfileDropdown />
      </div>
    </div>
  );
};

export default Header;
