// pages/api/cf.js

import mysql from 'mysql2/promise';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT, 10),
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.WEB_FS_DATABASE,
      });

      // 쿼리는 예제로 작성되었습니다. 실제 테이블 및 필드 이름에 따라 수정해야 합니다.
      const query = `
      SELECT * 
      FROM cf 
      WHERE symbol = ?
    `;

      const symbol = req.query.symbol;
      const [rows] = await connection.execute(query, [symbol]);
      res.status(200).json(rows);
      connection.end();
    } catch (error) {
      console.error('Error fetching cash flow data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
