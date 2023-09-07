'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

// 이 함수는 예시입니다. 실제로는 백엔드 API를 호출하거나 데이터베이스를 조회할 것입니다.
async function fetchCompanyData(company) {
  const mockData = {
    'Apple': { description: 'Apple Inc. is an American multinational technology company.', stock: 'AAPL', stockPrice: '150.00', change: '+1.50' },
    // 여기에 다른 회사 데이터를 추가할 수 있습니다.
  };

  return mockData[company];
}

export default function CompanyInfo() {
  const router = useRouter();
  const { company } = router.query ?? {};
  const [companyData, setCompanyData] = useState(null);

  useEffect(() => {
    if (company) {
      fetchCompanyData(company).then(data => setCompanyData(data));
    }
  }, [company]);

  if (!companyData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{company}</h1>
      <p>{companyData.description}</p>
      <div>
        <strong>Stock Symbol:</strong> {companyData.stock}
      </div>
      <div>
        <strong>Stock Price:</strong> ${companyData.stockPrice}
      </div>
      <div>
        <strong>Change:</strong> {companyData.change}
      </div>
      {/* 실제로는 주식 정보나 차트 등을 여기에 표시합니다. */}
    </div>
  );
}
