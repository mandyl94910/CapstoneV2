import { useEffect, useState } from "react";

export default function MessagesPage() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch("/api/messages"); // Call the API
        const data = await response.json(); // Retrieve message data
        setMessages(data); // Update state
      } catch (error) {
        console.error("Failed to fetch messages:", error);
      }
    };

    fetchMessages(); // Call function to fetch messages
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">User Messages</h1>
      <ul className="space-y-4">
        {messages.map((msg) => (
          <li key={msg.id} className="border p-4 rounded-md">
            <p>
              <strong>Name:</strong> {msg.firstName} {msg.lastName}
            </p>
            <p>
              <strong>Email:</strong> {msg.email}
            </p>
            <p>
              <strong>Message:</strong> {msg.message}
            </p>
            <p className="text-sm text-gray-500">{msg.timestamp}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
