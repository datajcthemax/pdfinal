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
      s1.Date,
      s1.Symbol, 
      s1.Open,
      s1.Close,
      s1.High,
      s1.Low,
      s1.Volume,
      s1.Change
    FROM stock_data s1
    WHERE s1.Symbol = ? 
    AND s1.Date >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
    ORDER BY s1.Date DESC;
    
    `;
    
    const [rows] = await connection.execute(query, [req.query.symbol]);
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
