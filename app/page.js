'use client';
import { useState } from 'react';
import SearchBar from "./components/SearchBar";
import StockDashboard from "./components/StockDashboard";

export default function Home() {
  const [query, setQuery] = useState("");

  const handleSearch = (searchQuery) => {
    setQuery(searchQuery);
  };

  return (
    <div className="relative">
      <div className="flex justify-center mt-8">
        <SearchBar onSearch={handleSearch} />
      </div>
      <StockDashboard query={query} />
    </div>
  );
}
