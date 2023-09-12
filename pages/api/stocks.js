import mysql from 'mysql2/promise';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const connection = await mysql.createConnection({
        // MySQL 연결 정보 (환경 변수로 설정)
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT, 10),
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
      });

      const query = `
      SELECT 
        Symbol, 
        Close AS Price, 
        \`Change\`,
        Volume
      FROM stock_data
      WHERE (Symbol, Date) IN (
        SELECT Symbol, MAX(Date) 
        FROM stock_data
        GROUP BY Symbol
      )
    `;

      const [rows] = await connection.execute(query);
      res.status(200).json(rows);
      connection.end();
    } catch (error) {
      console.error('Error fetching stock data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}