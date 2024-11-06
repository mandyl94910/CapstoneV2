
import { pool } from "../../../server/db"; // PostgreSQL 설정 가져오기

export default async (req, res) => {
  if (req.method === "POST") {
    const { barcode } = req.body;

    try {
      const result = await pool.query(
        "SELECT * FROM products WHERE barcode = $1",
        [barcode]
      );

      if (result.rows.length > 0) {
        res.status(200).json(result.rows[0]);
      } else {
        res.status(404).json({ message: "제품을 찾을 수 없습니다" });
      }
    } catch (error) {
      console.error("데이터베이스 오류:", error);
      res.status(500).json({ message: "서버 오류가 발생했습니다" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
