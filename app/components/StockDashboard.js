import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function StockDashboard({ query }) {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/stocks');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        console.log(data);
        setStocks(data);
      } catch (error) {
        console.error('Error fetching stock data:', error);
        setStocks([]);
      }
    };

    fetchData();
  }, []);

  const filteredStocks = query
    ? stocks.filter((stock) => stock.Symbol.toLowerCase().startsWith(query.toLowerCase()))
    : stocks;

  return (
    <div className="mt-32 flex justify-center">
      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6">
        {filteredStocks.map((stock, index) => {
          return (
            <Link key={index} href={`/${encodeURIComponent(stock.Symbol)}`}>
              <div className="cursor-pointer bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md w-64 transition transform duration-200 ease-in-out hover:scale-105 dark:hover:bg-gray-700 text-black dark:text-white">
                <h2 className="text-xl font-semibold mb-2">{stock.Symbol}</h2>
                <div className="flex justify-between items-center">
                  <span>Stock Price:</span>
                  <span className="text-green-500 dark:text-green-300 font-semibold">${stock.Price.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Volume:</span>
                  <span className="font-medium">{stock.Volume ? stock.Volume.toLocaleString() : 'N/A'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Change:</span>
                  <span className={`font-medium ${stock.Change && stock.Change >= 0 ? 'text-green-500 dark:text-green-300' : 'text-red-500 dark:text-red-300'}`}>
                    {stock.Change ? stock.Change.toFixed(2) + "%" : 'N/A'}
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
