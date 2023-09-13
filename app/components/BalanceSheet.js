// components/BalanceSheet.js

function BalanceSheet({ data }) {

  const formatCurrency = (amount) => {
    return `$${parseFloat(amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
  };

  return (
    <div className="mt-4 mb-4">
      <h2 className="text-xl font-bold dark:text-white">Balance Sheet</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-800 w-full">
          <thead>
            <tr>
              <th className="border px-4 py-2 dark:text-white">Year</th>
              <th className="border px-4 py-2 dark:text-white">Cash and Short-term Investments</th>
              <th className="border px-4 py-2 dark:text-white">Total Assets</th>
              <th className="border px-4 py-2 dark:text-white">Total Equity</th>
              <th className="border px-4 py-2 dark:text-white">Shares Outstanding</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr key={idx}>
                <td className="border px-4 py-2 dark:text-gray-300">{new Date(row.indexDate).getFullYear()}</td>
                <td className="border px-4 py-2 dark:text-gray-300">{formatCurrency(row["Cash and short-term investments"])}</td>
                <td className="border px-4 py-2 dark:text-gray-300">{formatCurrency(row["Total Assets"])}</td>
                <td className="border px-4 py-2 dark:text-gray-300">{formatCurrency(row["Total Equity"])}</td>
                <td className="border px-4 py-2 dark:text-gray-300">{formatCurrency(row["Shares outstanding"])}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BalanceSheet;
