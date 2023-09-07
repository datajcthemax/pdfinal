import React from 'react';

function StockInfo({ company, financialData }) {
  return (
    <div className="mt-4">
      <h2 className="text-xl font-semibold mb-2">{company} Stock Info</h2>
      <div className="mb-2">
        <strong>Company:</strong> {company}
      </div>
      <div className="mb-2">
        <strong>Current Stock Price:</strong> ${financialData.stockPrices[financialData.stockPrices.length - 1]}
      </div>
      <div className="mb-2">
        <strong>Market Cap:</strong> $100 billion
      </div>
      <div className="mb-2">
        <strong>PE Ratio:</strong> 20.1
      </div>
      <div className="mb-2">
        <strong>Dividend Yield:</strong> 2.5%
      </div>
      {/* 기타 주식 정보를 원하는 만큼 추가할 수 있습니다 */}
    </div>
  );
}

export default StockInfo;
