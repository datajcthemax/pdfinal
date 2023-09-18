// app/[company]/page.js
"use client";

import { useEffect, useState } from "react";
import StockChart from "../components/StockChart";
import NewsArticles from "../components/NewsArticles";
import CompanyInfo from "../components/CompanyInfo";
import FinancialTab from "../components/FinancialTab";
import Link from 'next/link';


function SymbolPage(props) {
  const [articles, setArticles] = useState([]);
  const [stockData, setStockData] = useState([]);
  const [stockInfo, setStockInfo] = useState({});
  const [companyInfo, setCompanyInfo] = useState("");
  const [balanceSheetData, setBalanceSheetData] = useState([]);
  const [cashFlowData, setCashFlowData] = useState([]);
  const [financialStatementData, setFinancialStatementData] = useState([]);
  const [activeTab, setActiveTab] = useState("bs"); // 기본적으로 "bs" 탭을 활성화
  const [darkMode, setDarkMode] = useState();

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



  useEffect(() => {
    fetch(`/api/bs?symbol=${props.params.company}`)
      .then((response) => response.json())
      .then((data) => {
        setBalanceSheetData(data);
      })
      .catch((error) => console.error("Error fetching balance sheet:", error));
  }, [props.params.company]);

  useEffect(() => {
    fetch(`/api/cf?symbol=${props.params.company}`)
      .then((response) => response.json())
      .then((data) => {
        setCashFlowData(data);
      })
      .catch((error) => console.error("Error fetching cash flow:", error));
  }, [props.params.company]);

  useEffect(() => {
    fetch(`/api/fs?symbol=${props.params.company}`)
      .then((response) => response.json())
      .then((data) => {
        setFinancialStatementData(data);
      })
      .catch((error) =>
        console.error("Error fetching financial statement:", error)
      );
  }, [props.params.company]);

  useEffect(() => {
    fetch(`/api/chart?symbol=${props.params.company}`)
      .then((response) => response.json())
      .then((data) => {
        setStockData(data);
        const latestData = data[0];
        setStockInfo({
          Price: latestData?.Close,
          Change: latestData?.Change,
        });
      })
      .catch((error) => console.error("Error fetching stock data:", error));
  }, [props.params.company]);

  useEffect(() => {
    const fetchCompanyInfo = async () => {
      try {
        const response = await fetch(
          `/api/companyInfo?symbol=${props.params.company}` // symbol을 쿼리 파라미터로 전달
        );
        const data = await response.json();
        const companyData = data[0];
        setCompanyInfo(companyData || {});
      } catch (error) {
        console.error("Error fetching company info:", error);
      }
    };

    fetchCompanyInfo();
  }, [props.params.company]);


  useEffect(() => {
    if (companyInfo.name) {
      const ENDPOINT = `/api/currents?company=${companyInfo.name}`;

      fetch(ENDPOINT)
        .then((response) => response.json())
        .then((data) => {
          if (data.status === "ok") {
            setArticles(data.news);
          } else {
            console.error("Error fetching articles:", data.message);
          }
        })
        .catch((error) => console.error("Error fetching articles:", error));
    }
  }, [props.params.company, companyInfo.name]);


  useEffect(() => {
    const fetchData = async (endpoint, setter) => {
      try {
        const response = await fetch(
          `/api/${endpoint}?symbol=${props.params.company}`
        );
        const data = await response.json();
        setter(data);
      } catch (error) {
        console.error(`Error fetching ${endpoint} data:`, error);
      }
    };

    if (activeTab === "bs") fetchData("bs", setBalanceSheetData);
    if (activeTab === "cf") fetchData("cf", setCashFlowData);
    if (activeTab === "fs") fetchData("fs", setFinancialStatementData);
  }, [activeTab, props.params.company]);

  return (
    <>
      <div className="p-5 dark:bg-black">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold dark:text-white">
            {props.params.company}({companyInfo.name})
          </h1>
          <div className="flex items-center space-x-4">
            <Link href="/">
              <div className="bg-blue-500 hover:bg-blue-700 dark:bg-gray-700 dark:hover:bg-gray-500 text-white font-bold py-2 px-4 rounded">
              🏠
              </div>
            </Link>
            <button onClick={toggleDarkMode} className="text-3xl">
              {darkMode ? "☀️" : "🌙"}
            </button>
          </div>
        </div>

        <div className="text-2xl dark:text-gray-300">
          ${stockInfo.Price?.toFixed(2)}
        </div>
        <div
          className={`text-lg mb-2 ${stockInfo.Change >= 0
            ? "text-green-500 dark:text-green-300"
            : "text-red-500 dark:text-red-300"
            }`}
        >
          {stockInfo.Change?.toFixed(2)}% {stockInfo.Change >= 0 ? "👍" : "👎"}
        </div>
        <div className="w-full md:w-3/4 lg:w-2/3 xl:w-1/2 mx-auto">
          <h3 className="text-center text-2xl">Monthly Price and Volume Chart</h3>
          <StockChart data={stockData} symbol={props.params.company} />
        </div>

        <FinancialTab
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          balanceSheetData={balanceSheetData}
          cashFlowData={cashFlowData}
          financialStatementData={financialStatementData}
        />
        <CompanyInfo info={companyInfo.longBusinessSummary} />
        <NewsArticles articles={articles} />
      </div>
      <button onClick={scrollToTop} className="scrollToTopButton">
        ⬆️
      </button>
    </>
  );
}

export default SymbolPage;
