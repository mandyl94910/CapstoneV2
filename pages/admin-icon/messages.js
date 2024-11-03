import { useEffect, useState } from "react";
import PaginationButton from "../../components/admin/management/PaginationButton";

export default function MessagesPage() {
  const [messages, setMessages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const messagesPerPage = 8;

  // Fetch messages from API when component mounts
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        console.log("Fetching messages from API...");
        const response = await fetch("/api/message");
        console.log("Response status:", response.status);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Data received:", data);
        setMessages(data);
      } catch (error) {
        console.error("Failed to fetch messages:", error);
      }
    };

    fetchMessages();
  }, []);

  // Calculate indexes for current page
  const indexOfLastMessage = currentPage * messagesPerPage;
  const indexOfFirstMessage = indexOfLastMessage - messagesPerPage;
  const currentMessages = messages.slice(
    indexOfFirstMessage,
    indexOfLastMessage
  );

  // Calculate total pages
  const totalPages = Math.ceil(messages.length / messagesPerPage);

  // Navigate to next page
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  // Navigate to previous page
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  // Navigate to a specific page
  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Format date and time for display
  const formatSentTime = (sentTime) => {
    const date = new Date(sentTime);
    const formattedDate = date.toLocaleDateString("en-US"); // Format as MM/DD/YYYY
    const formattedTime = date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }); // Format as HH:MM
    return { date: formattedDate, time: formattedTime };
  };

  return (
    <div className="p-8 relative">
      {/* Back button at the top-right corner */}
      <button
        onClick={() => window.history.back()}
        className="absolute top-6 right-4 px-4 py-2 bg-gray-400 text-white rounded hover:bg-slate-500"
      >
        Back
      </button>

      <h1 className="text-2xl font-bold mb-4">User Messages</h1>

      {/* Display messages in two columns */}
      <div className="flex flex-wrap justify-between">
        {[0, 1].map((column) => (
          <ul key={column} className="w-1/2 space-y-4">
            {currentMessages.slice(column * 4, (column + 1) * 4).map((msg) => {
              const { date, time } = formatSentTime(msg.sent_time);
              return (
                <li key={msg.id} className="border p-4 rounded-md relative">
                  {/* Display date and time on the same line */}
                  <p className="flex items-center space-x-4">
                    <span>
                      <strong>Date:</strong> {date}
                    </span>
                    <span>
                      <strong>Time:</strong> {time}
                    </span>
                  </p>
                  <p>
                    <strong>Name:</strong> {msg.first_name} {msg.last_name}
                  </p>
                  <p>
                    <strong>Email:</strong> {msg.email}
                  </p>
                  <p className="break-words">
                    <strong>Message:</strong> {msg.message}
                  </p>
                  {/* Reply button to open email client */}
                  <button
                    onClick={() =>
                      (window.location.href = `mailto:${msg.email}`)
                    }
                    className="absolute top-4 right-4 px-3 py-1 bg-slate-500 text-white rounded hover:bg-blue-300"
                  >
                    Reply
                  </button>
                </li>
              );
            })}
          </ul>
        ))}
      </div>

      {/* Pagination controls */}
      <div className="flex justify-center mt-4">
        <PaginationButton
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
          className="bg-gray-200"
        >
          &larr;
        </PaginationButton>

        {/* Render page numbers */}
        {Array.from({ length: totalPages }, (_, index) => (
          <PaginationButton
            key={index + 1}
            onClick={() => goToPage(index + 1)}
            className={`${
              currentPage === index + 1
                ? "bg-gray-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {index + 1}
          </PaginationButton>
        ))}

        <PaginationButton
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          className="bg-gray-200"
        >
          &rarr;
        </PaginationButton>
      </div>
    </div>
  );
}
