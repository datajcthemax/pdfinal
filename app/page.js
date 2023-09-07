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
    <>
      <SearchBar onSearch={handleSearch} />
      <StockDashboard query={query} />
      {/* hello! */}
    </>
  );
}
