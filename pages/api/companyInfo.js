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

      const symbol = req.query.symbol;  // 요청에서 symbol 값을 가져옵니다.

      const query = `
      SELECT 
        symbol, 
        name, 
        longBusinessSummary
      FROM symbol_list
      WHERE symbol = ?
    `;

      const [rows] = await connection.execute(query, [symbol]);  // 쿼리 실행 시 symbol 값을 전달합니다.
      res.status(200).json(rows);
      connection.end();
    } catch (error) {
      console.error('Error fetching company info:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
