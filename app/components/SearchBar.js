'use client';
import { useState } from "react";

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    onSearch(newQuery);
  };

  // 한국 시간대를 기준으로 오늘의 날짜를 가져옵니다.
  const date = new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' });
  return (
    <div className="fixed top-0 left-1/2 transform -translate-x-1/2 mt-8 z-50">
      <div className="flex flex-col items-center">
        <div className="flex items-center border-2 border-gray-300 p-2 rounded-md mb-2">
          <input
            type="text"
            value={query}
            onChange={handleSearch}
            className="flex-grow outline-none"
            placeholder="Search..."
          />
        </div>
        <span className="text-gray-500 text-sm flex items-center">
          🌻 <span className="ml-1">{date}</span>
        </span>
      </div>
    </div>
  );
}

export default SearchBar;
