'use client';

import { useEffect, useState } from 'react';
import StockChart from '../components/StockChart';

function SymbolPage(props) {
  const [articles, setArticles] = useState([]);
  const [stockData, setStockData] = useState([]);

  useEffect(() => {
    fetch(`/api/chart?symbol=${props.params.company}`)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        setStockData(data);
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
        <h1 className="text-3xl font-bold mb-4">{props.params.company}</h1>
        <StockChart data={stockData} symbol={props.params.company} />
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
