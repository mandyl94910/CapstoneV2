let messages = []; // Temporary in-memory message storage

export default async function handler(req, res) {
  if (req.method === "GET") {
    res.status(200).json(messages); // Return all messages
  } else if (req.method === "POST") {
    const { firstName, lastName, email, message } = req.body;

    const newMessage = {
      id: messages.length + 1,
      firstName,
      lastName,
      email,
      message,
      isRead: false, // Message read status
      timestamp: new Date().toISOString(),
    };

    messages.push(newMessage);
    res.status(201).json(newMessage);
  } else if (req.method === "PUT") {
    const { id } = req.body;
    // Update the message to mark it as read
    const message = messages.find((msg) => msg.id === id);
    if (message) {
      message.isRead = true;
      res.status(200).json({ message: "Message marked as read" });
    } else {
      res.status(404).json({ message: "Message not found" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
