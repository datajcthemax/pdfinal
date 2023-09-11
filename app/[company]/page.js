'use client';

import { useEffect, useState } from 'react';

function SymbolPage(props) {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const API_KEY = '6fba73255d1744f7882bd43ab3b17e26';
    const ENDPOINT = `https://newsapi.org/v2/everything?q=${props.params.company}&apiKey=${API_KEY}&pageSize=5`;

    fetch(ENDPOINT)
      .then(response => response.json())
      .then(data => {
        if (data.status === 'ok') {
          setArticles(data.articles);
        } else {
          console.error('Error fetching articles:', data.message);
        }
      })
      .catch(error => console.error('Error fetching articles:', error));
  }, [props.params.company]);

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold mb-4">{props.params.company}</h1>
      {articles.map((article, index) => (
        <div key={index} className="mb-4 p-3 border rounded shadow-md">
          <h2 className="text-xl mb-2">{article.title}</h2>
          <p className="mb-2 text-sm">{article.description}</p>
          <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline text-xs">Read more</a>
        </div>
      ))}
    </div>
  );
}

export default SymbolPage;
