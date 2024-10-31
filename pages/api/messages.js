import db from "../../server/db"; // db.js 파일 경로에 맞게 수정하세요

export default async function handler(req, res) {
  if (req.method === "POST") {
    // 새로운 메시지 추가
    const { firstName, lastName, email, message } = req.body;

    try {
      const result = await db.query(
        `INSERT INTO public.message (first_name, last_name, email, message, is_read, sent_time) 
         VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
        [firstName, lastName, email, message, false, new Date().toISOString()]
      );

      const newMessage = result.rows[0]; // 삽입된 메시지 반환
      res.status(201).json(newMessage);
    } catch (error) {
      console.error("Error saving message:", error);
      res.status(500).json({ message: "Error saving message" });
    }
  } else if (req.method === "PUT") {
    // 모든 메시지를 읽음 상태로 표시
    try {
      await db.query("UPDATE public.message SET is_read = TRUE");
      res.status(200).json({ message: "All messages marked as read" });
    } catch (error) {
      console.error("Failed to mark messages as read:", error);
      res.status(500).json({ message: "Failed to mark messages as read" });
    }
  } else {
    // POST와 PUT 이외의 메서드 요청 처리
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
