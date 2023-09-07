import axios from 'axios';

export async function getStockData(symbols) {
  const API_KEY = process.env.ALPHA_VANTAGE_API_KEY; // 환경 변수에서 API 키를 가져옵니다.
  let stocks = [];

  for (let symbol of symbols) {
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${API_KEY}`;
    try {
      const response = await axios.get(url);
      const data = response.data['Time Series (5min)'];
      const latestTime = Object.keys(data)[0];
      const latestData = data[latestTime];
      const stockPrice = latestData['4. close'];

      stocks.push({ company: symbol, stockPrice }); // stockPrice와 change를 추가할 수 있습니다.
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  return stocks;
}
