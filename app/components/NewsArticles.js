function NewsArticles({ articles }) {
  return (
    <div>
      <h1 className='text-2xl pt-5'>Related Articles</h1>
      {articles.map((article, index) => (
        <a key={index} href={article.url} target="_blank" rel="noopener noreferrer" className="block mb-4">
          <div className="p-3 border rounded shadow-md">
            <h2 className="text-xl mb-2">{article.title}</h2>
            <p className="mb-2 text-sm">{article.description}</p>
          </div>
        </a>
      ))}
    </div>
  );
}

export default NewsArticles;

  