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
      const reversedData = [...data].reverse();

      const ctx = chartRef.current.getContext('2d');

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
                  const dateStr = reversedData[index].Date;
                  const dateParts = dateStr.split('T')[0].split('-');
                  return `${dateParts[0]}-${dateParts[1]}-${dateParts[2]}`;
                }
              }
            },
            yPrice: {
              position: 'left',
              title: {
                display: true,
                text: 'Price',
              },
              grid: {
                drawOnChartArea: true,
              },
            },
            yVolume: {
              type: 'linear',
              position: 'right',
              title: {
                display: false,
              },
              ticks: {
                display: false,
              },
              grid: {
                drawOnChartArea: false,
              },
              afterFit: (scale) => {
                scale.height = scale.chart.height * 0.3;  // Adjust the height of the bar graph
              }
            },
          },
          tooltips: {
            mode: 'index',
            intersect: false,
            callbacks: {
              title: function(tooltipItems, data) {
                const dateStr = tooltipItems[0].label || '';
                const dateParts = dateStr.split('T')[0].split('-');
                return `${dateParts[0]}-${dateParts[1]}-${dateParts[2]}`;
              }
            }
          },
          hover: {
            mode: 'index',
            intersect: false,
          },
        },
      });

      setChartInstance(newChartInstance);
    }
  }, [data]);

  return <canvas ref={chartRef}></canvas>;
}

export default StockChart;
