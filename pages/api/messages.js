import db from "../../server/db";

// API route handler for managing messages
export default async function handler(req, res) {
  if (req.method === "POST") {
    // Handle adding a new message
    const { firstName, lastName, email, message } = req.body;

    try {
      // Insert a new message into the database
      const result = await db.query(
        `INSERT INTO public.message (first_name, last_name, email, message, is_read, sent_time) 
         VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
        [firstName, lastName, email, message, false, new Date().toISOString()]
      );

      // Retrieve the newly inserted message
      const newMessage = result.rows[0];
      res.status(201).json(newMessage); // Send the new message as a response
    } catch (error) {
      console.error("Error saving message:", error);
      res.status(500).json({ message: "Error saving message" }); // Error handling for failed insertion
    }
  } else if (req.method === "PUT") {
    // Handle marking all messages as read
    try {
      // Update all messages to set is_read to true
      await db.query("UPDATE public.message SET is_read = TRUE");
      res.status(200).json({ message: "All messages marked as read" }); // Response on success
    } catch (error) {
      console.error("Failed to mark messages as read:", error);
      res.status(500).json({ message: "Failed to mark messages as read" }); // Error handling for failed update
    }
  } else {
    // Handle unsupported HTTP methods
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
