'use client';

import { useEffect, useRef, useState } from 'react';
import { Chart } from 'chart.js';
import { registerables } from 'chart.js';
import 'chartjs-adapter-date-fns';

Chart.register(...registerables);

function StockChart({ data, symbol }) {
  const chartRef = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);

  useEffect(() => {
    if (data && data.length > 0 && chartRef.current) {
      const ctx = chartRef.current.getContext('2d');

      // 기존 차트 인스턴스 파괴
      if (chartInstance) {
        chartInstance.destroy();
      }

      const newChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
          labels: data.map(item => item.Date),
          datasets: [
            {
              label: 'Close Price',
              data: data.map(item => item.Close),
              borderColor: '#00b4d8',
              fill: false,
            },
            {
              label: 'Open Price',
              data: data.map(item => item.Open),
              borderColor: '#fca311',
              fill: false,
            },
          ],
        },
        options: {
          responsive: true,
          title: {
            display: true,
            text: symbol
          },
          scales: {
            x: {
              type: 'time',
              time: {
                unit: 'day',
              },
            },
            y: {
              beginAtZero: true,
            },
          },
        },
      });

      // 새로운 차트 인스턴스 저장
      setChartInstance(newChartInstance);
    }
  }, [data]);

  return <canvas ref={chartRef}></canvas>;
}

export default StockChart;
