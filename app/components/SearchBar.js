'use client';

import { useState } from "react";

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    onSearch(newQuery);
  };

  return (
    <div className="fixed top-0 left-1/2 transform -translate-x-1/2 mt-8 z-50">
      <div className="flex items-center border-2 border-gray-300 p-2 rounded-md">
        <input
          type="text"
          value={query}
          onChange={handleSearch}
          className="flex-grow outline-none"
          placeholder="Search..."
        />
      </div>
    </div>
  );
}

export default SearchBar;
