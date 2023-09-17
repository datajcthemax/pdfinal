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
      <div className="flex items-center p-1.5 sm:p-2 rounded-md mb-2 shadow-md bg-white border-white sm:w-3/4 w-3/4">
        <input
          type="text"
          value={query}
          onChange={handleSearch}
          className={`w-full outline-none text-base sm:text-sm p-1.5 ${darkMode ? 'border-2 text-black placeholder-gray-700 border-white' : 'border-0 text-gray-800 placeholder-gray-400'} box-border`}
          placeholder="Search..."
        />
      </div>
      <span className={`text-xs flex items-center ${darkMode ? 'text-white' : 'text-gray-600'}`}>
        🌻 <span className="ml-1">{date}</span>
      </span>
    </div>
  </div>
  );
}

export default SearchBar;


