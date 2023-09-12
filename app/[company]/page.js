'use client';


import { useEffect, useState } from 'react';
import StockChart from '../components/StockChart';

function SymbolPage(props) {
  const [articles, setArticles] = useState([]);
  const [stockData, setStockData] = useState([]);
  const [stockInfo, setStockInfo] = useState({});  // State for storing the stock's latest Price and Change

  useEffect(() => {
    fetch(`/api/chart?symbol=${props.params.company}`)
    .then(response => response.json())
    .then(data => {
        console.log('Fetched Stock Data:', data);  // Log the fetched stock data for debugging
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
    const ENDPOINT = `https://api.currentsapi.services/v1/search?keywords=${props.params.company}&apiKey=${CURRENTS_API_KEY}&page_size=5`;

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
    <>
    <div className="p-5">
      <h1 className="text-3xl font-bold">{props.params.company}</h1>
      <div className="text-2xl">
        ${stockInfo.Price?.toFixed(2)}
      </div>
      <div className={`text-lg mb-2 ${stockInfo.Change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
        {stockInfo.Change?.toFixed(2)}% {stockInfo.Change >= 0 ? '👍' : '👎'}
      </div>
      <StockChart data={stockData} symbol={props.params.company} />
      <h1 className='text-2xl pt-5'>Related Articles</h1>
      {articles.map((article, index) => (
        <div key={index} className="mb-4">
          <div className="inline-block p-3 border rounded shadow-md">
            <h2 className="text-xl mb-2">{article.title}</h2>
            <p className="mb-2 text-sm">{article.description}</p>
            <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline text-xs">Read more</a>
          </div>
        </div>
      ))}
    </div>
  </>
  );
}

export default SymbolPage;
