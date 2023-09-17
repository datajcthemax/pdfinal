'use client';
import { useState, useEffect } from 'react';
import SearchBar from "./components/SearchBar";
import StockDashboard from "./components/StockDashboard";

export default function Home() {
  const [query, setQuery] = useState("");
  const [darkMode, setDarkMode] = useState();

  const handleSearch = (searchQuery) => {
    setQuery(searchQuery);
  };

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    if (newMode) {
      document.body.classList.add("dark");
      localStorage.setItem("darkMode", "true");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("darkMode", "false");
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };



  useEffect(() => {
    const storedDarkMode = localStorage.getItem("darkMode");
    if (storedDarkMode) {
      setDarkMode(storedDarkMode === "true");
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [darkMode]);



  return (
    <div className="relative">
      <header className="fixed top-0 left-0 w-full bg-gray-200 dark:bg-gray-800 z-50 flex justify-between items-center p-4 shadow-md">
        <img src="/logo/logo.png" alt="Company Logo" className="w-24 h-24" />
        <SearchBar onSearch={handleSearch} darkMode={darkMode} />
        <button onClick={toggleDarkMode} className="text-3xl">
          {darkMode ? '☀️' : '🌙'}
        </button>
      </header>
      <div className="pt-32">
        <StockDashboard query={query} />
      </div>
      <button onClick={scrollToTop} className="scrollToTopButton">
        ⬆️
      </button>
    </div>
  );
}
