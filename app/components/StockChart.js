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
      const reversedData = [...data].reverse();  // 데이터 배열을 복사하고 반대로 정렬

      const ctx = chartRef.current.getContext('2d');

      // 기존 차트 인스턴스 파괴
      if (chartInstance) {
        chartInstance.destroy();
      }

      const newChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
          labels: reversedData.map(item => item.Date),
          datasets: [
            {
              label: 'Price',
              data: reversedData.map(item => item.Close),
              borderColor: '#B6C3A2',
              fill: false,
              yAxisID: 'yPrice',
            },
            {
              label: 'Volume',
              data: reversedData.map(item => item.Volume),
              type: 'bar',
              backgroundColor: '#FBB9AB',
              yAxisID: 'yVolume',
            },
          ],
        },
        options: {
          responsive: true,
          title: {
            display: true,
            text: symbol,
          },
          scales: {
            x: {
              type: 'category',
              ticks: {
                callback: function(value, index, values) {
                  const dateStr = reversedData[index].Date;  // reversedData에서 날짜 값을 가져옵니다.
                  const dateParts = dateStr.split('T')[0].split('-');
                  const year = dateParts[0];
                  const month = dateParts[1];
                  const day = dateParts[2];
                  return `${year}-${month}-${day}`;  
                }
              }
            },
            yPrice: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Price',
              }
            },
            yVolume: {
              display: false,
              beginAtZero: true,
              position: 'right',
            },
          },
          tooltips: {
            mode: 'index',
            intersect: false,
            callbacks: {
              title: function(tooltipItems, data) {
                const dateStr = tooltipItems[0].label || '';
                const dateParts = dateStr.split('T')[0].split('-');
                const year = dateParts[0];
                const month = dateParts[1];
                const day = dateParts[2];
                return `${year}-${month}-${day}`; 
              }
            }
          },
          hover: {
            mode: 'index',
            intersect: false,
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
