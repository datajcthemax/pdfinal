import { useEffect } from 'react';
import Chart from 'chart.js';

export default function FinancialChart({ data }) {
  useEffect(() => {
    const ctx = document.getElementById('myChart').getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.labels,
        datasets: [{
          label: 'Stock Price',
          data: data.stockPrices,
          borderColor: 'rgba(75, 192, 192, 1)',
          fill: false,
        }]
      },
      options: {
        responsive: true,
      }
    });
  }, [data]);

  return (
    <canvas id="myChart"></canvas>
  );
}
