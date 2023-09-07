import Link from 'next/link';

function StockDashboard({ stocks }) {
  return (
    <div className="mt-32 flex justify-center">
      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6">
        {stocks.map((stock, index) => (
          <Link key={index} href={`/${encodeURIComponent(stock.company)}`}>
            <div className="cursor-pointer bg-white p-4 rounded-lg shadow-md w-64 transition transform duration-200 ease-in-out hover:scale-105">
              <h2 className="text-xl font-semibold mb-2">{stock.company}</h2>
              <div className="flex justify-between items-center">
                <span>Stock Price:</span>
                <span className="text-green-500 font-semibold">${stock.stockPrice}</span>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span>Change:</span>
                <span className={stock.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}>
                  {stock.change}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default StockDashboard;
