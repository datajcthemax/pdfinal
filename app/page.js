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
      <img src="/logo/logo.png" alt="Company Logo" className="w-20 h-20 mr-4 sm:w-24 sm:h-24 sm:mr-6" />
      <SearchBar onSearch={handleSearch} darkMode={darkMode} className="mx-2 w-3/4 sm:mx-6 sm:w-3/4" />
      <button onClick={toggleDarkMode} className="text-2xl ml-4 sm:text-3xl sm:ml-6">
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
