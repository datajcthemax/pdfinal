'use client';

import SearchBar from "./components/SearchBar";
import StockDashboard from "./components/StockDashboard";
import React, { useState } from 'react';

export default function Home() {
  const [query, setQuery] = useState("");

  const stocks = [
    { company: "Apple", stockPrice: 150.69, change: "+1.2%" },
    { company: "Microsoft", stockPrice: 258.25, change: "-0.5%" },
    { company: "Amazon", stockPrice: 3312.49, change: "+0.7%" },
    { company: "Google", stockPrice: 2731.40, change: "+0.1%" },
    { company: "Facebook", stockPrice: 352.96, change: "-0.9%" },
    { company: "Tesla", stockPrice: 716.98, change: "+2.1%" },
    { company: "Netflix", stockPrice: 516.39, change: "-1.3%" },
    { company: "Disney", stockPrice: 178.30, change: "-0.4%" },
    { company: "NVIDIA", stockPrice: 215.17, change: "+1.5%" },
    { company: "PayPal", stockPrice: 283.29, change: "+0.3%" },
    { company: "Adobe", stockPrice: 641.29, change: "+0.9%" },
    { company: "Salesforce", stockPrice: 269.45, change: "-0.6%" }
  ];

  const handleSearch = (searchQuery) => {
    setQuery(searchQuery);
  };

  const filteredStocks = stocks.filter(stock => stock.company.toLowerCase().startsWith(query.toLowerCase()));

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      <StockDashboard stocks={filteredStocks} />
    </>
  );
}
