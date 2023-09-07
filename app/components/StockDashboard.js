import axios from 'axios';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function StockDashboard({ query }) {
  const [stocks, setStocks] = useState([]);
  const symbols = [
    'AAPL',  // Apple
    'MSFT',  // Microsoft
    'AMZN',  // Amazon
    'GOOGL', // Google
    'FB',    // Facebook
    'TSLA',  // Tesla
    'NFLX',  // Netflix
    'DIS',   // Disney
    'NVDA',  // NVIDIA
    'PYPL',  // PayPal
    'ADBE',  // Adobe
    'CRM'    // Salesforce
  ];

  useEffect(() => {
    const fetchData = async () => {
      const newStocks = [];

      for (const symbol of symbols) {
        try {
          const response = await axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${process.env.ALPHA_VANTAGE_API_KEY}`);
          const timeSeriesData = response.data['Time Series (Daily)'];

          const dates = Object.keys(timeSeriesData);
          const today = dates[0];
          const yesterday = dates[1];

          const todayClose = parseFloat(timeSeriesData[today]['4. close']);
          const yesterdayClose = parseFloat(timeSeriesData[yesterday]['4. close']);

          const change = ((todayClose - yesterdayClose) / yesterdayClose) * 100;
          const changeString = change >= 0 ? `+${change.toFixed(2)}%` : `${change.toFixed(2)}%`;

          newStocks.push({
            company: symbol,
            stockPrice: todayClose,
            change: changeString,
          });
        } catch (error) {
          console.error('Error fetching stock data:', error);
        }
      }

      setStocks(newStocks);
    };

    fetchData();
  }, []);

  const filteredStocks = stocks.filter(stock => stock.company.toLowerCase().startsWith(query.toLowerCase()));

  return (
    <div className="mt-32 flex justify-center">
      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6">
        {filteredStocks.map((stock, index) => (
          <Link key={index} href={`/${encodeURIComponent(stock.company)}`}>
            <div className="cursor-pointer bg-white p-4 rounded-lg shadow-md w-64 transition transform duration-200 ease-in-out hover:scale-105">
              <h2 className="text-xl font-semibold mb-2">{stock.company}</h2>
              <div className="flex justify-between items-center">
                <span>Stock Price:</span>
                <span className="text-green-500 font-semibold">${stock.stockPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span>Change:</span>
                <span className={stock.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}>
                  {stock.change}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}


