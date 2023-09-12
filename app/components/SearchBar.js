'use client';
import { useState } from "react";

function SearchBar({ onSearch, darkMode }) {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    onSearch(newQuery);
  };

  const date = new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' });
  
  return (
    <div className="fixed top-0 left-1/2 transform -translate-x-1/2 mt-8 z-50">
      <div className="flex flex-col items-center">
        <div className={`flex items-center p-2 rounded-md mb-2 ${darkMode ? 'border-white bg-white' : 'border-gray-500 bg-white'}`}>
          <input
            type="text"
            value={query}
            onChange={handleSearch}
            className={`flex-grow outline-none border-2 ${darkMode ? 'text-black placeholder-gray-700 border-white' : 'text-black placeholder-gray-600 border-gray-500'}`}
            placeholder="Search..."
          />
        </div>
        <span className={`text-sm flex items-center ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          🌻 <span className="ml-1">{date}</span>
        </span>
      </div>
    </div>
  );
}

export default SearchBar;

