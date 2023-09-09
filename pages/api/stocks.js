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
        s1.Symbol, 
        s1.Close AS Price, 
        s1.Volume,
        s2.Close AS PreviousClose
      FROM stock_data s1
      LEFT JOIN stock_data s2 ON s1.Symbol = s2.Symbol AND DATE_ADD(s2.Date, INTERVAL 1 DAY) = s1.Date
      WHERE s1.Date = (SELECT MAX(Date) FROM stock_data WHERE Symbol = s1.Symbol)
      GROUP BY s1.Symbol
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
