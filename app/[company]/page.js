'use client';


import { useEffect, useState } from 'react';
import StockChart from '../components/StockChart';
import NewsArticles from '../components/NewsArticles';

function SymbolPage(props) {
  const [articles, setArticles] = useState([]);
  const [stockData, setStockData] = useState([]);
  const [stockInfo, setStockInfo] = useState({});  // State for storing the stock's latest Price and Change

  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  };

  useEffect(() => {
    fetch(`/api/chart?symbol=${props.params.company}`)
      .then(response => response.json())
      .then(data => {
        setStockData(data);
        // Assuming the latest data is at the last index
        const latestData = data[0];  // Assuming the data is sorted in descending order by date
        setStockInfo({
          Price: latestData?.Close,
          Change: latestData?.Change
        });
      })
      .catch(error => console.error('Error fetching stock data:', error));
  }, []);

  useEffect(() => {
    const CURRENTS_API_KEY = process.env.NEXT_PUBLIC_CURRENTS_API_KEY;
    const ENDPOINT = `/api/currents?company=${props.params.company}`;

    fetch(ENDPOINT)
      .then(response => response.json())
      .then(data => {
        if (data.status === 'ok') {
          setArticles(data.news);
        } else {
          console.error('Error fetching articles:', data.message);
        }
      })
      .catch(error => console.error('Error fetching articles:', error));
  }, [props.params.company]);

  return (
    <div className="p-5 dark:bg-black">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold dark:text-white">{props.params.company}</h1>
        {/* 다크 모드 토글 버튼 */}
        <button onClick={toggleDarkMode} className="mr-4 text-3xl">
          {darkMode ? '🌙' : '☀️'}
        </button>
      </div>
      <div className="text-2xl dark:text-gray-300">
        ${stockInfo.Price?.toFixed(2)}
      </div>
      <div className={`text-lg mb-2 ${stockInfo.Change >= 0 ? 'text-green-500 dark:text-green-300' : 'text-red-500 dark:text-red-300'}`}>
        {stockInfo.Change?.toFixed(2)}% {stockInfo.Change >= 0 ? '👍' : '👎'}
      </div>
      <div className="card">
        <StockChart data={stockData} symbol={props.params.company} />
      </div>
      <NewsArticles articles={articles} />
    </div>
  );
}

export default SymbolPage;
