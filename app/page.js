'use client';
import { useState, useEffect } from 'react';
import SearchBar from "./components/SearchBar";
import StockDashboard from "./components/StockDashboard";

export default function Home() {
  const [query, setQuery] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const handleSearch = (searchQuery) => {
    setQuery(searchQuery);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="relative">
      <header className="fixed top-0 left-0 w-full bg-white dark:bg-gray-800 z-50 flex justify-between items-center p-4 shadow-md">
        <img src="/logo/logo.png" alt="Company Logo" className="w-24 h-24" />
        <SearchBar onSearch={handleSearch} darkMode={darkMode} />
        <button onClick={toggleDarkMode} className="text-3xl">
            {darkMode ? '☀️' : '🌙'}
        </button>
      </header>
      <div className="pt-32">
        <StockDashboard query={query} />
      </div>
    </div>
  );
}
