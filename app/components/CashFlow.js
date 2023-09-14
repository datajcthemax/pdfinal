// components/CashFlow.js

function CashFlow({ data }) {

    const formatCurrency = (amount) => {
      return `$${parseFloat(amount).toLocaleString('en-US', { minimumFractionDigits: 0 })}`;
    };
  
    return (
      <div className="mt-4 mb-4">
        <h2 className="text-xl font-bold dark:text-white">Cash Flow</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white dark:bg-gray-800 w-full">
            <thead>
              <tr>
                {/* 필드 이름은 예제로 작성된 것입니다. 실제 필드 이름에 따라 수정해야 합니다. */}
                <th className="border px-4 py-2 dark:text-white">Year</th>
                <th className="border px-4 py-2 dark:text-white">Net Income</th>
                <th className="border px-4 py-2 dark:text-white">Cash From Operations</th>
                <th className="border px-4 py-2 dark:text-white">Cash From Investing</th>
                <th className="border px-4 py-2 dark:text-white">Cash From Financing</th>
                <th className="border px-4 py-2 dark:text-white">Net Change In Cash</th>
                <th className="border px-4 py-2 dark:text-white">Free Cash Flow</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, idx) => (
                <tr key={idx}>
                  <td className="border px-4 py-2 dark:text-gray-300">{new Date(row.indexDate).getFullYear()}</td>
                  <td className="border px-4 py-2 dark:text-gray-300">{formatCurrency(row["Net Income"])}</td>
                  <td className="border px-4 py-2 dark:text-gray-300">{formatCurrency(row["Cash from operations"])}</td>
                  <td className="border px-4 py-2 dark:text-gray-300">{formatCurrency(row["Cash from investing"])}</td>
                  <td className="border px-4 py-2 dark:text-gray-300">{formatCurrency(row["Cash from financing"])}</td>
                  <td className="border px-4 py-2 dark:text-gray-300">{formatCurrency(row["Net change in cash"])}</td>
                  <td className="border px-4 py-2 dark:text-gray-300">{formatCurrency(row["Free cash flow"])}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
  
  export default CashFlow;
  