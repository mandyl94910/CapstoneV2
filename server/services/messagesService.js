// Temporary in-memory array
let messages = [];

// Create a new message
export async function createMessage({ firstName, lastName, email, message }) {
  const newMessage = {
    id: messages.length + 1,
    firstName,
    lastName,
    email,
    message,
    timestamp: new Date().toISOString(),
  };
  messages.push(newMessage);
  return newMessage;
}

// Retrieve all messages
export async function getAllMessages() {
  return messages;
}
