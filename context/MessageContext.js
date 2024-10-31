import { createContext, useState, useContext, useEffect } from "react";

const MessageContext = createContext();

export function MessageProvider({ children }) {
  const [messageCount, setMessageCount] = useState(0);

  // Function to fetch the number of messages
  const fetchMessageCount = async () => {
    try {
      const response = await fetch("/api/message");
      const data = await response.json();
      const unreadCount = data.filter((msg) => !msg.is_read).length; // Calculate the number of unread messages
      setMessageCount(unreadCount);
    } catch (error) {
      console.error("Failed to fetch message count:", error);
    }
  };

  useEffect(() => {
    fetchMessageCount();
  }, []);

  const refreshMessageCount = async () => {
    await fetchMessageCount();
  };

  return (
    <MessageContext.Provider value={{ messageCount, refreshMessageCount }}>
      {children}
    </MessageContext.Provider>
  );
}

export const useMessageContext = () => useContext(MessageContext);
