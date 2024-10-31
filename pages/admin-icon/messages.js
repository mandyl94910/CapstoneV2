import { useEffect, useState } from "react";

export default function MessagesPage() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        console.log("Fetching messages from API..."); // API 호출 전
        const response = await fetch("/api/message"); // API 엔드포인트 호출
        console.log("Response status:", response.status); // 응답 상태 코드 확인

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Data received:", data); // 받아온 데이터 확인
        setMessages(data); // 데이터 상태 업데이트
      } catch (error) {
        console.error("Failed to fetch messages:", error);
      }
    };

    fetchMessages();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">User Messages</h1>
      <ul className="space-y-4">
        {messages.map((msg) => (
          <li key={msg.id} className="border p-4 rounded-md w-1/2">
            <p>
              <strong>Name:</strong> {msg.first_name} {msg.last_name}
            </p>
            <p>
              <strong>Email:</strong> {msg.email}
            </p>
            <p className="break-words">
              <strong>Message:</strong> {msg.message}
            </p>
            <p className="text-sm text-gray-500">{msg.timestamp}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
