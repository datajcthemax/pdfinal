import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function StockDashboard({ query }) {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/stocks'); // API 엔드포인트 호출
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setStocks(data);
      } catch (error) {
        console.error('Error fetching stock data:', error);
        setStocks([]); // 에러 발생 시 빈 배열로 초기화
      }
    };

    fetchData();
  }, []);

  return (
    <div className="mt-32 flex justify-center">
      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6">
        {stocks.map((stock, index) => (
          <Link key={index} href={`/${encodeURIComponent(stock.Symbol)}`}>
            <div className="cursor-pointer bg-white p-4 rounded-lg shadow-md w-64 transition transform duration-200 ease-in-out hover:scale-105 hover:bg-blue-100">
              <h2 className="text-xl font-semibold mb-2">{stock.Symbol}</h2>
              <div className="flex justify-between items-center">
                <span>Stock Price:</span>
                <span className="text-green-500 font-semibold">${stock.Price.toFixed(2)}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
